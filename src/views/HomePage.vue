<script setup lang="ts">
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipes } from '../stores/useRecipes'
import { useIngredients } from '../stores/useIngredients'
import { onMounted, computed } from 'vue'
import Modal from '@/components/RecipeModal.vue'
import { ref } from 'vue'

// Modal functions
const modalActive = ref(false)
const modalRecipe = ref(null)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const openRecipe = recipe => {
  modalRecipe.value = recipe
  fetchIngredients(recipe.id)
  toggleModal()
}

// Fetching of ingredients and allergenes for modal
const ingredientsStore = useIngredients()
const fetchIngredients = recipeId => {
  ingredientsStore.fetchOnce(recipeId)
}

const modalIngredients = computed(function () {
  if (
    modalRecipe.value !== null &&
    !ingredientsStore.isFetched(modalRecipe.value.id)
  )
    return null
  return ingredientsStore.getById(modalRecipe.value.id)
})

// Recipes functions
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
    <!-- Modal -->
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content" v-if="modalRecipe !== null && modalIngredients !== null ">
        <h1>{{ modalRecipe.name['nl-BE'] }}</h1>
        <div v-for="(retailproduct, index) in modalIngredients.retailproducts" :key="index">
          <p>{{ retailproduct.name['nl-BE'] }}: {{ retailproduct.content.quantity }} {{ retailproduct.content.unit }}</p>
        </div>
      </div>
      <div class="modal-content" v-else>
        <h1>Something went wrong</h1>
      </div>
    </Modal>

    <!-- Recipes -->
    <h1>Recipes</h1>
    <div class="row">
      <div v-for="(recipe, index) in recipes" :key="index" class="column">
        <recipe-card
          @click="openRecipe(recipe)"
          class="card"
          :recipe="recipe"
        ></recipe-card>
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
