<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-menu
      :default-active="'5'"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#F56C6C"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1" @click="goIndex">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-submenu index="2-1">
          <template slot="title">分类1</template>
          <el-menu-item index="2-1-1">内容1</el-menu-item>
          <el-menu-item index="2-1-2">内容2</el-menu-item>
          <el-menu-item index="2-1-3">内容3</el-menu-item>
          <el-menu-item index="2-1-4">内容4</el-menu-item>
          <el-menu-item index="2-1-5">内容5</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">分类2</template>
          <el-menu-item index="2-2-1">内容1</el-menu-item>
          <el-menu-item index="2-2-2">内容2</el-menu-item>
          <el-menu-item index="2-2-3">内容3</el-menu-item>
          <el-menu-item index="2-2-4">内容4</el-menu-item>
          <el-menu-item index="2-2-5">内容5</el-menu-item>
        </el-submenu>
        <el-submenu index="2-3">
          <template slot="title">分类3</template>
          <el-menu-item index="2-3-1">内容1</el-menu-item>
          <el-menu-item index="2-3-2">内容2</el-menu-item>
          <el-menu-item index="2-3-3">内容3</el-menu-item>
          <el-menu-item index="2-3-4">内容4</el-menu-item>
          <el-menu-item index="2-3-5">内容5</el-menu-item>
        </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">分类4</template>
          <el-menu-item index="2-4-1">内容1</el-menu-item>
          <el-menu-item index="2-4-2">内容2</el-menu-item>
          <el-menu-item index="2-4-3">内容3</el-menu-item>
          <el-menu-item index="2-4-3">内容4</el-menu-item>
          <el-menu-item index="2-4-3">内容5</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">新闻</el-menu-item>
      <el-menu-item index="4">热门</el-menu-item>
      <el-menu-item index="5">账户中心</el-menu-item>
    </el-menu>
    <el-container style="height: 800px">
      <el-container style="height: 1200px">
        <el-aside style="width: 14% ;margin-left: 0px;margin-top: 10px">
          <el-row class="tac" style="margin-left:0px">
            <el-col :span="24">
              <el-menu
                default-active="activeIndex1"
                class="el-menu-vertical-demo"
                background-color="#F6F7FA"
                text-color="#707070"
                active-text-color="#f56c6c">
                <el-menu-item index="1">
                  个人资料
                </el-menu-item>
                <el-menu-item index="2" @click="goAccountSetting">
                  账户设置
                </el-menu-item>
                <el-menu-item index="3">
                  屏蔽管理
                </el-menu-item>
                <el-menu-item index="4">
                  博客设置
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main style="width: 72%;margin-left: 14%;margin-top: 20px">
          <el-form style="width: 72%;text-align: center" ref="infoForm" :model="infoForm" :rules="infoRule"
                   label-width=auto>
            <el-form-item label="昵称：" prop="nickname">
              <el-input v-model="infoForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别：" style="text-align: left">
              <el-radio v-model="infoForm.sex" label="男">男</el-radio>
              <el-radio v-model="infoForm.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="生日：">
              <el-date-picker
                v-model="infoForm.birth"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="家乡：" prop="town">
              <el-input v-model="infoForm.town"></el-input>
            </el-form-item>
            <el-form-item label="居住地：" prop="address">
              <el-input v-model="infoForm.address"></el-input>
            </el-form-item>
            <el-form-item label="婚姻：" prop="marry">
              <el-input v-model="infoForm.marry"></el-input>

            </el-form-item>
            <el-form-item label="职位：" prop="position">
              <el-input v-model="infoForm.position"></el-input>
            </el-form-item>
            <el-form-item label="单位：" prop="unit">
              <el-input v-model="infoForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="个性签名：" prop="signature">
              <el-input v-model="infoForm.signature"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="saveInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </el-main>
        <el-main style="width: 14%">
          <right-content></right-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoginFirstPageHead from '../components/LoginFirstPageHead' ;
import RightContent from '../components/home0/RightContent' ;

export default {
  name: 'UserProfile',
  components: {
    LoginFirstPageHead,
    RightContent
  },
  activated() {
    const _this = this
    let user = {
      userId: _this.$store.getters.getUser.userId
    }
    this.$axios.post('/user/info', user).then(res => {
        console.log(res.data)
        _this.infoForm.nickname = res.data.data.userNickname
        _this.infoForm.sex = res.data.data.userSex
        _this.infoForm.birth = res.data.data.userBirth
        _this.infoForm.town = res.data.data.userTown
        _this.infoForm.address = res.data.data.userAddress
        _this.infoForm.marry = res.data.data.userMarry
        _this.infoForm.position = res.data.data.userPosition
        _this.infoForm.unit = res.data.data.userUnit
        _this.infoForm.signature = res.data.data.userSignature
      }
    )
  },
  data() {
    return {
      activeIndex1: '1',
      infoForm: {
        nickname: '',
        sex: '男',
        birth: '',
        town: '',
        address: '',
        marry: '',
        position: '',
        unit: '',
        signature: ''
      },
      infoRule: {
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, max: 20, message: '字符长度为0-20', trigger: 'change'}
        ],
        town: [
          {min: 0, max: 20, message: '字符长度为0-20', trigger: 'change'}
        ],
        address: [
          {min: 0, max: 20, message: '字符长度为0-20', trigger: 'change'}
        ],
        marry: [
          {min: 0, max: 4, message: '字符长度为0-4', trigger: 'change'}
        ],
        position: [
          {min: 0, max: 20, message: '字符长度为0-20', trigger: 'change'}
        ],
        unit: [
          {min: 0, max: 20, message: '字符长度为0-20', trigger: 'change'}
        ],
        signature: [
          {min: 0, max: 30, message: '字符长度为0-30', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    saveInfo() {
      const _this = this
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          if (confirm("确定修改信息？")) {
            let user = {
              userId: _this.$store.getters.getUser.userId,
              userAddress: _this.infoForm.address,
              userBirth: _this.infoForm.birth,
              userMarry: _this.infoForm.marry,
              userNickname: _this.infoForm.nickname,
              userPosition: _this.infoForm.position,
              userProfilePhoto: null,
              userSex: _this.infoForm.sex,
              userSignature: _this.infoForm.signature,
              userTown: _this.infoForm.town,
              userUnit: _this.infoForm.unit
            }
            _this.$axios.post('/user/info/change', user).then(res => {
              _this.$alert('信息修改成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  location.reload()
                }
              })
            })
          }

        }
      })
    },
    goIndex() {
      this.$router.replace('/')
    },
    goAccountSetting() {
      this.activeIndex1 = '1';
      this.$router.replace('/account/setting')
    }

  }
}
</script>

<style>
.wrap1 {
  display: flex;
  justify-content: flex-start;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #f56c6c !important;
}

.el-radio__input.is-checked .el-radio__inner {
  background: #f56c6c !important;
  border-color: #f56c6c !important;
}
</style>
