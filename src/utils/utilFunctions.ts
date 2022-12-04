//时间转换工具包
export class TimeTools {
	//时间戳转日期(年月日)
	public static timestampToDate(
		time: number,
		mode: number = 1
	): string {
		if (time <= 1e10) time *= 1000;
		let t = new Date(time);
		let y = t.getFullYear();
		let m = t.getMonth() + 1;
		let d = t.getDate();
		if (mode == 1) {
			return y + "/" + m + "/" + d;
		} else if (mode == 2) {
			return (
				y +
				"-" +
				(m < 10 ? "0" + m : m) +
				"-" +
				(d < 10 ? "0" + d : d)
			);
		}
		return "";
	}

	//时间戳转日期（年月日 时分秒）
	public static timestampToTime(time: number): string {
		if (time <= 1e10) time *= 1000;
		let t = new Date(time);
		let y = t.getFullYear();
		let m = t.getMonth() + 1;
		let d = t.getDate();
		let h = t.getHours();
		let mi =
			t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
		let s =
			t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
		return y + "/" + m + "/" + d + " " + h + ":" + mi + ":" + s;
	}

	//时间戳获取 时分秒
	public static timestampGetHMS(
		time: number,
		mode: number = 1
	): string {
		let d = new Date(time);
		let h = d.getHours();
		let m =
			d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		let s =
			d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
		if (mode == 1) return h + ":" + m + ":" + s;
		else return h + ":" + m;
	}

	//时间戳间隔计算1 (计算两个时间戳间隔了多少天)
	public static timeIntervalToDay(
		time1: number,
		time2: number
	): number {
		if (time1 <= 1e10) time1 *= 1000;
		if (time2 <= 1e10) time2 *= 1000;
		let t = Math.abs(time1 - time2);
		t = Math.floor(t / (3600 * 1000 * 24));
		return t;
	}

	//时间戳间隔计算2 (计算两个时间戳间隔了多少时分秒，可选择格式)
	public static timeIntervalToTime(
		time1: number,
		time2: number,
		mode: number = 1
	): string {
		if (time1 <= 1e10) time1 *= 1000;
		if (time2 <= 1e10) time2 *= 1000;
		let t = Math.abs(time1 - time2);
		let h = Math.floor(t / 3600000);
		t %= 3600000;
		let m = Math.floor(t / 60000);
		t %= 60000;
		let s = Math.floor(t / 1000);
		if (mode == 1) return h + "时" + m + "分" + s + "秒";
		else
			return (
				h +
				":" +
				(m < 10 ? "0" + m : m) +
				":" +
				(s < 10 ? "0" + s : s)
			);
	}

	//毫秒转时间 (时分秒)
	public static timestampToInterval(
		t: number,
		mode: number = 1
	): string {
		let h = Math.floor(t / 3600000);
		t %= 3600000;
		let m = Math.floor(t / 60000);
		t %= 60000;
		let s = Math.floor(t / 1000);
		if (mode == 1) return h + "时" + m + "分" + s + "秒";
		else
			return (
				h +
				":" +
				(m < 10 ? "0" + m : m) +
				":" +
				(s < 10 ? "0" + s : s)
			);
	}
}

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
		username == username ?? "";
		let index = username.length % 12;
		return this.images[index];
	}
}
