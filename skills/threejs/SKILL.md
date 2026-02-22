---
name: threejs
description: Three.js 3D graphics — scenes, cameras, geometry, materials, lighting, shaders, animation, post-processing, interaction, loaders, and textures. Use when building 3D web experiences, WebGL scenes, interactive visualizations, or anything involving Three.js. Covers r160+ API with correct imports, PBR materials, GLSL shaders, GLTF loading, instancing, and performance patterns.
---

# Three.js

Comprehensive Three.js reference. Verified against r160+ docs.

## When to Load References

Before writing Three.js code, scan the sections below. Each section is self-contained with working examples. For custom shaders, always check the Shaders section for correct uniform/varying patterns.

---

## Quick Start — Full Scene

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Mesh
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
scene.add(mesh);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

camera.position.z = 5;

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  mesh.rotation.x += delta;
  mesh.rotation.y += delta;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
```

---

## Scene & Renderer

```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);  // or texture/cubeTexture
scene.environment = envMap;                      // PBR environment
scene.fog = new THREE.Fog(0xffffff, 1, 100);    // or FogExp2(color, density)
scene.backgroundBlurriness = 0.5;                // 0-1

const renderer = new THREE.WebGLRenderer({
  antialias: true, alpha: true,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true  // for screenshots
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

---

## Cameras

```javascript
// Perspective (most common)
const cam = new THREE.PerspectiveCamera(fov, aspect, near, far);
cam.position.set(0, 5, 10);
cam.lookAt(0, 0, 0);
cam.updateProjectionMatrix(); // after changing fov/aspect/near/far

// Orthographic
const aspect = innerWidth / innerHeight;
const d = 10;
const cam = new THREE.OrthographicCamera(-d*aspect/2, d*aspect/2, d/2, -d/2, 0.1, 1000);

// CubeCamera (reflections — expensive)
const cubeRT = new THREE.WebGLCubeRenderTarget(256);
const cubeCam = new THREE.CubeCamera(0.1, 1000, cubeRT);
material.envMap = cubeRT.texture;
cubeCam.update(renderer, scene);
```

---

## Object3D & Hierarchy

```javascript
obj.position.set(x, y, z);
obj.rotation.set(x, y, z);     // Euler (radians)
obj.scale.set(x, y, z);
obj.visible = false;

// Hierarchy
group.add(child);  group.remove(child);
obj.traverse(c => { if (c.isMesh) c.material.color.set(0xff0000); });

// World transforms
obj.getWorldPosition(target);
obj.getWorldQuaternion(target);

// Layers (for selective rendering/raycasting)
obj.layers.set(1);  obj.layers.enable(2);
```

**Coordinate system:** Right-handed. +X right, +Y up, +Z toward viewer.

---

## Geometry

### Built-in Shapes

```javascript
new THREE.BoxGeometry(w, h, d, wSeg, hSeg, dSeg);
new THREE.SphereGeometry(radius, wSeg, hSeg);
new THREE.PlaneGeometry(w, h, wSeg, hSeg);
new THREE.CylinderGeometry(rTop, rBot, h, radialSeg);
new THREE.ConeGeometry(r, h, radialSeg);
new THREE.TorusGeometry(r, tube, radialSeg, tubularSeg);
new THREE.TorusKnotGeometry(r, tube, tubularSeg, radialSeg, p, q);
new THREE.CircleGeometry(r, seg);
new THREE.RingGeometry(inner, outer, seg);
new THREE.CapsuleGeometry(r, length, capSeg, radialSeg);
new THREE.IcosahedronGeometry(r, detail);  // also Dodecahedron, Octahedron, Tetrahedron
```

### Path-Based

```javascript
// Extrude
const shape = new THREE.Shape();
shape.moveTo(0,0); shape.lineTo(1,0); shape.lineTo(1,1); shape.lineTo(0,0);
new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: true, bevelThickness: 0.1 });

// Lathe (revolve profile)
new THREE.LatheGeometry([new THREE.Vector2(0,0), new THREE.Vector2(0.5,1)], 32);

// Tube (follow curve)
const curve = new THREE.CatmullRomCurve3([...points]);
new THREE.TubeGeometry(curve, 64, 0.2, 8, false);

// Text
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
new TextGeometry('Hello', { font, size: 1, depth: 0.2, bevelEnabled: true });
```

### Custom BufferGeometry

```javascript
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([...]), 3));
geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
geo.setIndex(new THREE.BufferAttribute(new Uint16Array([...]), 1));
geo.computeVertexNormals();
geo.computeBoundingBox();
```

### Instancing (many copies, one draw call)

```javascript
const instMesh = new THREE.InstancedMesh(geometry, material, count);
const dummy = new THREE.Object3D();
for (let i = 0; i < count; i++) {
  dummy.position.set(rx(), ry(), rz());
  dummy.updateMatrix();
  instMesh.setMatrixAt(i, dummy.matrix);
}
instMesh.instanceMatrix.needsUpdate = true;

// Per-instance color
for (let i = 0; i < count; i++)
  instMesh.setColorAt(i, new THREE.Color(Math.random(), Math.random(), Math.random()));
instMesh.instanceColor.needsUpdate = true;

// Raycasting → intersects[0].instanceId
```

### Edges & Wireframe

```javascript
const edges = new THREE.EdgesGeometry(boxGeo, 15);  // threshold angle
new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xfff }));
```

### Merging (reduce draw calls)

```javascript
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const merged = mergeGeometries([geo1, geo2, geo3]);
```

---

## Materials

| Material | Use Case | Lighting |
|----------|----------|----------|
| MeshBasicMaterial | Unlit, flat | No |
| MeshLambertMaterial | Matte, fast | Diffuse only |
| MeshPhongMaterial | Shiny, specular | Yes |
| **MeshStandardMaterial** | **PBR (recommended)** | **Yes** |
| MeshPhysicalMaterial | Advanced PBR (glass, clearcoat) | Yes |
| MeshToonMaterial | Cel-shaded | Yes |
| PointsMaterial | Point clouds | No |
| ShaderMaterial | Custom GLSL | Custom |

### PBR Material (MeshStandardMaterial)

```javascript
new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5,       // 0=mirror, 1=diffuse
  metalness: 0.0,       // 0=dielectric, 1=metal
  map: colorTex,        // sRGB
  normalMap: normalTex,  normalScale: new THREE.Vector2(1,1),
  roughnessMap: roughTex,
  metalnessMap: metalTex,
  aoMap: aoTex,  aoMapIntensity: 1,  // requires uv2!
  emissive: 0x000000,  emissiveMap: emTex,  emissiveIntensity: 1,
  displacementMap: dispTex,  displacementScale: 0.1,
  envMap: envTex,  envMapIntensity: 1,
});
// AO needs: geometry.setAttribute('uv2', geometry.attributes.uv);
```

### Physical Material (glass, clearcoat, sheen, iridescence)

```javascript
// Glass
new THREE.MeshPhysicalMaterial({
  transmission: 1, thickness: 0.5, ior: 1.5,
  roughness: 0, metalness: 0
});

// Car paint
new THREE.MeshPhysicalMaterial({
  color: 0xff0000, metalness: 0.9, roughness: 0.5,
  clearcoat: 1, clearcoatRoughness: 0.1
});

// Fabric
new THREE.MeshPhysicalMaterial({
  sheen: 1, sheenRoughness: 0.5, sheenColor: new THREE.Color(0xffffff)
});
```

### Common Properties (all materials)

```javascript
material.transparent = true;  material.opacity = 0.5;
material.side = THREE.DoubleSide;
material.depthTest = true;  material.depthWrite = true;
material.blending = THREE.AdditiveBlending;
material.wireframe = true;
material.alphaTest = 0.5;  // discard below threshold (faster than transparent)
material.toneMapped = true;
```

### Multiple Materials per Mesh

```javascript
const mesh = new THREE.Mesh(boxGeo, [mat0, mat1, mat2, mat3, mat4, mat5]);
```

---

## Lighting

| Light | Shadows | Cost |
|-------|---------|------|
| AmbientLight | No | Very Low |
| HemisphereLight | No | Very Low |
| DirectionalLight | Yes | Low |
| PointLight | Yes | Medium |
| SpotLight | Yes | Medium |
| RectAreaLight | No* | High |

```javascript
// Ambient
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Hemisphere (sky/ground gradient)
scene.add(new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.6));

// Directional (sun)
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 10, 5);
scene.add(dir);

// Point (bulb)
const pt = new THREE.PointLight(0xffffff, 1, 100, 2);  // color, intensity, distance, decay

// Spot (cone)
const spot = new THREE.SpotLight(0xffffff, 1, 100, Math.PI/6, 0.5, 2);  // + angle, penumbra, decay
spot.target.position.set(0,0,0);  scene.add(spot.target);

// RectArea (soft area light — needs init)
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();
const rect = new THREE.RectAreaLight(0xffffff, 5, 4, 2);
rect.lookAt(0,0,0);
```

### Shadows

```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);
light.shadow.camera.near = 0.5;  light.shadow.camera.far = 50;
// Directional: orthographic shadow camera
light.shadow.camera.left = -10; light.shadow.camera.right = 10;
light.shadow.camera.top = 10;   light.shadow.camera.bottom = -10;
light.shadow.bias = -0.0001;
light.shadow.normalBias = 0.02;

mesh.castShadow = true;
floor.receiveShadow = true;
```

### IBL (Image-Based Lighting)

```javascript
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
new RGBELoader().load('env.hdr', tex => {
  const envMap = pmrem.fromEquirectangular(tex).texture;
  scene.environment = envMap;
  scene.background = envMap;
  tex.dispose(); pmrem.dispose();
});
```

---

## Textures

```javascript
const tex = new THREE.TextureLoader().load('tex.jpg');
tex.colorSpace = THREE.SRGBColorSpace;  // for color maps ONLY (not normal/roughness)
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(4, 4);
tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Filtering
tex.minFilter = THREE.LinearMipmapLinearFilter;  // default, smooth
tex.magFilter = THREE.NearestFilter;  // pixelated

// Canvas texture
const canvas = document.createElement('canvas');
/* draw on canvas... */
const canvasTex = new THREE.CanvasTexture(canvas);

// Video texture
const video = document.createElement('video');
video.src = 'vid.mp4'; video.loop = true; video.muted = true; video.play();
const vidTex = new THREE.VideoTexture(video);

// Data texture
const data = new Uint8Array(256*256*4);
const dataTex = new THREE.DataTexture(data, 256, 256);
dataTex.needsUpdate = true;

// Cube texture (skybox/envmap)
const cubeTex = new THREE.CubeTextureLoader().load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg']);

// Render target
const rt = new THREE.WebGLRenderTarget(512, 512);
renderer.setRenderTarget(rt); renderer.render(scene, cam); renderer.setRenderTarget(null);
const rtTex = rt.texture;
```

---

## Loaders

### GLTF/GLB (standard 3D format)

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
const loader = new GLTFLoader();
loader.setDRACOLoader(draco);

loader.load('model.glb', gltf => {
  const model = gltf.scene;
  model.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });

  // Center & scale
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  model.scale.setScalar(1 / Math.max(size.x, size.y, size.z));
  model.position.sub(box.getCenter(new THREE.Vector3()));

  // Animations
  if (gltf.animations.length) {
    const mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach(clip => mixer.clipAction(clip).play());
  }
  scene.add(model);
});
```

### Other Formats

```javascript
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
```

### Loading Manager

```javascript
const mgr = new THREE.LoadingManager();
mgr.onProgress = (url, loaded, total) => console.log(`${loaded}/${total}`);
mgr.onLoad = () => startApp();
const texLoader = new THREE.TextureLoader(mgr);
const gltfLoader = new GLTFLoader(mgr);
```

### Promise Pattern

```javascript
const loadGLTF = url => new Promise((res, rej) => new GLTFLoader().load(url, res, undefined, rej));
const loadTex = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, res, undefined, rej));
const [model, tex] = await Promise.all([loadGLTF('m.glb'), loadTex('t.jpg')]);
```

---

## Animation

### Procedural

```javascript
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  mesh.rotation.y += delta;
  mesh.position.y = Math.sin(elapsed) * 0.5;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

