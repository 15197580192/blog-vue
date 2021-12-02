<template>
  <div>
    <LoginFirstPageHead></LoginFirstPageHead>
    <el-container style="height: 800px">
      <el-header style="height: 50px">
        <common-tag></common-tag>
      </el-header>
      <el-container style="height: 1200px">
        <el-aside  style="width: 14% ; margin-left: 20px;margin-top: 10px">
          <el-row  class="tac" style="margin-left:0px">
            <el-col :span="24">
              <el-menu
                default-active="activeIndex"
                class="el-menu-vertical-demo"
                background-color="#F6F7FA"
                text-color="#707070"
                active-text-color="#f56c6c">
                <el-menu-item index="1" @click="newBlog">
                  写博
                </el-menu-item>
                <el-menu-item index="2" @click="myBlog">
                  我的博客
                </el-menu-item>
                <el-menu-item index="3" @click="myAttention">
                  关注
                </el-menu-item>
                <el-menu-item index="4" @click="myCollect">
                  收藏
                </el-menu-item>
                <el-menu-item index="5" @click="myPraise">
                  我的点赞
                </el-menu-item>
                <el-menu-item index="6" @click="myComment">
                  我的评论
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside >
        <el-main style="width: 72%">
          <SearchCenter></SearchCenter>
        </el-main>
        <el-main style="width: 14%">
          <right-content></right-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoginFirstPageHead from "../components/LoginFirstPageHead";
import CommonTag from "../components/home0/CommonTag";
import LeftTag from "../components/home0/LeftTag";
import CenterContent from "../components/home0/CenterContent";
import RightContent from "../components/home0/RightContent";
import SearchCenter from '../components/home0/SearchCenter'
export default {
  name: 'Searchblog',
  components: {
    LoginFirstPageHead,
    CenterContent,
    CommonTag,
    LeftTag,
    RightContent,
    SearchCenter
  }
}
</script>

<style scoped>

</style>
