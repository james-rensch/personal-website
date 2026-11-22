<template>
  <article class="page frame">
    <h1>About me</h1>
    <p class="intro-paragraph">My name is James. I am a fourth year student at the Australian National University studying Advanced Computing.</p>
    <p class="intro-paragraph">I enjoy all parts of computer science, from machine learning to web development, to operating systems and cybersecurity. I am always looking to learn more!</p>

    <RouterLink class="text-link" to="/projects">Explore my projects <span aria-hidden="true">→</span></RouterLink>
  </article>
</template>

<style scoped>
h1 {
  margin-bottom: 2.5rem;
}


.intro-paragraph {
  margin: 0 0 2rem;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.5;
}
</style>