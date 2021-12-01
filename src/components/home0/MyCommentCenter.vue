<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-container style="height: 1000px">
    <el-aside style="width: 100%">
      <el-header style="text-align: left;height:3%;font-size:16px;margin-left: 0">
        我的评论
      </el-header>
      <el-main style="background-color: #F6F7FA;height: 90%">
        <el-container v-for="blog in comments">
          <el-card style="text-align: left;height: auto;width: 100%;margin-top: 10px">
            <el-input readonly type="textarea" autosize="{ minRows: 2, maxRows: 8 }"
                      v-model="blog.commentContent"></el-input>

            <el-row>
              <el-col :span="10">
                <h5>原文链接：
                  <router-link :to="{name: 'BlogDetails', params: {blogId: blog.blogId}}" style="color: #f56c6c">
                    {{ blog.blogTitle }}
                  </router-link>
                </h5>
              </el-col>
              <el-col :span="10">
                <h6 style="color: #909399;text-align: right">
                  评论时间：{{ blog.commentDate.substring(0, 10) }}&nbsp;{{ blog.commentDate.substring(11, 20) }}</h6>
              </el-col>
              <el-col :span="4">
                <el-button style="color: #f56c6c;float:right;margin-top: 20px" type="text" size="mini"
                           @click="del(blog.commentId,blog.blogId)">删除
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
import MarkdownIt from "markdown-it";

export default {
  name: "MyCommentCenter",
  activated() {
    const _this = this
    this.$axios.get('/my/comments/?currentPage=' + this.currentPage + '&userId=' + _this.userId).then((res) => {
      console.log(res.data.data.records)
      _this.comments = res.data.data.records
      _this.currentPage = res.data.data.current
      _this.total = res.data.data.total
      _this.pageSize = res.data.data.size
    })
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      comments: [],
      userId: this.$route.params.userId
    }
  },
  methods: {
    page(currentPage) {
      console.log(currentPage)
      const _this = this
      this.$axios.get('/my/comments/?currentPage=' + currentPage + '&userId=' + _this.userId).then((res) => {
        console.log(res.data.data.records)
        _this.comments = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    loadMessage() {
      const _this = this
      this.$axios.get('/my/comments/?currentPage=' + this.currentPage + '&userId=' + _this.userId).then((res) => {
        console.log(res.data.data.records)
        _this.comments = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    del(cid, bid) {
      if (confirm("确认删除评论？")) {
        const bId = bid
        let comment = {
          commentId: cid,
          userId: this.$store.getters.getUser.userId
        }
        this.$axios.post('/blog/' + bId + '/delcomment', comment).then(res => {
          this.$alert('删除成功', '提示');
          this.loadMessage();
        })
      }
    }
  }
}
</script>

<style scoped>
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
