<template>
  <div class="login-container" style="width=100%;text-align: center">
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
        <el-button type="danger" style="margin-left:25px;margin-top:10px" @click="$router.push('/login')">登录</el-button>
        <el-button type="danger" style="margin-left:25px;margin-top:10px" @click="$router.push('/register')">注册</el-button>
      </el-col>
    </el-row>
    <el-menu
      :default-active="activeIndex1"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#f56c6c"
      text-color="#ffffff"
      active-text-color="#ffffff">
      <el-menu-item index="1">登录</el-menu-item>
    </el-menu>



    <p style="margin-left:0px;font-size:20px;line-height:25px;color:#f56c6c">登录</p>
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item style="width: 24%;margin-left: 38%">
        <el-input v-model="input" placeholder="手机号/用户名"></el-input>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%">
        <el-input type="password" v-model="input" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%">
        <div class="login-info">
          <el-row>
            <el-col :span="12" style="margin-left:0px;text-align: left">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:#f56c6c">
                没有账户,<router-link :to="{name: 'register'}" style="text-decoration: none;color: #409EFF">立即注册</router-link>
              </p>
            </el-col>
            <el-col :span="12" style="margin-left:0px;text-align: right">
              <p style="margin-left:0px;font-size:14px;line-height:20px;color:#f56c6c">
                <router-link :to="{name: 'register'}" style="text-decoration: none;color: #409EFF">忘记密码</router-link>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item style="width: 24%;margin-left: 38%;text-align: left">
        <el-checkbox v-model="checked" style="color:#a0a0a0;margin:0 0 20px 0">记住密码</el-checkbox>
      </el-form-item>

      <el-button type="danger" native-type="submit" :loading="loading" @click="$router.push('/login')">登录</el-button>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style scoped>

</style>
