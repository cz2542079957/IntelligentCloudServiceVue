<template>
  <div>
    <template v-if="!config.signin">
      <div :class="'main ' + (config.page == 1 ? 'start' : '')">
        <div class="welcome">
          <ThreeJsBCG class="bcg"></ThreeJsBCG>
          <div class="layer unselectable">
            <div class="title">智能云服务</div>
          </div>
          <div class="filter"></div>
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
        <div class="content">
          <Content v-model:page="config.page"></Content>
        </div>
      </div>
    </template>
    <template v-else>
      <transition enter-active-class="animate__animated animate__fadeInUp">
        <Signin v-model:signin="config.signin"></Signin>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive } from "vue";
import ThreeJsBCG from "./components/ThreeJsBCG.vue";
import Content from "./pages/Content.vue";
import Signin from "./components/Signin.vue";
import { useThemeSwitchStore } from "./pinia/themeSwitch";
const themeSwitch = useThemeSwitchStore();
const { proxy } = getCurrentInstance() as any;

var config = reactive({
  page: 1,
  signin: false,
});

function start() {
  config.page = 1;
}

onMounted(() => {
  themeSwitch.init();
});
</script>
  
<style>
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
      z-index: 10;
      box-sizing: border-box;
      padding: 100px;
      top: 16vh;
      @include font_color("font3");

      &:hover {
        @include font_color("font1");
      }

      > .title {
        font-size: 42px;
        font-weight: 600;
        letter-spacing: 6px;
        font-size: $fontSize15;
        transition-duration: 260ms;
      }
    }

    > .more {
      position: absolute;
      z-index: 10;
      bottom: 20px;
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
      @include linear_gradient(to top, "fill11", "fill16");
      @include box_shadow(0, 0, 14px, 4px, "fill16");
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