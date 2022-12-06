<template>
  <div class="cifar">
    <DividePage>
      <template v-slot:left>
        <PredictCIFAR></PredictCIFAR>
      </template>
      <template v-slot:right>
        <Wiki :data="data.wiki"></Wiki>
      </template>
    </DividePage>
    <div class="comment">
      <Comment module="2"></Comment>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import Comment from "../components/Comment.vue";
import DividePage from "../components/DividePage.vue";
import PredictCIFAR from "../components/PredictCIFAR.vue";
import Wiki from "../components/Wiki.vue";

var data = reactive({
  wiki: [
    {
      class: "title",
      text: "类别识别",
    },
    {
      class: "h",
      text: "使用说明",
    },
    {
      class: "text",
      text: `对于10分类识别,具体对应的是：飞机,汽车,鸟,猫,鹿,狗,青蛙,房子,船,卡车。`,
    },
    {
      class: "text",
      text: `对于100分类识别,具体是：苹果,观赏鱼,宝宝,熊,海狸,床,蜜蜂,甲虫,自行车,瓶子,碗,男孩,桥,公共汽车,蝴蝶,骆驼,罐头,城堡,毛毛虫,牛,椅子,黑猩猩,闹钟,云,蟑螂,沙发,螃蟹,鳄鱼,杯子,恐龙,海豚,大象,比目鱼,森林,狐狸,女孩,仓鼠,房子,袋鼠,键盘,灯,割草机,豹,狮子,蜥蜴,龙虾,人,枫树,摩托车,山,老鼠,蘑菇,橡树,橘子,兰花,水獭,棕榈树,梨,小货车,松树,平原,盘子,罂粟,豪猪,鼠貂,兔子,浣熊,雷,道路,火箭,玫瑰,海,密封,鲨鱼,鼩鼱,臭鼬,摩天大楼,蜗牛,蛇,蜘蛛,松鼠,有轨电车,向日葵,甜椒,桌子,坦克,电话,电视,老虎,拖拉机,火车,鳟鱼,郁金香,乌龟,衣柜,鲸鱼,柳树,狼,女人,虫子。
      `,
    },
    {
      class: "text",
      text: `请上传相关图片，在不同分类数量级和精度下验证识别结果。`,
    },
    {
      class: "h",
      text: `关于10分类`,
    },
    {
      class: "text",
      text: `低精度的模型是使用ResNet18网络结构训练的，不过你应该可以发现，它的精度低的离谱，然而它的训练集准确度却有76.82%，对此可能有很多种因素造成，
      比如训练集和测试集的划分不合理导致的过拟合，我们将会在后面加强训练；高精度的模型是使用ResNet50网络结构训练的，可以发现它的效果不错，事实也确实如此，
      它在测试集上的表现是达到了93%+的正确率，这也正是体现了残差网络叠加多层不会出现明显反向优化的优点。`,
    },
    {
      class: "h",
      text: `关于100分类`,
    },
    {
      class: "text",
      text: `同样，它也是采用ResNet50训练，它在测试集上的正确率达到了80.71%，由于设备性能有限，我们并没有花很长时间训练，所以能够达到80%以上其实已经很不错了，
      尤其是对于这种多分类的数据集。`,
    },
  ],
});
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