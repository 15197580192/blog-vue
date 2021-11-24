<template>
  <div class="m-container">
    <LoginFirstPageHead></LoginFirstPageHead>
    <h2>{{blog.title}}</h2>
    <el-link icon="el-icon-edit" v-if="ownBlog" @click="edit">编辑</el-link>
    <el-divider></el-divider>
    <div class="content markdown-body" v-html="blog.content"></div>
  </div>
</template>

<script>
import LoginFirstPageHead from "../components/LoginFirstPageHead";
import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
export default {
  name: "BlogDetails",
  components: {
    LoginFirstPageHead
  },
  data() {
    return {
      blog: {
        id:this.$route.params.blogId,
        userId: null,
        title: "这是标题",
        content: "这是内容"
      },
      //如果是自己的博客，显示编辑
      ownBlog: false
    }
  },
  methods: {
    getBlog() {
      const blogId = this.$route.params.blogId
      const _this = this
      this.$axios.get('/blog/' + blogId).then((res) => {
        console.log(res)
        console.log(res.data.data)
        _this.blog.userId = res.data.data.userId
        _this.blog.title = res.data.data.blogdetails.blogTitle
        _this.blog.content = res.data.data.blogdetails.blogContent
        var MarkdownIt = require('markdown-it'),
          md = new MarkdownIt();
        var result = md.render(_this.blog.content);
        _this.blog.content = result
        // 判断是否是自己的文章，能否编辑
        _this.ownBlog =  (_this.blog.userId === _this.$store.getters.getUser.userId)
        console.log(_this.blog.userId)
        console.log(_this.$store.getters.getUser.userId)
        console.log(_this.ownBlog)
      });
    },
    edit() {
      this.$router.push(this.$route.path+'/blogedit')
    }
  },
  activated() {
    this.getBlog();
  }
}
</script>

<style scoped>

</style>
