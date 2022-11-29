import { defineStore } from "pinia";
import { PiniaNameSpace } from "./nameSpace";

export const useThemeSwitchStore = defineStore(
	PiniaNameSpace.ThemeSwitch,
	{
		state: () => {
			return {
				theme: 1, //当前的主题
			};
		},
		actions: {
			init() {
				let theme = this.theme == 1 ? "lightTheme" : "darkTheme";
				document.documentElement.setAttribute("data-theme", theme);
			},

			// 切换主题
			switch() {
				if (this.theme == 1) {
					// 当前为亮主题切换为暗主题
					document.documentElement.setAttribute(
						"data-theme",
						"darkTheme"
					);
				} else {
					document.documentElement.setAttribute(
						"data-theme",
						"lightTheme"
					);
				}
			},
		},
		getters: {},
	}
);
