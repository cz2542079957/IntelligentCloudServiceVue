import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import install from "./utils/axios";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementIcons from "@element-plus/icons-vue";
import * as Utils from "./utils/utilFunctions";
import "animate.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);

install(app);

// 挂载element
app.use(ElementPlus);
for (let i in ElementIcons) {
	app.component(i, ElementIcons[i]);
}

app.config.globalProperties.Utils = Utils;

app.mount("#app");
