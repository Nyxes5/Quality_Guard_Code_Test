import { api } from '../axios'
import { defineStore } from 'pinia'

export const useIngredients = defineStore('ingredients', {
  state: () => ({ items: {} }),
  getters: {
    isFetched: state => id => id in state.items,
    getById: state => {
      return (id) => state.items[id]
    }
  },
  actions: {
    async fetchOnce(id) {
      !(id in this.items) && (await this.fetch(id))
    },
    async fetch(id) {
      await api
        .get('ingredients_of_' + id) // TODO: Temporary since problems with CORS
        .then(response => {
          console.log(response.data)
          this.items[id] = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
  },
})
