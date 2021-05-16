import Vue from "vue";
import {
  Button,
  Tabs,
  TabPane,
  Table,
  Message,
  Loading,
  Notification,
  Input,
  Pagination
} from "element-ui";

Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(Loading);
Vue.use(Input);
Vue.use(Pagination);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
