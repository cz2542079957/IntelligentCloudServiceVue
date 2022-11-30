


export class DefaultHeadImage {
	public static images = [
		new URL("../assets/image/defaultHeadImage/0.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/1.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/2.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/3.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/4.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/5.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/6.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/7.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/8.svg", import.meta.url)
			.href,
		new URL("../assets/image/defaultHeadImage/9.svg", import.meta.url)
			.href,
		new URL(
			"../assets/image/defaultHeadImage/10.svg",
			import.meta.url
		).href,
		new URL(
			"../assets/image/defaultHeadImage/11.svg",
			import.meta.url
		).href,
	];

	public static show(username: string) {
		let index = username.length % 12;
		return this.images[index];
	}
}
