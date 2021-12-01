<template>
  <div class="head">
    <el-row>
      <el-col :span="1" style="margin-left:10px">
        <img src='../assets/logored.png' height="70">
      </el-col>
      <el-col :span="6">
        <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">简学独立博客系统</p>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input" style="margin-left:0px;margin-top:10px" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-left:0;margin-top:10px" type="info">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" style="margin-left:25px;margin-top:10px" @click="$router.push('/login')">登录</el-button>
        <el-button type="danger" style="margin-left:25px;margin-top:10px" @click="$router.push('/register')">注册
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BlogHead"
}
</script>

<style scoped>
.head {
  height: 70px;
}
</style>
