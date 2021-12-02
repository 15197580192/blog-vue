<template>
  <div class="HelloAdmin">
    <el-row>
      <el-col :span="1" style="margin-left:10px">
        <img src="../assets/logoblue.png" height="70">
      </el-col>
      <el-col :span="6">
        <p style="margin-left:0px;font-size:20px;line-height:25px;color:#409EFF">简学独立博客管理系统</p>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input" style="margin-left:0px;margin-top:10px" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-left:0px;margin-top:10px" type="info">搜索</el-button>
      </el-col>
      <el-col :span="4">

      </el-col>
    </el-row>
    <el-container style="height: 800px">

      <el-header style="height: 50px">
        <common-tag></common-tag>
      </el-header>
      <el-container style="height: 1200px">
        <el-aside style="width: 14% ; margin-left: 20px;margin-top: 10px">
          <left-tag></left-tag>
        </el-aside>
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
import CommonTag from '../components/homeadmin/CommonTag'
import LeftTag from '../components/homeadmin/LeftTag'
import CenterContent from '../components/homeadmin/CenterContent'
import RightContent from '../components/homeadmin/RightContent'

export default {
  name: 'FirstPageAdmin',
  components: {
    RightContent,
    CenterContent,
    LeftTag,
    CommonTag
  },
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>

</style>
