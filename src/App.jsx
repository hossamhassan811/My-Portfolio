import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import HomeWorld from './components/sections/HomeWorld'
import AboutWorld from './components/sections/AboutWorld'
import ProjectsWorld from './components/sections/ProjectsWorld'
import ContactWorld from './components/sections/ContactWorld'
import useStore from './store/useStore'
import { useAssetLoader } from './hooks/useAssetLoader'
import './index.css'

function App() {
  const currentSection = useStore((state) => state.currentSection)
  const isLoading = useStore((state) => state.isLoading)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const { loadingProgress, isLoaded } = useAssetLoader()

  const sections = {
    home: HomeWorld,
    about: AboutWorld,
    projects: ProjectsWorld,
    contact: ContactWorld,
  }

  const CurrentSection = sections[currentSection]

  // Update loading screen with asset loading progress
  useEffect(() => {
    if (isLoaded && isLoading) {
      // Add a small delay to ensure everything is properly rendered
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, isLoading, setIsLoading])

  return (
    <div className="app">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" loadingProgress={loadingProgress} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation />

          <div className="canvas-container">
            <Canvas
              dpr={[1, 1.2]} // Reduced for mobile performance
              gl={{
                antialias: true,
                alpha: false,
                stencil: false,
                depth: true,
                powerPreference: 'high-performance',
                failIfMajorPerformanceCaveat: false // Allow fallback on low-end devices
              }}
              performance={{ min: 0.5 }}
              frameloop="always"
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          <AnimatePresence mode="wait">
            <CurrentSection key={currentSection} />
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default App