<template>
  <div class="mnist">
    <DividePage>
      <template v-slot:left>
        <PredictMNIST></PredictMNIST>
      </template>
      <template v-slot:right>
        <Wiki :data="data.wiki"></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="1">
        <el-icon>
          <CaretLeft />
        </el-icon>
      </Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import PredictMNIST from "../components/PredictMNIST.vue";
import Wiki from "../components/Wiki.vue";

var data = reactive({
  wiki: [
    {
      class: "title",
      text: "手写体识别",
    },
    {
      class: "h",
      text: "使用说明",
    },
    {
      class: "text",
      text: `请尽量使用白底黑字的图片，可以是手写也可以是电子绘制的单个数字。如果纸面不是白色或者图片中数字位置不在图片靠中的位置都可能会对识别造成很大影响，
      尤其是对于“简易手写体识别”，因为跟他的识别原理有关系，这样的影响可能导致它完全无法识别。`,
    },
    {
      class: "h",
      text: "简易手写数字识别",
    },
    {
      class: "text",
      text: "相信你已经尝试过它的效果了，是不是还行呢？它在测试集上达到了93%左右的正确率。虽然我们训练这个模型的神经网络很简单，但是它依旧很出色，那么我们就来看看它的主要结构吧。",
    },
    {
      class: "text",
      text: "如下图，它是一个线性神经网络，图形被变形为28*28后拉成一长条，送入神经网络进行计算。",
    },
    {
      class: "img",
      text: `src/assets/image/wiki/lowMNIST.png`,
    },
    {
      class: "h",
      text: "高精度手写数字识别",
    },
    {
      class: "text",
      text: `之所以叫高精度，因为它在测试集上达到了99.905%的正确率，当然我们确认不是因为过拟合造成的。这个模型的神经网络用的是“卷积神经网络”，即CNN，有兴趣可以去了解了解。
      我们使用了四层的网络结构，两个卷积子层，其中每个子层中经过两次卷积，最后通过激活和池化再输出给下一层。另外两层是全连接层，最终输出结果就是10个值，
      10个值中最大的值的下标就是识别的结果。`,
    },
    {
      class: "text",
      text: `由此，实际上在原理上，高精度手写体识别比简易手写体识别多了一个维度。固然正确率会有很大提升。`,
    },
  ],
});
</script>


<style lang='scss' scoped>
.mnist {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  display: flex;
  align-items: center;

  > .content {
    width: calc(100%);
    height: 100%;
    @include fill_color("fill4");
    display: flex;
    align-items: center;

    .left {
      width: 60%;
      height: inherit;
      border-right: 1px solid;
      @include border_color("border1");
      box-sizing: border-box;
      padding: 100px;
    }

    .right {
      width: 40%;
      height: inherit;
    }
  }

  > .comment {
    position: relative;
    width: fit-content;
    height: 100%;
  }
}
</style>