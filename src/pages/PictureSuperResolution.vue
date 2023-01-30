<template>
  <div class="pictureSuperResolution">
    <DividePage>
      <template v-slot:left>
        <SuperResolution></SuperResolution>
      </template>
      <template v-slot:right>
        <Wiki :data="data.wiki"></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="6"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import SuperResolution from "../components/SuperResolution.vue";
import Wiki from "../components/Wiki.vue";

var data = reactive({
  wiki: [
    {
      class: "title",
      text: "图片超分辨率",
    },
    {
      class: "h",
      text: "超分辨率生成对抗网络（SRGAN）",
    },
    {
      class: "text",
      text: `SRGAN全称Super Resolution Generative Adversarial Network，SRGAN的最大贡献就是使用了生成对抗网络（Generative adversarial network）来训练SRResNet,使其产生的HR图像看起来更加自然,有更好的视觉效果（SRResNet是生成网络，对抗网络是用来区分真实的HR图像和通过SRResNet还原出来的HR图像，SRGAN网络的最终目标就是要让对抗网络无法区分真实的HR图像和SRResNet还原的HR图像）。`,
    },
    {
      class: "text",
      text: `因此通过这样的'自我博弈'的方式，该模型就可以生成以假乱真的图像，也就达到了较好的超分辨率拟真的效果。以下两张图片分别是超分辨率之前和之后的图片，可以看到4倍的超分辨率放大之下，兔子轮廓、毛发更加清晰，并且整体看起来不会很违和。`,
    },
    {
      class: "img",
      text: "src/assets/image/wiki/superResolution-1.png",
    },
    {
      class: "img",
      text: "src/assets/image/wiki/superResolution-2.png",
    },
  ],
});
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