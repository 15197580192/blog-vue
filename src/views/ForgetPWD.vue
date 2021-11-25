<template>
  <div class="foget-container">
    <el-row>
      <el-col :span="1" style="margin-left:10px">
        <img src="../assets/logored.png" height="70"></img>
      </el-col>
      <el-col :span="6">
        <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">简学独立博客系统</p>
      </el-col>
    </el-row>
    <el-menu
      :default-active="''"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#f56c6c"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1" @click="$router.push('/')">首页</el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="1" style="margin-left:5px;margin-top: 10px">
        <el-button size="mini" @click="$router.push('/login')">返回</el-button>
      </el-col>
    </el-row>

    <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">忘记密码</p>
    <el-form
      ref="forgetForm"
      class="forget-Form"
      :model="forgetForm"
      :rules="forgetRules"
    >
      <el-form-item style="width: 50%;margin-left: 38%">
        <div class="forget-info">
          <el-row>
            <el-col :span="12" style="margin-left:0;text-align: left">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:black">请输入与要找回的账户关联的手机号</p>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item prop="phonenumber" style="width: 24%;margin-left: 38%">
        <el-input v-model="forgetForm.phonenumber" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="newpassword1" style="width: 24%;margin-left: 38%">
        <el-input v-model="forgetForm.newpassword1" show-password placeholder="输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="newpassword2" style="width: 24%;margin-left: 38%">
        <el-input v-model="forgetForm.newpassword2" show-password placeholder="再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="activeword" style="width: 24%;margin-left: 38%">
        <el-input type="text" style="width: 61%" v-model="forgetForm.activeword" placeholder="验证码"></el-input>
        <el-button style="width: 37%" @click="yzmclean">获取验证码</el-button>
        <!--将手机号传送过去再根据返回的参数判断是否是正确的电话号码-->
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: center">
        <el-button type="danger" @click="submit">修改完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ForgetPWD',
  activated () {
    console.log('activate')
    this.empty()
  },
  data () {
    const Check = (r, v, b) => { // r-rule，v-value，b-callback
      // 密码中必须包含字母（不区分大小写）、数字，至少6个字符，最多16个字符；
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      } else {
        b() // 注意需要回调否则验证成功不跳转
      }
    }
    const Check1 = (r, v, b) => {
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      }
      if (!(v === this.forgetForm.newpassword1)) {
        return b(new Error('请输入与上一栏相同的密码'))
      } else {
        b()
      }
    }
    return {
      input: '',
      activeword_t: '',
      checkId: '',
      forgetForm: {
        phonenumber: '',
        activeword: '',
        newpassword1: '',
        newpassword2: ''
      },
      forgetRules: {
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'change' }
        ],
        newpassword1: [
          {required: true, message: '请输入密码'},
          {validator: Check, required: true}
        ],
        newpassword2: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: Check1, required: true}
        ]
      }
    }
  },
  methods: {
    submit () {
      let dto = {
        userId: this.forgetForm.phonenumber,
        code: this.forgetForm.activeword,
        newPassword: this.forgetForm.newpassword1,
        checkId: this.checkId
      }
      console.log(dto)
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          if (!(this.forgetForm.activeword === this.activeword_t)) {
            this.forgetForm.activeword = ''
            alert('验证码错误', '提示', {confirmButtonText: '确定'})
          }
          const _this = this
          this.$axios.post('/user/findcode', dto).then(res => {
            _this.$alert('修改密码成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.empty()
                }
              },
              _this.$router.push('/login')
            )
          })
        } else {
          this.empty()
          console.log('error submit')
          return false
        }
      })
    },
    empty () {
      this.forgetForm.phonenumber = ''
      this.forgetForm.newpassword1 = ''
      this.forgetForm.newpassword2 = ''
      this.forgetForm.activeword = ''
    },
    yzmclean () {
      this.forgetForm.activeword = ''
      let dto = {
        userId: this.forgetForm.phonenumber
      }
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          const _this = this
          this.$axios.post('/user/getcode', dto).then(res => {
            _this.$alert('验证码发送成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.activeword_t = res.data.data
                  _this.checkId = _this.forgetForm.phonenumber
                  console.log(this.activeword_t)
                  console.log(this.checkId)
                }
              }
            )
          })
        } else {
          console.log('ERROR')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
