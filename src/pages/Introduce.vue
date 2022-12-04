<template>
  <div class="introduce">
    <div class="title">关于</div>
    <div class="content">
      <div
        class="button pointer unselectable"
        @click="config.retract"
      >
        <el-icon size="40px">
          <ArrowLeftBold />
        </el-icon>
      </div>
      <div class="center">
        <transition
          enter-active-class="animate__animated animate__slideInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <Introduce1 v-show="(config.introduceIdx == 1)"></Introduce1>
        </transition>
        <transition
          enter-active-class="animate__animated animate__slideInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <Introduce2 v-show="(config.introduceIdx == 2)"></Introduce2>
        </transition>
      </div>
      <div
        class="button pointer unselectable"
        @click="config.advance"
      >
        <el-icon size="40px">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import Introduce1 from "../components/Introduce/Introduce1.vue";
import Introduce2 from "../components/Introduce/Introduce2.vue";

var config = reactive({
  introduceIdx: 1,
  maxIdx: 2,
  // 前进
  advance: () => {
    config.introduceIdx++;
    if (config.introduceIdx > config.maxIdx) {
      config.introduceIdx = 1;
    }
  },
  // 回退
  retract: () => {
    config.introduceIdx--;
    if (config.introduceIdx < 1) {
      config.introduceIdx = config.maxIdx;
    }
  },
});
</script>

<style lang='scss' scoped>
.introduce {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: $fontSize8;
    @include font_color("font1");
    box-sizing: border-box;
    padding: 14px;
  }

  > .content {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-around;

    > .button {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      @include font_color("font3");
      @include fill_color("fill1");
      transition: 260ms;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        @include font_color("font1");
        transform: scale(1.12);
        @include fill_color("fill4");
        @include box_shadow(0, 0, 2px, 1px, "border1");
      }
    }

    > .center {
      position: relative;
      height: calc(100% - 40px);
      width: calc(100% - 2 * 100px);
    }
  }
}
</style>