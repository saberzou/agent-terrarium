import { useState, useEffect } from 'react'
import InfiniteMenu from '../components/InfiniteMenu'
import { fetchMarsPhotos, preloadMarsImages } from '../nasaApi'
import './ExploreScreen.css'

export default function ExploreScreen() {
  const [items, setItems] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const photos = await fetchMarsPhotos(20)
      // Pre-load all images into browser cache before rendering the globe
      await preloadMarsImages()
      if (!cancelled) {
        setItems(photos)
        setReady(true)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="explore-screen">
      <div className="explore-hud">
        <div className="explore-header">
          <h2 className="explore-title">Explore Mars</h2>
          <p className="explore-subtitle">Real imagery from NASA's Curiosity rover</p>
        </div>
        <div className="explore-signal">
          {!ready ? (
            <span className="shimmer-text">Accessing database...</span>
          ) : (
            <>{items?.length || 0} images loaded</>
          )}<br />
          Mars Reconnaissance · Navcam
        </div>
      </div>

      {!ready && (
        <div className="explore-loading">
          <span className="shimmer-text shimmer-large">Receiving transmission</span>
        </div>
      )}

      {ready && items && (
        <div className="explore-globe">
          <InfiniteMenu items={items} />
        </div>
      )}
    </div>
  )
}
