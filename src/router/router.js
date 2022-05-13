import Main from "@/pages/Main"
import {createRouter, createWebHashHistory} from "vue-router"
import UserPage from "@/pages/PostsPage"
import About from "@/pages/About"
import PostIdPage from "@/pages/PostIdPage"
import PostsPageWithStore from "@/pages/PostsPageWithStore"
import PostsPageWithComposition from "@/pages/PostsPageWithComposition"

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/posts',
		component: UserPage
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/posts/:id',
		component: PostIdPage
	},
	{
		path: '/store',
		component: PostsPageWithStore
	},
	{
		path: '/composition',
		component: PostsPageWithComposition
	},
]

const router = createRouter({
	routes,
	history: createWebHashHistory(process.env.BASE_URL)
})

export default router
