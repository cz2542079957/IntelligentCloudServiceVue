<template>
  <div class="outer">
    <DividePage>
      <template v-slot:left>

      </template>
      <template v-slot:right>

      </template>
    </DividePage>
    <div class="comment">
      <Comment module="5"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
</script>

<style lang='scss' scoped>
.outer {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  display: flex;
  align-items: center;

  > .comment {
    position: relative;
    width: fit-content;
    height: 100%;
  }
}
</style>