### Keyframe System

```javascript
// Create clip
const times = [0, 1, 2];
const values = [0, 2, 0];
const track = new THREE.VectorKeyframeTrack('.position', times, [0,0,0, 0,2,0, 0,0,0]);
const clip = new THREE.AnimationClip('bounce', 2, [track]);

// Play
const mixer = new THREE.AnimationMixer(mesh);
const action = mixer.clipAction(clip);
action.play();

// In loop: mixer.update(delta);
```

### Track Types

```javascript
new THREE.NumberKeyframeTrack('.material.opacity', times, values);
new THREE.VectorKeyframeTrack('.position', times, flatXYZ);
new THREE.QuaternionKeyframeTrack('.quaternion', times, flatXYZW);
new THREE.ColorKeyframeTrack('.material.color', times, flatRGB);
new THREE.BooleanKeyframeTrack('.visible', times, bools);
```

### Action Control

```javascript
action.play(); action.stop(); action.reset();
action.timeScale = 1;      // speed (negative = reverse)
action.loop = THREE.LoopOnce;  // LoopRepeat (default), LoopPingPong
action.clampWhenFinished = true;
action.fadeIn(0.5); action.fadeOut(0.5);
action1.crossFadeTo(action2, 0.5, true);
action.blendMode = THREE.AdditiveAnimationBlendMode;
```

