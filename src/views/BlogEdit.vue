<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="editForm.content"/>
        </el-form-item>
        <el-form-item>
          <p>展示封面：</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm()">立即发布</el-button>
          <el-button type="info" @click="submitForm()">定时发布</el-button>
          <el-button @click="submitForm()">保存草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginFirstPageHead from "../components/LoginFirstPageHead";

export default {
  name: "BlogEdit",
  components: {LoginFirstPageHead},
  data() {
    return {
      editForm: {
        id: '',
        title: '',
        content: '',
        dialogImageUrl: '',
        dialogVisible: false

      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm() {
      let blog = {
        blogId: this.editForm.id,
        blogTitle: this.editForm.title,
        blogContent: this.editForm.content
      }
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          _this.editForm.id = ''
          console.log(blog)
          this.$axios.post('/blog/edit', blog, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res) => {
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/")
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  activated() {
    const blogId = this.$route.params.blogId
    const _this = this
    if (blogId) {
      this.$axios.get('/blog/' + blogId).then((res) => {
        const blog = res.data.data
        _this.editForm.id = blog.blogDetails.blogId
        _this.editForm.title = blog.blogDetails.blogTitle
        _this.editForm.content = blog.blogDetails.blogContent
      });
    } else {
      _this.editForm.title = ''
      _this.editForm.content = ''
    }
  }
}
</script>

<style scoped>

</style>
