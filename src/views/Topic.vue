<template>
  <div v-if="topic">
    <!-- 文章详情页 -->
    <Panel :width="800">
      <template #content>
        <h2>
          {{ topic.title }}
          <!-- 需要登录才会出现 收藏按钮 -->
        </h2>
        <div class="coll">
          <el-button
            type="success"
            class="collect"
            v-if="true"
            @click="collect"
          >
            {{ topic.is_collect ? "取消收藏" : "收藏" }}
          </el-button>
        </div>
        <hr />
        <div v-html="topic.content"></div>
      </template>
    </Panel>
    <br />
    <!-- 评论部分 -->
    <Panel :width="800">
      <template #header>
        <span>{{ topic.replies.length }} 评论</span>
      </template>
      <template #content>
        <div>
          <div v-for="(comment, index) in topic.replies" :key="comment.id">
            <hr />
            <img width="30px" :src="comment.author.avatar_url" alt="" />
            <span style="font-weight: 700">
              {{ comment.author.loginname }}
            </span>
            <span style="font-size: 12px"> {{ index + 1 }} 楼 </span>
            <div v-html="comment.content"></div>
            <!-- 没登录 如果没有点赞数不显示点赞按钮 -->
            <!-- 登录了 没有点赞数 显示点赞按钮 不显示点赞个数 -->
            <!-- <button
              @click="upClick(comment.id)"
              v-if="isLogin"
              :class="{ 'up-active': comment.is_uped }"
            >
            点赞 {{ comment.ups.length ? comment.ups.length : "" }}
            </button> -->
            <el-button
              size="mini"
              @click="upClick(comment.id)"
              v-if="isLogin"
              :class="{ 'up-active': comment.is_uped }"
              type="success"
              icon="el-icon-thumb"
              circle
              >{{ comment.ups.length ? comment.ups.length : "" }}</el-button
            >
            &nbsp;
            <!-- <button v-if="isLogin" @click="otherSubmit(comment)">回复</button> -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              v-if="isLogin"
              @click="otherSubmit(comment)"
              >回复</el-button
            >

            <div v-if="comment.id === reply_id">
              <br />
              <textarea ref="textarea" v-model="reply_text"></textarea>
              &nbsp;&nbsp;
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="otherSubmit1(comment.id)"
                >回复</el-button
              >
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <textarea v-model.lazy="text"></textarea>
            <!-- <button @click="submit">回复</button> -->
            &nbsp;&nbsp;
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="submit"
              >回复</el-button
            >
          </div>
        </div>
      </template>
    </Panel>
  </div>
  <div v-else>文章获取中...</div>
</template>

