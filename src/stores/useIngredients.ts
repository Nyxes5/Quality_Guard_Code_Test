import { api } from '../axios'
import { defineStore } from 'pinia'

export const useIngredients = defineStore('ingredients', {
  state: () => ({ items: {} }),
  getters: {
    isFetched: state => recipeId => recipeId in state.items,
    getById: state => {
      return (recipeId) => state.items[recipeId]
    }
  },
  actions: {
    async fetchOnce(recipeId) {
      !(recipeId in this.items) && (await this.fetch(recipeId))
    },
    async fetch(recipeId) {
      await api
        // .get('RecipeInfo/recipes/' + recipeId + '/ingredients')
        .get('ingredients_of_' + recipeId) // TODO: Temporary since problems with CORS
        .then(response => {
          console.log(response.data)
          this.items[recipeId] = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
  },
})
