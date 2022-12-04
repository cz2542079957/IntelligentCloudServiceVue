import { App } from "vue";
import router from "../router";
import * as axiosFunction from "../utils/axios";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementIcons from "@element-plus/icons-vue";
import * as elementUIs from "./elementUI";
import * as Util from "./utilFunctions";
import "animate.css";

const utils = { ...elementUIs, ...Util, ...axiosFunction };

export function register(app: App<Element>) {
	// 挂载router
	app.use(router);
	// 挂载pinia
	app.use(createPinia());
	// 挂载element
	app.use(ElementPlus);
	for (let i in ElementIcons) {
		app.component(i, ElementIcons[i]);
	}
}

//全局工具箱
export default function getUtils() {
	return utils;
}
