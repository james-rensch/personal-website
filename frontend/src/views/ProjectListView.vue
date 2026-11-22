<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
</script>

<template>
  <section class="page frame">
    <h1>My projects</h1>

    <ul class="grid">
      <li v-for="project in projects" :key="project.url">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </section>
</template>