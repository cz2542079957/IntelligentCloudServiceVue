<template>
  <div class="outer">
    <DividePage>
      <template v-slot:left>
        <BuildPeotry></BuildPeotry>
      </template>
      <template v-slot:right>
        <Wiki :data="data.wiki"></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="3"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import BuildPeotry from "../components/BuildPeotry.vue";
import Wiki from "../components/Wiki.vue";
import { reactive } from "vue";

var data = reactive({
  wiki: [
    {
      class: "title",
      text: "藏头诗",
    },
    {
      class: "h",
      text: "使用说明",
    },
    {
      class: "text",
      text: `这一藏头诗生成器需要设置意境以及藏头词，操作界面中两个输入框下方有一些现成的意境风格供你选择，你可以点击它们来快速获取意境诗句，或者你可以输入你喜欢的一句诗。`,
    },
    {
      class: "text",
      text: `接下来就是需要输入藏头词，比如下图就是使用的样例。`,
    },
    {
      class: "img",
      text: "src/assets/image/wiki/poetry-1.png",
    },
    {
      class: "h",
      text: "原理",
    },
    {
      class: "text",
      text: `本古诗生成器模型使用GAN（生成对抗网络）网络结构训练，GAN的核心思想源于博弈论的纳什均衡。设定参与游戏的双方分别为一个生成器(Generator)和一个判别器(Discriminator),生成器捕捉真实数据样本的潜在分布,并生成新的数据样本;判别器是一个二分类器,判别输入是真实数据还是生成的样本。为了取得游戏胜利,这两个游戏参与者需要不断优化,各自提高自己的生成能力和判别能力,这个学习优化过程就是寻找二者之间的一个纳什均衡。`,
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