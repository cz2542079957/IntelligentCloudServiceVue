<template>
  <div class="main">
    <ThreeJsBCG class="bcg"></ThreeJsBCG>
    <div class="layer unselectable">
      <div class="title">智能云服务</div>
    </div>
    <div class="more">开始</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import ThreeJsBCG from "./components/ThreeJsBCG.vue";
import { useThemeSwitchStore } from "./pinia/themeSwitch";
const themeSwitch = useThemeSwitchStore();

var config = reactive({
  page: 0,
});

onMounted(() => {
  themeSwitch.init();
});
</script>
  
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
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
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;

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
    font-size: 22px;
  }
}
</style>