<template>
  <div class="nav">
    <div class="img pointer">
      <template v-if="!userData.isSignin">
        <img
          @click="goToSignin"
          src="../assets/image/global/signin.svg"
        >
      </template>
      <template v-else>
        <img :src="getUtils().DefaultHeadImage.show(userData.username)">
      </template>
    </div>
    <div class="username ">
      {{userData.isSignin ? userData.username  : "请登录"}}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance } from "vue";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "../utils/registrationCenter";
const { proxy } = getCurrentInstance() as any;
const userData = useUserDataStore();
const props = defineProps(["signin"]);
const emits = defineEmits(["update:signin"]);

function goToSignin() {
  proxy.$emit("update:signin", true);
}
</script>

<style lang='scss' scoped>
.nav {
  position: fixed;
  top: 10px;
  right: 10px;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 20;

  &:hover > .username {
    opacity: 1;
    transform: translateY(50px);
  }

  &:hover > .img {
    transform-origin: right top;
    transform: scale(2);
  }

  > .img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    transition-duration: 320ms;

    > img {
      height: 100%;
      width: 100%;
      border-radius: 10px;
    }
  }

  > .username {
    text-align: center;
    width: 100px;
    font-size: $fontSize4;
    box-sizing: border-box;
    padding: 2px 0;
    opacity: 0;
    transition-duration: 300ms;
    word-wrap: break-word;
    line-break: anywhere;
  }
}
</style>