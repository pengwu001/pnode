<template>
  <div id="app">
    <div>
      <Header />
      <br />
      <div class="main">
        <router-view class="left"></router-view>
        <Panel
          v-if="!($route.path.includes('login') || $route.path.includes('api'))"
          width="20%"
          class="right"
        >
          <template #header>
            <span v-if="userInfo">个人信息</span>
            <span v-else>网站信息</span>
          </template>
          <template #content>
            <div v-if="userInfo">
              <div class="user-info">
                <img :src="userInfo.avatar_url" alt="" />
                <span>{{ userInfo.loginname }}</span>
              </div>
              <p style="font-size: 12px">“这家伙什么个性签名都没有留下”</p>
            </div>
            <div v-else>
              <p>PNode：js专业中文社区</p>
              <el-button size="small" type="primary"
                ><router-link style="color: #fff" to="/login"
                  >登录</router-link
                ></el-button
              >
            </div>
          </template>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Panel from "./layout/Panel.vue";
export default {
  components: { Header, Panel },
  name: "app",
  computed: {
    // 刷新页面的时候 store 数据清空
    // 如何处理
    // 当第一次登录的时候 可以直降 userInfo 转化成 json串 存储到浏览器
    // created 先看能不能取到 vuex 数据， 不能的话 直接去浏览器中 取  并更新 store
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style>
.main {
  display: flex;
  justify-content: space-around;
  padding: 0 10% 0 4%;
}
.user-info {
  display: flex;
}
.user-info img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-info span {
  line-height: 48px;
  color: #778087;
}
</style>
