<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <a class="skip" href="#content">Skip to content</a>
  <header class="site-header">
    <nav aria-label="Main navigation" class="frame">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
    </nav>
  </header>
  <main id="content" tabindex="-1"><RouterView /></main>
</template>

