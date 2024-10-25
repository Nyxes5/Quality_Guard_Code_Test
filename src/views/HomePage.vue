<script setup lang="ts">
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipes } from '../stores/useRecipes'
import { onMounted, computed } from 'vue'
import Modal from '@/components/RecipeModal.vue'
import { ref } from 'vue'

const modalActive = ref(false)
const modalRecipe = ref(null)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const openRecipe = (recipe) => {
  modalRecipe.value = recipe
  toggleModal()
}

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
    <Modal @close="toggleModal" :modalActive="modalActive" :modalRecipe="modalRecipe"> </Modal>
    <h1>Recipes</h1>
    <div class="row">
      <div v-for="(recipe, index) in recipes" :key="index" class="column">
        <recipe-card @click="openRecipe(recipe)" class="card" :recipe="recipe"></recipe-card>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}
.card {
  height: 100%;
}

@media screen and (max-width: 1200px) {
  .column {
    width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
