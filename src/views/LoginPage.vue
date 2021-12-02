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
                没有账户,
                <router-link :to="{path: '/register'}" style="text-decoration: none;color: #409EFF">立即注册</router-link>
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
        <el-checkbox v-model="loginForm.remember" style="color:#a0a0a0;margin:0 0 20px 0">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: center">
        <el-button type="danger" @click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import LoginFirstPage from "../components/LoginFirstPageHead";
// 引入base64
const Base64 = require('js-base64').Base64
export default {
  name: 'LoginPage',
  components: {LoginFirstPage},
  activated() {
    if (this.$store.getters.getUser != null) this.loginForm.hasLogin = true
  },
  created () {
    // 在页面加载时从cookie获取登录信息
    let username = this.getCookie("username")
    console.log(username)
    let rawPassword = Base64.decode(this.getCookie("rawPassword"))
    console.log(rawPassword)
    // 如果存在赋值给表单，并且将记住密码勾选
    if(username){
      this.loginForm.username = username
      this.loginForm.rawPassword = rawPassword
      this.loginForm.remember = true
    }
  },
  data() {
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
        remember: false,
        hasLogin: false
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的11位手机号码', trigger: 'change'}
        ],
        rawPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: Check, required: true}
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
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

            // 储存token（需要封装拦截器，将token放入请求头中）
            this.setCookie('token',res.headers['authorization'])
            _this.$router.push('/')
            // 储存登录信息
            this.setUserInfo()

          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    // 储存表单信息
    setUserInfo: function () {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if(this.loginForm.remember){
        this.setCookie("username",this.loginForm.username)
        // base64加密密码
        let rawPassword = Base64.encode(this.loginForm.rawPassword)
        this.setCookie("rawPassword",rawPassword)
      }else{
        this.setCookie("username","")
        this.setCookie("rawPassword","")
      }
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }
  }
}

</script>

<style scoped>

</style>
