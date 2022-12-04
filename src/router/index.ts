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
		{
			path: "/CIFAR",
			component: () => import("../pages/CIFAR.vue"),
		},
		{
			path: "/TargetDetection",
			component: () => import("../pages/TargetDetection.vue"),
		},
	],
});

/*

semantic segmentation
Instance segmentation
Panoramic segmentation

*/

export default router;
