/**
 * Cloudflare Worker — Mars Photo API (Perseverance only)
 * Deploy to: dawn-mode-7b5c.saberzou.workers.dev
 *
 * Source: Perseverance via mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020
 * Strategy: multiple pages for sol variety, prefer Mastcam-Z + NAVCAM, dedup, shuffle.
 */

const WORKER_ORIGIN = 'https://dawn-mode-7b5c.saberzou.workers.dev'
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
}

// ---- Perseverance (Mars 2020) via RSS feed API ----

async function fetchPerseveranceImages(page = 0, count = 50) {
  const url = `https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json&num=${count}&page=${page}`
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.images || []).map(item => {
      const files = item.image_files || {}
      return {
        id: item.imageid || String(item.id || Math.random()),
        img_src: files.medium || files.small || files.full_res || '',
        sol: item.sol,
        camera: item.camera?.instrument || item.instrument || 'UNKNOWN',
        rover: 'Perseverance',
        earth_date: item.date_taken || item.utc_date_time || '',
      }
    }).filter(p => p.img_src)
  } catch { return [] }
}

// ---- Diversity logic ----

// Prefer the best cameras on Perseverance
const BEST_CAMERAS = new Set([
  'MCZ_LEFT', 'MCZ_RIGHT',           // Mastcam-Z — best color photos
  'NAVCAM_LEFT', 'NAVCAM_RIGHT',     // Navigation — wide landscape shots
  'SUPERCAM_RMI',                     // SuperCam close-ups
  'SHERLOC_WATSON',                   // WATSON macro lens
])

function diversify(photos, target = 20) {
  // Prefer best cameras
  const best = photos.filter(p => BEST_CAMERAS.has(p.camera))
  const rest = photos.filter(p => !BEST_CAMERAS.has(p.camera))
  const pool = best.length >= target ? best : [...best, ...rest]

  // Group by camera + sol → max 2 per group
  const groups = {}
  for (const p of pool) {
    const key = `${p.camera}-${p.sol}`
    if (!groups[key]) groups[key] = []
    groups[key].push(p)
  }

  const deduped = []
  for (const group of Object.values(groups)) {
    deduped.push(group[0])
    if (group.length > 3) deduped.push(group[Math.floor(group.length / 2)])
  }

  // Shuffle
  for (let i = deduped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deduped[i], deduped[j]] = [deduped[j], deduped[i]]
  }

  return deduped.slice(0, target)
}

// ---- Main handler ----

async function handleRoot() {
  try {
    // Fetch multiple pages for sol variety
    const [page0, page1, page2] = await Promise.all([
      fetchPerseveranceImages(0, 50),
      fetchPerseveranceImages(1, 50),
      fetchPerseveranceImages(2, 50),
    ])

    const allPhotos = [...page0, ...page1, ...page2]
    const photos = diversify(allPhotos, 20)

    const result = photos.map((p, i) => ({
      id: i + 1,
      img_src: `${WORKER_ORIGIN}/proxy?url=${encodeURIComponent(p.img_src)}`,
      sol: p.sol,
      camera: p.camera,
      rover: p.rover,
      earth_date: p.earth_date,
      title: `Sol ${p.sol} · Perseverance`,
      description: p.camera,
    }))

    return new Response(JSON.stringify({ photos: result, total: allPhotos.length }), {
      headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, photos: [] }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
}

async function handleProxy(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url')
  if (!target || !target.includes('nasa.gov')) {
    return new Response('Bad request', { status: 400, headers: CORS })
  }
  try {
    const res = await fetch(target)
    return new Response(res.body, {
      headers: {
        ...CORS,
        'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=604800',
      },
    })
  } catch (err) {
    return new Response('Proxy error: ' + err.message, { status: 502, headers: CORS })
  }
}

async function handleDebug() {
  const tests = [
    { label: 'Perseverance RSS feed', url: 'https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json&num=5' },
  ]
  const results = []
  for (const t of tests) {
    try {
      const res = await fetch(t.url)
      const data = await res.json()
      const imgs = (data.images || []).slice(0, 3)
      const sols = [...new Set(imgs.map(i => i.sol))]
      results.push({ ...t, status: res.status, count: data.total_images || imgs.length, sols, sample: imgs.map(i => ({ sol: i.sol, cam: i.camera?.instrument, url: (i.image_files?.medium || '').slice(0, 80) })) })
    } catch (e) {
      results.push({ ...t, error: e.message })
    }
  }
  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname === '/proxy') return handleProxy(request)
    if (url.pathname === '/debug') return handleDebug()
    return handleRoot()
  },
}
