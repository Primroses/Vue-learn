<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
            <a :href="slides[nowIndex].href">
                <transition name="slide-trans">
                    <img v-if="isShow" :src="slides[nowIndex].src">
                </transition>
                <transition name="slide-trans-old">
                    <img v-if="!isShow" :src="slides[nowIndex].src">
                </transition>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      nowIndex: 0,
      isShow: true
    };
  },
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 1000);
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv() {
      clearInterval(this.invId);
    }
  },
  mounted() {
    this.runInv();
  }
};
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all 0.5s;
}

.slide-trans-enter {
  /* transform: translateX(900px);  */
  opacity: 1;
}

.slide-trans-old-leave-active {
  transition: all 0.5s;
  /* transform: translateX();  */
  opacity: 0;
}

.slide-show {
  position: relative;
  /* margin: 15px 15px 15px 0; */
  width: 100%;
  height: 330px;
  overflow: hidden;
  font-size: 36px;
}

.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: 0.5;
  bottom: 0;
  /* margin-top:10%; */
  height: 50px;
  /* text-align: left; */
  /* padding-left: 15px; */
}

.slide-img {
  width: 100%;
}

.slide-img img {
  width: 100%;
  position: absolute;
  /* margin: 0 25%; */
}

.slide-pages {
  position: absolute;
  bottom: 10px;
  /* right: 37%; */
  width: 80%;
  margin: 0 10%;
}

.slide-pages li {
  display: inline-block;
  /* padding: 0 10px; */
  cursor: pointer;
  color: #000;
  width: 19%;
  text-align: center;
}

.slide-pages li .on {
  /* background-color: red */
  color: #fff;
}
.slide-pages li a {
  display: block;
  width: 50%;
  margin: 0 25%;
  height: 10%;
  /* background-color: #000; */
  /* opacity: .5; */
  border-radius: 20%;
}
#text {
  position: absolute;
  top: 148px;
  height: 50px;
  border-radius: 30px;
  left: 10%;
  width: 50%;
  z-index: 9999;
  font-size: 36px;
  padding: 0 16%;
  line-height: 50px;
}
</style>

