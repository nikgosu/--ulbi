<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        placeholder="Поиск..."
        v-model="searchQuery"
    />
    <div class="app_btns">
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import {usePosts} from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
    }
  },
  setup(props) {
    const {posts, isPostLoading, totalPages} = usePosts(10)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, isPostLoading, totalPages, selectedSort, sortedPosts, searchQuery, sortedAndSearchedPosts
    }
  }
}
</script>

<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

</style>