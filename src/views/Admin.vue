<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="username" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        // const self = this;
        // self.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     localStorage.setItem('ms_username',self.ruleForm.username);
        //     self.$router.push('/admin/login');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        if (!this.ruleForm.username || !this.ruleForm.password) {
          alert('请输入用户名或密码！');
          return;
        }
        axios.post('/admin/login', {
          userName: this.ruleForm.username,
          userPwd: this.ruleForm.password
        }).then((response) => {
          let res = response.data;
          if (res.status == "0") {
            this.$router.push('/home');
            this.errorTip = false;
            this.loginModalFlag = false;
          } else {
            this.errorTip = true;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .tips {
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }

  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 380px;
    height: 250px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
