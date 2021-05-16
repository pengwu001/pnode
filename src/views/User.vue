<template>
  <div v-if="user">
    <Panel :width="800">
      <template #header>
        <router-link to="/">主页</router-link>/
        <hr
      /></template>

      <template #content>
        <div>
          <img width="40" :src="user.avatar_url" alt="" />
          <div>{{ user.loginname }}</div>
          <div>发布于 {{ user.create_at }}</div>
        </div>
      </template>
    </Panel>
    <br />
    <Panel :width="800">
      <template #header>
        <span
          >最近创建的话题
          <hr
        /></span>
      </template>
      <template #content>
        <div v-for="item in user.recent_topics.slice(0, 5)" :key="item.id">
          <router-link :to="`/user/${item.author.loginname}`"
            ><img width="30" :src="item.author.avatar_url" alt=""
          /></router-link>
          <router-link :to="`/topic/${item.id}`">{{ item.title }}</router-link>
        </div>
      </template>
    </Panel>
    <br />
    <Panel :width="800">
      <template #header>
        最近参与的话题
        <hr
      /></template>
      <template #content>
        <div v-for="item in user.recent_replies" :key="item.id">
          <router-link :to="`/user/${item.author.loginname}`"
            ><img width="30" :src="item.author.avatar_url" alt=""
          /></router-link>
          <!-- 现在点击头像不会跳页 因为下面 created 只触发一次，相同的动态路由切换 ，监听watch -->
          <router-link :to="`/topic/${item.id}`">{{ item.title }}</router-link>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      user: null,
    };
  },
  watch: {
    "$route.params.loginname": {
      async handler(newValue) {
        const { loginname } = this.$route.params;
        const res = await this.$axios.get(`/user/${loginname}`);
        this.user = res.data;
      },
      immediate: true,
    },
  },
  // async created() {
  //   const { loginname } = this.$route.params;
  //   const res = await this.$axios.get(`/user/${loginname}`);
  //   // console.log(res.data);
  //   this.user = res.data;
  //   // console.log(this.user);
  // },
};
</script>

<style>
</style>