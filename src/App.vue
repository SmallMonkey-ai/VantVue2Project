<template>
  <div id="app">
    <div class="fixHeader" ref="fixHeader">
      <div class="logoAndTitle">
        <img src="./assets/avatar.jpeg" alt="">
        <span>汇正数据报表系统</span>
      </div>
      <div class="menu">
        <ul v-for="(item, index) in menuList" :key="index">
          <li @click="openCurrentMenu(item, index)" :class="currentIndex == index ? 'focusMenu' : ''">{{ item.menuName
          }}
          </li>
        </ul>
      </div>
    </div>
    <div class="menuBody" :style="{ top: computeTitleHeight }">
      <router-view />
    </div>
    <van-overlay :show="show">
      <van-loading size="24px" text-color="#1989fa" color="#0094ff">
        加载中...
      </van-loading>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading, Overlay } from 'vant';
Vue.use(Loading).use(Overlay);
export default {
  data() {
    return {
      show: true,
      currentIndex: 0,
      menuList: [
        { menuName: '年报', path: '/yearReport' },
        { menuName: '销售', path: '/sale' },
        { menuName: '策划', path: '/plan' },
        { menuName: '推广', path: '/extension' },
        { menuName: '财务', path: '/finance' },
        { menuName: '客诉', path: '/customerComplain' },
        { menuName: '综管', path: '/allCharge' },
      ],
      titleHeight: 0,
    };

  },
  created() { 
    this.$watermark.set('水印水印')
  },
  mounted() {
    this.titleHeight = this.$refs.fixHeader.offsetHeight;
    setTimeout(() => {
      this.show = false;
    }, 500)
  },
  methods: {
    openCurrentMenu(item, index) {
      this.currentIndex = index
      this.$router.push(item.path)
    }
  },
  computed: {
    computeTitleHeight() {
      return this.titleHeight + 'px'
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
}

img {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

body {
  background: #edf0f8;
}

#app {
  position: relative;
  /* max-width: 750px; */
  min-height: 100vh;
  margin: auto;
  font-size: 16px;
  word-break: break-all;
  color: #333;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
}

.t-c {
  text-align: center;
}
</style>
<style lang="scss" scoped>
.van-overlay {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixHeader {
  width: 100vw;
  min-height: 6rem;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgb(67, 140, 189);

  .logoAndTitle {

    display: flex;
    align-items: center;
    padding-left: 1.5rem;
    padding-top: 1rem;

    img {
      width: 3rem;
      height: 3rem
    }

    span {
      font-size: 1.5rem;
    }
  }

  .menu {
    padding-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;

    ul {
      li {
        margin-right: 0.5rem;
        cursor: pointer;
      }
    }
  }
}

.menuBody {
  position: absolute;
  z-index: 1;
  padding-top: 0.5rem;
  // top: 8rem;
  left: 0rem;

}

.focusMenu {
  color: aquamarine;
}
</style>

