<template>
  <el-container style="height: 1000px">
    <el-aside style="width: 100%">
      <el-header style="text-align: left;height:3%;font-size:16px;margin-left: 0">
        热门推荐
      </el-header>
      <el-main style="background-color: #F6F7FA;height: 92%">
        <el-container v-for="blog in blogs">
          <el-card style="text-align: left;height: auto;width: 100%;margin-top: 10px">
            <h4>
              <router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">
                {{ blog.blogTitle }}
              </router-link>
            </h4>
            <h6 style="color: #909399;text-align: right">{{
                blog.userNickname
              }}&nbsp;&nbsp;&nbsp;&nbsp;{{ blog.blogPublishTime.substring(0, 10) }}&nbsp;{{ blog.blogPublishTime.substring(11, 20) }}</h6>
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
export default {
  name: 'CenterContent',
  activated () {
    const _this = this
    this.$axios.get('/blogs?currentPage=' + this.currentPage).then((res) => {
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
      result: []
    }
  },
  methods: {
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
