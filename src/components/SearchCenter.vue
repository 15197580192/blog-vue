<template>
  <el-container style="height: 1000px">
    <el-aside style="width: 100%">
      <el-header style="text-align: left;height:3%;font-size:16px;margin-left: 0">
        搜索结果
      </el-header>
      <el-main style="background-color: #F6F7FA;height: 92%">
        <el-container  v-for="blog in blogs">
          <el-card style="text-align: left;height: auto;width: 100%;margin-top: 10px">
            <h4><router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">{{blog.blogTitle}}</router-link></h4>
            <h6 style="color: #909399;text-align: right">{{ blog.userNickname }}&nbsp;&nbsp;&nbsp;&nbsp;{{blog.blogPublishTime.substring(0,10)}}&nbsp;{{blog.blogPublishTime.substring(11,20)}}</h6>
          </el-card>
        </el-container>
      </el-main>
      <el-footer style="height: 5%">
        <div class="block">
          <el-pagination
            layout="prev, pager, next, jumper"
            :page-size=pageSize
            :current-page=currentPage
            @current-change=page
            :total=total>
          </el-pagination>
        </div>
      </el-footer>
    </el-aside>
  </el-container>
</template>

<script>
import MarkdownIt from 'markdown-it'
export default {
  name: 'SearchCenter',
  activated () {
    console.log(this.searchcontent)
    const _this = this
    this.$axios.get('/blog/search/?searchBlog=' + this.searchcontent + '&currentPage' + this.currentPage).then((res) => {
      console.log(res.data.data.records)
      _this.blogs = res.data.data.records
      _this.currentPage = res.data.data.current
      _this.total = res.data.data.total
      _this.pageSize = res.data.data.size
    })
  },
  data () {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      blogs: [],
      searchcontent: this.$route.params.searchvalue
    }
  },
  methods: {
    getmd () {
      var blog
      for (blog in this.blogs) {
        var MarkdownIt = require('markdown-it')
        var md = new MarkdownIt()
        console.log(blog.content)
        blog.content = md.render(blog.content)
        console.log(blog.content)
      }
    },
    page (currentPage) {
      const _this = this
      this.$axios.get('/blogs?currentPage=' + currentPage).then((res) => {
        console.log(res.data.data.records)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    }
  }
}
</script>

<style scoped>

</style>
