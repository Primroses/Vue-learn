<template>
  <div >
      <head-nav></head-nav>
      <div class="header">
        <img src="../assets/userbackground.jpg">
      </div>
      <div class="title">个人信息</div>
      <div class="content">
        <p>
          <span>昵称:</span><span>{{ data.nickname }}</span>
        </p>
        <p>
          <span>userId:</span><span>{{ data.userId }}</span>
        </p>
        <p>
          <span>电话号码:</span><span>{{ data.tel }}</span>
        </p>
        <p>
          <span>角色:</span><span>{{ data.role }}</span>
        </p>
      </div>
      <div class="btn6" @click="exit">退出登录</div>
      <index></index>
  </div>
</template>
<script>
import index from "./Userindex";
import headNav from "./header";
export default {
  components: { index, headNav },
  created(){
    this.request()
  },
  data(){
      return{
          data:[],
      }
  },
  methods: {
    request() {
      var self = this
      // axios 里面的this 是指 http 对象 而不是 vue 的 对象
      this.$http
        .get(
          "http://119.29.245.59/lib/users/" + localStorage.getItem("userId"),
          // 如果 是post 或者其他请求的话 就用 method: "请求的名字"
          // 这里要加入 headers data 或者是parms 或者是都不加 直接写 参数 视情况而定
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(function(res) {
          console.log(res.data.data);
          // 得到的参数 就 赋值到已经 声明的 一个数组里面 然后v-for 渲染即可
          self.data= res.data.data 
        })
        .catch(function(err) {});
    },
    exit(){
      localStorage.clear()
      console.log(localStorage.getItem('userId'))
      console.log(localStorage.getItem('token'))
      this.$router.push({path :'/welcome'})
    }
  }
};
</script>
<style scoped lang='less'>
#btn1 {
  font-size: 100px;
}
.header {
  img {
    width: 100%;
  }
}
.title{
  font-size: 50px;
  width: 50%;
  margin: 50px 25%;
  color: #86c9f3;
  text-align: center;
}
.content {
  margin-top: 30px;
  font-size: 50px;
  border: 10px solid #f2f2f2;
  height: 420px;
  p {
    width: 80%;
    margin-top: 20px;
    margin: 0 10%;
    border-bottom: 1px solid black;
    height: 100px;
    line-height: 100px;
    clear: both;
    span {
      margin: 0;
      display: block;
      float: left;
    }
    span:nth-child(1) {
      width: 35%;
      text-align: right;
      margin-right: 5%;
      color: #86c9f3;
    }
    span:nth-child(2) {
      width: 60%;
      text-align: left;
    }
  }
}
.btn6{
  font-size: 50px;
  width: 30%;
  line-height: 50px;
  height: 50px;
  padding: 15px;
  margin: 30px 35%;
  color:#fff;
  background-color: red;
  text-align: center;
}
</style>
