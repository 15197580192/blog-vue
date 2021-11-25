<template xmlns="">
  <div class="login-container" style="width:100%;text-align: center">
    <LoginFirstPage></LoginFirstPage>
    <el-menu
      :default-active="'1'"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#f56c6c"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1">登录</el-menu-item>
    </el-menu>

    <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">登录</p>
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      status-icon
    >
      <el-form-item prop="username" style="width: 24%;margin-left: 38%">
        <el-input v-model="loginForm.username" placeholder="手机号/用户名"></el-input>
      </el-form-item>
      <el-form-item prop="rawPassword" style="width: 24%;margin-left: 38%">
        <el-input type="password" v-model="loginForm.rawPassword" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%">
        <div class="login-info">
          <el-row>
            <el-col :span="12" style="margin-left:0;text-align: left">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:#f56c6c">
                没有账户,<router-link :to="{path: '/register'}" style="text-decoration: none;color: #409EFF">立即注册</router-link>
              </p>
            </el-col>
            <el-col :span="12" style="margin-left:0;text-align: right">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:#f56c6c">
                <router-link :to="{path: '/forget'}" style="text-decoration: none;color: #409EFF">忘记密码</router-link>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: left">
        <el-checkbox v-model="loginForm.rememberMe" style="color:#a0a0a0;margin:0 0 20px 0">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: center">
        <el-button type="danger" @click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import LoginFirstPage from "../components/LoginFirstPageHead";
export default {
  name: 'LoginPage',
  components: {LoginFirstPage},
  activated () {
    if(this.$store.getters.getUser!=null) this.loginForm.hasLogin=true
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
    return {
      input: '',
      loginForm: {
        username: '',
        rawPassword: '',
        rememberMe: false,
        hasLogin: false
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'change' }
        ],
        rawPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: Check, required: true }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      let user = {
        userId: this.loginForm.username,
        userPassword: this.loginForm.rawPassword
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const _this = this
          this.$axios.post('/login', user).then(res => {
            const token = res.headers['authorization']
            // console.log(res.data.data)
            _this.$store.commit('SET_TOKEN', token)
            _this.$store.commit('SET_USERINFO', res.data.data)
            _this.$router.push('/')
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
