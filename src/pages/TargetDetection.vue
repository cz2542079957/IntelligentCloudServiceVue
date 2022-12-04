<template>
  <div class="targetDetection">
    <div class="content">

    </div>
    <div class="comment">
      <Comment module="3"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
</script>

<style lang='scss' scoped>
.targetDetection {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  display: flex;
  align-items: center;

  > .content {
    width: calc(100%);
    height: 100%;
    @include fill_color("fill1");
  }

  > .comment {
    position: relative;
    width: fit-content;
    height: 100%;
  }
}
</style>