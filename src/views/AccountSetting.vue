<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-menu
      :default-active="'5'"
      class="el-menu-de"
      mode="horizontal"
      background-color="#F56C6C"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1" @click="$router.replace('/')">首页</el-menu-item>
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
                default-active="activeIndex"
                class="el-menu-vertical-demo"
                background-color="#F6F7FA"
                text-color="#707070"
                active-text-color="#f56c6c">
                <el-menu-item index="1" @click="activeIndex='2';$router.push('/user/info')">
                  个人资料
                </el-menu-item>
                <el-menu-item index="2">
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
          <el-form style="width: 72%;text-align: center" ref="infoForm" :model="infoForm" label-width="80px">
            <el-form-item label="头像：">
              <el-row class="demo-avatar demo-basic">
                <el-col :span="5">
                  <div class="demo-basic--circle">
                    <div class="block">
                      <el-avatar :size="60" :src="circleUrl"></el-avatar>
                    </div>
                    <el-button type="danger" icon="el-icon-edit" size="small">修改头像</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="账户：">
              <el-input v-model="infoForm.user_id" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input v-model="infoForm.user_nickname"></el-input>
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="infoForm.user_tel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="saveInfo">保存</el-button>
              <el-button type="danger" @click="$router.push('/password')">修改密码</el-button>
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
  name: 'AccountSetting',
  components: {
    LoginFirstPageHead,
    RightContent
  },
  activated() {
    const _this = this
    _this.infoForm.user_id = _this.$store.getters.getUser.userId
    let user = {
      userId: _this.$store.getters.getUser.userId
    }
    this.$axios.post('/user/info', user).then(res => {
        console.log(res.data)
        _this.circleUrl = res.data.data.userProfilePhoto
        _this.infoForm.user_nickname = res.data.data.userNickname
        _this.infoForm.user_tel = res.data.data.userPhone
      }
    )
  },
  data() {
    return {
      input: '',
      activeIndex: '',
      circleUrl: '',
      infoForm: {
        user_id: '',
        user_nickname: '',
        user_tel: ''
      }
    }
  },
  methods: {
    saveInfo() {
      this.$alert('确定修改个人信息？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            let user = {
              userId: this.$store.getters.getUser.userId,
              userProfilePhoto: this.userProfilePhoto,
              userNickname: this.infoForm.user_nickname,
              userPhone: this.infoForm.user_tel
            }
            this.$axios.post('/user/info/change', user).then(res => {
              this.$alert('信息修改成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            })
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
