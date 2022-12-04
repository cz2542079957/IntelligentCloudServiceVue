<template>
  <div class="mnist">
    <div class="content">

    </div>
    <div class="comment">
      <Comment module="1"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
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
    @include fill_color("fill1");
  }

  > .comment {
    position: relative;
    width: fit-content;
    height: 100%;
  }
}
</style>