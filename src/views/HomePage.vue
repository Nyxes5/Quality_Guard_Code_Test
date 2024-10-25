<script setup lang="ts">
import { useRecipes } from '../stores/useRecipes'
import { onMounted, computed } from 'vue'

const recipesStore = useRecipes()
onMounted(async () => {
  try {
    await recipesStore.fetchOnce()
  } catch (e) {
    console.log(e.message)
  }
})

const recipes = computed(function () {
  if (!recipesStore.isFetched) return []
  return recipesStore.items
})
</script>

<template>
  <main>
    <a>Test</a>
    <div v-for="(recipe, index) in recipes" :key="index" class="q-pa-md">
      <a>test</a>
    </div>
  </main>
</template>
