---
name: portfolio-3d
description: Use when building or improving Three.js 3D scenes, WebGL performance, particle systems, GLB model integration (astronaut), or ambient visual effects in the portfolio. Covers scene architecture, lighting, mobile optimization, and error boundaries.
---

# Portfolio 3D Skill — Ambient Three.js Scenes & Model Integration

## Purpose
Create atmospheric, performant 3D experiences that make the portfolio memorable without distracting from content.

## Golden Rules
1. **Performance first** — target 60fps on M1 Mac, 30fps on mid-range phones
2. **Progressive enhancement** — 3D is decorative; content works without it
3. **Mobile battery awareness** — reduce pixel ratio, disable bloom on low-power
4. **Graceful fallback** — if WebGL fails, show gradient background, no errors

## Scene Architecture

### Hero Background Scene (`HeroScene3D.tsx`)
- Simple, ambient, non-blocking
- Particle system (300-500 particles) or wireframe geometry
- Slow rotation (20s+ full cycle)
- Mouse-follow parallax on the scene group
- z-fighting prevention: `renderOrder` management

### Performance Budgets
| Asset | Budget |
|-------|--------|
| Particle count | ≤ 500 |
| Geometry vertices | ≤ 100k |
| Texture size | ≤ 1024×1024 (512 on mobile) |
| Draw calls | ≤ 50 |
| Post-processing passes | ≤ 1 (only bloom or DOF, never both) |

### Astronaut GLB Model (`Astronaut.tsx`)
```tsx
function Astronaut({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<Mesh>(null);
  const { scene } = useGLTF('/astronaut.glb');
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.position.x += (mouse.x * 0.3 - ref.current.position.x) * 0.05;
      ref.current.position.y += (-mouse.y * 0.3 - ref.current.position.y) * 0.05;
    }
  });
  
  return <primitive ref={ref} object={scene} scale={0.8} />;
}
```

### Optimization Techniques
1. **DRACOLoader** for compressed GLB
2. `useDetectGPU()` to adjust quality tier
3. `@react-three/drei` `AdaptiveDpr`, `AdaptiveEvents`
4. LOD for distant objects
5. `useFrame` throttled to ~10fps for particle updates
6. `Canvas` lazy-loaded: `dynamic(() => import(...), { ssr: false })`

### Mobile Adjustments
```tsx
const dpr = useDetectGPU();
const isMobile = dpr.tier <= 1;
const particleCount = isMobile ? 100 : 400;
const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
```

## Scene Types

### 1. Hero Ambient
- Floating wireframe torus knot + particles
- Mouse parallax on group
- Subtle purple glow matching accent color
- `color="#9463c2"` on lights

### 2. Section Dividers
- Abstract geometry between sections
- Opacity fades in/out with scroll via `useScroll` + `useTransform`
- Single mesh, no textures

### 3. Project Preview
- Simple box/sphere with project screenshot as texture
- Slow auto-rotate on hover
- Optional: shader that transitions between screenshots

## Error Handling
```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
// Wrap ALL 3D scenes
<ErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-b from-accent-subtle to-transparent" />}>
  <Suspense fallback={<div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />}>
    <Canvas>...</Canvas>
  </Suspense>
</ErrorBoundary>
```

## Lighting Setup
```tsx
<ambientLight intensity={0.4} />
<pointLight position={[10, 10, 10]} intensity={0.6} color="#9463c2" />
<pointLight position={[-10, -10, -5]} intensity={0.3} color="#5b21b6" />
```

## Post-Processing (use sparingly)
- Bloom only: `@react-three/postprocessing` `EffectComposer` + `Bloom`
- Intensity: `0.2` — very subtle
- Skip entirely on mobile

## Review Checklist
- [ ] 60fps on Mac, 30fps on mid-range phone
- [ ] WebGL failure = gradient fallback, not crash
- [ ] No textures > 1024px
- [ ] Model compressed with DRACO
- [ ] `AdaptiveDpr` + `AdaptiveEvents` active
- [ ] Loading state with spinner
- [ ] Mouse parallax feels 1:1 natural
