<template>
  <div>
    <!-- 主窗口 -->
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div v-if="!config.signin">
        <Nav v-model:signin="config.signin"></Nav>
        <div :class="'main ' + (config.page == 1 ? 'start' : '')">
          <!-- 主页 -->
          <div class="welcome">
            <!-- 背景 -->
            <ThreeJsBCG class="bcg"></ThreeJsBCG>
            <!-- 文字 -->
            <div class="layer unselectable">
              <div class="title">智能云服务</div>
              <div
                class="text"
                style="transition-delay: 100ms"
              >
                机器学习
              </div>
              <div
                class="text"
                style="transition-delay: 200ms"
              >
                为您提供深度学习经典案例
              </div>
              <div
                class="text"
                style="transition-delay: 300ms"
              >
                详细说明文档帮助您实现案例
              </div>
            </div>
            <!-- 弹幕 -->
            <div
              class="bulletScreen"
              v-if="bulletScreen.show"
            >
              <div
                class="text"
                :style="'right:' + item.process  + '%; top:' + item.height + '%; font-size: ' + item.size +'px;'"
                v-for="(item, index) in bulletScreen.activeData"
              >
                {{(item.text)}}
              </div>
            </div>
            <!-- 弹幕列表 -->
            <transition
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutLeft"
            >
              <div
                class="bulletScreenList"
                v-if="bulletScreen.showList"
              >
                <div
                  class="item"
                  v-for="(item, index) in bulletScreen.bufferedData"
                >
                  {{item.text}}
                </div>
              </div>
            </transition>
            <!-- 弹幕功能 -->
            <div class="bulletScreenOpt">
              <div
                class="btn pointer"
                @click="bulletScreen.bulletScreenOption"
              >
                {{ bulletScreen.show ? "关闭弹幕" : "开启弹幕"}}
              </div>
              <div
                class="btn pointer"
                @click="bulletScreen.bulletScreenList"
              >
                弹幕列表
              </div>
              <div class="input"><input
                  type="text"
                  maxlength="50"
                  v-model="bulletScreen.tempData"
                  @keypress.enter="bulletScreen.send"
                  :placeholder="'已装填' + bulletScreen.config.count + '条弹幕'"
                ></div>
              <div
                class="btn pointer"
                @click="bulletScreen.send"
              >
                发射
              </div>
            </div>
            <!-- 下方遮罩 -->
            <div class="filter"></div>
            <!-- 按钮 -->
            <div
              class="more pointer unselectable"
              @click="start"
            >
              开始
              <el-icon>
                <ArrowDown />
              </el-icon>
            </div>
          </div>
          <!-- 内容页 -->
          <div class="content">
            <Content v-model:page="config.page"></Content>
          </div>
        </div>
      </div>
    </transition>
    <!-- 登录窗口 -->
    <transition enter-active-class="animate__animated animate__fadeIn">
      <Signin
        v-show="config.signin"
        v-model:signin="config.signin"
      >
      </Signin>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, watch } from "vue";
import ThreeJsBCG from "./components/ThreeJsBCG.vue";
import Content from "./pages/Content.vue";
import Signin from "./components/Signin.vue";
import Nav from "./components/Nav.vue";
import { useThemeSwitchStore } from "./pinia/themeSwitch";
import { AuthBuffer } from "./utils/buffer";
import { useUserDataStore } from "./pinia/userData";
import getUtils from "./utils/registrationCenter";
const themeSwitch = useThemeSwitchStore();
const userData = useUserDataStore();
const { proxy } = getCurrentInstance() as any;

var config = reactive({
  page: 1, //当前页面
  signin: false, //是否进入登录页
  init: () => {
    themeSwitch.init(); //初始化主题
    IsPhone(); //提示非电脑端用户
    config.autoLogin(); //自动登录
    bulletScreen.start(); //初始化弹幕
  },
  //自动登录
  autoLogin: () => {
    //尝试从session恢复登录状态
    let data = AuthBuffer.getSessionUserInfo();
    if (data) {
      //说明数据没缺
      userData.signin(data.username);
      return;
    }
    //尝试通过token登录
    data = AuthBuffer.getUserInfo();
    let token = AuthBuffer.getToken();
    // console.log(data, token);
    if (token && data) {
      //通过token 登录
      let username = data.username;
      getUtils()
        .$post({
          url: "ics/auth/signinByToken",
          data: { username },
        })
        .then((res) => {
          // console.log(res);
          let data = res.data;
          if (data?.code == 0) {
            userData.signin(username);
            console.log("自动登录成功");
            return;
          }
          getUtils().stateCodeHandler(data);
        });
    } else {
      //清空登录数据
      AuthBuffer.clearLoginCredentials();
    }
  },
});