### GLTF Animation

```javascript
const mixer = new THREE.AnimationMixer(model);
const clips = gltf.animations;
const walk = THREE.AnimationClip.findByName(clips, 'Walk');
mixer.clipAction(walk).play();
// mixer.update(delta) in loop
```

### Skeletal

```javascript
const skinned = model.getObjectByProperty('type', 'SkinnedMesh');
const skeleton = skinned.skeleton;
const head = skeleton.bones.find(b => b.name === 'Head');
head.rotation.y = Math.sin(time) * 0.3;
scene.add(new THREE.SkeletonHelper(model));
```

### Morph Targets

```javascript
mesh.morphTargetInfluences[0] = 0.5;
const idx = mesh.morphTargetDictionary['smile'];
mesh.morphTargetInfluences[idx] = 1;
```

### Spring Physics

```javascript
class Spring {
  constructor(k = 100, d = 10) { this.k = k; this.d = d; this.pos = 0; this.vel = 0; this.target = 0; }
  update(dt) {
    this.vel += (-this.k * (this.pos - this.target) - this.d * this.vel) * dt;
    this.pos += this.vel * dt;
    return this.pos;
  }
}
```

---

## Shaders

### ShaderMaterial (built-in uniforms provided)

```javascript
new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color(0xff0000) },
    map: { value: texture },
  },
  vertexShader: `
    // Auto-provided: modelMatrix, modelViewMatrix, projectionMatrix, viewMatrix,
    //                normalMatrix, cameraPosition, position, normal, uv
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform sampler2D map;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vec4 tex = texture2D(map, vUv);
      gl_FragColor = vec4(color * tex.rgb, 1.0);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});
