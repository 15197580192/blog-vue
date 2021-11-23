<template>
  <div class="change-container" style="width:100%;text-align: center" @keyup="submin">
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
        <el-button size="mini" @click="$router.push('/forget')">返回</el-button>
      </el-col>
    </el-row>
    <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">修改密码</p>
    <el-form
      ref="changeForm"
      :model="changeForm"
      :rules="changeRules"
    >
      <el-form-item style="width: 50%;margin-left: 38%">
        <div class="change-info">
          <el-row>
            <el-col :span="12" style="margin-left:0;text-align: left" >
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:black">请输入原密码及新密码</p>
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:black">密码中必须包含字母（不区分大小写）、数字，至少6个字符，最多16个字符</p>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item prop="oldpassword" style="width: 24%;margin-left: 38%">
        <el-input class="" type="password" show-password style="width: 90%" v-model="changeForm.oldpassword" placeholder="原密码"></el-input>
        <el-lable class="important" >*</el-lable>
      </el-form-item>
      <el-form-item prop="newpassword1" style="width: 24%;margin-left: 38%">
        <el-input type="password"  show-password style="width: 90%" v-model="changeForm.newpassword1" placeholder="新密码"></el-input>
        <el-lable class="important" >*</el-lable>
      </el-form-item>
      <el-form-item prop="newpassword2" style="width: 24%;margin-left: 38%">
        <lable>
          <el-input type="password" show-password style="width: 90%" v-model="changeForm.newpassword2" placeholder="请重新输入新密码"></el-input>
          <el-lable class="important" >*</el-lable>
        </lable>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: center">
        <el-button type="danger" v-bind:disabled=xgbut @click="submit('changeForm')">确定修改</el-button>
        <!--在此处如何等上面的内容真确后才能按动按钮-->
        <!--需绑定后才能修改，同时注意是bool-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
  name: 'ChangePWD',
  activated () {
    console.log('activated')
  },
  data () {
    const Check = (r, v, b) => { // r-rule，v-value，b-callback
      // 密码中必须包含字母（不区分大小写）、数字，至少6个字符，最多16个字符；
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      } else {
        if (v === this.changeForm.newpassword1) {
          this.npj1 = 2
        } else {
          this.opj = 2
        }
        b() // 注意需要回调否则验证成功不跳转
      }
    }
    const Check1 = (r, v, b) => {
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/
      if (!reg.test(v)) {
        return b(new Error('密码中必须包含字母、数字、6-16位之间')) // 验证失败的回调
      }
      if (!(v === this.changeForm.newpassword1)) {
        return b(new Error('请输入与上一栏相同的密码'))
      } else {
        this.npj2 = 2
        b()
      }
    }
    return {
      input: '',
      xgbut: Boolean('true'),
      opj: '1',
      npj1: '1',
      npj2: '1',
      changeForm: {
        oldpassword: '',
        newpassword1: '',
        newpassword2: ''
      },
      changeRules: {
        oldpassword: [
          { required: true, message: '该行不能为空', trigger: 'blur' },
          {validator: Check, required: true}
        ],
        newpassword1: [
          { required: true, message: '该行不能为空', trigger: 'blur' },
          {validator: Check, required: true}
        ],
        newpassword2: [
          { required: true, message: '该行不能为空', trigger: 'blur' },
          {validator: Check1, required: true}
        ]
      }
    }
  },
  methods: {
    submin () {
      if (this.npj1 === 2 && this.npj2 === 2 && this.opj === 2) {
        this.xgbut = false
      }
    },
    submit(formName) {
      let dto = {
        userId: this.$store.getters.getUser.userId,
        userPassword: this.changeForm.oldpassword,
        userNewPassword: this.changeForm.newpassword1
      }
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          const _this = this
          this.$axios.post('/user/change', dto).then(res => {
            _this.$alert('修改密码成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$store.commit('REMOVE_INFO')
              }
            },
            _this.$router.push("/login")
            )
          })
        }else {
          console.log('error submit')
          return false
        }
      })

    }
  }
}
</script>

<style scoped>
.important{
  color: red;
}
</style>
