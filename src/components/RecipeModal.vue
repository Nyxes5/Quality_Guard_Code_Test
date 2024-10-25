<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <div v-show="modalActive" class="modal-inner">
        <i @click="close" class="far fa-times-circle"></i>
        <div class="modal-content" v-if="modalRecipe !== null">
          <h1>{{ modalRecipe.name['nl-BE'] }}</h1>
          <p>This is a modal message</p>
        </div>
        <div class="modal-content" v-else>
          <h1>Something went wrong</h1>
        </div>
        <slot />
        <button @click="close" type="button">Close</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  modalActive: {
    type: Boolean,
    required: true,
  },
  modalRecipe: {
    type: Object,
  },
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 80%;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 64px 16px;
}

button {
  padding: 10px 30px;
  border: none;
  font-size: 16px;
  background-color: crimson;
  color: #fff;
  cursor: pointer;
}
</style>
