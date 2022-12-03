import axios, { AxiosRequestConfig } from "axios";
import { AuthBuffer } from "./buffer";

//请求拦截器
axios.interceptors.request.use(
	//发送请求前
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		config.headers.token = AuthBuffer.getToken();
		return config;
	},
	//发送请求出错
	(err) => {
		return Promise.reject(err);
	}
);

//响应拦截器
axios.interceptors.response.use(
	//正常返回
	(res) => {
		// console.log(res);
		return res;
	},
	//错误响应
	(err) => {
		// console.log(err);
		return err.response;
	}
);

var baseUrl = ["http://127.0.0.1:4077/", ""];

var header = {
	ContentType: ["application/json", "multipart/form-data"],
};

type getOpt = {
	url: string;
	config?: {
		params?: { [item: string]: any };
		headers?: { [item: string]: any };
		server?: number;
	};
};

type postOpt = {
	url: string;
	data: { [item: string]: any };
	config?: {
		params?: { [item: string]: any };
		headers?: { [item: string]: any };
		server?: number;
	};
};

type putOpt = {
	url: string;
	data: { [item: string]: any };
	config?: {
		params?: { [item: string]: any };
		headers?: { [item: string]: any };
		server?: number;
	};
};

type deleteOpt = {
	url: string;
	config?: {
		params?: { [item: string]: any };
		headers?: { [item: string]: any };
		server?: number;
	};
};

export function $get(opt: getOpt) {
	let url = baseUrl[opt.config?.server ?? 0] + opt.url ?? "";
	return axios.get(url, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config?.headers?.ContentType ?? 0],
		},
	});
}

export function $post(opt: postOpt) {
	let url = baseUrl[opt.config?.server ?? 0] + opt.url ?? "";
	return axios.post(url, opt.data ?? null, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config?.headers?.ContentType ?? 0],
		},
	});
}

export function $put(opt: putOpt) {
	let url = baseUrl[opt.config?.server ?? 0] + opt.url ?? "";
	return axios.put(url, opt.data ?? null, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config?.headers?.ContentType ?? 0],
		},
	});
}

export function $delete(opt: deleteOpt) {
	let url = baseUrl[opt.config?.server ?? 0] + opt.url ?? "";
	return axios.delete(url, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config?.headers?.ContentType ?? 0],
		},
	});
}
