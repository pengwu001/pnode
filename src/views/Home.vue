<template>
  <div class="home">
    <Panel :width="800">
      <template #header>
        <div class="nav">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="all"></el-tab-pane>
            <el-tab-pane label="精华" name="good"></el-tab-pane>
            <el-tab-pane label="分享" name="share"></el-tab-pane>
            <el-tab-pane label="问答" name="ask"></el-tab-pane>
            <el-tab-pane label="招聘" name="job"></el-tab-pane>
            <el-tab-pane label="客户端测试" name="dev"></el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <template #content>
        <div v-if="posts.length">
          <div class="post-item" v-for="post in posts" :key="post.id">
            <span :title="post.author.loginname" class="image">
              <router-link :to="`/user/${post.author.loginname}`"
                ><img class="avatar" :src="post.author.avatar_url" alt=""
              /></router-link>
            </span>
            <span class="count"
              ><span title="回复数" class="reply">{{ post.reply_count }}</span
              >/<span title="点击数" class="visit">{{
                post.visit_count
              }}</span></span
            >
            <span
              v-if="!tab || post.top || post.good || tab === 'all'"
              :class="post.top || post.good ? 'active-tab' : 'tab'"
              >{{ post | getPostChineseTab }}</span
            >
            <router-link
              :title="post.title"
              class="title"
              :to="{ name: 'topic', params: { topicId: post.id } }"
              >{{ post.title }}</router-link
            >
          </div>
        </div>
        <div v-else>
          <el-table
            v-loading="loading"
            :data="posts"
            style="width: 100%; height: 400px"
          >
          </el-table>
        </div>
        <!-- 比如说点击了 分享的第三页  /share？page=3 -->
        <!-- 获取当前页面的地址 $route.path -->
        <br />
        <el-pagination
          v-if="posts.length"
          background
          layout="prev, pager, next"
          :total="720"
          :current-page.sync="currentPage"
        >
        </el-pagination>
        <!-- <br /> -->
        <!-- <div v-if="posts.length">
          我是假的分页器
          <button>
            <router-link :to="$route.path + '?page=2'">2</router-link>
          </button>
          <button>
            <router-link :to="$route.path + '?page=3'">3</router-link>
          </button>
          <button @click="pageClick(4)">4</button>
        </div> -->
      </template>
    </Panel>
  </div>
</template>
<script>
import Panel from "../layout/Panel";
export default {
  components: { Panel },
  name: "Home",
  data() {
    return {
      posts: [],
      activeName: "all",
      currentPage: 1,
      pageTotalList: [
        {
          tab: "all",
          total: 680,
        },
        {
          tab: "dev",
          total: 400,
        },
        {
          tab: "good",
          total: 720,
        },
        {
          tab: "share",
          total: 420,
        },
        {
          tab: "ask",
          total: 260,
        },
        {
          tab: "job",
          total: 240,
        },
      ],
      loading: true,
    };
  },
  // 通过监听动态路由参数获取对应的分类数据
  watch: {
    tab: {
      async handler(newValue) {
        // console.log(newValue);
        // const tab = newValue || "all";
        const queryTab = newValue ? `&tab=${newValue}` : "";
        // const res = await this.$axios.get(`/topics?page=1&limit=40&tab=${tab}`);
        const res = await this.$axios.get(`/topics?page=1&limit=40${queryTab}`);
        // console.log(res.data);
        this.posts = res.data;
      },
      immediate: true,
    },

    currentPage: {
      handler(newvalue) {
        this.getPosts(newvalue);
      },
      immediate: true,
    },
  },
  computed: {
    tab() {
      // console.log(this.$route);
      return this.$route.params.tab;
    },
  },
  methods: {
    // 封装请求函数
    async getPosts() {
      const tabs = this.$route.params;
      const res = await this.$axios.get(
        `/topics?page=${this.currentPage}&tab=${tabs}$limit=40`
      );
      console.log(tabs);
      this.posts = res.data;
    },
    // pageClick(page) {
    //   this.$router.push(this.$route.path + "?page=" + page);
    // },
    handleClick() {
      if (this.activeName !== this.$route.params.tab) {
        this.$router.push(`/${this.activeName}`);
      }
      // console.log(this.activeName);
      // console.log(this.$route.params.tab);
    },
  },
  // async created() {
  //   // console.log("组件重新执行");
  //   const res = await this.$axios.get("/topics?page=1&limit=40");
  //   // console.log(res.data);
  //   this.posts = res.data;
  // },
};
</script>
<style lang='less'>
.nav {
  height: 40px;
  .el-tabs__item {
    padding: 10px 15px;
    font-size: 16px;
    color: #80bd01;
    line-height: 25px;
    user-select: none;
  }
  .el-tabs__item.is-active {
    background-color: #80bd01;
    color: #fff;
    border-radius: 3px;
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding: 10px 15px;
  }
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding: 10px 15px;
  }
}
.post-item {
  display: flex;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
  .image {
    width: 40px;
  }
  .avatar {
    width: 40px;
    border-radius: 4px;
    height: 40px;
    margin: 4px 0;
  }
  .title {
    width: 55%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
    color: black;
  }
  .title:hover {
    text-decoration: underline;
  }
  .tab {
    background-color: #e5e5e5;
    color: #999;
    align-self: center;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
  }
  .active-tab {
    align-self: center;
    background-color: #80bd01;
    color: #fff;
    padding: 4px 6px;
    border-radius: 3px;
    font-size: 12px;
  }
  .count {
    padding: 10px;
    width: 80px;
    font-size: 14px;
  }
  .reply {
    color: #9e78c0;
  }
  .visit {
    font-size: 10px;
    color: #b4b4b4;
  }
}
.post-item:first-child {
  border: none;
}
</style>
