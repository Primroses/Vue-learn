<template>
  <div>
      <head-nav></head-nav>

      <div class="title">订单详情</div>
      <div class="content_header">
        <div class="header"><router-link :to="{ path: '/order/apply' }">申请订单</router-link></div>
        <div class="header"><router-link :to="{ path: '/order/cancel' }">取消订单</router-link></div>
        <div class="header"><router-link :to="{ path: '/order/borrow' }">借出订单</router-link></div>
        <div class="header"><router-link :to="{ path: '/order/return' }">归还订单</router-link></div>
      </div>
      <router-view></router-view>
      <index></index>
  </div>
</template>
<script>
import headNav from "./header";
import index from "./Userindex"
export default {
  components: { index,headNav },

}
</script>
<style scoped lang="less">
.title{
  font-size: 50px;
  width: 50%;
  margin: 50px 25%;
  color: #86c9f3;
  text-align: center;
}
.content_header{
  width: 100%;
  .header{
    width: 25%;
    float: left;
    font-size: 40px;
    text-align: center;
    .router-link-active {
       color: #86c9f3;
    }
  }

}
</style>
