<template>
  <div class="container-login" ref="box">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" prop="mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  <!-- 测试ref的代码 -->
  <!-- <div ref="dom">我是dom</div>
  <el-button ref="com"></el-button> -->
  </div>
</template>

<script>
import store from '@/store'

export default {
  mounted () {
    // 生命周期钩子函数，当组件渲染完毕后执行
    // console.log(this.$refs)
    // console.log(this.$refs.dom)
    // console.log(this.$refs['com'])
  },
  data () {
    const checkMobile = (rule, value, callback) => {
      // 实现校验逻辑
      // 是否是合法手机号：第一位数字 只能1 第二位数字 3-9 其余9位数字结尾 即可
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      loginForm: {
        mobille: '',
        code: ''
      },
      loginRules: {
        // 给字段加校验规则（多个）
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入您收到的验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 调用 validate 对整体表进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 校验成功  调用登录接口
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // 成功 跳转
              // 注意 登录 不够完善
              // res.data.data 就是用户信息
              store.setUser(res.data.data)
              this.$router.push('/')
            })
            .catch(() => {
              // 失败 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  // background-color: #ccc;
  background: url(../../assets/bgc2.jpg) no-repeat center / cover;
  position: absolute;
  top: 0;
  left: 0;
}
.my-card {
  width: 400px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  z-index: 2;
  img {
    display: block;
    width: 200px;
    margin: 0 auto 26px;
  }
}
</style>
