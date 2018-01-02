<template>
    <div>
        <headNav></headNav>
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
          <span>用户名:</span><span>{{ data.username }}</span>
        </p>
        <p>
          <span>角色:</span><span>{{ data.role }}</span>
        </p>
      </div>
      <div class="btn6" @click="exit1">退出登录</div>

        <!-- 尾部导航 -->
        <index></index>
    </div>
</template>
<script>
import index from "./index1"
import headNav from './header'
export default {
  components: { index ,headNav},

  created(){
    this.request()
  },
    data(){
      return{
          data:[],
      }
  },
  methods:{
      request(){
          var self = this
          this.$http.get("http://119.29.245.59/lib/admins/"+localStorage.getItem('userId'),{
             headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }).then(function(res){
            console.log(res.data)
            self.data = res.data.data
          }).catch(function(err){
            console.log(err)
          })
      },
      exit1(){
      localStorage.clear()
      console.log(localStorage.getItem('userId'))
      console.log(localStorage.getItem('token'))
      this.$router.push({path :'/welcome'})
      }
  }
}
</script>
<style lang="less" scoped>
.content {
  margin-top: 30px;
  font-size: 50px;
  border: 10px solid #f2f2f2;
  height: 510px;
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
