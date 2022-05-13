import axios from "axios"

export const postModule = {
	state: () => ({
		posts: [],
		isPostLoading: false,
		selectedSort: '',
		searchQuery: '',
		page: 1,
		limit: 10,
		totalPages: 0,
		sortOptions: [
			{value: 'title', name: 'По названию'},
			{value: 'body', name: 'По описанию'},
		],
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
		},
		sortedAndSearchedPosts(state, getters) {
			console.log()
			return getters.sortedPosts.filter(post => post?.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		}
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts
		},
		setLoading(state, bool) {
			state.isPostLoading = bool
		},
		setPage(state, page) {
			state.page = page
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery
		},
		setLimit(state, limit) {
			state.limit = limit
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},
		setSortOptions(state, sortOptions) {
			state.sortOptions = [...state.sortOptions, ...sortOptions]
		}
	},
	actions: {
		async fetchPosts({state, commit}) {
			commit('setLoading', true)
			try {
				const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
					params: {
						_limit: state.limit,
						_page: state.page
					}
				})
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				commit('setPosts', response.data)
			} catch (e) {
				console.log(e.message)
			} finally {
				commit('setLoading', false)
			}
		},
		async loadMorePosts({state, commit}) {
			commit('setPage', state.page + 1)
			try {
				const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
					params: {
						_limit: state.limit,
						_page: state.page
					}
				})
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				commit('setPosts', [...state.posts, ...response.data])
			} catch (e) {
				console.log(e.message)
			}
		},
	},
	namespaced: true
}