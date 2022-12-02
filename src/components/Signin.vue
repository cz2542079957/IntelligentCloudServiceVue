<template>
  <div class="signin">
    <div
      class="back pointer"
      @click="config.back"
    >
      返回
    </div>
    <div class="box">
      <div :class="(config.titleIdx == 0 ? 'signinTitle' : 'signupTitle') + ' unselectable'">
        <div class="title">{{config.title[0]}}</div>
        <div class="title">{{config.title[1]}}</div>
      </div>
      <input
        type="text"
        placeholder="用户名"
        maxlength="24"
      >
      <el-upload
        ref="selectPasswordImage"
        class="selectPasswordImage"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="data.onchange"
      >
        <template #trigger>
          <div class="
            btn
            pointer
            unselectable">{{data.passwordImage ? "已选择" : "密码图像"}}
          </div>
        </template>
      </el-upload>
      <div class="
        btn 
        pointer
        unselectable">开始
      </div>
    </div>
    <div
      class="switch pointer unselectable"
      @click="config.switch"
    >
      {{config.title[config.titleIdx == 0 ? 1 : 0 ]}}
    </div>
    <div class="forget pointer unselectable">
      忘记密码
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
const { proxy } = getCurrentInstance() as any;

const props = defineProps(["signin"]);
const emit = defineEmits(["update:signin"]);

var config = reactive({
  title: ["登录", "注册"],
  titleIdx: 0,
  //登录 or 注册
  switch: () => {
    if (config.titleIdx === 0) {
      config.titleIdx = 1;
    } else {
      config.titleIdx = 0;
    }
  },
  //返回
  back: () => {
    proxy.$emit("update:signin", false);
  },
});

