<template>
  <div>
      <head-nav></head-nav>
        <div class="content">
            <div class="head">添加图书</div>

        <div class="input">
          <span>请输入isbn码</span>
          <input type="text" v-model="isbn"/> 
        </div>

        <div class="input">
          <span>请输入类型</span>
          <input type="text" v-model="classify"/> 
        </div>

        <div class="input">
          <span>请输入书架号</span>
          <input type="text" v-model="bookrackId"/> 
        </div>

        <div class="btn" @click="upload">确认添加</div>

        </div>

      <index></index>
  </div>
</template>
<script>
import index from "./index1";
import headNav from "./header";
export default {
  components: { index, headNav },
  data(){
      return{
        "isbn":"",
        "classify":"",
        "bookrackId":""
      }
  },
  methods:{
      upload(){
        this.$http("http://119.29.245.59/lib/admins/books", {
        method:"post",
        data:{
            "isbn":this.isbn,
            "classify":this.classify,
            "bookrackId":this.bookrackId
        },
        headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
        },
        }
        ).then(function(res){
            console.log(res.data)
        }).catch(function(err){
            console.log(err)
        })

      }
  }
};
</script>
<style lang="less" scoped>
.content {
  overflow: scroll;
  height: 1360px;
}
.head{
    width: 30%;
    font-size: 40px;
    text-align: center;
    margin: 20px 35%;
    padding: 15px;
    color:#86c9f3;
}
.input {
  width: 70%;
  margin: 0 15%;
  font-size: 35px;
  height: 130px;
  line-height: 100px;
  text-align: center;
  input {
    border: none;
    outline: none;
    width: 50%;
    height: 50px;
    border-bottom: 1px solid gray;
    font-size: 35px;
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
