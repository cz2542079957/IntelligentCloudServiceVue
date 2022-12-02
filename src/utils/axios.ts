import axios, { AxiosRequestConfig } from "axios";
import { App } from "vue";

//请求拦截器
axios.interceptors.request.use(
	//发送请求前
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		config.headers.Authorization = "";
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

function _get(opt: getOpt) {
	let url = baseUrl[opt.config.server ?? 0] + opt.url ?? "";
	return axios.get(url, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config.headers?.ContentType ?? 0],
		},
	});
}

function _post(opt: postOpt) {
	let url = baseUrl[opt.config.server ?? 0] + opt.url ?? "";
	return axios.post(url, opt.data ?? null, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config.headers?.ContentType ?? 0],
		},
	});
}

function _put(opt: putOpt) {
	let url = baseUrl[opt.config.server ?? 0] + opt.url ?? "";
	return axios.put(url, opt.data ?? null, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config.headers?.ContentType ?? 0],
		},
	});
}

function _delete(opt: deleteOpt) {
	let url = baseUrl[opt.config.server ?? 0] + opt.url ?? "";
	return axios.delete(url, {
		params: opt.config?.params ?? null,
		headers: {
			"Content-Type":
				header.ContentType[opt.config.headers?.ContentType ?? 0],
		},
	});
}

//安装配置axios封装函数
export default function install(app: App<Element>) {
	//安装get
	app.config.globalProperties.$get = _get;
	//安装post
	app.config.globalProperties.$post = _post;
	//安装put
	app.config.globalProperties.$put = _put;
	//安装delete
	app.config.globalProperties.$delete = _delete;
}
