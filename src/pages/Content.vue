<template>
  <div class="content">
    <div
      class="backToHome"
      @click="config.backToHome"
    >
      主页
    </div>
    <div
      class="view"
      :style="'height: calc(100% - '+ divide.height+ 'px);'  "
    >
      <router-view v-slot="{Component}">
        <transition enter-active-class="animate__animated animate__fadeInUp">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div
      :class="'divide pointer unselectable ' + (divide.reverse ? 'divideReverse'  : '')"
      :style="'bottom: ' + (divide.height - 20 )+ 'px;'"
      @mousedown.stop="divide.mouseDown"
      @mousemove.stop="divide.mouseMove"
      @mouseup.stop="divide.mouseup"
    >
      <el-icon size="35px">
        <SemiSelect />
      </el-icon>
    </div>
    <div
      :class="'bottom ' + (divide.waterFall ? 'bottomWaterFall' : '')"
      :style="('height: ' + divide.height + 'px;')"
    >
      <!-- 关于 -->
      <router-link
        to="/Introduce"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          关于
        </div>
        <img
          src="../assets/image/type/introduce.svg"
          style="padding: 20px; box-shadow: none;"
        >
        <div class="filter"></div>
      </router-link>
      <!-- 简单数字识别 -->
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          简单数字识别
        </div>
        <img
          src="../assets/image/type/mnist.png"
          alt=""
        >
        <div class="filter"></div>
      </router-link>
      <!-- 简单图片识别 -->
      <router-link
        to="/CIFAR"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          简单图片识别
        </div>
        <img
          src="../assets/image/type/cifar.png"
          alt=""
        >
        <div class="filter"></div>
      </router-link>
      <!-- 藏头诗 -->
      <router-link
        to="/AcrosticPoetry"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          藏头诗
        </div>
        <img
          src="../assets/image/type/cts.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <!-- 小说生成器 -->
      <router-link
        to="/Novel"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          小说生成器
        </div>
        <img
          src="../assets/image/type/xs.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <!-- 图片去雾 -->
      <router-link
        to="/PictureDefogging"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          图片去雾
        </div>
        <img
          src="../assets/image/type/tpqw.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <!-- 图片超分辨率 -->
      <router-link
        to="/PictureSuperResolution"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          图片超分辨率
        </div>
        <img
          src="../assets/image/type/tpcfbl.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/TargetDetection"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          目标检测
        </div>
        <img
          src="../assets/image/type/mbjc.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/SemanticSegmentation"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          语义分割
        </div>
        <img
          src="../assets/image/type/yuyifenge.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/InstanceSegmentation"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          实例分割
        </div>
        <img
          src="../assets/image/type/slfg.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/PanoramicSegmentation"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          全景分割
        </div>
        <img
          src="../assets/image/type/qjfg.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>

    </div>
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps(["page"]);
const emits = defineEmits(["update:page"]);

var config = reactive({
  // 返回主页
  backToHome: () => {
    proxy.$emit("update:page", 0);
  },
});

// 子界面索引
var index = reactive([
  "关于",
  "手写体识别",
  "藏头诗",
  "AI小说",
  "图片去雾",
  "图片超分辨率",
]);

//下方拖动条
var divide = reactive({
  isMouseDown: false,
  height: 220, //高度
  reverse: false, //图标是否翻转
  waterFall: false, //是否以瀑布流显示
  mouseDown: (e) => {
    divide.isMouseDown = true;
  },
  mouseMove: (e) => {
    if (!divide.isMouseDown) return;
    divide.height = Math.min(
      window.innerHeight,
      window.innerHeight - e.clientY
    );
    if (Math.abs(window.innerHeight - divide.height) < 5) {
      // 比较靠近顶部
      divide.reverse = true;
    } else {
      // 还原
      divide.reverse = false;
    }

    if (Math.abs(5 - divide.height) < 50) {
      divide.height = Math.max(0, window.innerHeight - e.clientY);
    }

    if (divide.height > 300) {
      divide.waterFall = true;
    } else {
      divide.waterFall = false;
    }
  },
  mouseup: (e) => {
    if (!divide.isMouseDown) return;
    divide.isMouseDown = false;
  },
});

onMounted(() => {
  //在这里绑定到全局的原因是小滑块面积太小，比较容易触发梨块滑块事件
  window.addEventListener("mousemove", divide.mouseMove);
  window.addEventListener("mouseup", divide.mouseup);
});
</script>

<style lang='scss' scoped>
$bottom_height: 220px;
$bottom_item_height: $bottom_height - 40px;
$bottom_img: $bottom_item_height - 40px - 2 * 10px;
.content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: none;

  > .backToHome {
    position: absolute;
    top: 0;
    left: 0;
    font-size: $fontSize7;
    font-weight: 600;
    letter-spacing: 2px;
    transition-duration: 400ms;
    background-color: #cdcdcd;
    box-sizing: border-box;
    padding: 10px 40px;
    border-right: 8px solid #cdcdcd;
    opacity: 0.34;
    z-index: 10;

    &:hover {
      opacity: 1;
      padding: 10px 60px;
      border-right: 8px solid #ff3300;
      background-color: #d9d9d9;
    }
  }

  > .view {
    height: calc(100vh - $bottom_height);
    width: 100%;
    @include fill_color("fill4");
  }

  > .divide {
    width: 120px;
    height: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    @include fill_color("fill12");
    bottom: 320px;
    right: calc(50% - 60px);
    z-index: 2;
    transition: translate border 300ms;
    transform: translateY(-20px);
  }

  // 翻转
  > .divideReverse {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transform: translateY(10px);
  }

  > .bottom {
    position: absolute;
    bottom: 0;
    @include fill_color("fill2");
    height: $bottom_height;
    width: 100%;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: center;
    transform: scaleY(-1);
    box-sizing: border-box;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      @include fill_color("fill12");
    }

    &::-webkit-scrollbar-track-piece {
      @include fill_color("fill51");
    }

    > .box {
      position: relative;
      height: $bottom_item_height;
      width: $bottom_item_height;
      margin: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      @include fill_color("fill1");
      flex-grow: 0;
      flex-shrink: 0;
      transform: scaleY(-1);
      transition: all 240ms;

      &:hover > img {
        filter: blur(0);
      }

      &:hover > .filter {
        opacity: 0;
      }

      &:hover {
        @include fill_color("fill13");
        transform: scale(1.05, -1.05);
      }

      > .filter {
        position: absolute;
        height: 100%;
        width: 100%;
        @include fill_color("fill1");
        z-index: 10;
        opacity: 0.5;
        transition-duration: 300ms;
      }

      > .title {
        height: 40px;
        line-height: 40px;
        font-size: $fontSize4;
        @include font_color("font2");
      }

      > img {
        box-sizing: border-box;
        height: $bottom_img;
        width: $bottom_img;
        filter: blur(2px);
        border-radius: 10px;
        transition-duration: 400ms;
      }
    }

    > .selectedBox {
      position: relative;
      height: $bottom_item_height;
      width: $bottom_item_height;
      margin: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      @include fill_color("fill14");
      flex-grow: 0;
      flex-shrink: 0;

      > .filter {
        opacity: 0.2;
      }

      > img {
        box-sizing: border-box;
        height: $bottom_img;
        width: $bottom_img;
        filter: blur(1px);
        border-radius: 10px;
        transition-duration: 400ms;
      }
    }
  }

  > .bottomWaterFall {
    flex-wrap: wrap-reverse;
    justify-content: flex-start;
  }
}
</style>