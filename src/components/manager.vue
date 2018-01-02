<template>
    <div>
        <headNav></headNav>

        <div class="headerbtn">
            <div class="head">
                <div class="" @click="getmanager()">管理员列表</div>
                <div class="" @click="getUser()">用户列表</div>
            </div>
        </div>
        
        <template>
        <div class="detail" v-for="(item,key) in data" :key="item.userId" :id="item.userId">
            <p v-if="item.role==='管理员'">管理员{{ key+1 }}</p>
            <p v-else>用户{{ key+1 }}</p>
            <p>昵称:{{ item.nickname }}</p>
            <p>电话号码:{{ item.tel }}</p>
            <p>ID:{{ item.userId }}</p>
        </div>
        </template>

        <div class="btn" v-if="this.show=='true'&&this.btnshow=='true'" @click="count1"><router-link :to="{ path: '/manager/add' }">添加管理员</router-link></div>
        <router-view v-if="this.show=='true'"></router-view>
        <!-- 尾部导航 -->
        <index></index>
    </div>
</template>
<script>
import index from "./index";
import headNav from "./header";
export default {
  components: { index, headNav },
  data() {
    return {
      data: [],
      show :"",
      btnshow :"true"
    };
  },
  methods: {
    getmanager() {
        let self = this
        this.show = "true"
        this.btnshow = "true"
      this.$http
        .get("http://119.29.245.59/lib/admins/list?page=1&role=ADMIN", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(function(res) {
          console.log(res.data.data);
            self.data = res.data.data
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getUser(){
      this.show="false"
      let self = this
      this.$http
        .get("http://119.29.245.59/lib/admins/list?page=1&role=USER", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(function(res) {
          console.log(res.data.data);
            self.data = res.data.data
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    count1(){
      if(this.btnshow){
        this.btnshow ="false"
      }else{
        this.btnshow ="true"
      }
    }
  }
};
</script>
<style lang="less" scoped>
.headerbtn {
  width: 100%;
  font-size: 50px;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid gray;
  ::after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .head {
    width: 100%;
    div {
      width: 30%;
      margin: 0 10%;
      height: 100px;
      line-height: 100px;
      border-radius: 5%;
      float: left;
      text-align: center;
      color: white;
      background-color: #86c9f3;
    }
  }
}
.detail{
    width: 70%;
    height: 200px;
    border :1px solid #000;
    margin: 30px 15%;
    padding: 10px;
    p{
        font-size: 35px;
        margin-top: 20px;
    }
    p:nth-child(1){
        margin-top: 0;
    }
}
.btn{
    width: 30%;
    margin: 20px 35% 0 35%;
    text-align: center;
    font-size: 40px;
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    background-color: red;
    padding: 15px;
}
</style>
