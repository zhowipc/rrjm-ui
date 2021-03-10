<template>
  <div>
    <el-form
      :model="loginForm"
      ref="loginForm"
      :rules="rules"
      class="loginContainer"
      v-loading="loading"
      @keydown.enter.native="submitLogin"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.23)"
    >
      <h3 class="loginTitle">登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model="loginForm.code"
          auto-complete="false"
          style="width: 250px;margin-right: 5px"
          placeholder="点击图片更换验证码"
        ></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" style="width: 80px;" />
      </el-form-item>
      <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import loginApi from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      captchaUrl: process.env.VUE_APP_BASE_API + "/captcha?time=" + new Date(),
      checked: true,
      loginForm: {
        username: "abc",
        password: "123",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASE_API + "/captcha?time=" + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          loginApi.login(this.loginForm).then(resp => {
            this.authApi.setToken(resp.obj.token);
            let path = this.$route.query.redirect;
            this.$router.replace(
              path == "/" || path == undefined ? "/home" : path
            );
          });
        } else {
          this.$message.error("请输入全部字段");
          return false;
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
