<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        placeholder="Поиск..."
        v-model="searchQuery"
    />
    <div class="app_btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div
        v-intersection="{loadMorePosts}"
        class="observer"
    ></div>
    <!--    <page-pagination-->
    <!--        :totalPages="totalPages"-->
    <!--        :page="page"-->
    <!--        @setPage="setPage"-->
    <!--    />-->
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
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
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(postItem => postItem.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      this.isPostLoading = true
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      this.page += 1
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Error')
      }
    },
    // setPage(selectedPage) {
    //   this.page = selectedPage
    // }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post?.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>
.app {
  padding: 20px;
}
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

</style>