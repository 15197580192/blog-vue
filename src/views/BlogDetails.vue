<template>
  <div class="m-container">
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-row>
      <el-col :span="1" style="margin-left:5px;margin-top: 10px">
        <el-button size="mini" @click="$router.replace('/')">返回</el-button>
      </el-col>
    </el-row>
    <h2>{{blog.title}}</h2>
    <el-link icon="el-icon-edit" v-if="ownBlog" @click="edit">编辑</el-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-link icon="el-icon-edit" v-if="ownBlog" @click="deleteblog">删除</el-link>
    <el-divider></el-divider>
    <el-card style="width: 80%;margin-left: 10%">
      <div class="content markdown-body" v-html="blog.content"></div>
    </el-card>
    <el-divider></el-divider>
    <el-card style="width: 80%;margin-left: 10%;margin-top: 20px;text-align: left">
      <div slot="header" class="clearfix">
        <span style="float: left">评论</span>
      </div>
      <div style="padding: 20px; color: #888">
        <div>
          <el-input type="textarea" :rows="3" v-model="entity.commentContent"></el-input>
          <div style="text-align: right; padding: 10px"><el-button type="danger" @click="save">评论</el-button></div>
        </div>
      </div>

      <div style="display: flex; padding: 20px" v-for="item in messages">
        <div style="padding: 0 10px; flex: 5">
          <div><b style="font-size: 14px">{{ item.userId }}</b></div>
          <div style="padding: 10px 0; color: #888">
            {{ item.commentContent }}
            <el-button type="text" size="mini" @click="del(item.commentId)" v-if="item.userId === user.userId">删除</el-button>
          </div>
<!--评论回复-->
<!--          <div  v-if="replys">-->
<!--            <div  v-for="i in replys">-->
<!--              <div v-for="ii in i">-->
<!--                <div style="background-color: #eee; padding: 10px" v-if="ii.commentId">-->
<!--                  {{ ii.userId }}：{{ ii.commentContent }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div style="color: #888; font-size: 12px">
            <span>{{ item.commentDate.substring(0,10)  }}</span>
<!--删除回复-->
<!-- <el-button type="text" style="margin-left: 20px" @click="reReply(item.commentId)">回复</el-button>-->
          </div>
        </div>
      </div>

      <el-dialog title="回复信息" v-model="dialogFormVisible" width="30%">
        <el-form :model="entity" label-width="80px">
          <el-form-item label="内容">
            <el-input v-model="entity.reply" autocomplete="off" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="reply">确 定</el-button>
        </template>
      </el-dialog>

    </el-card>
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
      entity: {
      },
      user: {},
      messages: {},
      replys: {},
      dialogFormVisible: false,
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
    },
    deleteblog() {
      const blogId = this.$route.params.blogId
      const _this = this
      this.$axios.post('/deleteblog/' + blogId).then((res) => {
        this.$alert('确定删除？', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.push('/')
            }
          }
        )
      })
    },
    save() {
      if(!this.user) {
        this.$alert('请先登陆', 'Warning');
        return;
      }
      if(!this.entity.commentContent) {
        this.$alert('请填写内容', 'Warning');
        return;
      }
      const bId = this.$route.params.blogId
      this.entity.userId = this.user.userId
      this.$axios.post('/blog/'+bId+'/comment',this.entity).then(res => {
        this.entity = {}
        this.loadMessage();
        this.dialogFormVisible = false;
      })
    },
    loadMessage() {
      const bId = this.$route.params.blogId
      this.$axios.post('/blog/' + bId + '/getcomment').then(res => {
          this.messages = res.data.data
          let reply = []
          for (let item in this.messages) {
            this.$axios.post('/blog/' + bId + '/getchildcomment', this.messages[item]).then(res => {
              // this.replys.insert(res.data.data)
              reply.push(res.data.data)
            })
          }
          this.replys = reply
          console.log("test")
          console.log(this.replys)
        }
      )
    },
    loadChild(messages) {

      const bId = this.$route.params.blogId
      console.log("test")
      console.log(messages)
      for( var i=0;i<messages.length;i++)
      {
        const item = messages[i]
        console.log(item)
        this.$axios.post('/blog/'+bId+'/getchildcomment',item).then(res => {
          this.replys.append(res.data.data)


          console.log(res.data.data)
        })
      }
    },
    del(id) {
      const bId = this.$route.params.blogId
      let comment ={
        commentId: id,
        userId:this.$store.getters.getUser.userId
      }
      this.$axios.post('/blog/'+bId+'/delcomment',comment).then(res => {
        this.$alert('删除成功', '提示');
        this.loadMessage();
      })
    },
    reply() {
      this.entity.commentContent = this.entity.reply;
      this.save();
    },
    reReply(id) {
      this.dialogFormVisible = true;
      this.entity.parentComentId = id;
    },
  },
  activated() {
    this.user=this.$store.getters.getUser;
    this.getBlog();
    this.loadMessage();
  }
}
</script>

<style scoped>

</style>