var bulletScreen = reactive({
  config: {
    timePushToActive: 8, //每40帧显示一个弹幕
    minLengthToPullData: 10, //当缓存区最低多少数据时要向后端请求
    count: 0, // 弹幕数据库总数
    page: 1, //弹幕页
    limit: 80, //单页弹幕数
  },
  show: true, // 显示弹幕
  showList: false, //显示弹幕列表
  tempData: "", // 我的弹幕
  bufferedData: [], // 缓存的弹幕
  activeData: [], // 正在显示
  // showedData: [], // 已经显示结束的弹幕
  timer: null, // 定时器
  keyFrame: 0,
  lastPullDataKeyFrame: -0xffffff, //最后一次拉取数据时间，防止频繁
  //数据库获取
  start: () => {
    // bulletScreen.pullData();
    bulletScreen.run();
  },
  //拉取数据
  pullData: () => {
    getUtils()
      .$get({
        url: "ics/bulletScreen/list",
        config: {
          params: {
            page: bulletScreen.config.page,
            limit: bulletScreen.config.limit,
          },
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          // console.log(data);
          bulletScreen.config.count = data.count;
          bulletScreen.bufferedData.unshift(...data.data);
        }
        getUtils().stateCodeHandler(data);
      });
  },
  //running buffer数据调度，数据拉取策略。
  run: () => {
    let that = bulletScreen;
    clearTimeout(that.timer);
    that.timer = setTimeout(() => {
      that.keyFrame += 1;
      //从缓存区装载弹幕
      if (
        that.keyFrame % bulletScreen.config.timePushToActive == 0 &&
        that.bufferedData.length != 0
      ) {
        let item = that.bufferedData.pop();
        let process = -item.text.length;
        let size = Math.random() * 8 + 14;
        that.activeData.push({
          text: item.text,
          process,
          height: Math.random() * 85 + 5,
          size,
        });
      }
      //移动
      that.move();
      //如果已经关闭，则暂停
      if (!that.show) {
        clearTimeout(that.timer);
        return;
      }
      //如果缓存弹幕不够则请求后端
      if (
        bulletScreen.bufferedData.length <
        bulletScreen.config.minLengthToPullData
      ) {
        if (
          bulletScreen.keyFrame - bulletScreen.lastPullDataKeyFrame >
          bulletScreen.config.timePushToActive * 3
        ) {
          bulletScreen.config.page++;
          bulletScreen.lastPullDataKeyFrame = bulletScreen.keyFrame;
          if (
            (bulletScreen.config.page - 1) * bulletScreen.config.limit >
            bulletScreen.config.count
          )
            bulletScreen.config.page = 1;
          bulletScreen.pullData();
        }
      }
      //递归
      that.run();
    }, 20);
  },
  //控制弹幕移动
  move: () => {
    for (let i = 0; i < bulletScreen.activeData.length; i++) {
      bulletScreen.activeData[i].process += 0.2;
      if (bulletScreen.activeData[i].process > 150) {
        let item = bulletScreen.activeData.splice(i, 1); //从展示区取出
        // bulletScreen.showedData.push(item);
      }
    }
  },
  // 弹幕操作
  bulletScreenOption: () => {
    bulletScreen.show = bulletScreen.show ? false : true;
    if (bulletScreen.show) {
      bulletScreen.run();
    }
  },
  // 弹幕列表
  bulletScreenList: () => {
    bulletScreen.showList = bulletScreen.showList ? false : true;
  },
  // 发送弹幕
  send: () => {
    if (!userData.isSignin) {
      //用户未登录
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    if (bulletScreen.tempData) {
      getUtils()
        .$post({
          url: "ics/bulletScreen/send",
          data: { username: userData.username, text: bulletScreen.tempData },
        })
        .then((res) => {
          let data = res.data;
          if (data?.code == 0) {
            getUtils().elNotification({
              title: "弹幕发射成功",
              type: "success",
            });
          }
          getUtils().stateCodeHandler(data);
        });

      //从顶部插入
      bulletScreen.bufferedData.push({
        text: bulletScreen.tempData,
        process: 0,
        height: 1,
      });
      bulletScreen.tempData = "";
    }
  },
});

//点击“开始”
function start() {
  config.page = 1;
  if (bulletScreen.show) {
    //暂停弹幕
    let tempT = setTimeout(() => {
      bulletScreen.bulletScreenOption();
      clearTimeout(tempT);
    }, 1000);
  }
}

function IsPhone() {
  //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
  var info = navigator.userAgent;
  //通过正则表达式的test方法判断是否包含“Mobile”字符串
  var isPhone = /mobile/i.test(info);
  //如果包含“Mobile”（是手机设备）则返回true
  if (isPhone) {
    getUtils().elMessage({
      message: "为了您的使用体验，推荐使用电脑端访问本网站",
      type: "warning",
    });
  }
}

onMounted(() => {
  config.init(); //页面初始化
});
</script>
  
<style lang="scss">
* {
  text-decoration: none;
  list-style: none;
}
html,
body,
#app {
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 100vw;
  overflow: hidden;
}
.pointer {
  cursor: pointer;
}

.unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

<style lang="scss" scoped>
@mixin scrollbar() {
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 14px;
    overflow: hidden;
    @include fill_color("fill2");
  }

  &::-webkit-scrollbar-thumb {
    @include fill_color("fill12");
  }

  &::-webkit-scrollbar-track {
    border-radius: 14px;
  }

  &::-webkit-scrollbar-track-piece {
    border-radius: 14px;
  }

  &::-webkit-scrollbar-button {
    border-radius: 14px;
    height: 0;
  }
}

.main {
  position: relative;
  width: 100%;
  transition-duration: 680ms;

  > .welcome {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;

    > .bcg {
      z-index: 1;
      height: 100vh;
    }

    > .layer {
      position: absolute;
      z-index: 20;
      box-sizing: border-box;
      padding-top: 100px;
      padding-bottom: 100px;
      top: 16vh;
      @include font_color("font3");

      &:hover .title {
        @include font_color("font1");
      }

      &:hover .text {
        @include font_color("fill31");
      }

      &:hover + .bulletScreen {
        @include font_color("font5");
      }

      > .title {
        text-align: center;
        font-weight: 600;
        letter-spacing: 6px;
        font-size: $fontSize15;
        transition-duration: 260ms;
        margin: 10px 0;
      }

      > .text {
        letter-spacing: 2px;
        font-size: $fontSize7;
        text-align: center;
        @include font_color("font4");
        transition-duration: 200ms;
      }
    }

    > .bulletScreen {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      @include font_color("font2");
      overflow: hidden;

      > .text {
        width: max-content;
        overflow: hidden;
        position: absolute;
        z-index: inherit;
        transition: color 400ms;
      }
    }

    > .bulletScreenOpt {
      position: absolute;
      top: 8px;
      z-index: 10;
      display: flex;
      @include fill_color("fill2");
      @include font_color("font1");
      font-size: $fontSize3;
      border-radius: 16px;
      @include box_shadow(0, 0, 3px, 2px, "border1");

      &:hover > .input {
        width: 400px;
      }

      > .btn {
        box-sizing: border-box;
        padding: 2px 10px;
        width: 60px;
        height: 44px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        @include fill_color("fill53");
        transition-duration: 200ms;

        &:hover {
          @include fill_color("fill12");
          @include font_color("font6");
        }
      }

      .btn:first-child {
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
      }
      .btn:last-child {
        border-top-right-radius: 14px;
        border-bottom-right-radius: 14px;
      }

      > .input {
        height: inherit;
        line-height: inherit;
        display: block;
        width: 260px;
        transition: width 200ms;

        > input {
          margin: 0;
          width: 100%;
          height: 100%;
          font-size: $fontSize5;
          box-sizing: border-box;
          outline: none;
          border-top: 2px solid;
          border-bottom: 2px solid;
          border-left: none;
          border-right: none;
          box-sizing: border-box;
          padding: 0 10px;
          @include font_color("font1");
          @include fill_color("fill52");
          @include border_color("fill53");
        }
      }
    }

    > .bulletScreenList {
      box-sizing: border-box;
      padding: 10px;
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 60px;
      width: 280px;
      z-index: 11;
      @include fill_color("fill1");
      display: flex;
      flex-direction: column-reverse;
      border-top-right-radius: 18px;
      border-bottom-right-radius: 18px;
      @include box_shadow(0, 0, 3px, 1px, "border1");
      overflow-x: hidden;

      @include scrollbar();

      > .item {
        width: max-content;
        min-width: 100%;
        @include font_color("font1");
        font-size: $fontSize3;
        word-wrap: break-word;

        &:hover {
          @include fill_color("fill12");
          @include font_color("font1");
        }
      }
    }

    > .more {
      position: absolute;
      z-index: 10;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $fontSize6;
      @include font_color("font3");
      transition-duration: 200ms;

      &:hover {
        @include font_color("font1");
      }
    }

    > .filter {
      height: 160px;
      width: 100vw;
      position: absolute;
      bottom: 0;
      left: 0;
      @include linear_gradient(to top, "fill12", "fill16");
      @include box_shadow(0, 0, 20px, 10px, "fill16");
      opacity: 0;
      z-index: 10;
      transition-duration: 360ms;

      &:hover {
        opacity: 0.45;
      }
    }
  }

  > .content {
    height: 100vh;
    width: 100%;
    @include fill_color("fill1");
  }
}

.start {
  transform: translateY(-100vh);
}
</style>