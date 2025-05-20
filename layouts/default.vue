<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4 shadow-md relative z-10" style="pointer-events: auto;">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold">Webol Media App</NuxtLink>
        <ul class="flex space-x-4">
          <li><NuxtLink to="/tv-shows" class="hover:underline">TV Shows</NuxtLink></li>
          <li><NuxtLink to="/movies" class="hover:underline">Movies</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-4 pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app';

const navigate = (path: string) => {
  navigateTo(path);
};
</script>