<script setup lang="ts">
import type { Project } from '../data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="project-card">
    <h2>{{ project.name }}</h2>
    <p>{{ project.details }}</p>

    <a :href="project.url" :aria-label="'View project: ' + project.name">
      View project <span aria-hidden="true">↗</span>
    </a>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  padding: 1.5rem;
  background: #fffefa;
  border: 1px solid #d9dbd2;
  border-radius: 0.55rem;
  overflow-wrap: anywhere;
}

h2 {
  margin: 0;
  font-size: 1.75rem;
}

p {
  margin: 0;
  color: #555d57;
  line-height: 1.6;
}

a {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 0.75rem;
  color: #365640;
  text-underline-offset: 0.25em;
}
</style>