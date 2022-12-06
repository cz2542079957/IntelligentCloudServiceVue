<template>
  <div
    class="outer"
    ref="predictCIFAR"
  >
    <div class="predict">
      <div class="CIFAR10">
        <div class="title">10分类识别</div>
        <div class="upload">
          <img :src="cifar10.preview">
          <el-upload
            ref="cifar10Loader"
            :limit="1"
            :on-change="cifar10.change"
            :auto-upload="false"
            :show-file-list="false"
          >
            <template #trigger>
              <div class="btn pointer">选择图片</div>
            </template>
          </el-upload>
        </div>
        <div
          class="start pointer"
          @click="cifar10.upload(1)"
        >
          低精度识别
        </div>
        <div
          class="start pointer"
          @click="cifar10.upload(2)"
        >
          高精度识别
        </div>
      </div>
      <div class="CIFAR100">
        <div class="title">100分类识别</div>
        <div class="upload">
          <img :src="cifar100.preview">
          <el-upload
            ref="cifar100Loader"
            :limit="1"
            :on-change="cifar100.change"
            :auto-upload="false"
            :show-file-list="false"
          >
            <template #trigger>
              <div class="btn pointer">选择图片</div>
            </template>
          </el-upload>
        </div>
        <div
          class="start pointer"
          @click="cifar100.upload"
        >
          开始识别
        </div>
      </div>
    </div>
    <div class="history">
      <div class="title">历史记录</div>
      <div
        class="item"
        v-for="(item,index) in history.predict"
      >
        <img :src="item.url">
        <div class="info">
          <div class="result">识别结果：{{item.result}}</div>
          <div class="bottom">
            <div class="mode">模式：{{item.mode}}</div>
            <div class="time"> {{getUtils().TimeTools.timestampToTime(item.time) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "../utils/registrationCenter";
const { proxy } = getCurrentInstance() as any;
const userData = useUserDataStore();

var config = reactive({
  load: null,
  closeLoad: () => {
    config.load ? config.load.close() : null;
  },
});

//上传
var cifar10 = reactive({
  defultImage: "src/assets/image/global/upload.svg",
  preview: "src/assets/image/global/upload.svg",
  file: null,
  change: (file) => {
    proxy.$refs.cifar10Loader.clearFiles();
    let url = getUtils().FileConvertor.file2Blob(file.raw);
    cifar10.preview = url;
    cifar10.file = file;
  },
  upload: (mode: number) => {
    if (cifar10.preview == cifar10.defultImage) {
      getUtils().elMessage({ message: "请选择图片", type: "warning" });
      return;
    }
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    //等待
    config.load = getUtils().elLoading({
      node: proxy.$refs.predictCIFAR,
      text: "识别中",
    });
    //根据模式设置参数
    let url = mode == 1 ? "ics/predict/lowCIFAR10" : "ics/predict/highCIFAR10";
    let modeString = mode == 1 ? "低精度10类" : "高精度10类";
    //上传
    let formData = new FormData();
    formData.append("file", cifar10.file.raw);
    formData.append("username", userData.username);
    getUtils()
      .$post({
        url,
        data: formData,
        config: {
          headers: {
            ContentType: 1,
          },
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          history.predict.unshift({
            url: cifar10.preview,
            result: data.data.split(";").join(">"),
            time: Date.now(),
            mode: modeString,
          });

          cifar10.preview = cifar10.defultImage;
          cifar10.file = null;
        }
        config.closeLoad();
        getUtils().stateCodeHandler(data);
      });
  },
});

var cifar100 = reactive({
  defultImage: "src/assets/image/global/upload.svg",
  preview: "src/assets/image/global/upload.svg",
  file: null,
  change: (file) => {
    proxy.$refs.cifar100Loader.clearFiles();
    let url = getUtils().FileConvertor.file2Blob(file.raw);
    cifar100.preview = url;
    cifar100.file = file;
  },
  upload: (mode: number) => {
    if (cifar100.preview == cifar100.defultImage) {
      getUtils().elMessage({ message: "请选择图片", type: "warning" });
      return;
    }
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    //等待
    config.load = getUtils().elLoading({
      node: proxy.$refs.predictCIFAR,
      text: "识别中",
    });
    //上传
    let formData = new FormData();
    formData.append("file", cifar100.file.raw);
    formData.append("username", userData.username);
    getUtils()
      .$post({
        url: "ics/predict/CIFAR100",
        data: formData,
        config: {
          headers: {
            ContentType: 1,
          },
        },
      })
      .then((res) => {
        let data = res.data;
        if (data?.code == 0) {
          history.predict.unshift({
            url: cifar100.preview,
            result: data.data,
            time: Date.now(),
            mode: "100类",
          });
          cifar100.preview = cifar100.defultImage;
          cifar100.file = null;
        }
        config.closeLoad();
        getUtils().stateCodeHandler(data);
      });
  },
});

//预测结果历史记录
var history = reactive({
  predict: [],
});

onMounted(() => {});
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
  display: flex;
  align-items: center;

  > .predict {
    width: calc(100% - 360px);
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    > .CIFAR10,
    > .CIFAR100 {
      display: flex;
      flex-direction: column;
      align-items: center;

      > .title {
        font-size: $fontSize6;
        @include font_color("font1");
      }

      > .upload {
        display: flex;
        flex-direction: column;
        align-items: center;

        > img {
          height: 120px;
          width: 120px;
          padding: 0;
          margin: 10px;
          box-sizing: border-box;
          border-radius: 14px;
          @include box_shadow(0, 0, 3px, 1px, "border2");
        }

        .btn {
          @include btn();
        }
      }

      > .start {
        @include btn();
        margin-top: 10px;
      }
    }
  }

  > .history {
    width: 450px;
    height: 100%;
    border-left: 2px solid;
    @include border_color("border2");
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding-bottom: 10px;
    @include scrollbar();

    > .title {
      width: inherit;
      box-sizing: border-box;
      padding: 10px;
      text-align: center;
      font-size: $fontSize7;
      font-weight: 600;
      border-bottom: 2px solid;
      @include border_color("border2");
    }

    > .item {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 4px 10px;
      transition: 200ms;

      &:hover {
        @include fill_color("fill13");
      }

      > img {
        height: 70px;
        width: 70px;
        border-radius: 14px;
      }

      > .info {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: calc(100% - 70px);
        align-items: flex-end;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 4px 20px;

        > .result {
          width: max-content;
          font-size: $fontSize5;
          font-weight: 600;
        }

        > .bottom {
          display: flex;
          @include font_color("font3");
          font-size: $fontSize2;

          > .mode {
            width: max-content;
            margin: 0 20px;
            @include font_color("fill11");
          }

          > .time {
            width: max-content;
          }
        }
      }
    }
  }
}
</style>