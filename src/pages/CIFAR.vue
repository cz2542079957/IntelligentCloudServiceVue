<template>
  <div class="cifar">
    <div class="content">
      <DividePage>
        <template v-slot:left>
          <PredictCIFAR></PredictCIFAR>
        </template>
        <template v-slot:right>
          <Wiki></Wiki>
        </template>
      </DividePage>
    </div>
    <div class="comment">
      <Comment module="2"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import PredictCIFAR from "../components/PredictCIFAR.vue";
import Wiki from "../components/Wiki.vue";



</script>

<style lang='scss' scoped> 
.cifar {
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