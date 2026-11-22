import type { Component } from 'vue'

export interface Project {
  name: string
  details: string
  url: string
  view: () => Promise<{ default: Component }>
}

export const projects: Project[] = [
  {
    name: 'Checkers Bot',
    details: 'In this project, I developed different algorithms to autonomously play checkers. This project was undertaken to explore implementing a reinforcement learning algorithm, as well as to experiment with embedding Rust into webpages using WebAssembly.',
    url: '/projects/checkers-bot',
    view: () => import('../views/projects/checkers_bot/CheckersBotView.vue'),
  },
  {
    name: 'Team Sailing Competition Pairer',
    details: 'This project developed a full stack webapplication running a Vue.js frontend and Express.js backend to manage pairings for a team sailing competition.',
    url: '/projects/team-sailing-pairer',
    view: () => import('../views/projects/team_sailing_pairer/TeamSailingPairerView.vue'),
  },
]