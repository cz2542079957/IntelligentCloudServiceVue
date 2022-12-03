export class AuthBuffer {
	//保存用户信息
	public static userInfo(id: number, username: string) {
		// 生成待保存数据
		let data = { id, username };
		localStorage.setItem("userInfo", JSON.stringify(data));
		sessionStorage.setItem("userInfo", JSON.stringify(data)); //解决刷新候的数据同步
	}

	public static getSessionUserInfo() {
		let data = sessionStorage.getItem("userInfo") as any;
		if (data) {
			data = JSON.parse(data);
			//数据残缺
			if (!data.username ?? undefined) {
				sessionStorage.removeItem("userInfo");
				return null;
			}
			return data;
		}
		return null;
	}

	//获取用户信息
	public static getUserInfo() {
		let data = localStorage.getItem("userInfo") as any;
		if (data) {
			data = JSON.parse(data);
			//数据残缺
			if (!data.username ?? undefined) {
				localStorage.removeItem("userInfo");
				return null;
			}
			return data;
		}
		return null;
	}

	//保存token
	public static token(token: string) {
		let data = token;
		localStorage.setItem("token", data);
	}

	//获取token
	public static getToken() {
		let data = localStorage.getItem("token");
		if (data) {
			return data;
		}
		return null;
	}

	public static clearLoginCredentials() {
		localStorage.removeItem("token");
		localStorage.removeItem("userInfo");
		sessionStorage.removeItem("userInfo");
	}
}
