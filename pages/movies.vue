<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Movies</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading movies: {{ error.message }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="movie in movies" :key="movie.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ movie.title }}</h2>
        <p class="text-gray-700 mb-4">{{ movie.description }}</p>
        <p class="text-gray-600 text-sm">Release Year: {{ movie.release_year }}</p>
        <div class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Latest Comments</h3>
          <ul v-if="movie.comments && movie.comments.length > 0">
            <li v-for="comment in movie.comments" :key="comment.id" class="border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600">
              <strong>{{ comment.author || 'Anonymous' }}:</strong> {{ comment.content }}
            </li>
          </ul>
          <p v-else class="text-sm text-gray-500">No comments yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie, Comment } from '../types/index.d.ts';

const { data: movies, pending, error } = useFetch<(Movie & { comments: Comment[] })[]>('/api/movies');
</script>