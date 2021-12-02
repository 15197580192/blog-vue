<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-container style="height: 800px">
      <el-header style="height: 50px">
        <common-tag></common-tag>
      </el-header>
      <el-container style="height: 1200px">
        <el-aside style="width: 14% ; margin-left: 20px;margin-top: 10px">
          <el-row class="tac" style="margin-left:0px">
            <el-col :span="24">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                background-color="#F6F7FA"
                text-color="#707070"
                active-text-color="#f56c6c">
                <el-menu-item index="1" @click="newBlog">
                  写博
                </el-menu-item>
                <el-menu-item index="2" @click="myBlog">
                  我的博客
                </el-menu-item>
                <el-menu-item index="3" @click="myAttention">
                  关注
                </el-menu-item>
                <el-menu-item index="4" @click="myCollect">
                  收藏
                </el-menu-item>
                <el-menu-item index="5" @click="myPraise">
                  我的点赞
                </el-menu-item>
                <el-menu-item index="6" @click="myComment">
                  我的评论
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main style="width: 72%">
          <center-content></center-content>
        </el-main>
        <el-main style="width: 14%">
          <right-content></right-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoginFirstPageHead from '../components/LoginFirstPageHead'
import CommonTag from '../components/home0/CommonTag'
import LeftTag from '../components/home0/LeftTag'
import CenterContent from '../components/home0/CenterContent'
import RightContent from '../components/home0/RightContent'

export default {
  name: 'LoginFirstPage',
  components: {
    LoginFirstPageHead,
    CenterContent,
    CommonTag,
    LeftTag,
    RightContent
  },
  data () {
    return {
      activeIndex: '0'
    }
  },
  created () {
    this.setCurrentRoute()
  },
  activated () {
    this.activeIndex = '0'
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  methods: {
    newBlog () {
      this.activeIndex = '0'
      if (this.$store.getters.getUser) {
        this.$router.replace('/blog/add')
      } else this.$router.replace('/login')
    },
    myBlog () {
      if (this.$store.getters.getUser) {
        this.$router.replace('/my/blogs/' + this.$store.getters.getUser.userId)
      } else this.$router.replace('/login')
      this.activeIndex = '1'
    },
    myAttention () {
      this.activeIndex = '0'
      if (this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myCollect () {
      this.activeIndex = '0'
      if (this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myPraise () {
      this.activeIndex = '0'
      if (this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myComment () {
      this.activeIndex = '0'
      if (this.$store.getters.getUser) {
        this.$router.replace('/my/comments/' + this.$store.getters.getUser.userId)
        this.loadIndex(6)
      } else this.$router.replace('/login')
    },
    setCurrentRoute () {
      this.activeIndex = this.$route.path // 通过他就可以监听到当前路由状态并激活当前菜单
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
