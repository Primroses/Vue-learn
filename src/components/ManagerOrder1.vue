<template>
  <div id="bo">
    <headNav></headNav>
    <div class="head">
      <input type="text" placeholder="请输入你需要查询的orderId" v-model="orderId">
      <div class="btn3" @click="search">搜索</div>
    </div>
  
    <div class="content8">
    <template>
    <div class="ordercontent" v-for="item in data" :key="item.bookId">
      <p>订单ID:{{ item.orderId }}</p>
      <p v-if="item.gmtApply">申请时间:{{ item.gmtApply }}</p>
      <p v-else-if="item.gmtBorrow">借阅时间:{{ item.gmtBorrow }}</p>
      <p v-else>归还时间:{{ item.gmtReturn }}</p>
      <p v-if="item.status=='APPLY'">类型:正在申请</p>
      <p v-else-if="item.status=='CANCEL'">类型:已经取消</p>
      <p v-else-if="item.status=='BORROW'">类型:成功借阅</p>
      <p v-else>类型:成功归回</p>
      <p>书名:{{ item.title }}</p>
      <div class="btn1" v-if="item.status=='APPLY'" @click="borrow($event)" :id="item.orderId">确认借阅</div>
      <div class="btn1" v-if="item.status=='BORROW'" @click="return1($event)" :id="item.orderId">确认归还</div>
    </div>
    </template>
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
      data: [],
      orderId: ""
    };
  },
  created() {
    this.request();
  },
  methods: {
    request() {
      let self = this;
      this.$http("http://119.29.245.59/lib/admins/orders/list?page=1", {
        // "put 还是需要写method？稳点？"
        method: "put",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          self.data = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    search() {
      let self = this;
      this.$http(
        "http://119.29.245.59/lib/admins/orders/list?orderId=" +
          this.orderId +
          "&page=1",
        {
          // "put 还是需要写method？稳点？"
          method: "put",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(res) {
          console.log(res.data.data);
          self.data = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    borrow(e) {
      let el = e.target;
      this.$http(
        "http://119.29.245.59/lib/admins/" +
          localStorage.getItem("userId") +
          "/orders/" +
          el.id +
          "/borrow",
        {
          // "put 还是需要写method？稳点？"
          method: "put",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(res) {
          console.log(res.data);
          if (res.data.errmsg === "ok") {
            alert("借阅成功");
          } else {
            alert("借阅失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    return1(e) {
      let el = e.target;
      this.$http(
        "http://119.29.245.59/lib/admins/" +
          localStorage.getItem("userId") +
          "/orders/" +
          el.id +
          "/return",
        {
          // "put 还是需要写method？稳点？"
          method: "put",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(res) {
          console.log(res.data);
          if (res.data.errmsg === "ok") {
            alert("归还成功");
          } else {
            alert("归还失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  deactivated() {
    this.$destroy(true);
  }
};
</script>
<style lang="less" socped>
#bo {
  height: 10%;
}
.head {
  height: 150px;
  ::after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  input {
    width: 40%;
    height: 50px;
    font-size: 30px;
    margin-left: 24%;
    margin-top: 5%;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    float: left;
  }
  .btn3 {
    float: left;
    margin-top: 5%;
    font-size: 40px;
    margin-left: 4%;
    width: 10%;
    text-align: center;
    background-color: #86c9f3;
    height: 53px;
    line-height: 53px;
    color: white;
  }
}
.content8 {
  overflow: scroll;
  height: 1100px;
}
.content8::-webkit-scrollbar{
  display:none;
}
.ordercontent {
  border: 1px solid gray;
  width: 70%;
  margin: 30px 15%;
  padding: 15px;
  font-size: 40px;
  p {
    margin-top: 20px;
  }
  p:nth-child(1) {
    margin-top: 0;
  }
}
.btn1 {
  width: 30%;
  margin: 20px 35%;
  text-align: center;
  color: #ffffff;
  background-color: red;
  height: 50px;
  line-height: 50px;
}
</style>
