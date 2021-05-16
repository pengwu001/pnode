<template>
  <div class="login">
    <el-input
      v-model.trim="token"
      type="text"
      placeholder="请输入 token"
    ></el-input>
    <br />
    <br />
    <el-button @click="logs" size="small" type="primary"
      >使用默认 token 登录</el-button
    >
    &nbsp;&nbsp;
    <el-button @click="login" size="small" type="primary"
      >使用自己的 token 登录</el-button
    >
  </div>
</template>

<script>
export default {
  // 9480c067-208c-4614-8876-98302830ec54
  data() {
    return {
      token: "",
    };
  },
  methods: {
    login() {
      // 登录按钮 需要先判断之前登录过了吗 其实就是浏览器中存没存出数据 存了直接根据数据登录 没存跳转到登录页面
      // 比较麻烦 暂时直接跳页
      this.$axios
        .post("/accesstoken", {
          accesstoken: this.token,
        })
        .then((res) => {
          this.$router.push("/");
          const userInfo = res;
          delete userInfo.success;
          // console.log(userInfo);
          this.$store.commit("getUserInfo", userInfo);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "请确认输入正确的 token",
            type: "warning",
            duration: 1000,
          });
        });
    },
    logs() {
      this.$axios
        .post("/accesstoken", {
          accesstoken: "9480c067-208c-4614-8876-98302830ec54",
        })
        .then((res) => {
          this.$router.push("/");
          const userInfo = res;
          delete userInfo.success;
          console.log(userInfo);
          this.$store.commit("getUserInfo", userInfo);
        });
    },
  },
};
</script>

<style lang='less'>
.login {
  margin-top: 80px;
  text-align: center;
}
</style>