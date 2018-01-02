<template>
  <div>
      <div class="header">
          <div class="btnbg" @click="menu">
            <img src="../assets/button.png">
          </div>
          <div class="logo">
              <img src="../assets/library.png" id="library">
              <img src="../assets/smalllogo2.png" id="small">
          </div>
      </div>
  </div>
</template>
<script>
export default {
  methods:{
      menu(){
          
      }
  }
}
</script>
<style lang='less' scoped>
    .header{
        .btnbg{
            background-color: #5CACEE; 
            position:fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        img{
             width: 7%;
            margin: 2% 0 1% 4%;
            }
        }


    }

    .logo{
        background-color:  #86c9f3;
        padding-left: 30%;
        margin-top: 100px;
        #library{
            width: 14%;    
        }
        #small{
            width: 40%;
        }
    }
</style>