//保存输入数据
var data = reactive({
  username: "", //存放用户名
  passwordImage: null, // 存放图片
  //选择图片时
  onchange: (file) => {
    proxy.$refs.selectPasswordImage.clearFiles();
    console.log(file);
    data.passwordImage = file.raw;
    // 发送请求
    let formdata = new FormData();
    formdata.append("file", file.raw);
    formdata.append("username", data.username);
    proxy
      .$post({
        url: "ics/auth/signup",
        data: formdata,
        config: {
          headers: {
            ContentType: 1,
          },
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

onMounted(() => {});
</script>

<style lang='scss' scoped>
$input_border_radius: 10px;

@mixin btn() {
  position: relative;
  display: block;
  border-radius: $input_border_radius;
  border: 1px solid;
  @include border_color("border1");
  color: #efefef;
  background-color: #fd125e;
  box-sizing: border-box;
  letter-spacing: 3px;
  padding: 10px 40px 6px 40px;
  font-size: $fontSize7;
  margin: 5px 0;
  box-shadow: inset 2px 4px 2px rgba(214, 47, 47, 0.05),
    2px 4px 2px rgba(149, 68, 110, 0.05), 4px 5px 5px rgba(0, 0, 0, 0.05),
    inset -2px -2px 4px rgba(234, 218, 218, 0.9);
  transition-duration: 300ms;

  &::before {
    content: "";
    background-color: #efefef;
    width: 80%;
    height: 2px;
    box-shadow: 0 0 3px 2px white;
    position: absolute;
    top: 4px;
    left: 10%;
  }

  &:hover {
    padding: 10px 54px 6px 54px;
  }
}

.signin {
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  @include fill_color("fill2");

  > .back {
    position: absolute;
    top: 0;
    left: 0;
    font-size: $fontSize7;
    font-weight: 600;
    letter-spacing: 2px;
    transition-duration: 400ms;
    background-color: #cdcdcd;
    box-sizing: border-box;
    padding: 10px 40px;
    border-right: 8px solid #cdcdcd;

    &:hover {
      padding: 10px 60px;
      border-right: 8px solid #ff3300;
      background-color: #d9d9d9;
    }
  }

  > .box {
    position: absolute;
    top: calc(50vh - 200px);
    left: calc(50vw - 300px);
    width: 350px;
    height: 350px;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
      25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
      inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 67% 33% 61% 39% / 42% 62% 38% 58%;
    animation: flow 10s infinite linear;

    &::before {
      content: "";
      position: absolute;
      top: 70px;
      left: 85px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #ffffff;
      opacity: 0.9;
    }

    &::after {
      content: "";
      position: absolute;
      top: 110px;
      left: 110px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #ffffff;
      opacity: 0.9;
    }

    > .signinTitle {
      position: relative;
      font-size: $fontSize13;
      @include font_color("font1");
      font-weight: 600;
      letter-spacing: 2px;
      margin: 10px 0;
      height: 40px;
      overflow: hidden;

      > .title {
        height: 40px;
        line-height: 40px;
        transition-duration: 200ms;
      }
    }

    > .signupTitle {
      position: relative;
      font-size: $fontSize13;
      @include font_color("font1");
      font-weight: 600;
      letter-spacing: 2px;
      margin: 10px 0;
      height: 40px;
      overflow: hidden;

      > .title {
        height: 40px;
        line-height: 40px;
        transition-duration: 200ms;
        transform: translateY(-40px);
      }
    }

    > input {
      width: 220px;
      display: block;
      border-radius: $input_border_radius;
      outline: none;
      border: 1px solid;
      @include border_color("border1");
      background-color: #f2f2f2;
      font-size: $fontSize8;
      margin: 5px 0;
      box-sizing: border-box;
      padding: 4px 14px;
      box-shadow: inset 2px 4px 2px rgba(0, 0, 0, 0.05),
        2px 4px 2px rgba(0, 0, 0, 0.05), 4px 5px 5px rgba(0, 0, 0, 0.05),
        inset -2px -2px 4px rgba(255, 255, 255, 0.9);
    }

    > .btn {
      @include btn();
    }

    > .selectPasswordImage {
      .btn {
        @include btn();
        width: 220px;
        background-color: #f2f2f2;
        text-align: center;
        color: black;

        &::before {
          content: "";
          background-color: #cdcdcd;
          width: 80%;
          height: 2px;
          box-shadow: 0 0 2px 1px #cdcdcd;
          position: absolute;
          top: 4px;
          left: 10%;
          transition-duration: 300ms;
        }

        &:hover {
          background-color: #00ccff;
          color: white;
        }

        &:hover::before {
          background-color: #fefefe;
          box-shadow: 0 0 2px 1px #fefefe;
        }
      }
    }
  }

  > .switch {
    position: absolute;
    top: calc(50vh - 200px);
    left: calc(50vw + 100px);
    width: 160px;
    height: 160px;
    background-color: #96f2d7;
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
      15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05),
      inset -10px -10px 15px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50% 50% 77% 23% / 65% 42% 58% 35%;
    font-size: $fontSize8;
    color: #707070;
    font-weight: 600;
    letter-spacing: 3px;
    opacity: 0.5;

    &:hover {
      border-radius: 50%;
      color: #000000;
      opacity: 1;
    }
  }

  > .forget {
    position: absolute;
    top: calc(50vh);
    left: calc(50vw + 110px);
    width: 100px;
    height: 100px;
    background-color: rgb(198, 29, 255);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
      15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05),
      inset -10px -10px 15px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 64% 36% 62% 38% / 43% 31% 69% 57%;
    font-size: $fontSize4;
    color: #dedede;
    font-weight: 600;
    letter-spacing: 1px;
    opacity: 0.5;

    &:hover {
      border-radius: 50%;
      color: #ffffff;
      opacity: 1;
    }
  }
}

@keyframes flow {
  0% {
    border-radius: 67% 33% 61% 39% / 42% 62% 38% 58%;
  }
  20% {
    border-radius: 47% 53% 63% 37% / 49% 30% 70% 51%;
  }
  40% {
    border-radius: 74% 26% 79% 21% / 41% 57% 43% 59%;
  }
  60% {
    border-radius: 53% 47% 68% 32% / 51% 26% 74% 49%;
  }
  80% {
    border-radius: 47% 53% 46% 54% / 22% 65% 35% 78%;
  }
  100% {
    border-radius: 67% 33% 61% 39% / 42% 62% 38% 58%;
  }
}
</style>