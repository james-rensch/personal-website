<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

type Piece = 'black' | 'red'
type Controller = 'manual' | 'random' | 'center'
type Move = { from: number; to: number }

const players = [
  { color: 'black', label: 'Black' },
  { color: 'red', label: 'Red' },
] as const

const controllerOptions: { value: Controller; label: string }[] = [
  { value: 'manual', label: 'Manual' },
  { value: 'random', label: 'Random bot' },
  { value: 'center', label: 'Center bot' },
]

const board = ref(Array.from({ length: 64 }, (_, index) => {
  const row = Math.floor(index / 8)
  const column = index % 8
  const isDark = (row + column) % 2 === 1
  let piece: Piece | null = null

  if (isDark && row < 3) {
    piece = 'black'
  } else if (isDark && row >= 5) {
    piece = 'red'
  }

  return { index, row, column, isDark, piece }
}))

const turn = ref<Piece>('black')
const selectedIndex = ref<number | null>(null)
const controllers = reactive<Record<Piece, Controller>>({
  black: 'manual',
  red: 'manual',
})

const activeController = computed(() => controllers[turn.value])
const turnLabel = computed(() => turn.value === 'black' ? 'Black' : 'Red')
const legalMoves = computed(() => {
  const moves: Move[] = []
  const direction = turn.value === 'black' ? 1 : -1

  for (const square of board.value) {
    if (square.piece !== turn.value) continue

    const row = square.row + direction
    if (row < 0 || row >= 8) continue

    for (const offset of [-1, 1]) {
      const column = square.column + offset
      if (column < 0 || column >= 8) continue

      const to = row * 8 + column
      if (board.value[to]?.piece === null) {
        moves.push({ from: square.index, to })
      }
    }
  }

  return moves
})

const legalDestinations = computed(() => new Set(
  legalMoves.value.filter(move => move.from === selectedIndex.value).map(move => move.to),
))

function playMove({ from, to }: Move) {
  const origin = board.value[from]
  const destination = board.value[to]
  if (!origin?.piece || !destination) return

  destination.piece = origin.piece
  origin.piece = null
  selectedIndex.value = null
  turn.value = turn.value === 'black' ? 'red' : 'black'
}

function clickSquare(index: number) {
  if (activeController.value !== 'manual') return

  if (board.value[index]?.piece === turn.value) {
    selectedIndex.value = selectedIndex.value === index ? null : index
    return
  }

  const move = legalMoves.value.find(move => move.from === selectedIndex.value && move.to === index)
  if (move) playMove(move)
}

function centerDistance(move: Move) {
  return Math.abs((move.to % 8) - 3.5)
}

watch([turn, activeController], ([, controller], _, onCleanup) => {
  selectedIndex.value = null
  const moves = legalMoves.value
  if (controller === 'manual' || !moves.length) return

  const timer = setTimeout(() => {
    const move = controller === 'random'
      ? moves[Math.floor(Math.random() * moves.length)]
      : moves.reduce((best, candidate) => {
          return centerDistance(candidate) < centerDistance(best) ? candidate : best
        })

    if (move) playMove(move)
  }, 450)
  onCleanup(() => clearTimeout(timer))
}, { immediate: true })
</script>

<template>
  <div class="checkers-game">

    <div id="move_turn" aria-live="polite">{{ turnLabel }} to move</div>

    <div class="game-layout">

      <div class="board" role="group" aria-label="Checkers board">
        
        <button
          v-for="square in board"
          :key="square.index"
          type="button"
          class="square"
          :class="{
            'square--dark': square.isDark,
            'square--selected': selectedIndex === square.index,
            'square--legal': legalDestinations.has(square.index),
          }"
          :disabled="!square.isDark || activeController !== 'manual' || !legalMoves.length"
          :aria-label="'Row ' + (square.row + 1) + ', column ' + (square.column + 1) +
            ', ' + (square.piece ?? 'empty') + (legalDestinations.has(square.index) ? ', legal move' : '')"
          :aria-pressed="square.piece === turn ? selectedIndex === square.index : undefined"
          @click="clickSquare(square.index)"
        >
          <span
            v-if="square.piece"
            class="piece"
            :class="'piece--' + square.piece"
          ></span>
        </button>
      </div>

      <aside class="controller-panel" aria-labelledby="controller-heading">
        <h2 id="controller-heading">Player controls</h2>
        <label v-for="player in players" :key="player.color" class="controller-field">
          <span>{{ player.label }}</span>
          <select v-model="controllers[player.color]">
            <option v-for="option in controllerOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 32rem) minmax(12rem, 15rem);
  justify-content: center;
  align-items: start;
  gap: clamp(1rem, 4vw, 2.5rem);
  margin-block-start: 1.5rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  width: 100%;
  aspect-ratio: 1;
  border: 0.35rem solid #29352e;
  border-radius: 0.5rem;
  overflow: hidden;
  box-sizing: border-box;
}

.square {
  display: grid;
  place-items: center;
  appearance: none;
  border: 0;
  padding: 0;
  opacity: 1;
  background-color: #eee8d8;
}

.square--dark {
  background-color: #69816e;
}

.square--dark:not(:disabled) {
  cursor: pointer;
}

.square--selected {
  box-shadow: inset 0 0 0 3px #ffe08a;
}

.square--legal::after {
  content: '';
  width: 24%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffe08a;
}

.square:focus-visible {
  outline: 2px solid white;
  outline-offset: -4px;
}

.piece {
  width: 72%;
  aspect-ratio: 1;
  border: 2px solid var(--piece-edge);
  border-radius: 50%;
  box-sizing: border-box;
  background: var(--piece-color);
  box-shadow: inset 0 0 0 2px var(--piece-ring), 0 2px 3px #0005;
}

.piece--black {
  --piece-color: #202523;
  --piece-edge: #131614;
  --piece-ring: #4b524e;
}

.piece--red {
  --piece-color: #a73538;
  --piece-edge: #722529;
  --piece-ring: #d36a6c;
}

.controller-panel {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--rule, #d9dbd2);
  border-radius: 0.5rem;
  background: #f7f8f4;
}

.controller-panel h2 {
  margin: 0;
  font-size: 1.125rem;
}

.controller-field {
  display: grid;
  gap: 0.375rem;
  font-weight: 600;
}

.controller-field select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #788278;
  border-radius: 0.25rem;
  color: inherit;
  background: white;
  font: inherit;
  font-weight: 400;
}

@media (max-width: 42rem) {
  .game-layout {
    grid-template-columns: minmax(0, 32rem);
  }
}
</style>
