<template>
  <div class="dividePage">
    <div :class="'content ' + (config.main == 1 ? '' : 'main2' )">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
        <div
          class="divide"
          @click="config.switch"
        >
          <el-icon
            size="25px"
            class="icon"
          >
            <CaretLeft />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";

var config = reactive({
  main: 1,
  switch: () => {
    config.main = config.main == 1 ? 2 : 1;
  },
});
</script>

<style lang='scss' scoped>
.dividePage {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  display: flex;
  align-items: center;

  > .content {
    width: calc(100%);
    height: 100%;
    @include fill_color("fill4");
    display: flex;
    align-items: center;

    > .left {
      position: relative;
      width: 84%;
      height: inherit;
      border-right: 1px solid;
      @include border_color("border1");
      transition: all 400ms;
    }

    > .right {
      position: relative;
      width: 16%;
      height: inherit;
      transition: all 400ms;
      @include fill_color("fill52");

      > .divide {
        position: absolute;
        height: 100px;
        width: 20px;
        @include fill_color("fill12");
        @include box_shadow(0, 0, 2px, 1px, "border1");
        border-radius: 20px;
        top: calc(50% - 50px);
        left: -10px;
        transition: all 400ms;
        display: flex;
        align-items: center;
        justify-content: center;

        > .icon {
          transform: rotateZ(0);
          transition: all 400ms;
        }
      }
    }
  }

  > .main2 {
    > .left {
      width: 16%;
      @include fill_color("fill52");
    }

    > .right {
      width: 84%;
      @include fill_color("fill2");

      > .divide {
        > .icon {
          transform: rotateZ(180deg);
        }
      }
    }
  }
}
</style>