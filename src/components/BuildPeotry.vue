<template>
  <div class="outer">
    <div class="config">
      <div class="input">
        <div class="label">诗歌意境</div>
        <input
          v-model="config.prefixText"
          type="text"
        >
      </div>
      <div class="input">
        <div class="label">藏头</div>
        <input
          v-model="config.startText"
          type="text"
        >
      </div>
      <div class="options">
        <div
          class="item pointer"
          v-for="(item , index )  in config.prefixTextOpt"
          @click="config.select(index)"
        >
          {{item.label}}
        </div>
      </div>
      <div
        class="btn pointer"
        @click="config.build"
      >生成</div>
    </div>
    <div class="history">
      <div class="title">历史记录</div>
      <div
        class="item"
        v-for="(item,index) in history"
      >
        {{item}}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "../utils/registrationCenter";

const userData = useUserDataStore();

var config = reactive({
  loader: null,
  startText: "", // 藏头
  prefixText: "", // 意境
  prefixTextOpt: [
    { label: "随机", text: "" },
    {
      label: "雄浑壮丽",
      text: "大漠孤烟直，长河落日圆。",
    },
    { label: "壮阔苍茫", text: "西风残照，汉家陵阙。" },
    { label: "苍凉悲壮", text: "飘飘何所以，天地一沙鸥。" },
    { label: "闲适恬淡", text: "采菊东篱下，悠然见南山。" },
    { label: "清幽明净", text: "明月松间照，清泉石上流。" },
    { label: "明丽清新", text: "东边日出西边雨，道是无晴却有晴。" },
    { label: "萧疏凄寂", text: "秋山起暮钟，楚雨连沧海。" },
    { label: "安谧美好", text: "木末芙蓉花，山中发红萼。" },
    { label: "好远深邃", text: "昨夜西风凋碧树，独上高楼，望尽天涯路。" },
    { label: "淡雅幽远", text: "自在飞花轻似梦，无边丝雨细如愁。" },
    { label: "清冷幽静", text: "泉声咽危石，日色冷青松。" },
  ],
  // 选择意境诗句
  select: (index: number) => {
    if (index == 0) {
      index = Math.floor(Math.random() * 11) + 1;
    }
    config.prefixText = config.prefixTextOpt[index].text;
  },
  //开始创建
  build: () => {
    // 用户没有登录
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    // 检查是否填写完整
    if (!config.startText || !config.prefixText) {
      getUtils().elMessage({ message: "请填写完整", type: "warning" });
      return;
    }
    let configRef = document.getElementsByClassName("config")[0];
    config.loader = getUtils().elLoading({ node: configRef, text: "生成中" });
    getUtils()
      .$post({
        url: "ics/predict/poetry",
        data: {
          username: userData.username,
          startText: config.startText,
          prefixText: config.prefixText,
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          getUtils().elMessage({ message: "生成完毕", type: "success" });
        }
        history.unshift(data.data);
        config.loader.close();
        getUtils().stateCodeHandler(data);
      });
  },
});

var history = reactive([]);
</script>

<style lang='scss' scoped>
@mixin btn() {
  box-sizing: border-box;
  padding: 4px 14px;
  font-size: $fontSize5;
  @include font_color("font1");
  border-radius: 8px;
  @include fill_color("fill1");
  transition: 200ms;

  &:hover {
    @include font_color("font6");
    @include fill_color("fill13");
  }
}

.outer {
  width: 100%;
  height: 100%;
  @include fill_color("fill1");
  font-size: $fontSize6;
  @include font_color("font1");
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 60px 30px;

  > .config {
    min-width: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    overflow-y: scroll;
    @include scrollbar;

    > .input {
      display: flex;
      align-items: center;
      font-size: $fontSize6;
      margin: 4px 0;

      > .label {
        width: 100px;
        text-align: right;
        @include font_color("font1");
        box-sizing: border-box;
        padding: 0 10px;
      }

      > input {
        width: 400px;
        font-size: $fontSize6;
        @include font_color("font2");
        border-radius: 10px;
        outline: none;
        box-sizing: border-box;
        padding: 2px 10px;
      }
    }

    > .options {
      width: inherit;
      display: flex;
      flex-wrap: wrap;

      > .item {
        @include btn();
        margin: 2px 6px;
      }
    }

    > .btn {
      @include btn();
      text-align: center;
      font-size: $fontSize8;
      margin: 20px;
    }
  }

  > .history {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    overflow-y: scroll;
    @include scrollbar;
    border-top: 2px dotted;
    @include border_color("fill52");

    > .title {
      width: inherit;
      font-size: $fontSize7;
      @include font_color("font1");
      font-weight: 600;
      box-sizing: border-box;
      padding: 8px 0;
      text-align: center;
      border-bottom: 1px solid;
      @include border_color("border2");
    }

    > .item {
      width: max-content;
      min-width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-bottom: 1px solid;
      @include border_color("border2");

      &:hover {
      }
    }
  }
}
</style>