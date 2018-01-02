<template>
  <div id="bo">
      <!-- 头部 -->
      <head-nav></head-nav>
      <!-- 轮播图 -->
      <slider :slides="slides" :inv="invTime"></slider>
       <!-- 图书介绍 -->
       <div class="line"></div>
      <div class="content4">
                <template>
        <el-row class="booklist" v-for="item in data" :key="item.id">
            <router-link :to="{ path: '/bookdetail?'+item.isbn }">
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
      </div>
      <!-- 尾部导航 -->
      <index></index>
  </div>
</template>
<script>
import index from "./Userindex";
import headNav from "./header";
import slider from "./sliderShow";
export default {
  components: { index, headNav, slider },
  data() {
    return {
      slides: [
        {
          src: require("../assets/bannerr1.jpg"),
          href: "/home"
        },
        {
          src: require("../assets/bannerr2.jpg"),
          href: "/home"
        },
        {
          src: require("../assets/bannerr3.jpg"),
          href: "/home"
        },
      ],
      invTime: 2000,
      data :[],
    };
  },
    created(){
        this.request()
    },
    methods:{
      request() {
          var self = this
        this.$http
          .get(
            "http://119.29.245.59/lib/books/list?page=1",
          )
          .then(function(res) {
            console.log(res.data);
            self.data = " "
            self.data = res.data.data
          })
          .catch(function(err) {
              console.log(err);
          });
      }
    }
};
</script>
<style lang="less" scoped>
#bo{
    overflow: scroll;
    height: 1583px;
    position: relative;
}
#bo::-webkit-scrollbar {
      display: none;
    }
.line {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: #000;
}
.booklist {
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px solid #000;
  .left {
    width: 30%;
    float: left;
    img {
      width: 70%;
      margin: 0 15%;
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
.content4 {
  overflow: scroll;
  height: 900px;
}
</style>
