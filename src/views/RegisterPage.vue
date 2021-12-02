<template>
  <div class="login-container" style="width:100%;text-align: center">
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-menu
      :default-active="'1'"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#f56c6c"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1">注册</el-menu-item>
    </el-menu>
    <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">注册</p>
    <el-form
      ref="registerForm"
      class="register-form"
      :model="registerForm"
      :rules="registerRules"
      status-icon
    >
      <el-form-item prop="telenum" style="width: 24%;margin-left: 38%">
        <el-input v-model="registerForm.telenum" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="rawPassword" style="width: 24%;margin-left: 38%">
        <el-input type="password" v-model="registerForm.rawPassword" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="rePassword" style="width: 24%;margin-left: 38%">
        <el-input type="password" v-model="registerForm.rePassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="verify" style="width: 24%;margin-left: 38%">
        <div style="display: flex;justify-content:space-between">
          <el-input style="width:55%" v-model="registerForm.verify" placeholder="验证码"></el-input>
          <el-button type="danger" style="width: 40%" @click="getCode">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%">
        <div class="register-info">
          <el-row>
            <el-col :span="12" style="margin-left:0;text-align: left">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:#f56c6c">
                已有账户,
                <router-link :to="{path: '/login'}" style="text-decoration: none;color: #409EFF">立即登录</router-link>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: center">
        <el-button type="danger" @click="onSubmit(registerForm)">注册</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import LoginFirstPageHead from '../components/LoginFirstPageHead'

export default {
  name: 'RegisterPage',
  components: {LoginFirstPageHead},
  activated () {
    console.log('activated')
  },
  data () {
    const Check = (r, v, b) => { // r-rule，v-value，b-callback
      // 密码中必须包含字母（不区分大小写）、数字，至少6个字符，最多16个字符；
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      }
      b() // 注意需要回调否则验证成功不跳转
    }

    const ReCheck = (r, v, b) => { // r-rule，v-value，b-callback
      // 密码中必须包含字母（不区分大小写）、数字，至少6个字符，最多16个字符；
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      }
      if (!(v === this.registerForm.rawPassword)) {
        return b(new Error('请输入与上一栏相同的密码')) // 重复密码不一致的回调
      }
      b() // 注意需要回调否则验证成功不跳转
    }
    return {
      input: '',
      registerForm: {
        telenum: '',
        rawPassword: '',
        rePassword: '',
        verify: '',
        code: ''
      },
      registerRules: {
        telenum: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的11位手机号码', trigger: 'change'}
        ],
        rawPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: Check, required: true}
        ],
        rePassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: ReCheck, required: true}
        ],
        verify: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      let user = {
        userId: this.registerForm.telenum,
        userPassword: this.registerForm.rawPassword,
        code: this.registerForm.verify
      }
      this.$refs.registerForm.validate(valid => {
        if (this.registerForm.verify === this.registerForm.code) {
          if (valid) {
            const _this = this
            this.$axios.post('/user/register', user).then(res => {
              console.log(res.data)
              if (res.status === 200) {
                _this.$alert('注册成功,请登陆', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/login')
                  }
                })
              } else {
                _this.$alert('注册失败')
              }
            })
          } else {
            console.log('error submit')
            return false
          }
        } else {
          this.$alert('验证码错误')
        }
      })
    },
    getCode () {
      let user = {
        userId: this.registerForm.telenum
      }

      this.$axios.post('/user/code', user).then(res => {
        this.registerForm.code = res.data.data
        this.$alert('验证码已发送', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  }
}

</script>

<style scoped>

</style>
