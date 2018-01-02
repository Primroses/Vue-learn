<template>
    <div>
        <!-- 尾部 -->
    <el-row class="footer">
        <template v-for="(item,index) in icons">
            <router-link :to="{path:'/'+ item.value}" class="navItems">
                <div class="bottom_nav_icon" :class="'icon_'+index"></div>
                <div class="bottom_nav_text">{{item.name }}</div>
            </router-link>
        </template>
    </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      icons: [
        {
          value: "home",
          name: "主页"
        },
        {
          value: "order",
          name: "订单信息"
        },
        {
          value: "user",
          name: "用户信息"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.footer {
  border-top: 1px solid #000;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  text-align: center;
  font-size: 10px;
  overflow: hidden;
  z-index: 1000;
  opacity: 1;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
  height: 160px;
  .navItems {
    display: block;
    float: left;
    width: 33%;
    height: 200px;
    color: #999;
    padding-top: 5px;
    .bottom_nav_icon {
      height: 57%;
      margin: 0 auto;
    }
    .icon_0 {
      background: url(../assets/home1.png) no-repeat center center;
      background-size: 20%;
    }
    .icon_1 {
      background: url(../assets/order1.png) no-repeat center center;
      background-size: 20%;
    }
    .icon_2 {
      background: url(../assets/user1.png) no-repeat center center;
      background-size: 20%;
    }
    .bottom_nav_text {
      height: 43%;
      font-size: 2rem;
    }
  }
  .router-link-active {
    color: #86c9f3;
    .icon_0 {
      background: url(../assets/home.png) no-repeat center center;
      background-size: 20%;
    }
    .icon_1 {
      background: url(../assets/order.png) no-repeat center center;
      background-size: 20%;
    }
    .icon_2 {
      background: url(../assets/user2.png) no-repeat center center;
      background-size: 20%;
    }
  }
}
</style>
