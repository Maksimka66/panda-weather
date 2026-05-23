<template>
  <button class="add-forecast-btn" @click="openModal">
    <PlusIcon />
  </button>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import PlusIcon from '../icons/PlusIcon.vue'

const openModal = () => {
  Swal.fire({
    input: 'text',
    inputLabel: 'Enter the location',
    showCancelButton: true
  })
}
</script>

<style scoped>
.add-forecast-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px dotted #15da25;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
