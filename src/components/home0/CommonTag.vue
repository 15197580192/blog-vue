<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#F56C6C"
    text-color="#ffffff"
    active-text-color="#ffffff">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">分类</template>
      <el-submenu index="2-1">
        <template slot="title">分类1</template>
        <el-menu-item index="2-1-1">内容1</el-menu-item>
        <el-menu-item index="2-1-2">内容2</el-menu-item>
        <el-menu-item index="2-1-3">内容3</el-menu-item>
        <el-menu-item index="2-1-4">内容4</el-menu-item>
        <el-menu-item index="2-1-5">内容5</el-menu-item>
      </el-submenu>
      <el-submenu index="2-2">
        <template slot="title">分类2</template>
        <el-menu-item index="2-2-1">内容1</el-menu-item>
        <el-menu-item index="2-2-2">内容2</el-menu-item>
        <el-menu-item index="2-2-3">内容3</el-menu-item>
        <el-menu-item index="2-2-4">内容4</el-menu-item>
        <el-menu-item index="2-2-5">内容5</el-menu-item>
      </el-submenu>
      <el-submenu index="2-3">
        <template slot="title">分类3</template>
        <el-menu-item index="2-3-1">内容1</el-menu-item>
        <el-menu-item index="2-3-2">内容2</el-menu-item>
        <el-menu-item index="2-3-3">内容3</el-menu-item>
        <el-menu-item index="2-3-4">内容4</el-menu-item>
        <el-menu-item index="2-3-5">内容5</el-menu-item>
      </el-submenu>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
        <el-menu-item index="2-4-3">选项4</el-menu-item>
        <el-menu-item index="2-4-3">选项5</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">新闻</el-menu-item>
    <el-menu-item index="4">热门</el-menu-item>
  </el-menu>

</template>

<script>
export default {
  name: "CommonTag"
}
</script>

<style scoped>

</style>
