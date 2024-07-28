<script setup lang="ts">
import Header from "@/views/portal/a-components/less/Header.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import city from '@/utils/cityfull.ts'
import { ref } from "vue";
const addaddress = ref(false)
const labelPosition = ref('right')
import {getAddressByCode} from '@/utils/address.ts'
import { http } from "@/utils/http";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute()
const productId = ref('')
const prodInfo = ref()
const addressList = ref([])
const address = ref({
  "user_id": "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73",
  "name": "许晨晨",
  "phone": "15056709773",
  "address": "安徽省合肥市蜀山区",
  "address_detail": "长宁公寓3栋1402"
})
const orderInfo = ref({
  "customer_id": localStorage.getItem('userInfo')?.id || "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73",
  "total_amount": 1,
  "single_price": 0,
  "num": 1,
  "addressId": "",
  "status": 0,
  "product": "",
  "productName": "",
  "org_id": ""
})
const currentRow = ref()
const createAddress = async()=> {
  
  const addressvalue = getAddressByCode(address.value.address[address.value.address.length-1])
  const postObj = {
    user_id: JSON.parse(localStorage.getItem('userInfo'))?.id || "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73",
    name: address.value.name,
    phone: address.value.phone,
    address: addressvalue,
    address_detail: address.value.address_detail
  }
  await http.request<any>(
    "post",
    "/api/v1/address",
    {
      data: postObj
    }
  ).then(res=>{
    addressList.value.unshift(res)
    console.log('addresslist', addressList.value);
    addaddress.value = false
  })
  
}
const getaddressList = async ()=> {
  await http.request<any>(
    "get",
    "/api/v1/address",
    {
      params: {
        user_id: JSON.parse(localStorage.getItem('userInfo'))?.id || "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73"
      }
    }
  ).then(res=>{
    addressList.value = res
    console.log('addresslist', addressList.value)
  })
}
const handleCurrentChange = (val: any | undefined) => {
  currentRow.value = val
  orderInfo.value.addressId = val.id
}
const getProdId = async(id:string)=> {
  const resp = await http.request<any>("get", `/api/v1/products/${id}`);
  prodInfo.value = resp
  console.log('商品详情', resp);
  orderInfo.value.single_price = resp.discount_price
  orderInfo.value.total_amount = resp.discount_price 
  orderInfo.value.product = resp.id
  orderInfo.value.productName = resp.product_name
  orderInfo.value.org_id = resp.org_id
  
}
onMounted(() => {
  getaddressList()
  productId.value = route.query.productid
  getProdId(productId.value)
  
})
const createOrder = async()=> {
  if (!currentRow.value) {
    ElMessage.error('请选择地址')
    return
  }
  // /api/v1/orders
  orderInfo.value.total_amount = 1
  console.log('orderInfo', orderInfo.value)
  await http.request<any>(
    "post",
    "/api/v1/orders",
    {
      data: orderInfo.value
    }
  ).then(res=>{
    console.log('订单生成成功', res)
    ElMessage.success('订单生成成功')
    setTimeout(() => {
      window.location.href = res.url
    }, 1000);
  })
}
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div class="container">
    <div class="titl" style="font-size: 18px; font-weight: 500;">确认订单信息</div>
    <el-card style="margin-top: 20px;">
      <div class="header flex " style="align-items: center;">
        <div style="width: 4px; height: 20px; background-color: #13ae68;"></div>
        <div class="tit ml-2" style="font-size: 15px; font-weight: 500;">订单信息</div>
      </div>
      <el-descriptions
        direction="vertical"
        :column="6"
        :size="size"
        border
        class="my-5"
      >
        <el-descriptions-item label="应用名称">{{orderInfo.productName}}</el-descriptions-item>
        <!-- <el-descriptions-item label="应用描述">{{prodInfo.product_description}}</el-descriptions-item>
        <el-descriptions-item label="应用规格" >Suzhou</el-descriptions-item> -->
        <el-descriptions-item label="数量" >{{orderInfo.num}}</el-descriptions-item>
        <el-descriptions-item label="单价" >{{orderInfo.single_price}}</el-descriptions-item>
        <el-descriptions-item label="总价">{{orderInfo.total_amount}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div class="headercon flex justify-between">
        <div class="header flex " style="align-items: center;">
          <div style="width: 4px; height: 20px; background-color: #13ae68;"></div>
          <div class="tit ml-2" style="font-size: 15px; font-weight: 500;">收货地址</div>
        </div>
        
        <el-button color="#13ae68" @click="addaddress=true">
          添加地址
        </el-button>
      </div>
      <el-table :data="addressList" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column label="收件人" width="120">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="phone" label="手机号" width="120" />
        <el-table-column
          property="address"
          label="地址"
          width="240"
          show-overflow-tooltip
        />
        <el-table-column property="address_detail" label="详细地址" />
      </el-table>
      
    </el-card>
    <div class="action my-10 flex justify-end">
      <div class="price">
        <span>应付价格:</span>
        <span style="font-size: 19px; color: red; font-weight: 500;">¥{{orderInfo.total_amount}}</span>
      </div>
      <el-button style="width: 150px;" color="#13ae68" class="ml-5" @click="createOrder">生成订单</el-button>
    </div>
  </div>
  <CommonFooter id="declare-offset" />
  <el-dialog
  v-model="addaddress"
  title="添加地址"
  width="500"
  :showClose="false"
>
<el-form :label-position="labelPosition" label-width="auto">
  <el-form-item label="联系人">
    <el-input v-model="address.name"></el-input>
  </el-form-item>
  <el-form-item label="手机号码">
    <el-input v-model="address.phone"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-cascader v-model="address.address" :options="city" style="width: 100%;" />
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="address.address_detail"></el-input>
  </el-form-item>
</el-form>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="addaddress = false" >取消</el-button>
      <el-button type="primary" color="#13ae68" @click="createAddress">
        确定
      </el-button>
    </div>
  </template>
</el-dialog>
</template>

<style lang="less" scoped>
@import "@/assets/main.less";
.container {
  margin-top: @headerHeight+80px !important;
  width: 80%;
  max-width: 1380px;
  margin: auto;
}
</style>
