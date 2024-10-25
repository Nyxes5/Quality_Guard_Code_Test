import { api } from '../axios'
import { defineStore } from 'pinia'

export const useRecipes = defineStore('recipes', {
  state: () => ({ items: null }),
  getters: {
    isFetched: state => state.items !== null,
  },
  actions: {
    async fetchOnce() {
      this.items === null && (await this.fetch())
    },
    async fetch() {
      await api
        .get('/RecipeInfo/contracts/21/recipes')
        .then(response => {
          console.log(response)
          this.items = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
  },
})
