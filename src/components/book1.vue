<template>
  <div>
      <head-nav></head-nav>
      <div class="content7">
      <template>
        <el-row class="booklist" v-for="item in data" :key="item.id">
            <router-link :to="{ path: '/bookdetail3?'+item.isbn }" child-msg="false">
            <div class="left">
               <img :src="item.coverUrl">
           </div>
            <div class="right">
                <div class="top">
                    <p>书名: {{ item.title }}</p>
                    <p>分类: {{ item.bookrackId }}</p>
                    <!-- <p>状态: {{ item.status }}</p> -->
                    <p>作者: {{ item.author }}</p>
                </div>
                <div class="bottom"></div>
            </div>
            </router-link>
       </el-row>
        </template>
        <div class="btn"><router-link :to="{ path: '/book1/addbook1' }">添加图书</router-link></div>
    </div>
      <index></index>
  </div>
</template>
<script>
import index from "./index1";
import headNav from "./header";
export default {
  components: { index, headNav },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.request();
  },
  methods: {
    request() {
      var self = this;
      this.$http
        .get("http://119.29.245.59/lib/books/list?page=1")
        .then(function(res) {
          console.log(res.data);
          self.data = " ";
          self.data = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
  }
};
</script>
<style lang="less" socped>
.booklist {
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px solid #000;
  .left {
    width: 30%;
    float: left;
    img {
      width: 50%;
      margin: 0 25%;
    }
  }
  .right {
    width: 70%;
    float: left;
    .top {
      font-size: 40px;
      p {
        margin-top: 20px;
      }
    }
  }
}
.content7{
  overflow: scroll;
  height: 1100px;
}
.content7::-webkit-scrollbar{
  display: none;
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
.btn1 {
  width: 20%;
  margin: 0 0 0 60%;
  text-align: center;
  font-size: 30px;
  padding: 15px;
  // height: 50px;
  // line-height: 50px;
  color: #ffffff;
  background-color: red;
  padding: 15px;
}
</style>
