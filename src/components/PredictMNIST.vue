<template>
  <div
    class="predictMNIST"
    ref="predictMNIST"
  >
    <div class="predict">
      <div class="lowMNIST">
        <div class="title">简易手写体识别</div>
        <div class="upload">
          <img :src="fileLoader.previewLow">
          <el-upload
            ref="uploadLow"
            :limit="1"
            :on-change="fileLoader.changeLow"
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
          @click="fileLoader.uploadLow"
        >开始</div>
      </div>
      <div class="highMNIST">
        <div class="title">高精度手写体识别</div>
        <div class="upload">
          <img :src="fileLoader.previewHigh">
          <el-upload
            ref="uploadHigh"
            :limit="1"
            :on-change="fileLoader.changeHigh"
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
          @click="fileLoader.uploadHigh"
        >
          开始
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
var fileLoader = reactive({
  defultImage: "src/assets/image/global/upload.svg",
  previewLow: "src/assets/image/global/upload.svg",
  fileLow: null,
  previewHigh: "src/assets/image/global/upload.svg",
  fileHigh: null,
  changeLow: (file) => {
    proxy.$refs.uploadLow.clearFiles();
    let url = getUtils().FileConvertor.file2Blob(file.raw);
    fileLoader.previewLow = url;
    fileLoader.fileLow = file;
  },
  changeHigh: (file) => {
    proxy.$refs.uploadHigh.clearFiles();
    let url = getUtils().FileConvertor.file2Blob(file.raw);
    fileLoader.previewHigh = url;
    fileLoader.fileHigh = file;
  },

  uploadLow: () => {
    if (fileLoader.previewLow == fileLoader.defultImage) {
      getUtils().elMessage({ message: "请选择图片", type: "warning" });
      return;
    }
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    //等待
    config.load = getUtils().elLoading({
      node: proxy.$refs.predictMNIST,
      text: "识别中",
    });
    //上传
    let formData = new FormData();
    formData.append("file", fileLoader.fileLow.raw);
    formData.append("username", userData.username);
    getUtils()
      .$post({
        url: "ics/predict/lowMNIST",
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
            url: fileLoader.previewLow,
            result: data.data,
            time: Date.now(),
            mode: "简易",
          });
          fileLoader.previewLow = fileLoader.defultImage;
          fileLoader.fileLow = null;
        }
        config.closeLoad();
        getUtils().stateCodeHandler(data);
      });
  },
  uploadHigh: () => {
    if (fileLoader.previewHigh == fileLoader.defultImage) {
      getUtils().elMessage({ message: "请选择图片", type: "warning" });
      return;
    }
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    //等待
    config.load = getUtils().elLoading({
      node: proxy.$refs.predictMNIST,
      text: "识别中",
    });
    //上传
    let formData = new FormData();
    console.log(fileLoader.fileHigh);
    formData.append("file", fileLoader.fileHigh.raw);
    formData.append("username", userData.username);
    getUtils()
      .$post({
        url: "ics/predict/highMNIST",
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
            url: fileLoader.previewHigh,
            result: data.data,
            time: Date.now(),
            mode: "高精度",
          });
          fileLoader.previewHigh = fileLoader.defultImage;
          fileLoader.fileHigh = null;
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

.predictMNIST {
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

    > .lowMNIST,
    > .highMNIST {
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
        margin: 10px;
      }
    }
  }

  > .history {
    width: 360px;
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
          font-size: $fontSize7;
          font-weight: 600;
        }

        > .bottom {
          display: flex;
          @include font_color("font3");
          font-size: $fontSize3;

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