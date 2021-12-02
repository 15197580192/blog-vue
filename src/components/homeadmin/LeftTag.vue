<template>
  <el-row class="tac" style="margin-left:0px">
    <el-col :span="24">
      <el-menu
        default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#F6F7FA"
        text-color="#707070"
        active-text-color="#409EFF">
        <el-menu-item index="1">
          账号管理
        </el-menu-item>
        <el-menu-item index="2">
          统计
        </el-menu-item>
        <el-menu-item index="3">
          审核
        </el-menu-item>
        <el-menu-item index="4">
          分类管理
        </el-menu-item>
        <el-menu-item index="5">
          标签管理
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'LeftTag',
  data () {
    return {
      activeIndex: ''
    }
  }
}
</script>

<style scoped>

</style>
