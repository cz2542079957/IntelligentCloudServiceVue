<template>
  <div class="content">
    <div class="id">#2</div>
    <div class="h">Usage : 使用方法</div>
    <div class="text">在下方横向列表中选择一个你感兴趣的功能，点击后会在页面中心出现相关的上传图片的功能以及一些按钮，
      你可以按照按钮的字面意思提交处理任务，不过前提是你得登录到本网站，登录方法见下方。
    </div>
    <div class="text">看到这一条，那么我就默认你已经注册登录完毕，那么接下来就点击相关功能的开始处理按钮，
      等待服务器处理完成后，会将处理结果以文字或者图片的方式返回给你。
    </div>
    <div class="h">Signin : 登录</div>
    <div class="text">
      看到页面右上角的图标了吗，你把鼠标移上去，它会变大，是不是很神奇呢（bushi）？开玩笑，这时候你点击就会进入登录界面，
      如果你还没有注册，请点击登录界面中的靠右上方的绿色“气泡”切换到注册模式，中间的大气泡会提示你当前的模式，
      这时候输入你的用户名，注意是4-24位字母符号和数字构成哦，你会发现怎么没有密码，这时候你点击下方的“选择密码图像”按钮，
      选择一张你喜欢的图像，然后点击“开始”就能够完成注册啦（你的密码会通过卷积神经网络最终生成80位的数字串，它只在你第一次注册提示哦，
      请记住这串数字有助于恢复和修改密码哦）。
    </div>
    <div class="text">
      同样的，登录需要用到你注册时使用的密码图像，不能对图片作出任何修改哦，否则会登录失败。
    </div>
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