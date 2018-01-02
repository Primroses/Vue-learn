<template>
  <div id="bo">
      <div class="" >
          <img src="../assets/logo5.png" id="img1">
      </div>
      <div class="">
          <img src="../assets/welcome.png" id="img2">
      </div>
      <div class="bb">
          <div class="btn3"><router-link :to="{ path: 'login' }">用户</router-link></div>
          <div class="btn3"><router-link :to="{ path: 'loginManager' }">管理员</router-link></div>
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#bo {
  background-color: #86c9f3;
  width: 100%;
  height: 1742px;
  /* background-color: black; */
  font-size: 50px;
}
#img1 {
  width: 80%;
  margin: 0 10%;
}
#img2 {
  width: 80%;
  margin: 25% 10%;
}
.bb {
  text-align: center;
  color: #ffffff;
  font-size: 60px;
}
.btn3 {
  width: 29%;
  /* background-color: #c4e7f2; */
  float: left;
  margin: 100px 10%;
  height: 100px;
  line-height: 100px;
  border-radius: 20px;
  border: 1px #00bff3 solid;
}
</style>
