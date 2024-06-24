import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite'
import { exclude, include } from './build/optimize'
import { getPluginsList } from './build/plugins'
import {
  __APP_INFO__,
  alias,
  pathResolve,
  root,
  wrapperEnv
} from './build/utils'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    wrapperEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        '/api/v1': {
          // 这里填写后端地址
          target: 'http://124.222.84.233:8000/',
          changeOrigin: true,
          bypass: function (req, res, options) {
            // 设置代理转发前缀
            const proxyUrl =
              new URL(options.rewrite(req.url) || '', options.target)?.href ||
              ''
            res.setHeader('x-req-proxyUrl', proxyUrl)
          },
          rewrite: path => {
            console.log(
              `原路径: ${path}, 重写后路径: ${path.replace(/^\/api/, '/api')}`
            )
            return path.replace(/^\/api/, '/api')
          }
        }
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*']
      }
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: 'es2015',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('./index.html', import.meta.url)
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
}
