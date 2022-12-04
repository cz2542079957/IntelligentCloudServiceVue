<template>
  <div class="mnist">
    <DividePage>
      <template v-slot:left>
        <div class="left">
          <div class="title">

          </div>
          <div class="image">
            <img src="">

            <img src="">
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div class="right">

        </div>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="1">
        <el-icon>
          <CaretLeft />
        </el-icon>
      </Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
</script>

<style lang='scss' scoped>
.mnist {
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
      width: 60%;
      height: inherit;
      border-right: 1px solid;
      @include border_color("border1");
    }

    > .right {
      width: 40%;
      height: inherit;
    }
  }

  > .comment {
    position: relative;
    width: fit-content;
    height: 100%;
  }
}
</style>