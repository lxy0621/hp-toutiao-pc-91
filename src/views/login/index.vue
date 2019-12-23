<template>
  <div id="app">
    <div class="container-login">
      <el-card class="my-card">
      </el-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height:100%;
  // background-color: #ccc;
  background: url(../../assets/background-pic.jpg)no-repeat center / cover;
  position: absolute;
  top:0;
  left:0
}
.my-card{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
      display: block;
      width: 200px;
      margin: 0 auto;
    }
  }
</style>
