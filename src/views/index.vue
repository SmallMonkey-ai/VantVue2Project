<template>
  <div id="app">
    <div>
      <div class="fixHeader" ref="fixHeader">
        <div class="logoAndTitle">
          <img src="../assets/Logo.png" alt="">
          <span>汇正数据报表系统</span>
        </div>
        <div class="menu">
          <ul v-for="(item, index) in menuList" :key="index">
            <li @click="openCurrentMenu(item, index)" :class="currentIndex == index ? 'focusMenu' : ''">{{  item.menuName 
              }}
            </li>
          </ul>
        </div>
      </div>
      <div class="menuBody" :style="{ top: computeTitleHeight }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Overlay, Loading } from 'vant';
Vue.use(Overlay).use(Loading);
import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      loading: true,
      currentIndex: 0,
      menuList: [
        { menuName: '运营管理', path: '/management' },
        { menuName: '销售', path: '/sale' },
        { menuName: '策划', path: '/plan' },
        { menuName: '推广', path: '/extension' },
        { menuName: '财务', path: '/finance' },
        { menuName: '客诉', path: '/complain' },
        { menuName: '综管', path: '/allCharge' },
      ],
      titleHeight: 0,
    };

  },
  created() {
    // this.getCorpId() //钉钉授权
    this.$watermark.set('水印水印');
  },
  mounted() {
    this.$router.push(this.menuList[this.currentIndex].path)
    setTimeout(() => {
      this.loading = false
      this.getTitleHeight()
    }, 2000)
  },
  methods: {
    getTitleHeight() {
      this.titleHeight = this.$refs.fixHeader.offsetHeight
    },
    getCorpId() {
      if (dd.env.platform !== "notInDingTalk") {
        this.$api.getCorpId().then(res => {
          if (res.status == 0) {
            let Base64 = require("js-base64").Base64;
            let crop_id = Base64.decode(res.data);
            this.login(crop_id);
          } else {
            alert(res.error);
          }
        });
      } else {
        alert("请用钉钉工作台中打开此应用。");
      }
    },
    login(crop_id) {
      let corpId = crop_id;
      dd.ready(() => {
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: info => {
            let code = info.code; // 通过该免登授权码可以获取用户身份
            this.autoLogin(code);
          },
          onFail: err => {
            console.log("钉钉接口出错：", err);
            dd.device.notification.alert({
              message: "钉钉免密登录失败",
              title: "提示",
              buttonName: "确定"
            });
          }
        });
      });
    },
    // 钉钉授权码获取
    autoLogin(authCode) {
      var parm = {};
      parm.ac = authCode + "";
      parm.version = "1.0";
      this.$api.getDdCode(parm).then(res => {
        if (res.status == 0) {
          let info = {};
          info.name = res.name;
          info.ou = res.ou;
          info.id = res.organization;
          info.username = res.username;
          info.title = res.title;
          console.log('2222222222222222222', res)
          window.localStorage.setItem("info", JSON.stringify(info));
          window.localStorage.setItem("token", res.token);
          window.localStorage.setItem("channelIds", JSON.stringify(res.channelIds));
          window.localStorage.setItem("route", JSON.stringify(res.route));
          window.localStorage.setItem("userId", res.uid);
          let menu = res.menu;
          if (menu.length == 0) {
            alert("您没有权限访问该系统，请向IT中心申请权限！");
          } else {
            window.localStorage.setItem("menu", res.menu);
            this.$router.push({ path: "/welcome" });
          }
        } else {
          alert("钉钉免密登录失败");
        }
      });
    },
    openCurrentMenu(item, index) {
      this.currentIndex = index
      this.$router.push(item.path)
    }
  },
  computed: {
    computeTitleHeight() {
      return this.titleHeight ? this.titleHeight / 16 + 'rem' : '6rem'
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
  word-break: break-all;
  color: #333;
  display: flex;
  flex-direction: column;
}

.t-c {
  text-align: center;
}
</style>
<style lang="scss" scoped>
.gm-skeleton {
  background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%) !important;
  background-color: transparent !important;
  background-size: 400% 100%;
  animation: skeleton-loading 1.5s ease-in infinite;
  min-height: .3rem;
  min-width: 1rem;
}

@keyframes skeleton-loading {
  from {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

.van-overlay {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixHeader {
  width: 100vw;
  min-height: 5.5rem;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #0099FF;

  .logoAndTitle {

    display: flex;
    align-items: center;
    padding-left: 1.5rem;
    padding-top: 1rem;

    img {
      width: 2rem;
      height: 2rem
    }

    span {
      color: #0000A6;
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
        font-size: 0.8rem;
        color: #CCCCCC;
        padding-bottom: 5px;
      }
    }
  }
}

.menuBody {
  position: absolute;
  z-index: 1;
  // padding-top: 0.5rem;
  // top: 8rem;
  left: 0rem;
}

.focusMenu {
  color: #FFFFFF !important;
  border-bottom: 2px solid #ffffff;
}
</style>

