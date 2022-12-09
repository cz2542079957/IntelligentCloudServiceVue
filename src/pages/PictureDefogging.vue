<template>
  <div class="outer">
    <DividePage>
      <template v-slot:left>
        <Defogging></Defogging>
      </template>
      <template v-slot:right>
        <Wiki :data="data.wiki"></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="5"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import Defogging from "../components/Defogging.vue";
import Wiki from "../components/Wiki.vue";
import { reactive } from "vue";

var data = reactive({
  wiki: [
    {
      class: "title",
      text: "图片去雾",
    },
    {
      class: "h",
      text: "特征融合注意网络（FFA-Net）",
    },
    {
      class: "text",
      text: `FFA即Feature Fusion Attention，一种端到端的特征融合注意网络，用于直接恢复无雾图像。FFA网络体系结构由三个关键组成部分组成：`,
    },
    {
      class: "text",
      text: `（1）针对不同通道的特征包含完全不同的加权信息，并且雾度在不同的图像像素上分布不均匀这个问题，提出了一种新的特征注意力（FA）模块，将Channel Attention与Pixel Attention 机制相结合。FA不平等地处理不同的特征和像素，这为处理不同类型的信息提供了额外的灵活性，扩展了CNNs的表示能力。`,
    },
    {
      class: "text",
      text: `（2）基本的块结构由local Residual Learning 和特征注意力（FA）模块组成，local Residual Learning 允许通过多个local residual connections来跳过薄雾区或低频等不太重要的信息，让主网络结构专注于更有效的信息。`,
    },
    {
      class: "text",
      text: `（3）基于注意力的不同级别的特征融合（FFA）结构，可以从特征注意力（FA）模块中自适应学习特征权重，从而为重要特征赋予更多权重。这种结构还可以保留浅层信息，并将其传递到深层。`,
    },
    {
      class: "text",
      text: `下图为处理的效果：`,
    },
    {
      class: "img",
      text: "src/assets/image/wiki/defogging-1.png",
    },
    {
      class: "img",
      text: "src/assets/image/wiki/defogging-2.png",
    },
    {
      class: "img",
      text: "src/assets/image/wiki/defogging-3.png",
    },
    {
      class: "img",
      text: "src/assets/image/wiki/defogging-4.png",
    },
  ],
});
</script>

<style lang='scss' scoped>
.outer {
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