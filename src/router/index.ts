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
			path: "/PictureSuperResolution",
			component: () => import("../pages/PictureSuperResolution.vue"),
		},

		{
			path: "/TargetDetection",
			component: () => import("../pages/TargetDetection.vue"),
		},
		{
			path: "/SemanticSegmentation",
			component: () => import("../pages/SemanticSegmentation.vue"),
		},
		{
			path: "/InstanceSegmentation",
			component: () => import("../pages/InstanceSegmentation.vue"),
		},
		{
			path: "/PanoramicSegmentation",
			component: () => import("../pages/PanoramicSegmentation.vue"),
		},
	],
});


export default router;
