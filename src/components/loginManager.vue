<template>
  <div id="bo">
    <img src="../assets/logo5.png" id="img">
    <div class="">
      <img src="../assets/smalllogo2.png" id="img1">
    </div>
    <div id="">
      <img src="../assets/manager.png" id="img2">
    </div>
    <div class="inner">
    <div class="input">
      <img src="../assets/user.png">
      <input type="text" v-model="username">
    </div>
    <div class="input">
      <img src="../assets/password.png">
      <input type="password" v-model="password">
    </div>
    <div class="bb">
      <div id="btn1" class="btn" @click="login">登录</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username :"",
      password : ""
    }
  },
  methods:{
    login(){
      // 不能 加 data·
      var self = this
      this.$http.post('http://119.29.245.59/lib/auth/login',{
          "username":this.username,
          "password":this.password
        // axios将JavaScript对象序列化为JSON
      }).then(function(res){
        console.log(res.data.data.token);
        localStorage.clear()
        var token = window.localStorage.setItem('token',res.data.data.token)
        var userId = window.localStorage.setItem('userId',res.data.data.userId)
          if(self.username=="hhjian"&&self.password=="123456"){
            self.$router.push({path : "/manager"})
          }else{
            self.$router.push({path :"/manager1"})
          }

      }).catch(function(error){
        // console.log(error);
        alert("用户名或者密码错误")
      })
    }
  }


};
</script>

<style scoped>
#bo {
  background-color: #86c9f3;
  width: 100%;
  height: 1742px;
  font-size: 50px;
}
body {
  background-color: #86c9f3;
  
  font-size: 50px;
}
#img2{
  width: 30%;
  margin-left: 37%;
  margin-top: 50px;
}
#img1 {
  width: 30%;
  margin-left: 60%;
}
#img {
  width: 80%;
  margin: 0 10%;
}
.inner {
  margin-top: 200px;
}
.input {
  width: 70%;
  margin: 50px 15% 0;
}
.input > img {
  float: left;
}
.line{
  text-align:center;
  margin-top: 100px;
  color: #ffffff;
}
.bb{
  text-align: center;
  color: #ffffff ;
  
  font-size:60px; 
  
}
.btn{
  width: 30%;
  /* background-color: #c4e7f2; */
  float: left;
  margin: 100px 35%;
  height: 100px;
  line-height: 100px;
  border-radius: 20px;
  border: 1px #00bff3 solid;
}

.input > input {
  width: 80%;
  height: 100px;
  border: none;
  /* background-color: transparent; */
  outline: none;
  font-size: 40px;
  line-height: 100px;
  margin-left: 10px;
  padding-left: 5px;
}
</style>
