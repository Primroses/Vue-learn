<template>
  <div>
    <img src="../assets/logo5.png" id="img">
    <div class="">
      <img src="../assets/smalllogo2.png" id="img1">
    </div>
    <div id="">
      <img src="../assets/client.png" id="img2">
    </div>
    <div class="inner">
    <div class="input">
      <img src="../assets/user.png">
      <input type="text" v-model="username" placeholder="请输入用户名">
    </div>
    <div class="input">
      <img src="../assets/password.png">
      <input type="password" v-model="password" placeholder="请输入密码">
    </div>
    <div class="input">
        <img src="../assets/phone.png">
        <input type="text" v-model="phone" placeholder="请输入电话号码">
    </div>
    <div class="input">
        <img src="../assets/nickname.png">
        <input type="text" v-model="nickname" placeholder="请输入昵称">
    </div>
    <div class="bb">
      <div id="btn1" class="btn" @click="login">确认注册</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username :"",
      password : "",
      phone : "",
      nickname : ""
    }
  },
  methods:{
    login(){
      // 不能 加 data·
      var self = this
      this.$http.post('http://119.29.245.59/lib/auth/register',{
          "username":this.username,
          "password":this.password,
          "phone":this.phone,
          "nickname":this.nickname
        // axios将JavaScript对象序列化为JSON
      }).then(function(res){
        console.log(res.data.errmsg);
        if(res.data.errmsg == 'ok'){
          alert('注册成功')
          this.$router.push({path :'/login'})
        }
        // var token = window.localStorage.setItem('token',res.data.data.token)

      }).catch(function(error){
        console.log(error);
      })
    }
  }


};
</script>

<style scoped>
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
  margin-top: 130px;
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
