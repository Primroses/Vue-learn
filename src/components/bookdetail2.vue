<template>
  <div>

      <head-nav></head-nav>

      <div class="bookdetail">
        <div class="header">
            书籍详情
        </div> 
        <div class="content6">  
            <div class="img">
                <img :src="data.coverUrl">
            </div>
            <p>
                <span>书名</span><span>{{ data.title }}</span>
            </p>
            <p>
                <span>作者:</span><span>{{ data.author }}</span>
            </p>
            <p>
                <span>出版社:</span><span>{{ data.publisher }}</span>
            </p>
            <p>
                <span>出版日期:</span><span>{{ data.pubdate }}</span>
            </p>
            <p>
                <span>分类:</span><span>{{ data.bookrackId }}</span>
            </p>
            <p>
                <span>状态:</span><span>{{ data.status }}</span>
            </p>
            <p>
                <span>总量:</span><span>{{ data.totalNum }}</span>
                
            </p>
            <p>
               <span>在管量:</span><span>{{ data.currentNum }}</span>
            </p>
        </div>   
      </div>  
      <index></index>
  </div>
</template>
<script>
import index from "./index";
import headNav from "./header";
export default {
  components: { index, headNav },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.request();
  },
  methods: {
    request() {
      var isbn = window.location.href;
      isbn = isbn.split("?")[1];

      var self = this;
      this.$http
        .get("http://119.29.245.59/lib/books/isbn/" + isbn)
        .then(function(res) {
          console.log(res.data.data.currentNum);
          self.data = res.data.data;
        })
        .catch(function(err) {
          console.log(res.errmsg);
        });
    },
    bro() {
      var isbn = window.location.href;
      isbn = isbn.split("?")[1];
      console.log(isbn);
      this.$http(
          "http://119.29.245.59/lib/users/" +localStorage.getItem("userId") +"/books/" +isbn,
          {
              // "put 还是需要写method？稳点？"
            method:"put",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(function(res) {
          console.log(res.data);
          if(res.data.errmsg=="ok"){
              alert("借阅成功")
          }else{
              alert("借阅失败")
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  // 页面数据不保存 可以多次请求
  deactivated() {
    this.$destroy(true);
  }
};
</script>
<style lang ="less" scoped>

.bookdetail {
  .header {
    width: 80%;
    font-size: 50px;
    padding: 30px 5%;
    text-align: center;
    color: #86c9f3;
    .btn {
      float: left;
      /* border: 1px solid #000; */
      color: #fff;
      background-color: #86c9f3;
      padding: 10px;
      border-radius: 10%;
    }
  }
}
.content6 {
  .img {
    width: 100%;
    img {
      width: 20%;
      margin: 0 40%;
    }
  }
  p {
    font-size: 40px;
    margin-top: 30px;
    /* padding-left: 20%; */
    height: 50px;
    span {
      float: left;
      display: block;
      margin-top: 30px;
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
#btn {
  color: #fff;
  background-color: #86c9f3;
  padding: 10px;
  border-radius: 10%;
  width: 30%;
  margin: 60px 35% 0;
  font-size: 50px;
  text-align: center;
}
#btn.gray {
  background-color: gray;
}
</style>
