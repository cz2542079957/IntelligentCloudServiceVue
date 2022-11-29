import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/content",
			component: () => import("../pages/Content.vue"),
		},
	],
});

export default router;
