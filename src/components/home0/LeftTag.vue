<template>
  <el-row  class="tac" style="margin-left:0px">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#F6F7FA"
        text-color="#707070"
        active-text-color="#f56c6c">
        <el-menu-item index="1">
          写博
        </el-menu-item>
        <el-menu-item index="2">
          我的博客
        </el-menu-item>
        <el-menu-item index="3">
          关注
        </el-menu-item>
        <el-menu-item index="4">
          收藏
        </el-menu-item>
        <el-menu-item index="5">
          我的点赞
        </el-menu-item>
        <el-menu-item index="6">
          我的评论
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LeftTag"
}
</script>

<style scoped>

</style>
