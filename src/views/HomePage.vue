<script setup lang="ts">
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipes } from '../stores/useRecipes'
import { useIngredients } from '../stores/useIngredients'
import { onMounted, computed } from 'vue'
import Modal from '@/components/RecipeModal.vue'
import { ref, watch } from 'vue'

// Recipes functions
const recipesStore = useRecipes()
onMounted(async () => {
  try {
    await recipesStore.fetchOnce()
  } catch (e) {
    console.log(e.message)
  }

  window.addEventListener('resize', handleWindowSizeChange); // To change page size when resizing
  handleWindowSizeChange() // Initialize page size
})

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

// Search functions
const input = ref('')

const filteredList = computed(function () {
  if (!recipesStore.isFetched) return []
  return recipesStore.items.filter(recipe => {
    if (recipe.name['nl-BE'] !== null) {
      return recipe.name['nl-BE']
        .toLowerCase()
        .includes(input.value.toLowerCase())
    } else {
      return false
    }
  })
})

// Pagination
const pageSize = ref(24)
const currentPage = ref(1)

const indexStart = computed(function () {
  return (currentPage.value - 1) * pageSize.value
})

const indexEnd = computed(function () {
  return indexStart.value + pageSize.value
})

const amountOfPages = computed(function () {
  if (!recipesStore.isFetched || filteredList.value.length == 0) return 0
  return Math.ceil(filteredList.value.length / pageSize.value)
})

const paginated = computed(function () {
  if (!recipesStore.isFetched) return []
  return filteredList.value.slice(indexStart.value, indexEnd.value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < amountOfPages.value) {
    currentPage.value++
  }
}

watch(input, () => {
  currentPage.value = 1 // Reset page when searching
})

const setPage = e => {
  if (e.target.value > 0 && e.target.value <= amountOfPages.value)
    currentPage.value = e.target.value
}

const handleWindowSizeChange = () => {
  if (window.innerWidth <= 1350) {
    pageSize.value = 12
  } else if (window.innerWidth <= 675) {
    pageSize.value = 6
  } else {
    pageSize.value = 24
  }
}
</script>

<template>
  <main>
    <!-- Modal -->
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div
        class="modal-content"
        v-if="modalRecipe !== null && modalIngredients !== null"
      >
        <h1>{{ modalRecipe.name['nl-BE'] }}</h1>
        <div
          v-for="(retailproduct, index) in modalIngredients.retailproducts"
          :key="index"
        >
          <p>
            {{ retailproduct.name['nl-BE'] }}:
            {{ retailproduct.content.quantity }}
            {{ retailproduct.content.unit }}
          </p>
        </div>
      </div>
      <div class="modal-content" v-else>
        <h1>Something went wrong</h1>
      </div>
    </Modal>

    <!-- Recipes -->
    <h1>Recipes</h1>
    <input type="text" v-model="input" placeholder="Search recipe..." @change="resetPage"/>
    <div class="row">
      <div class="column" v-for="recipe in paginated" :key="recipe">
        <recipe-card
          @click="openRecipe(recipe)"
          class="card"
          :recipe="recipe"
        ></recipe-card>
      </div>
      <div class="item error" v-if="input && !paginated.length">
        <p>No recipes found!</p>
      </div>
    </div>
    <div class="pagination-buttons">
      <button
        @click="prevPage()"
        type="button"
        class="btn btn-lg btn-dark mb-3"
      >
        < Prev
      </button>
      <select name="page" id="page" @change="setPage">
        <option
          :value="index"
          v-for="index in amountOfPages"
          :key="index"
          :selected="currentPage === index"
        >
          {{ index }}
        </option>
      </select>
      <button
        @click="nextPage()"
        type="button"
        class="btn btn-lg btn-dark mb-3"
      >
        Next >
      </button>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-auto-rows: auto;
  grid-gap: 1rem;
}

h1 {
  text-align: center;
}

input {
  text-align: center;
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url('../assets/search-icon.png') no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

@media screen and (max-width: 1350px) {
  .row {
    grid-template-columns: repeat(2, 300px);
  }
}

@media screen and (max-width: 675px) {
  .row {
    grid-template-columns: repeat(1, 300px);
  }
}

.pagination-buttons {
  text-align: center;
  margin: 20px auto;
}
</style>
