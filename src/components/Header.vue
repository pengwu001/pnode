<template>
  <header>
    <h1 @click="gohome">pnode</h1>
    <div class="nav">
      <router-link class="info" to="/">首页</router-link>
      <router-link class="info" to="/">未读消息</router-link>
      <router-link class="info" to="/">新手入门</router-link>
      <router-link class="info" to="/">API</router-link>
      <router-link class="info" to="/">关于</router-link>
      <span class="signout" @click="signout">退出</span>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComp",
  methods: {
    signout() {
      if (this.$route.path === "/") {
        this.$store.commit("clearUserInfo");
      } else {
        this.$router.push("/");
        this.$store.commit("clearUserInfo");
      }
    },
    gohome() {
      if (this.$route.path === "/") {
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang='less'>
header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background-color: #444;
  line-height: 50px;
  color: #fff;
  user-select: none;
  a.info {
    color: #ccc;
    padding: 10px 15px;
    font-size: 16px;
  }
  a.info:hover {
    color: #fff;
  }
  span.signout {
    color: #ccc;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 15px;
  }
  span.signout:hover {
    color: #fff;
  }
  h1 {
    font-style: italic;
    cursor: pointer;
    padding: 0;
    margin: 0;
    margin-right: 10%;
  }
  .nav {
    margin-left: 22%;
    margin-right: 6%;
  }
}
</style>