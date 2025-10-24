import { create } from 'zustand'

const useStore = create((set) => ({
  currentSection: 'home',
  isTransitioning: false,
  isLoading: true,
  
  setCurrentSection: (section) => set({ currentSection: section }),
  setIsTransitioning: (value) => set({ isTransitioning: value }),
  setIsLoading: (value) => set({ isLoading: value }),
}))

export default useStore