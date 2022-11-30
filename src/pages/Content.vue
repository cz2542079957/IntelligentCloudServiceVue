<template>
  <div class="content">
    <div
      class="backToHome"
      @click="config.backToHome"
    >
      主页
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <router-link
        to="/Introduce"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          关于
        </div>
        <img
          src="../assets/imgs/introduce.svg"
          style="padding: 20px; box-shadow: none;"
        >
        <div class="filter"></div>
      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          简单数字识别
        </div>
        <img
          src="../assets/imgs/mnist.png"
          alt=""
        >
        <div class="filter"></div>
      </router-link>

      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          简单图片识别
        </div>
        <img
          src="../assets/imgs/cifar.png"
          alt=""
        >
        <div class="filter"></div>
      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          目标检测
        </div>
        <img
          src="../assets/imgs/mbjc.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          语义分割
        </div>
        <img
          src="../assets/imgs/yuyifenge.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          实例分割
        </div>
        <img
          src="../assets/imgs/slfg.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          全景分割
        </div>
        <img
          src="../assets/imgs/qjfg.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          物体检测
        </div>
        <img
          src="../assets/imgs/yuyifenge.png"
          alt=""
        >
        <div class="filter"></div>

      </router-link>
      <router-link
        to="/MNIST"
        class="box pointer unselectable"
        active-class="selectedBox"
      >
        <div class="title">
          物体检测
        </div>
        <img
          src="../assets/imgs/yuyifenge.png"
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

onMounted(() => {});
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

  > .backToHome {
    position: absolute;
  }

  > .view {
    height: calc(100vh - $bottom_height);
    width: 100%;
    @include fill_color("fill4");
  }

  > .bottom {
    @include fill_color("fill2");
    height: $bottom_height;
    width: 100%;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: center;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &:hover::-webkit-scrollbar {
      height: 18px;
    }

    // 定义滑块颜色、内阴影及圆角
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      @include fill_color("fill12");
    }
    //滑动槽的背景颜色
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

      &:hover > img {
        filter: blur(0); 
      }

      &:hover > .filter {
        opacity: 0;
      }

      &:hover {
        @include fill_color("fill13");
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
}
</style>