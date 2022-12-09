<template>
  <div class="pictureSuperResolution">
    <DividePage>
      <template v-slot:left>
        <SuperResolution></SuperResolution>
      </template>
      <template v-slot:right>
        <Wiki></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="6"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import SuperResolution from "../components/SuperResolution.vue";
import Wiki from "../components/Wiki.vue";
</script>

<style lang='scss' scoped>
.pictureSuperResolution {
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