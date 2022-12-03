import { defineStore } from "pinia";
import { AuthBuffer } from "../utils/buffer";
import { PiniaNameSpace } from "./nameSpace";

export const useUserDataStore = defineStore(PiniaNameSpace.UserData, {
	state: () => {
		return {
			id: null,
			username: "", // 记录登录的用户名
			isSignin: false, // 标记是否登录
		};
	},
	actions: {
		//用户登录或者注册成功
		signin(id: number, username: string) {
			this.id = id;
			this.username = username;
			this.isSignin = true;
			//保存登录状态
			AuthBuffer.userInfo(id, username);
		},

		//保存token
		saveToken(token: string) {
			AuthBuffer.token(token);
		},
	},
});
