<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in totalPages"
        key="pageNumber"
        class="page"
        @click="$emit('setPage', pageNumber)"
        :class="{
            'current-page': page === pageNumber
          }"
    >
      {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-pagination',
  props: {
    totalPages: {
      type: Number
    },
    page: {
      type: Number
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
</style>