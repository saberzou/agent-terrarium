import { useMemo } from 'react'

function seededRandom(seed) {
  let s = Math.abs(seed | 0) || 1
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

// Each sprite is defined as the LEFT HALF (including center column for odd widths).
// They get mirrored horizontally. 1 = filled, 0 = empty.
// All sprites are 11 wide (6 cols defined, mirror 5) x 11 tall.
const SPRITES = [
  // Robot head
  { name: 'robot', half: [
    [0,0,1,1,1,1],
    [0,1,1,1,1,1],
    [1,1,0,1,0,1],
    [1,1,1,1,1,1],
    [1,1,0,1,0,1],
    [0,1,1,0,0,1],
    [0,0,1,1,1,1],
    [0,0,0,1,0,0],
    [0,1,1,1,1,1],
    [0,1,0,1,0,1],
    [0,1,0,1,0,1],
  ]},
  // Smiley face
  { name: 'smiley', half: [
    [0,0,1,1,1,1],
    [0,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,0,1,1,1,1],
    [1,1,0,0,0,1],
    [0,1,1,1,1,1],
    [0,0,1,1,1,1],
  ]},
  // Rocket
  { name: 'rocket', half: [
    [0,0,0,0,0,1],
    [0,0,0,0,1,1],
    [0,0,0,1,1,1],
    [0,0,0,1,0,1],
    [0,0,0,1,1,1],
    [0,0,1,1,1,1],
    [0,0,1,1,1,1],
    [0,1,1,1,1,1],
    [1,1,0,1,1,1],
    [1,0,0,1,1,0],
    [0,0,0,0,1,0],
  ]},
  // Satellite / antenna
  { name: 'satellite', half: [
    [1,0,0,0,0,0],
    [0,1,0,0,0,0],
    [0,0,1,0,0,1],
    [0,0,0,1,1,1],
    [0,0,1,1,1,1],
    [0,0,1,1,1,0],
    [0,0,0,1,1,1],
    [0,0,0,0,1,1],
    [0,0,0,1,0,1],
    [0,0,1,0,0,0],
    [0,1,0,0,0,0],
  ]},
  // Planet with ring
  { name: 'planet', half: [
    [0,0,0,1,1,1],
    [1,0,1,1,1,1],
    [0,1,1,1,1,1],
    [0,0,1,1,0,1],
    [0,0,1,1,1,1],
    [0,0,1,1,1,1],
    [0,0,1,1,1,1],
    [0,0,1,1,0,1],
    [0,1,1,1,1,1],
    [1,0,1,1,1,1],
    [0,0,0,1,1,1],
  ]},
  // Skull / helmet
  { name: 'helmet', half: [
    [0,0,1,1,1,1],
    [0,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
    [1,1,1,1,1,1],
    [0,1,1,1,1,1],
    [0,1,1,0,1,1],
    [0,0,1,1,1,1],
    [0,0,1,0,0,1],
    [0,0,1,1,1,1],
  ]},
  // Star
  { name: 'star', half: [
    [0,0,0,0,0,1],
    [0,0,0,0,1,1],
    [0,0,0,0,1,1],
    [1,1,1,1,1,1],
    [0,1,1,1,1,1],
    [0,0,1,1,1,1],
    [0,0,1,1,1,1],
    [0,1,1,0,1,1],
    [1,1,0,0,0,1],
    [1,0,0,0,0,0],
    [0,0,0,0,0,0],
  ]},
  // Alien / space invader
  { name: 'invader', half: [
    [0,0,1,0,0,0],
    [0,0,0,1,0,0],
    [0,0,1,1,1,1],
    [0,1,1,0,1,1],
    [1,1,1,1,1,1],
    [1,0,1,1,1,1],
    [1,0,1,0,0,1],
    [0,0,0,1,1,0],
    [0,0,1,0,1,0],
    [0,1,0,0,0,0],
    [1,0,0,0,0,0],
  ]},
]

function mirrorSprite(half) {
  return half.map(row => {
    const right = [...row].slice(0, -1).reverse()
    return [...row, ...right]
  })
}

export default function PixelGrid({ color = '#FA3B00', seed = 42, spriteIndex }) {
  const canvas = useMemo(() => {
    const rng = seededRandom(seed * 137 + 42)
    const idx = spriteIndex != null ? spriteIndex % SPRITES.length : Math.floor(rng() * SPRITES.length)
    const sprite = SPRITES[idx]
    const grid = mirrorSprite(sprite.half)

    const rows = grid.length       // 11
    const cols = grid[0].length    // 11
    const px = 8
    const totalW = cols * px
    const totalH = rows * px

    // Compute padding to center sprite in 16:10 area
    // Target viewBox will be wider than tall
    const targetRatio = 16 / 10
    let vw, vh
    if (totalW / totalH > targetRatio) {
      vw = totalW + px * 4
      vh = vw / targetRatio
    } else {
      vh = totalH + px * 4
      vw = vh * targetRatio
    }
    const ox = (vw - totalW) / 2
    const oy = (vh - totalH) / 2

    // Scatter some background pixels for texture
    const bgRects = []
    const bgCols = Math.ceil(vw / px)
    const bgRows = Math.ceil(vh / px)
    for (let y = 0; y < bgRows; y++) {
      for (let x = 0; x < bgCols; x++) {
        if (rng() < 0.04) {
          bgRects.push(
            <rect key={`bg-${x}-${y}`} x={x * px} y={y * px} width={px} height={px}
              fill={color} opacity={0.15} />
          )
        }
      }
    }

    const spriteRects = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x]) {
          spriteRects.push(
            <rect key={`s-${x}-${y}`} x={ox + x * px} y={oy + y * px}
              width={px} height={px} fill={color} />
          )
        }
      }
    }

    return { bgRects, spriteRects, vw, vh }
  }, [color, seed])

  return (
    <svg viewBox={`0 0 ${canvas.vw} ${canvas.vh}`} preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', background: '#000' }}>
      {canvas.bgRects}
      {canvas.spriteRects}
    </svg>
  )
}
