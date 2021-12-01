<template>
  <el-container style="height: 1000px">
    <el-aside style="width: 100%">
      <el-header style="text-align: left;height:3%;font-size:16px;margin-left: 0">
        所有博客
      </el-header>
      <el-main style="background-color: #F6F7FA;height: 90%">
        博客
      </el-main>
      <el-footer style="height: 5%">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="1000000">
          </el-pagination>
        </div>
      </el-footer>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'CenterContent'
}
</script>

<style>
.el-pagination.is-background.el-pager li:not(.disabled) {
  background-color: #fff; /*进行修改未选中背景和字体*/
  color: #fff;
}

.el-pagination .el-pager li:hover {
  color: #f56c6c;
}

.el-pager li.active {
  color: #f56c6c !important; /*仅设置active时的文字颜色*/
}
</style>
