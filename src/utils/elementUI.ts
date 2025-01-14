import { ElLoading, ElMessage, ElNotification } from "element-plus";
import { useUserDataStore } from "../pinia/userData";
import getUtils from "./registrationCenter";

type types = "success" | "warning" | "info" | "error";
type elMessageParams = {
	message: string;
	type: types;
	duration?: number;
	dangerouslyUseHTMLString?: boolean;
};
type elLoadingParams = {
	node: string | HTMLElement | Element | undefined;
	text?: string;
	fullscreen?: boolean;
};
type elNotificationParams = {
	title?: string | undefined;
	message?: string;
	type?: types;
	position?:
		| "top-right"
		| "top-left"
		| "bottom-right"
		| "bottom-left";
	duration?: number;
	dangerouslyUseHTMLString?: boolean;
	offset?: number;
};

export function stateCodeHandler(data: any) {
	let code = data?.code ?? null;
	let msg = data?.msg ?? null;
	if (!msg) {
		if (!code) {
			elMessage({ message: "未知错误！", type: "error" });
			return;
		}
		elMessage({
			message: "错误:" + code + ",请联系管理人员",
			type: "error",
		});
	}
	code = Number(code);
	if (code == 0) {
		return;
	}
	if ([11, 12, 13].includes(code)) {
    let userData = useUserDataStore();
    userData.logout();
	}
	let message = msg.split("\\")[0];
	let type = msg.split("\\")[1] as types;
	elMessage({ message, type });
}

export function elMessage({
	message = "",
	type = "info",
	duration = 3000,
	dangerouslyUseHTMLString = false,
}: elMessageParams) {
	return ElMessage({
		message,
		type,
		duration,
		dangerouslyUseHTMLString,
	});
}

export function elLoading({
	node,
	text = "加载中",
	fullscreen = false,
}: elLoadingParams) {
	return ElLoading.service({
		target: node as string | HTMLElement,
		text,
		fullscreen,
	});
}

export function elNotification({
	title = "",
	message = "",
	type = "info",
	position = "top-right",
	duration = 3000,
	dangerouslyUseHTMLString = false,
	offset = 0,
}: elNotificationParams) {
	return ElNotification({
		title,
		message,
		type,
		position,
		duration,
		dangerouslyUseHTMLString,
		offset: offset + 50,
	});
}