// Update: material.uniforms.time.value = clock.getElapsedTime();
```

### RawShaderMaterial (you define everything)

```javascript
new THREE.RawShaderMaterial({
  vertexShader: `
    precision highp float;
    attribute vec3 position;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    precision highp float;
    void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
  `,
});
```

### Common Patterns

**Fresnel:**
```glsl
vec3 viewDir = normalize(cameraPosition - vWorldPosition);
float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
```

**Vertex displacement:**
```glsl
vec3 pos = position;
pos.z += sin(pos.x * 5.0 + time) * amplitude;
```

**Noise:**
```glsl
float random(vec2 st) { return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 st) {
  vec2 i = floor(st), f = fract(st);
  float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
```

**Rim lighting:**
```glsl
float rim = pow(1.0 - max(0.0, dot(normalize(-vViewPosition), vNormal)), 4.0);
```

**Dissolve:**
```glsl
float n = texture2D(noiseMap, vUv).r;
if (n < progress) discard;
float edge = smoothstep(progress, progress + 0.1, n);
gl_FragColor = vec4(mix(vec3(1,.5,0), baseColor, edge), 1.0);
```

### Extending Built-in Materials (onBeforeCompile)

```javascript
material.onBeforeCompile = shader => {
  shader.uniforms.time = { value: 0 };
  shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    '#include <begin_vertex>\ntransformed.y += sin(position.x * 10.0 + time) * 0.1;'
  );
  material.userData.shader = shader;
};
// Update: material.userData.shader?.uniforms.time.value = elapsed;
```

**Injection points:** `#include <begin_vertex>`, `#include <project_vertex>`, `#include <color_fragment>`, `#include <output_fragment>`

### GLSL Quick Ref

```glsl
// Math: abs sign floor ceil fract mod min max clamp mix step smoothstep
// Trig: sin cos tan asin acos atan radians degrees
// Exp: pow exp log sqrt inversesqrt
// Vector: length distance dot cross normalize reflect refract
// Texture: texture2D(sampler, coord)  |  GLSL3: texture(sampler, coord)
```

### Instanced Shaders

