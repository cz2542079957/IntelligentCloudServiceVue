<template>
  <div class="outer">
    <div v-for="(item, index) in props.data">
      <div
        v-if="item.class != 'img'"
        :class="item.class"
      >
        {{item.text}}
      </div>
      <img
        v-else
        :src="item.text"
      >
    </div>
  </div>
</template>

<script lang='ts' setup>
const props = defineProps(["data"]);
</script>

<style lang='scss' scoped>
.outer {
  position: relative;
  width: 100%;
  min-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  @include scrollbar();

  .title {
    width: 100%;
    text-align: center;
    font-size: $fontSize10;
    letter-spacing: 2px;
    margin: 10px 0;
    @include font_color("font1");
  }

  .h {
    width: 100%;
    font-size: $fontSize7;
    font-weight: 600;
    margin: 10px 0 4px 20px;
    @include font_color("font2");
  }

  .text {
    width: 100%;
    font-size: $fontSize6;
    box-sizing: border-box;
    padding: 0 30px;
    text-indent: 2em;
    @include font_color("font2");
  }

  img{
    min-width: 200px;
    max-width: 500px;
    max-height: 240px;
    margin: 8px 40px;
  }
}
</style>