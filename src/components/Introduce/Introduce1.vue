<template>
  <div class="content">
    <div class="id">#1</div>
    <div class="h">HELLO.</div>
    <div class="text">很高兴见到你，请允许我做一个简短的介绍，这是一个通过机器学习帮助你完成一些图片处理的网站，
      你可以看到页面下方有一系列的功能，如果你对机器学习、深度学习有过了解，那么我觉得你一定对这些比较熟悉，
      比如MNIST数据集的案例，CIFAR10以及CIFAR100的案例等等。
    </div>
    <div class="h">页面索引</div>
    <div class="text">
      你当前处在“关于”页面，翻动子页面（两侧的按钮），让我为你介绍本网站的使用方法，以及注意事项吧。
    </div>
    <div class="text">
      #1：本页
    </div>
    <div class="text">
      #2：使用方法介绍
    </div>
    <div class="text">
      #3：注意事项
    </div>
    <br>
    <div class="h">: ) 祝你愉快</div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  @include fill_color("fill2");
  box-sizing: border-box;
  padding: 28px;
  overflow-y: scroll;
  @include scrollbar();

  > .id {
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: $fontSize9;
    @include font_color("font4");
  }

  > .h {
    font-size: $fontSize9;
    font-weight: 600;
    padding: 16px 10px 4px 10px;
    @include font_color("font1");
  }

  > .text {
    font-size: $fontSize6;
    padding: 0 20px;
    text-indent: 2em;
    @include font_color("font2");
  }
}
</style>