import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import router from "./router";
import axios from "axios";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementIcons from "@element-plus/icons-vue";

const app = createApp(App);
app.use(createPinia());

app.config.globalProperties.$axios = axios;

// 挂载element
app.use(ElementPlus);
for (let i in ElementIcons) {
	app.component(i, ElementIcons[i]);
}

app.mount("#app");
