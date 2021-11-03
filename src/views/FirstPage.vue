<template>
  <div class="hello">
    <el-row>
      <el-col :span="1" style="margin-left:10px">
        <img src="../assets/logored.png" height="70"></img>
      </el-col>
      <el-col :span="6">
        <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">简学独立博客系统</p>
      </el-col>
      <el-col :span="10">
          <el-input v-model="input" style="margin-left:0px;margin-top:10px" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
          <el-button style="margin-left:0px;margin-top:10px" type="info">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" style="margin-left:25px;margin-top:10px">登录</el-button>
        <el-button type="danger" style="margin-left:25px;margin-top:10px">注册</el-button>
      </el-col>
    </el-row>
    <el-container style="height: 800px">

      <el-header style="height: 50px">
        <common-tag></common-tag>
      </el-header>
        <el-container style="height: 1200px">
          <el-aside  style="width: 14% ; margin-left: 20px;margin-top: 10px">
            <left-tag></left-tag>
          </el-aside >
          <el-main style="width: 72%">
            <center-content></center-content>
          </el-main>
          <el-main style="width: 14%">
            <right-content></right-content>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonTag from "../components/home0/CommonTag";
import LeftTag from "../components/home0/LeftTag";
import CenterContent from "../components/home0/CenterContent";
import RightContent from "../components/home0/RightContent";
export default {
  name: 'FirstPage',
  components:{
    RightContent,
    CenterContent,
    LeftTag,
    CommonTag
  },
  data() {
    return {
      input: ''
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header{

}

</style>
