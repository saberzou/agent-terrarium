#!/usr/bin/env node
// Fetch curated Mars rover photos for the Explore page
// Saves a JSON file with image URLs + metadata

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const BASE = 'https://api.nasa.gov/mars-photos/api/v1';

const CAMERAS = [
  { rover: 'curiosity', camera: 'NAVCAM', label: 'Navigation Camera' },
  { rover: 'curiosity', camera: 'MAST', label: 'Mast Camera' },
  { rover: 'curiosity', camera: 'CHEMCAM', label: 'Chemistry Camera' },
  { rover: 'curiosity', camera: 'MAHLI', label: 'Hand Lens Imager' },
  { rover: 'curiosity', camera: 'FHAZ', label: 'Front Hazard Cam' },
  { rover: 'curiosity', camera: 'RHAZ', label: 'Rear Hazard Cam' },
];

// Interesting sols with known good photos
const SOLS = [1000, 1500, 2000, 2500, 3000, 3500, 500, 750, 1234, 1800, 2200, 2800];

async function fetchPhotos() {
  const allPhotos = [];

  for (const sol of SOLS) {
    for (const cam of CAMERAS) {
      try {
        const url = `${BASE}/rovers/${cam.rover}/photos?api_key=${API_KEY}&sol=${sol}&camera=${cam.camera}&page=1`;
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const photos = (data.photos || []).slice(0, 3); // max 3 per sol/camera combo
        for (const p of photos) {
          allPhotos.push({
            id: p.id,
            src: p.img_src.replace('http://', 'https://'),
            sol: p.sol,
            earthDate: p.earth_date,
            camera: cam.camera,
            cameraLabel: cam.label,
            rover: p.rover.name,
          });
        }
      } catch (e) {
        // skip failures
      }
    }
    // Rate limit: small delay between sols
    await new Promise(r => setTimeout(r, 200));
  }

  // Deduplicate and pick best spread (max ~50 photos)
  const unique = [...new Map(allPhotos.map(p => [p.id, p])).values()];
  // Shuffle and take up to 50
  const shuffled = unique.sort(() => Math.random() - 0.5).slice(0, 50);
  
  const fs = await import('fs');
  fs.writeFileSync(
    new URL('../public/mars-photos.json', import.meta.url),
    JSON.stringify(shuffled, null, 2)
  );
  console.log(`Saved ${shuffled.length} photos to public/mars-photos.json`);
}

fetchPhotos().catch(console.error);