```javascript
geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
// In vertex shader: attribute vec3 offset; pos += offset;
```

---

## Post-Processing

```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloom);  // strength, radius, threshold

// Use composer.render() instead of renderer.render()
// On resize: composer.setSize(w, h);
```

### Common Effects

```javascript
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
```

### Custom ShaderPass

```javascript
const CustomEffect = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      uv.x += sin(uv.y * 10.0 + time) * 0.01;
      gl_FragColor = texture2D(tDiffuse, uv);
    }
  `,
};
const pass = new ShaderPass(CustomEffect);
composer.addPass(pass);
```

### Selective Bloom

```javascript
const BLOOM_LAYER = 1;
glowMesh.layers.enable(BLOOM_LAYER);
// Darken non-bloom objects before bloom pass, restore after
```

---

## Interaction

### Raycasting (click/hover detection)

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickables);
  if (hits.length) console.log(hits[0].object, hits[0].point);
});
// hits[]: { distance, point, face, faceIndex, object, uv, normal, instanceId }
```

### Touch

```javascript
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  const t = e.touches[0];
  mouse.x = (t.clientX / innerWidth) * 2 - 1;
  mouse.y = -(t.clientY / innerHeight) * 2 + 1;
  // raycast...
});
```

### Camera Controls

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  controls.dampingFactor = 0.05;
controls.minDistance = 2;  controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
controls.autoRotate = true;
controls.target.set(0, 1, 0);
// controls.update() in loop
```

Other controls: `FlyControls`, `FirstPersonControls`, `PointerLockControls`, `TrackballControls`, `MapControls`, `TransformControls`, `DragControls`

### World ↔ Screen Conversion

```javascript
// World → Screen
const v = mesh.position.clone().project(camera);
const sx = (v.x + 1) / 2 * innerWidth;
const sy = -(v.y - 1) / 2 * innerHeight;

// Screen → World (on ground plane)
const v = new THREE.Vector3(mx, my, 0.5).unproject(camera);
const dir = v.sub(camera.position).normalize();
const dist = -camera.position.y / dir.y;
const worldPos = camera.position.clone().add(dir.multiplyScalar(dist));
```

---

## Math Utilities

```javascript
// Vector3
v.set(x,y,z); v.add(v2); v.sub(v2); v.normalize(); v.length(); v.lerp(target, alpha);
v.dot(v2); v.cross(v2); v.distanceTo(v2); v.project(camera); v.unproject(camera);

// Quaternion
q.setFromEuler(euler); q.setFromAxisAngle(axis, angle); q.slerp(target, t);

// Color
new THREE.Color(0xff0000); color.setHSL(h,s,l); color.lerp(other, alpha);

// MathUtils
THREE.MathUtils.clamp(v, min, max);
THREE.MathUtils.lerp(a, b, t);
THREE.MathUtils.mapLinear(v, inMin, inMax, outMin, outMax);
THREE.MathUtils.degToRad(deg);
THREE.MathUtils.smoothstep(x, min, max);
```

---

## Performance Checklist

1. **Limit draw calls:** merge geometries, use InstancedMesh, texture atlases
2. **Shadow maps:** keep tight frustums, 1024-2048 usually enough
3. **Pixel ratio:** cap at 2: `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
4. **Frustum culling:** on by default — ensure bounding boxes are correct
5. **LOD:** `THREE.LOD` for distance-based mesh switching
6. **Material choice:** Basic > Lambert > Standard > Physical (cost order)
7. **Texture size:** power-of-2, max 2048 for web, compressed (KTX2) for production
8. **Post-processing:** each pass = full-screen render; disable on mobile
9. **Dispose everything:** `geometry.dispose()`, `material.dispose()`, `texture.dispose()`
10. **Avoid per-frame allocations:** reuse Vector3/Matrix4/Color objects

```javascript
// Proper cleanup
function dispose(mesh) {
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) mesh.material.forEach(m => m.dispose());
  else mesh.material.dispose();
  scene.remove(mesh);
}

// Monitor
console.log(renderer.info.render.calls, renderer.info.memory.textures);
```

---

## Import Paths (r160+)

```javascript
// Core
import * as THREE from 'three';

// Addons (use 'three/addons/' or 'three/examples/jsm/')
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
```

### CDN (no build step)

```html
<script type="importmap">
{ "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
}}
</script>
<script type="module">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
</script>
```
