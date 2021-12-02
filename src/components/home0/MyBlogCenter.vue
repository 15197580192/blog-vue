<template>
  <el-container style="height: 1000px">
    <el-aside style="width: 100%">
      <el-header style="text-align: left;height:3%;font-size:16px;margin-left: 0">
        我的博客
      </el-header>
      <el-main style="background-color: #F6F7FA;height: 92%">
        <el-container v-for="blog in blogs">
          <el-card style="text-align: left;height: auto;width: 100%;margin-top: 5px">
            <h5>
              <router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">
                {{ blog.blogTitle }}
              </router-link>
            </h5>
            <el-row>
              <el-col :span="20">
                <h6 style="color: #909399;float: left">
                  {{ blog.blogPublishTime.substring(0, 10) }}&nbsp;{{ blog.blogPublishTime.substring(11, 20) }}</h6>
              </el-col>
              <el-col :span="2">
                <el-button style="color: #f56c6c;float:right;margin-top: 20px" type="text" size="mini"
                           @click="edit(blog.blogId)">编辑
                </el-button>
              </el-col>
              <el-col :span="2">
                <el-button style="color: #f56c6c;float:right;margin-top: 20px" type="text" size="mini"
                           @click="deleteBlog(blog.blogId)">删除
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-container>
      </el-main>
      <el-footer style="height: 5%">
        <div class="block1">
          <el-pagination
            layout="prev, pager, next, jumper"
            :current-page=this.currentPage
            :page-size=this.pageSize
            @current-change=this.page
            :total=this.total>
          </el-pagination>
        </div>
      </el-footer>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'MyBlogCenter',
  activated () {
    const _this = this
    this.$axios.get('/my/blogs/?currentPage=' + this.currentPage + '&userId=' + _this.userId).then((res) => {
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
      userId: this.$route.params.userId
    }
  },
  methods: {
    loadBlogs () {
      const _this = this
      this.$axios.get('/my/blogs/?currentPage=' + this.currentPage + '&userId=' + _this.userId).then((res) => {
        console.log(res.data.data.records)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    page (currentPage) {
      console.log(currentPage)
      const _this = this
      this.$axios.get('/my/blogs/?currentPage=' + currentPage + '&userId=' + _this.userId).then((res) => {
        console.log(res.data.data.records)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    edit (id) {
      this.$router.replace('/blog/details/' + id + '/edit')
    },
    deleteBlog (id) {
      if (confirm('确定删除博客？')) {
        this.$axios.post('/blog/delete/' + id).then((res) => {
          this.$alert('删除成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.loadBlogs()
            }
          })
        })
      }
    }
  }
}
</script>

<style>
.el-pagination.is-background.el-pager li:not(.disabled) {
  background-color: #fff; /*进行修改未选中背景和字体*/
  color: #fff;
}

.el-pagination .el-pager li:hover {
  color: #f56c6c;
}

.el-pager li.active {
  color: #f56c6c !important; /*仅设置active时的文字颜色*/
}

a {
  text-decoration: none;
}
</style>
