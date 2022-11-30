import { isString } from "element-plus/es/utils";
import { defineStore } from "pinia";
import { PiniaNameSpace } from "./nameSpace";

export const useUserDataStore = defineStore(PiniaNameSpace.UserData, {
	state: () => {
		return {
			username: "", // 记录登录的用户名
			isSignin: false, // 标记是否登录
		};
	},
	actions: {
		signin() {
			this.isSignin = true;
		},
	},
});
