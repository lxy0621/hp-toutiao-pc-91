<template>
  <div id="app">
    <div class="container-login">
      <el-card class="my-card">
        <img src="../../assets/logo_index.png" alt="">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.code" placeholder="请输入验证吗" style="width:238px;margin-right:10px"></el-input>
            <el-button>发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox  :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobille: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height:100%;
  // background-color: #ccc;
  background: url(../../assets/bgc.jpg)no-repeat center / cover;
  position: absolute;
  top:0;
  left:0
}
.my-card{
    width: 400px;
    height: 350px;
    background-color: rgba(255, 255, 255, .7);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
      display: block;
      width: 200px;
      margin: 0 auto 26px;
    }
  }

</style>
