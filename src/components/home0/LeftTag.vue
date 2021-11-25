<template>
  <el-row  class="tac" style="margin-left:0px">
    <el-col :span="24">
      <el-menu
        default-active="activeIndex"
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
</template>

<script>
export default {
  name: 'LeftTag',
  data() {
    return {
      activeIndex:'0'
    }
  },
  activated() {
    this.activeIndex='0'
  },
  methods: {
    newBlog() {
      this.activeIndex='0'
      if(this.$store.getters.getUser)
        this.$router.replace('/blog/add')
      else this.$router.replace('/login')
    },
    myBlog() {
      if(this.$store.getters.getUser)
        this.$router.replace('/myblogs/'+this.$store.getters.getUser.userId)
      else this.$router.replace('/login')
      this.activeIndex='1'
    },
    myAttention() {
      this.activeIndex='0'
      if(this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myCollect() {
      this.activeIndex='0'
      if(this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myPraise() {
      this.activeIndex='0'
      if(this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    },
    myComment() {
      this.activeIndex='0'
      if(this.$store.getters.getUser) ;
      else this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>

</style>
