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
      <el-menu-item index="1" @click="goindex">首页</el-menu-item>
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
                <el-menu-item index="2" @click="goaccountsetting">
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
          <el-form style="width: 72%;text-align: center" ref="infoform" :model="infoform" label-width=auto>
            <el-form-item label="昵称：">
              <el-input v-model="infoform.user_nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-input v-model="infoform.user_sex"></el-input>
            </el-form-item>
            <el-form-item label="生日：">
              <el-input v-model="infoform.user_birth"></el-input>
            </el-form-item>
            <el-form-item label="家乡：">
              <el-input v-model="infoform.user_town"></el-input>
            </el-form-item>
            <el-form-item label="居住地：">
              <el-input v-model="infoform.user_address"></el-input>
            </el-form-item>
            <el-form-item label="婚姻：">
              <el-input v-model="infoform.user_marry"></el-input>
            </el-form-item>
            <el-form-item label="职位：">
              <el-input v-model="infoform.user_positon"></el-input>
            </el-form-item>
            <el-form-item label="单位：">
              <el-input v-model="infoform.user_unit"></el-input>
            </el-form-item>
            <el-form-item label="个性签名：">
              <el-input v-model="infoform.user_signature"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="saveinfo">保存</el-button>
            </el-form-item>
          </el-form>
          <!--<center-content></center-content>-->
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
        _this.infoform.user_nickname = res.data.data.userNickname
        _this.infoform.user_sex = res.data.data.userSex
        _this.infoform.user_birth = res.data.data.userBirth
        _this.infoform.user_town = res.data.data.userTown
        _this.infoform.user_address = res.data.data.userAddress
        _this.infoform.user_marry = res.data.data.userMarry
        _this.infoform.user_positon = res.data.data.userPosition
        _this.infoform.user_unit = res.data.data.userUnit
        _this.infoform.user_signature = res.data.data.userSignature
      }
    )
  },
  data() {
    return {
      activeIndex1: '1',
      infoform: {
        user_nickname: '',
        user_sex: '',
        user_birth: '',
        user_town: '',
        user_address: '',
        user_marry: '',
        user_positon: '',
        user_unit: '',
        user_signature: ''
      }
    }
  },
  methods: {
    saveinfo() {
      const _this = this
      _this.$alert('确定修改个人信息？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            let user = {
              userId: _this.$store.getters.getUser.userId,
              userAddress: _this.infoform.user_address,
              userBirth: _this.infoform.user_birth,
              userMarry: _this.infoform.user_marry,
              userNickname: _this.infoform.user_nickname,
              userPosition: _this.infoform.user_positon,
              userProfilePhoto: null,
              userSex: _this.infoform.user_sex,
              userSignature: _this.infoform.user_signature,
              userTown: _this.infoform.user_town,
              userUnit: _this.infoform.user_unit
            }
            _this.$axios.post('/user/info/change', user).then(res => {
              _this.$alert('信息修改成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
              })
            })
          }
        }
      )
    },
    goindex() {
      this.$router.replace('/')
    },
    goaccountsetting() {
      this.activeIndex1 = '1';
      this.$router.replace('/account/setting')
    }

  }
}
</script>

<style scoped>
.wrap1 {
  display: flex;
  justify-content: flex-start;
}
</style>