<script>
// const arr = [1, 2, 3];
// delete arr[1];
// console.log(arr); //[1, empty, 3]
// 文章详情页 登录不登录是展示不同的内容
// vuex 里有可能存储了登录状态，但是这个登录状态必须是刷新的时候也会自动更新
// vuex 里面内更新登录状态，需要发请求的话，在该组件中不一定能获取最新的登录状态，发请求是异步的
// 取 token 前提是登录的时候 将 token 存储到了浏览器
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  name: "Topic",
  data() {
    return {
      topic: null,
      // 回复文章的评论内容
      text: "",
      //  回复评论的 id
      reply_id: "",
      // 回复评论的评论内容
      reply_text: "",
    };
  },
  computed: {
    isLogin() {
      return true;
    },
  },
  async created() {
    const { topicId } = this.$route.params;
    // console.log(this.$route);
    // console.log(this.$route.params);
    const token = true;
    const url = token
      ? `/topic/${topicId}?accesstoken=9480c067-208c-4614-8876-98302830ec54`
      : `/topic/${topicId}`;
    const res = await this.$axios.get(url);
    // console.log(res.data);
    this.topic = res.data;
    // if (token) {
    //   const res = await this.$axios.get(`/topic/${topicId}`, {
    //     accesstoken: "9480c067-208c-4614-8876-98302830ec54",
    //   });
    //   console.log(res.data);
    //   this.topic = res.data;
    // }
  },
  methods: {
    // 点赞和取消点赞
    async upClick(id) {
      // console.log(id);
      // 要判断登没登陆 和 是不是自己的评论（）
      const res = await this.$axios.post(`/reply/${id}/ups`, {
        accesstoken: "9480c067-208c-4614-8876-98302830ec54",
      });
      //   console.log(res);
      // 如何更新页面 点赞变色 个数加1
      // 方案1  根据请求的结果 up 或 down 去更新对应评论的 is_upen ups,更新 ups 需要用户的 id  608814534d20cb687768f16b
      const userId = "608814534d20cb687768f16b";
      const currentComment = this.topic.replies.find((item) => item.id === id);
      // console.log(currentComment.id);
      currentComment.is_uped = res.action === "up" ? true : false;
      // console.log(currentComment.is_uped);
      res.action === "up"
        ? currentComment.ups.push(userId)
        : currentComment.ups.splice(currentComment.ups.indexOf(userId), 1);
      // if (currentComment.id === reply_id) {
      //   alert("不能给自己点赞");
      // }
      // 方案2  重新请求一遍数据  得看实际情况 需要网络请求  封装请求数据函数
    },
    // 文章的回复
    async submit() {
      const { text } = this;
      if (text) {
        // 执行添加评论操作  post /topic/:topic_id/replies
        const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
          accesstoken: "9480c067-208c-4614-8876-98302830ec54",
          content: text,
        });
        // 如何更新页面
        // 1 根据后天 id 和 text 做假的评论对象 更新 topic
        // 2 重新请求
        const newComment = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: `<p>${text}</p>`,
          author: {
            avatar_url:
              "https://avatars.githubusercontent.com/u/79734815?v=4&s=120",
            loginname: " pengwu001 ",
          },
        };
        this.topic.replies.push(newComment);
        this.text = "";
      }
    },
    otherSubmit(comment) {
      // 在这要让对用评论的富文本出现
      // console.log(comment);
      const { id, author } = comment;
      this.reply_id = id;
      this.reply_text = `@${author.loginname} `;
      // console.log(this.$refs.textarea[0]); // undefined
      // 更新完 data 之后 马上获取更新之后的 dom 是获取不到的
      this.$nextTick(function () {
        // console.log(this.$refs.textarea[0]);
        this.$refs.textarea[0].focus();
      });
    },
    async otherSubmit1(id) {
      const { reply_text } = this;
      const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
        accesstoken: "9480c067-208c-4614-8876-98302830ec54",
        content: reply_text,
        reply_id: id,
      });
      // 如何更新页面
      // 1 根据后天 id 和 text 做假的评论对象 更新 topic
      // 2 重新请求
      const newComment = {
        id: res.reply_id,
        is_uped: false,
        ups: [],
        // content: `<p>${reply_text.replace(
        //   /@[\w-]+ /,
        //   `<a href='/user/xxx'>@xxx </a>`
        // )}</p>`,
        content: `<p>${reply_text}</p>`,
        author: {
          avatar_url:
            "https://avatars.githubusercontent.com/u/79734815?v=4&s=120",
          loginname: " pengwu001 ",
        },
      };
      this.topic.replies.push(newComment);
      this.reply_text = "";
      this.reply_id = "";
    },
    // 收藏事件
    async collect() {
      const { is_collect, id } = this.topic;
      // console.log(is_collect, id);
      const token = "9480c067-208c-4614-8876-98302830ec54";
      if (is_collect) {
        // 取消收藏请求
        await this.$axios.post("/topic_collect/de_collect", {
          topic_id: id,
          accesstoken: token,
        });
        this.topic.is_collect = false;
      } else {
        // 收藏请求
        await this.$axios.post("/topic_collect/collect", {
          topic_id: id,
          accesstoken: token,
        });
        this.topic.is_collect = true;
      }
    },
  },
};
</script>

<style>
.coll {
  overflow: hidden;
}
.collect {
  float: right;
}
.markdown-text p img {
  max-width: 100%;
}
.up-active {
  color: red;
}
</style>