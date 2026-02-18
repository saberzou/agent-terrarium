import { useMemo } from 'react'

function seededRandom(seed) {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

// Shape generators — each draws one type, symmetrically
const shapeGenerators = {
  circles(els, rng, pick, W) {
    const count = 2 + Math.floor(rng() * 3)
    for (let i = 0; i < count; i++) {
      const cx = pick(20, 48), cy = pick(15, 85), r = pick(5, 22)
      const o = pick(0.1, 0.25), sw = pick(0.3, 0.6)
      els.push(<circle key={`cL${i}`} cx={cx} cy={cy} r={r} fill="none" stroke={W} strokeWidth={sw} opacity={o} />)
      els.push(<circle key={`cR${i}`} cx={100 - cx} cy={cy} r={r} fill="none" stroke={W} strokeWidth={sw} opacity={o} />)
    }
    // Center dot
    els.push(<circle key="cDot" cx={50} cy={50} r={1.5} fill={W} opacity={0.3} />)
  },

  lines(els, rng, pick, W) {
    // Horizontal lines symmetric about center
    for (let i = 0; i < 6; i++) {
      const y = pick(10, 90), inset = pick(8, 40)
      els.push(<line key={`h${i}`} x1={inset} y1={y} x2={100 - inset} y2={y}
        stroke={W} strokeWidth={pick(0.2, 0.5)} opacity={pick(0.08, 0.2)} />)
    }
    // Diagonal pairs
    for (let i = 0; i < 3; i++) {
      const x = pick(10, 45), y1 = pick(5, 40), y2 = pick(60, 95)
      els.push(<line key={`dL${i}`} x1={x} y1={y1} x2={50} y2={y2} stroke={W} strokeWidth="0.3" opacity={0.12} />)
      els.push(<line key={`dR${i}`} x1={100 - x} y1={y1} x2={50} y2={y2} stroke={W} strokeWidth="0.3" opacity={0.12} />)
    }
  },

  rectangles(els, rng, pick, W) {
    for (let i = 0; i < 3; i++) {
      const rx = pick(8, 38), ry = pick(10, 80), rw = pick(6, 18), rh = pick(4, 14)
      const o = pick(0.1, 0.22), filled = rng() > 0.7
      els.push(<rect key={`rL${i}`} x={rx} y={ry} width={rw} height={rh}
        fill={filled ? W : 'none'} stroke={W} strokeWidth="0.4" opacity={filled ? o * 0.5 : o} />)
      els.push(<rect key={`rR${i}`} x={100 - rx - rw} y={ry} width={rw} height={rh}
        fill={filled ? W : 'none'} stroke={W} strokeWidth="0.4" opacity={filled ? o * 0.5 : o} />)
    }
  },

  triangles(els, rng, pick, W) {
    for (let i = 0; i < 3; i++) {
      const tx = pick(15, 42), ty = pick(15, 80), ts = pick(5, 14)
      const pts = `${tx},${ty - ts} ${tx - ts * 0.87},${ty + ts * 0.5} ${tx + ts * 0.87},${ty + ts * 0.5}`
      const ptsM = `${100 - tx},${ty - ts} ${100 - tx - ts * 0.87},${ty + ts * 0.5} ${100 - tx + ts * 0.87},${ty + ts * 0.5}`
      const o = pick(0.12, 0.25)
      els.push(<polygon key={`tL${i}`} points={pts} fill="none" stroke={W} strokeWidth="0.5" opacity={o} />)
      els.push(<polygon key={`tR${i}`} points={ptsM} fill="none" stroke={W} strokeWidth="0.5" opacity={o} />)
    }
  },

  dots(els, rng, pick, W) {
    for (let x = 10; x <= 50; x += pick(5, 9)) {
      for (let y = 8; y <= 92; y += pick(5, 9)) {
        if (rng() > 0.4) {
          const r = pick(0.4, 1.5), o = pick(0.08, 0.25)
          els.push(<circle key={`dL-${x.toFixed(0)}-${y.toFixed(0)}`} cx={x} cy={y} r={r} fill={W} opacity={o} />)
          els.push(<circle key={`dR-${x.toFixed(0)}-${y.toFixed(0)}`} cx={100 - x} cy={y} r={r} fill={W} opacity={o} />)
        }
      }
    }
  },
}

const shapeKeys = Object.keys(shapeGenerators)

export default function GeoPattern({ color = '#FA3B00', seed = 42 }) {
  const shapes = useMemo(() => {
    const rng = seededRandom(seed)
    const pick = (min, max) => min + rng() * (max - min)
    const els = []
    const W = '#fff'

    // Pick 2 distinct shape types
    const i1 = Math.floor(rng() * shapeKeys.length)
    let i2 = Math.floor(rng() * (shapeKeys.length - 1))
    if (i2 >= i1) i2++
    const type1 = shapeKeys[i1]
    const type2 = shapeKeys[i2]

    shapeGenerators[type1](els, rng, pick, W)
    shapeGenerators[type2](els, rng, pick, W)

    // Corner brackets always
    const bw = 6
    els.push(
      <path key="cTL" d={`M 5 ${5 + bw} L 5 5 L ${5 + bw} 5`} fill="none" stroke={W} strokeWidth="0.5" opacity={0.2} />,
      <path key="cTR" d={`M ${95 - bw} 5 L 95 5 L 95 ${5 + bw}`} fill="none" stroke={W} strokeWidth="0.5" opacity={0.2} />,
      <path key="cBL" d={`M 5 ${95 - bw} L 5 95 L ${5 + bw} 95`} fill="none" stroke={W} strokeWidth="0.5" opacity={0.2} />,
      <path key="cBR" d={`M ${95 - bw} 95 L 95 95 L 95 ${95 - bw}`} fill="none" stroke={W} strokeWidth="0.5" opacity={0.2} />,
    )

    return els
  }, [color, seed])

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', background: color }}>
      {shapes}
    </svg>
  )
}
