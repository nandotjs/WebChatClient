import { create } from 'zustand'

interface AppState {
  // Defina seu estado aqui
}

export const useStore = create<AppState>((set) => ({
  // Implemente suas ações e estado aqui
}))