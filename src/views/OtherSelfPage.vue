<template>
  <div>
    <HeadTag></HeadTag>
    <div>
      <el-menu
        :default-active="'5'"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#F56C6C"
        text-color="#ffffff"
        active-text-color="#ffffff">
        <el-menu-item index="1" @click="$router.push('/')">首页</el-menu-item>
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
        <el-menu-item index="3" @click="$router.replace('/')">新闻</el-menu-item>
        <el-menu-item index="4" @>热门</el-menu-item>
        <el-menu-item index="5" @>个人中心</el-menu-item>
      </el-menu>
    </div>
    <div id="CenterHead">
      <el-row>
        <el-col :span="5" align="left">
          <h4 style="width: 100%">欢迎来到我的主页</h4>
        </el-col>
        <el-col :span="15">
          <div>
            <p></p>
          </div>
        </el-col>
        <el-col :span="3" align="right" style="margin-left:45px">
          <h4><a href="this.$router.go(-1)">返回</a></h4>
        </el-col>
      </el-row>
    </div>
    <div>
      <div id="CenterLeft" style="width: 40%;float: left;margin-top: 10px">
        <div id="UserMes" style="float: left;width: 60%;border: groove">
          <img :src='avatar' style="float:left;
        width: 40%;margin-top: 20px;margin-left: 20px;border: 1px solid"></img>
          <div id="center" style="float: left;margin-top: 20px">
            <p1 style="float: left;margin-left: 20px;margin-right: 20%">用户名称: {{username}}</p1>
            <p1 align="left" style="float:left;margin-left: 20px;margin-right: 50%;width: 100%">注册时间:{{userTime}}</p1>
            <div style="float: left;margin-left: 20px;">
              <p1>关注：{{userAttention}}</p1>
              <!--获取关注数和粉丝数-->
            </div>
            <div style="float:left;border-left: 1px solid;margin-left: 20px">
              <p1 style="margin-left: 20px">粉丝：{{userFans}}</p1>
            </div>
            <textarea row="3" readonly="true" style="float: left;width: 80%;height: 80px;resize: none;
            margin-bottom: 20px;margin-top: 20px;margin-left: 20px;background-color:  #fdf6ec;border: 1px solid;
            text-align: left" > {{ userText }} </textarea>
          </div>
        </div>
        <div>
          <ul style="float: left;list-style-type: none;margin-left: 10%">
            <li><h4 @click="this.goInfo">个人资料</h4></li>
            <li style="margin-top: 5px"><h4 @click="this.goSpe">ta的专栏</h4></li>
            <li style="margin-top: 5px"><h4 @click="this.goCol">ta的收藏</h4></li>
            <li style="margin-top: 5px"><h4 @click="this.goAtte">ta的关注</h4></li>
            <li style="margin-top: 5px"><h4 @click="this.goMyBlog">ta的博客</h4></li>
          </ul>
        </div>
      </div>
      <div id="CenterRight" style="width: 50%;float: left;">
        <h4 align="left" style="float: left;margin-left: 20px;border-bottom: 1px solid;margin-right: 20px;width: 100%">我的动态</h4>
        <el-container  v-for="blog in blogs.slice(0,3)" v-bind:key="blog" style="float: left;width: 100%">
          <div style="float: left;margin-left: 20px;border: 1px solid;width: 100%;margin-top: 10px">
            <h4 align="left" style="margin-left: 10px"><router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">{{blog.blogTitle}}</router-link></h4>
            <h6 style="color: #909399;text-align: right">{{blog.userId}}&nbsp;&nbsp;&nbsp;&nbsp;{{blog.blogPublishTime.substring(0,10)}}&nbsp;{{blog.blogPublishTime.substring(11,20)}}</h6>
          </div>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import HeadTag from '../components/LoginFirstPageHead'
export default {
  name: 'OtherSelfPage',
  components: {
    HeadTag
  },
  activated () {
    const _this = this
    this.$axios.get('/my/blogs/?currentPage=' + '1' + '&userId=' + _this.userId).then((res) => {
      console.log(res.data.data.records)
      _this.blogs = res.data.data.records
      _this.total = res.data.data.total
    })
    let user = {
      userId: this.userId
    }
    this.$axios.post('/user/info', user).then(res => {
      console.log(res.data.data)
      _this.userText = res.data.data.userSignature
      _this.userTime = res.data.data.registerTime
      _this.username = res.data.data.userNickname
      _this.avatar = res.data.data.userProfilePhoto
      if (this.userText == null) {
        this.userText = '暂时还没有个性签名'
      }
    })
  },
  data () {
    return {
      username: '',
      total: 0,
      avatar: '',
      userTime: '',
      userAttention: '10',
      userFans: '20',
      userText: '个性签名………………',
      blogs: [],
      userId: this.$route.params.userId
    }
  },
  methods: {
    goInfo () {

    },
    goSpe () {

    },
    goCol () {

    },
    goAtte () {

    },
    goMyBlog () {

    }
  }
}
</script>

<style scoped>
#CenterHead{
  border-bottom: 2px solid;
}
#CenterLeft{
  border-right: 2px solid;
}
</style>
