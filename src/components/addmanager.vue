<template>
  <div id="bo">

        <div class="input">
          <span>请输入密码</span>
          <input type="password" v-model="password"/> 
        </div>

        <div class="input">
          <span>请输入用户名</span>
          <input type="text" v-model="username"/> 
        </div>


        <div class="input">
          <span>请输入昵称</span>
          <input type="text" v-model="nickname"/> 
        </div>

        <div class="input">
          <span>请输入电话号码</span>
          <input type="text" v-model="phone"/> 
        </div>

      <div class="btn" @click="add">确认添加</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
      password: "",
      username: "",
      phone: ""
    };
  },
  methods: {
    add() {
        console.log(this.phone)
      this.$http("http://119.29.245.59/lib/admins/", {
        method:"post",
        data:{
        "username":this.username,
        "password":this.password,
        "nickname":this.nickname,
        "tel":this.phone
        },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },

        }).then(function(res){
          console.log(res.data)
      }).catch(function(err){
          console.log(err)
      })
    }
  }
};
</script>
<style lang="less" scoped>
#bo {
  margin-top: 50px;
}
.input {
  width: 70%;
  margin: 0 15%;
  font-size: 35px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  input {
    border: none;
    outline: none;
    width: 50%;
    height: 35px;
    border-bottom: 1px solid gray;
    font-size: 35px;
  }
}
.btn {
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
