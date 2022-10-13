<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" status-icon>
        <div class="title">emo</div>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" typeof="text" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="View"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>


    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login(){
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$api.login(this.loginForm).then(res => {
            //获取请求地址
            let url = this.$route.query.redirect || '/home'
            console.log(url)
            if (res.code === 200) {
              this.$message.success('登录成功')
              this.$router.push('/welcome')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },

  }

}


</script>


<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f9fcff;

  .modal {
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

    .btn-login {
      width: 100%;
    }
  }
}

</style>
