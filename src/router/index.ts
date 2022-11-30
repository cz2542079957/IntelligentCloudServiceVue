import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: {
				path: "/Introduce",
			},
		},
		{
			path: "/Introduce",
			component: () => import("../pages/Introduce.vue"),
		},
		{
			path: "/MNIST",
			component: () => import("../pages/MNIST.vue"),
		},
	],
});

export default router;
