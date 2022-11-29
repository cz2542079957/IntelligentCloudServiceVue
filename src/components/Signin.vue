<template>
  <div class="signin">
    <div class="box">
      <input type="text">
      <input type="text">
      <el-button round>Round</el-button>
    </div>
    <div class="switch pointer">
      注册
    </div>
    <div class="forget pointer">
      忘记密码
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
.signin {
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  @include fill_color("fill2");

  > .box {
    position: absolute;
    top: calc(50vh - 220px);
    left: calc(50vw - 300px);
    width: 350px;
    height: 350px;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
      25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
      inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 67% 33% 61% 39% / 42% 62% 38% 58%;

    &:hover {
      border-radius: 50%;
    }

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
  }

  > .switch {
    position: absolute;
    top: calc(50vh - 220px);
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

    &:hover {
      border-radius: 50%;
      color: #000000;
    }
  }

  > .forget {
    position: absolute;
    top: calc(50vh);
    left: calc(50vw + 110px);
    width: 140px;
    height: 140px;
    background-color: rgb(198, 29, 255);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
      15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05),
      inset -10px -10px 15px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 82% 18% 38% 62% / 40% 49% 51% 60%;
    font-size: $fontSize6;
    color: #dedede;
    font-weight: 600;
    letter-spacing: 3px;

    &:hover {
      border-radius: 50%;
      color: #ffffff;
    }
  }
}
</style>