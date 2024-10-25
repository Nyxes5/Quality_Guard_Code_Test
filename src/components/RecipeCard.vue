<script setup lang="ts">
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <main>
    <div class="card">
      <div class="container">
        <h4>
          <b v-if="recipe.name['nl-BE']">{{ recipe.name['nl-BE'] }}</b>
          <b v-else>Name doesn't exist</b>
        </h4>
        <p v-if="recipe.recipeCategory['nl-BE']">
          Category: {{ recipe.recipeCategory['nl-BE'] }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: auto;
  height: 100px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  height: 100px;
}

.container {
  padding: 2px 16px;
}
</style>
