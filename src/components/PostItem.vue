<template>
  <div class="post">
    <div>
      <div><strong>Название: {{post.id}}</strong></div>
      <div><strong>Название: {{post.title}}</strong></div>
      <div><strong>Описание: {{post.body}}</strong></div>
    </div>
    <div class="post__btns">
      <my-button
          @click="$router.push(`/posts/${post.id}`)"
      >Открыть</my-button>
      <my-button
          @click="$emit('remove', post)"
      >Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>