import { defineStore } from 'pinia';
import type { Counter } from '../typings/counter';

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): Counter => ({
    count: 0,
  }),
  actions: {
    add() {
      this.count++;
    },
    cut() {
      this.count--;
    },
  },
});