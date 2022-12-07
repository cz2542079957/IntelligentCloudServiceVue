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
			path: "/AcrosticPoetry",
			component: () => import("../pages/AcrosticPoetry.vue"),
		},
		{
			path: "/Novel",
			component: () => import("../pages/Novel.vue"),
		},
		{
			path: "/PictureDefogging",
			component: () => import("../pages/PictureDefogging.vue"),
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
