<template>
  <div
    class="defogging"
    ref="defogging"
  >
    <img :src="config.input.url">
    <div class="options">
      <el-upload
        ref="defoggingLoader"
        :limit="1"
        :on-change="config.change"
        :auto-upload="false"
        :show-file-list="false"
      >
        <template #trigger>
          <div class="btn pointer">选择图片</div>
        </template>
      </el-upload>
      <div
        class="btn pointer"
        @click="config.insideDefogging"
      >
        室内去雾
      </div>
      <div
        class="btn pointer"
        @click="config.outsideDefogging"
      >
        室外去雾
      </div>
    </div>
    <img :src="config.output.url">
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance, reactive } from "vue";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "../utils/registrationCenter";
const { proxy } = getCurrentInstance() as any;
const userData = useUserDataStore();

var config = reactive({
  loading: null,
  defultImage: "src/assets/image/global/upload.svg",
  input: { url: "src/assets/image/global/upload.svg", file: null },
  output: { url: "src/assets/image/global/upload.svg" },
  change: (file: any) => {
    proxy.$refs.defoggingLoader.clearFiles();
    config.input.url = getUtils().FileConvertor.file2Blob(file.raw);
    config.input.file = file.raw;
  },
  insideDefogging: () => {
    config.upload(1);
  },
  outsideDefogging: () => {
    config.upload(2);
  },
  upload: (mode: number) => {
    if (config.input.url == config.defultImage || !config.input.file) {
      getUtils().elMessage({ message: "请选择图片", type: "warning" });
      return;
    }
    if (!userData.isSignin) {
      getUtils().elMessage({ message: "请先登录", type: "warning" });
      return;
    }
    config.loading = getUtils().elLoading({
      node: proxy.$refs.defogging,
      text: "正在拼命运算中...",
    });
    let formData = new FormData();
    formData.append("file", config.input.file);
    formData.append("username", userData.username);
    let url =
      mode == 1
        ? "ics/predict/insideDefogging"
        : "ics/predict/outsideDefogging";
    getUtils()
      .$post({
        url,
        data: formData,
        config: {
          headers: {
            ContentType: 2,
          },
        },
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        if (data?.code == 0) {
          config.output.url = getUtils().staticUrl + data.data;
          config.loading?.close();
          getUtils().elNotification({
            message: "图像去雾完成",
            type: "success",
          });
        }
        getUtils().stateCodeHandler(data);
      });
  },
});
</script>

<style lang='scss' scoped>
.defogging {
  width: 100%;
  height: 100%;
  @include fill_color("fill4");
  font-size: $fontSize6;
  @include font_color("font1");
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 60px 30px;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;

  > img {
    width: 240px;
    height: 240px;
    margin: 20px 40px;
    border-radius: 14px;
  }

  > .options {
    width: max-content;
    .btn {
      @include btn();
      margin: 10px 0;
    }
  }
}
</style>