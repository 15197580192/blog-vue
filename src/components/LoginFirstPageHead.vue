<template>
  <div>
    <el-row>
      <el-col :span="1" style="margin-left:10px">
        <div>
          <img src='../assets/logored.png' height="70">
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c" @click="goIndex" >简学独立博客系统</p>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input v-model="input" style="margin-left:0px;margin-top:10px" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-button style="margin-left:0;margin-top:10px" type="info" @click="getValue">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div style="display: flex;justify-content:center" v-show="user.hasLogin">
          <div> <el-link :underline="false" type="danger" style="margin-top: 20px">消息</el-link></div>
          <el-dropdown class="new-dropdown">
            <div><el-avatar :size="60" :src='user.avatar' style="margin-left: 20px"></el-avatar></div>
            <el-dropdown-menu slot="dropdown" v-if="user.hasLogin">
              <el-dropdown-item @click.native="userInfo">账户中心</el-dropdown-item>
              <el-dropdown-item @click.native="selfPage">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="margin-left: 20px;margin-top: 20px">{{user.username}}</div>
          <el-link v-if="!user.hasLogin"><router-link :to="{name: 'LoginPage'}">点击登陆</router-link></el-link>
        </div>
        <div v-show="!user.hasLogin">
          <el-button type="danger" style="margin-top:10px" @click="$router.push('/login')" v-show="!user.hasLogin">登录</el-button>
          <el-button type="danger" style="margin-top:10px" @click="$router.push('/register')" v-show="!user.hasLogin">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginFirstPage',
  data () {
    return {
      input: '',
      user: {
        username: '',
        avatar: '',
        hasLogin: false
      }
    }
  },
  activated () {
    if (this.$store.getters.getUser.userId) {
      const _this = this
      let user = {
        userId: _this.$store.getters.getUser.userId
      }
      this.$axios.post('/user/info', user).then(res => {
        // 同步昵称
        _this.user.avatar = res.data.data.userProfilePhoto
        // 同步头像
        _this.user.username = res.data.data.userNickname
        _this.user.hasLogin = true
      })
    }
  },
  components: {
  },
  methods: {
    logout () {
      const _this = this
      this.$axios.get('/logout', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then((res) => {
        _this.$store.commit('REMOVE_INFO')
        console.log(this.$store.getters.getUser)
        location.reload()
      })
    },
    userInfo () {
      this.$router.replace('/user/info')
    },
    goIndex () {
      this.$router.replace('/')
    },
    selfPage () {
      this.$router.replace('/page/self')
    },
    getValue () {
      console.log(this.input)
      if (this.input.length === 0 || this.input.split(' ').join('').length === 0) {
        this.$router.replace('/')
      } else {
        this.$router.replace('/search/' + this.input)
      }
      if (this.$route.path.substring(1, 7) === 'search') {
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 50px;
  background-color: #909399;
  display: flex;
}
</style>
