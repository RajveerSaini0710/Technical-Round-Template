import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('./pages/FormRegistration.vue'),
		},
		{
			path: '/form-data',
			component: () => import('./pages/DataPage.vue'),
		},
	],
})

export default router
