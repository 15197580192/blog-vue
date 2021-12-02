<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
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
import LoginFirstPageHead from '../components/LoginFirstPageHead'
import CommonTag from '../components/home0/CommonTag'
import LeftTag from '../components/home0/LeftTag'
import CenterContent from '../components/home0/CenterContent'
import RightContent from '../components/home0/RightContent'

export default {
  name: 'LoginFirstPage',
  components: {
    LoginFirstPageHead,
    CenterContent,
    CommonTag,
    LeftTag,
    RightContent
  },
  methods: {}
}
</script>

<style scoped>
.wrap {
  width: 50px;
  background-color: #909399;
  display: flex;
}
</style>
