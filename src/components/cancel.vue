<template>
  <div >
      <div class="ordercontent1">
        <div class="order">
          <template>
            <div class="border" v-for="(item,key) in data">
            <div class="head">
              <p>订单{{ key+1 }}</p>
              <p v-if="item.status=='CANCEL'">订单:已经取消</p>
          </div>
          <div class="content4">
            <p>书名:{{ item.title }}</p>
            <p>订单id:{{ item.orderId }}</p>
            <p>isbn:{{ item.isbn }}</p>
            <p>取消时间:{{ item.gmtApply }}</p>
          </div>
          <div class="btn4" @click="cancel($event)" :id="item.orderId ">重新借阅</div>
            </div>
          </template>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
    return{
      data:[],
    }
  },
  created(){
    this.request()
  },
  methods:{
    request(){
      var self = this
      this.$http
        .get(
          "http://119.29.245.59/lib/users/"+localStorage.getItem("userId")+"/orders/list?status=CANCEL&page=1",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(function(res) {
          console.log(res.data);
          self.data = res.data.data
        })
        .catch(function(err) {});
    },
    cancel(e){
      let el = e.target ;
      this.$http(
        "http://119.29.245.59/lib/users/"+localStorage.getItem("userId")+"/orders/"+el.id
      ,{
        method:"put",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(function(res){
        alert(res.data.errmsg)
      }).catch(function(err){
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ordercontent1{
  width: 80%;
  margin: 120px 10% 0 10%;
  font-size: 50px;
  ::after{
      content: "\0020";
      display: block;
      height: 0;
      clear: both;
    }
  .order{
    overflow: scroll;
    height: 1000px;
    ::after{
      content: "\0020";
      display: block;
      height: 0;
      clear: both;
    }
    .order::-webkit-scrollbar {
      display: none;
    }
    .btn4{
      width: 30%;
      color: white;
      font-size: 40px;
      text-align: center;
      background-color: #86c9f3;
      position: absolute;
      top: 340px;
      right: 0;
      text-align: center;
      line-height: 60px;
    }
    .border{
      margin-top: 50px;
      position: relative;
    }
    ::after{
      content: "\0020";
      display: block;
      height: 0;
      clear: both;
    }
    .head{
        p:nth-child(1){
          font-weight: bold;
          float: left;
      }
        p:nth-child(2){
          font-size: 30px;
          float: right;
          margin-top: 20px;
        }
    }
  }
  .content4{
    p{
      margin-left: 20px;
      font-size: 35px;
      height: 100px;
      line-height: 60px;
      word-wrap: break-word;
    }
  }
}

</style>
