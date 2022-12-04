<template>
  <div :class="'comment ' + (config.show ? '' : 'closed')">
    <!-- 显示隐藏按钮 -->
    <div
      class="closeComment pointer"
      @click="config.switch"
    >
      <el-icon
        size="25px"
        class="icon"
      >
        <CaretLeft />
      </el-icon>
    </div>
    <!-- 评论主界面 -->
    <div class="content">
      <!-- 评论列表 -->
      <div class="list">
        <div class="title">{{config.moduleName[comment.config.module]}}</div>
        <div
          class="item"
          v-for="(item, index) in comment.list"
        >
          <div class="username">{{item.username}}</div>
          <div class="text">
            {{item.text}}
          </div>
          <div class="time">
            {{ getUtils().TimeTools.timestampToTime(item.createTime) }}
          </div>
        </div>
        <div
          class="more pointer"
          v-if="(comment.config.count >comment.config.limit * (comment.config.page - 1))"
          @click="comment.pullMoreData"
        >
          获取更多
        </div>
        <div
          class="bottom pointer"
          v-else
        >
          到底了哦~
        </div>

      </div>
      <!-- 输入框 -->
      <div class="write">
        <input
          type="text"
          maxlength="100"
          v-model="comment.tempData"
          @keypress.enter="comment.send"
          :placeholder="('当前有' + comment.config.count + '条评论')"
        >
        <div
          class="
          send pointer"
          @click="comment.send"
        >
          发送
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "../utils/registrationCenter";
const userData = useUserDataStore();
var props = defineProps(["module"]);

var config = reactive({
  show: true,
  moduleName: [
    "",
    "简单数字识别",
    "简单图片识别",
    "目标检测",
    "语义分割",
    "实例分割",
    "全景分割",
    "物体检测",
  ],
  switch: () => {
    config.show = config.show ? false : true;
  },
});

var comment = reactive({
  config: {
    module: 1,
    page: 1,
    limit: 20,
    count: 0,
  },
  list: [], // 数据列表
  tempData: "", // 用户输入数据

  // 拉取数据
  pullData: () => {
    comment.config.module = props.module;
    getUtils()
      .$get({
        url: "ics/comment/list",
        config: {
          params: {
            module: comment.config.module,
            page: comment.config.page,
            limit: comment.config.limit,
          },
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          comment.config.count = data.count;
          comment.list.push(...data.data);
          comment.config.page++;
        }
        getUtils().stateCodeHandler(data);
      });
  },
  //拉取更多数据
  pullMoreData: () => {
    if (
      comment.config.limit * (comment.config.page - 1) >
      comment.config.count
    ) {
      //说明数据库新数据不够
      return;
    }
    getUtils()
      .$get({
        url: "ics/comment/list",
        config: {
          params: {
            module: comment.config.module,
            page: comment.config.page,
            limit: comment.config.limit,
          },
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          comment.config.count = data.count;
          comment.list.push(...data.data); //将新数据拼接在总数据后面
          comment.config.page++;
        }
        getUtils().stateCodeHandler(data);
      });
  },
  // 用户发送评论
  send: () => {
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    if (!comment.tempData) {
      getUtils().elMessage({ message: "请输入内容", type: "warning" });
      return;
    }
    let text = comment.tempData;
    comment.tempData = "";
    getUtils()
      .$post({
        url: "ics/comment/send",
        data: {
          username: userData.username,
          text,
          module: Number(comment.config.module),
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          getUtils().elNotification({ title: "评论成功", type: "success" });
        }
        getUtils().stateCodeHandler(data);
      });
  },
});

onMounted(() => {
  comment.pullData();
});
</script>

<style lang='scss' scoped>
$commentWriteLineHeight: 40px;

@mixin scrollbar() {
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 14px;
    overflow: hidden;
    @include fill_color("fill2");
  }

  &::-webkit-scrollbar-thumb {
    @include fill_color("fill12");
  }

  &::-webkit-scrollbar-track {
    border-radius: 14px;
  }

  &::-webkit-scrollbar-track-piece {
    border-radius: 14px;
  }

  &::-webkit-scrollbar-button {
    border-radius: 14px;
    height: 0;
  }
}

.comment {
  position: relative;
  height: 100%;
  width: 420px;
  transition: width 360ms;
  border-left: 2px solid;
  @include border_color("border3");

  > .closeComment {
    position: absolute;
    height: 100px;
    width: 20px;
    @include fill_color("fill12");
    @include box_shadow(0, 0, 2px, 1px, "border1");
    border-radius: 20px;
    top: calc(50% - 50px);
    left: -10px;
    transition: all 400ms;
    display: flex;
    align-items: center;
    justify-content: center;

    > .icon {
      transform: rotateZ(180deg);
      transition: all 400ms;
    }
  }

  > .content {
    display: flex;
    flex-direction: column;
    height: inherit;
    width: inherit;

    > .list {
      height: calc(100% - $commentWriteLineHeight);
      width: inherit;
      @include fill_color("fill2");
      overflow-y: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
      padding: 10px;
      @include scrollbar();

      > .title {
        width: 100%;
        text-align: center;
        font-size: $fontSize7;
        font-weight: 600;
        letter-spacing: 2px;
        border-bottom: 1px solid;
        box-sizing: border-box;
        padding: 10px 0;
        @include border_color("border1");
      }

      > .item {
        width: inherit;
        display: flex;
        flex-direction: column;
        font-size: $fontSize4;
        box-sizing: border-box;
        padding: 6px 4px;
        border-bottom: 1px solid;
        @include border_color("border1");

        .item:last-child {
          border-bottom: none;
        }

        > .username {
          width: max-content;
          min-width: 100%;
          font-weight: 600;
          @include font_color("font1");
          overflow: hidden;
        }

        > .text {
          width: 400px;
          box-sizing: border-box;
          padding: 4px 14px;
          word-wrap: break-word;
          @include font_color("font2");
          overflow: hidden;
        }

        > .time {
          width: max-content;
          min-width: 100%;
          box-sizing: border-box;
          padding: 0 30px;
          text-align: right;
          font-size: $fontSize2;
          @include font_color("font3");
          overflow: hidden;
        }
      }

      > .more {
        width: fit-content;
        margin: 10px auto;
        height: 30px;
        font-size: $fontSize6;
        @include font_color("font3");

        &:hover {
          @include font_color("fill11");
        }
      }

      > .bottom {
        width: fit-content;
        margin: 10px auto;
        height: 30px;
        font-size: $fontSize5;
        @include font_color("font4");
      }
    }

    > .write {
      height: $commentWriteLineHeight;
      width: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid;
      @include border_color("border3");

      > input {
        padding: 0;
        margin: 0;
        width: calc(100% - 60px);
        height: $commentWriteLineHeight;
        line-height: $commentWriteLineHeight;
        outline: none;
        border: none;
        font-size: $fontSize5;
        box-sizing: border-box;
        padding: 0 10px;
      }

      > .send {
        height: $commentWriteLineHeight;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $fontSize4;
        @include fill_color("fill52");
        @include font_color("font1");
        transition: 200ms;

        &:hover {
          @include fill_color("fill13");
        }
      }
    }
  }
}

.closed {
  width: 0;

  > .closeComment {
    height: 200px;
    width: 30px;
    left: -30px;
    top: calc(50% - 100px);
    @include fill_color("fill53");

    > .icon {
      transform: rotateZ(0);
    }
  }
}
</style>