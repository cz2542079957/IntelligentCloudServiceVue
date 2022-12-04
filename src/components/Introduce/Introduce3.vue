<template>
  <div class="content">
    <div class="id">#3</div>
    <div class="h">Rule : 规则</div>
    <div class="text">
      1.我想你已经知道本站主页有弹幕功能了，你可以发表一些你的有趣的想法，或者仅仅留下一个“XXX，到此一游”，但请一定要注意弹幕礼仪。
    </div>
    <br />
    <div class="text">
      2.本站目前功能一律免费，你只需要登录就可以使用这些功能，请不要作出恶意举动，谢谢。
    </div>
    <br />
    <div class="text">
      3.本站具有评论功能，与弹幕同理，请在文明的前提下畅所欲言。
    </div>
    <div class="h">More</div>
    <div class="text">
      站长联系方式: 2542079957@qq.com，有什么建议或者好的想法请一定要联系我。
    </div>
    <br />
    <div class="h">Wish You Happy</div>
    <br />
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