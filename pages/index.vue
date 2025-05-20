<template>
  <div class="text-center min-h-screen p-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to Webol Media App</h1>
    <p class="text-lg text-gray-700 mb-8">Explore TV shows and movies.</p>
    <div class="flex justify-center space-x-4">
      <button type="button" @click="navigate('/tv-shows')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View TV Shows
      </button>
      <button type="button" @click="navigate('/movies')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        View Movies
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app';

const navigate = (path: string) => {
  navigateTo(path);
};
</script>