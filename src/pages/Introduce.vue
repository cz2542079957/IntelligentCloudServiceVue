<template>
  <div class="introduce">
    <div class="title">关于</div>
    <div class="content">
      <transition enter-active-class="animate__animated animate__fadeInUp">
        <Introduce1></Introduce1>
      </transition>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Introduce1 from "../components/Introduce/Introduce1.vue";
  

</script>

<style lang='scss' scoped>
.introduce {
  width: 100%;
  height: 100%;
  @include fill_color("fill1");
  display: flex;
  flex-direction: column;

  .title {
    font-size: $fontSize8;
    @include font_color("font1");
    box-sizing: border-box;
    padding: 14px;
  }
}
</style>