<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">emo</div>
        <el-form-item>
          <el-input v-model="username" placeholder="请输入用户名" typeof="text" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="请输入密码" type="password" prefix-icon="View"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>


    </div>

  </div>
</template>

<script >

export default {


}
</script>



<style lang="scss" >
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f9fcff;
    .modal{
      width: 500px;
      height: 300px;
      background-color: #fff;
      border-radius: 4px;
      padding: 50px;
      box-shadow: 0px 0px 10px 3px #c7c9cb4d;
      .title {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 30px;
      }
      .btn-login{
        width: 100%;
      }
    }
  }

</style>
