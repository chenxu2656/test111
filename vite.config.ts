import { URL, fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { loadEnv, type ConfigEnv, type UserConfigExport } from "vite";
import Pages from "vite-plugin-pages";
import VueDevTools from "vite-plugin-vue-devtools";
import { exclude, include } from "./build/optimize";
import { getPluginsList } from "./build/plugins";
import { __APP_INFO__, pathResolve, root, wrapperEnv } from "./build/utils";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // 服务端渲染
    server: {
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        "/api/v1": {
          // 这里填写后端地址
          target: "http://124.222.84.233:8000/",
          changeOrigin: true,
          bypass: function (req, res, options) {
            // 设置代理转发前缀
            const proxyUrl =
              new URL(options.rewrite(req.url) || "", options.target)?.href ||
              "";
            res.setHeader("x-req-proxyUrl", proxyUrl);
          },
          rewrite: (path) => {
            console.log(
              `原路径: ${path}, 重写后路径: ${path.replace(/^\/api/, "/api")}`,
            );
            return path.replace(/^\/api/, "/api");
          },
        },
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      // warmup: {
      //   clientFiles: ['./index.html', './src/{views,components}/*']
      // }
    },
    plugins: [
      getPluginsList(VITE_CDN, VITE_COMPRESSION),
      VueDevTools(),
      Pages({
        dirs: "src/views", // 需要生成路由的文件目录，默认就是识别src下面的pages文件
        exclude: ["**/components/*.vue"], // 排除在外的目录，上面配置目录的例子，里面有 components 目录，我们不希望他被解析为路由
        extendRoute(route) {
          if (route.path === "/") return { ...route, redirect: "page1" }; // 给默认路由加一个redirect，默认为index.vue
        },
      }),
      AutoImport({
        // 目标文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],

        // 全局引入插件
        imports: [
          // presets
          "vue",
          "vue-router",
          // custom
          {
            "@vueuse/core": [
              // named imports
              "useMouse", // import { useMouse } from '@vueuse/core',
              // alias
              ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
            axios: [
              // default imports
              ["default", "axios"], // import { default as axios } from 'axios',
            ],
            "[package-name]": [
              "[import-names]",
              // alias
              ["[from]", "[alias]"],
            ],
          },
        ],

        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        // 解析器，例如element-plus的ElementPlusResolver
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [ElementPlusResolver()],
        // 声明文件生成位置和文件名称
        dts: "./auto-import.d.ts",
      }),
    ],
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude,
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },

    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
