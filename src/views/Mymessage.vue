<template>
  <div>
    <headtag></headtag>
    <div>
      <el-menu
        :default-active="'5'"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#F56C6C"
        text-color="#ffffff"
        active-text-color="#ffffff">
        <el-menu-item index="1" @click="$router.push('/login')">首页</el-menu-item>
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
        <el-menu-item index="3" @click="$router('login')">新闻</el-menu-item>
        <el-menu-item index="4" @>热门</el-menu-item>
        <el-menu-item index="5" @>个人中心</el-menu-item>
      </el-menu>
      <div id="centerhead">
        <el-row>
          <el-col :span="2" align="left">
            <h4 style="width: 100%">我的消息</h4>
          </el-col>
          <el-col :span="20">
            <div>
              <p></p>
            </div>
          </el-col>
          <el-col :span="1" align="right" style="margin-left:45px">
            <h4 @click="$router.replace('/')">返回</h4>
          </el-col>
        </el-row>
      </div>
      <div>
        <div id="leftcomment" style="width: 48%;float: left;margin-top: 10px;height: 500px;background-color: #F6F7FA;border-right: 1px solid">
          <p align="left" style="float: left;margin-left: 10px;width: 50%">收到的评论</p>
          <p @click="this.gomycom" style="float: right;margin-right: 10px">更多</p>
          <div id="comment" style="float: left;margin-left: 10px;background-color: #fdf6ec;width: 95%;height: 80%">
            <p v-if="comments.length == 0">暂时没有评论</p>
            <div v-for="blog in comments.slice(0,4)" v-bind:key="blog">
              <div style="text-align: left;height: auto;width: 95%;margin-top: 5px;border: 1px solid">
                <p><router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">{{blog.blogTitle}}</router-link></p>
                <el-input readonly type="textarea" autosize="{ minRows: 2, maxRows: 8 }" v-model="blog.commentContent" resize="none"></el-input>
                <p1 style="float: left">评论时间：{{blog.commentDate.substring(0,10)}}&nbsp;{{blog.commentDate.substring(11,20)}}</p1>
              </div>
            </div>
          </div>
          </div>
        <div id="rightmes" style="float: right;height: 500px;background-color: #F6F7FA;width: 48%;margin-top: 10px;border-left: 1px solid">
          <div id="dianzan" style="margin: 10px;height: 48%;background-color: #fdf6ec">
            <p align="left" style="float: left;margin-left: 5px;width: 50%">新增点赞</p>
            <p @click="this.gomygz" style="float: right;margin-right: 10px;bottom: 0">更多</p>
            <p v-if="dianzan.length == 0" align="center" style="float: left;margin-left: 5px;width: 100%">暂时没有点赞</p>
            <div v-for="blog in dianzan.slice(0,2)" v-bind:key="blog">
              <p><router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">{{blog.blogTitle}}</router-link></p>
              <p style="float: left">点赞时间：{{blog.commentDate.substring(0,10)}}&nbsp;{{blog.commentDate.substring(11,20)}}</p>
            </div>
          </div>
          <div id="guanzhu" style="margin: 10px;height: 48%;background-color: #fdf6ec">
            <p align="left" style="float: left;margin-left: 5px;width: 100%">新增关注</p>
            <p v-if="guanzhu.length == 0" align="center" style="float: left;margin-left: 5px;width: 100%">暂时没有粉丝</p>
            <div v-for="user in guanzhu.slice(0,3)" v-bind:key="user">
              <p>{{user.usernickname}}</p>
              <p style="float: left">关注时间：{{user.gztime.substring(0,10)}}&nbsp;{{user.gztime.substring(11,20)}}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import headtag from '../components/LoginFirstPageHead'
export default {
  name: 'Mymessage',
  components: {
    headtag
  },
  activated () {
    this.userId = this.$store.getters.getUser.userId
    const _this = this
    this.$axios.get('/getComments/?currentPage=' + '1' + '&userId=' + _this.userId).then((res) => {
      console.log(res.data.data.records)
      _this.comments = res.data.data.records
      _this.total = res.data.data.total
    })
  },
  data () {
    return {
      total: 0,
      comments: [],
      dianzan: [],
      guanzhu: [],
      userId: this.$route.params.userId
    }
  },
  methods: {
    gomycom () {
      this.$router.replace('/mycomments/'+this.userId)
    },
    gomygz () {
    }
  }
}
</script>

<style scoped>
#centerhead{
  border-bottom: 2px solid;
}
#centerleft{
  border-right: 2px solid;
}
</style>
