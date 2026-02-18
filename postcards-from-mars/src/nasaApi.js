const WORKER_URL = 'https://dawn-mode-7b5c.saberzou.workers.dev'

export async function fetchMarsPhotos() {
  try {
    const res = await fetch(WORKER_URL)
    const data = await res.json()
    return (data.photos || []).map(p => ({
      id: p.id,
      image: p.img_src,
      title: `Sol ${p.sol}`,
      description: `${p.camera} · ${p.rover}`,
      link: '',
    }))
  } catch {
    return fallbackPhotos
  }
}

export async function preloadMarsImages() {
  const photos = await fetchMarsPhotos()
  return Promise.all(photos.map(p => new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = p.image
  })))
}

// Local bundled fallback
const BASE = import.meta.env.BASE_URL + 'mars'
export const fallbackPhotos = Array.from({ length: 20 }, (_, i) => ({
  id: `mars-${i + 1}`,
  image: `${BASE}/mars-${i + 1}.jpg`,
  title: `Sol ${[1000, 1247, 2003, 847, 1523, 612, 2847, 923, 1800, 3100, 1104, 580, 2200, 750, 3500, 1500, 2500, 3000, 1234, 2800][i]}`,
  description: ['Mars Surface', 'Terrain Survey', 'Dust Formation', 'Crater Rim', 'Olympus Region', 'Sample Site', 'Storm Front', 'Deep Space', 'Horizon Scan', 'Nebula Reference', 'Earth View', 'Valles Scan', 'Night Operations', 'Star Field', 'Dust Patrol', 'Surface Detail', 'Atmospheric Study', 'Polar Recon', 'Phobos Transit', 'Galaxy Ref'][i],
  link: '',
}))
