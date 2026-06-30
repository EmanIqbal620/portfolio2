# Unused Assets

These files are tracked in `.gitignore` and not committed. They were generated locally (screenshots, mockups, exports) and are not referenced in any source code.

## Root-Level Screenshots & Mockups

| File | Type |
|------|------|
| `about.png` | Screenshot |
| `about1.png` | Screenshot |
| `conta.png` | Screenshot |
| `eman.png` | Screenshot |
| `eman1.png` | Screenshot |
| `eman (2).png` | Screenshot |
| `hero.png` | Screenshot |
| `hero (2).png` | Screenshot |
| `heroSec.png` | Screenshot |
| `ideal-hero.png` | Screenshot |
| `myherosection.png` | Screenshot |
| `CHAINLIT.png` | Screenshot |
| `project123.png` | Screenshot |
| `trusticon.png` | Screenshot |
| `tulip.png` | Screenshot |
| `badui.PNG` | Screenshot |
| `Gemini_Generated_Image_*.png` | AI-generated images |
| `Screenshot *.png` / `Screenshot (*.png` | System screenshots |

## Root-Level SVGs

| File | Type |
|------|------|
| `humanoid_robotics_book_architecture.svg` | Architecture diagram |
| `todoflow_architecture_v2_jwt.svg` | Architecture diagram |

## Unused 3D Models

| File | Type |
|------|------|
| `astronaut (1).glb` | Duplicate GLB model |
| `astronaut.usdz` | USDZ export (iOS) |

## Unused PNG Fallbacks in `public/projects/`

Only `.webp` and `.svg` variants are used in the code. These `.png` duplicates are unused:

| File |
|------|
| `public/projects/crm/screenshot.png` |
| `public/projects/todoflow/screenshot.png` |
| `public/projects/npm-packages/screenshot.png` |
| `public/projects/furniture/screenshot.png` |
| `public/projects/tulip/screenshot.png` |
| `public/projects/chainlit/screenshot.png` |
| `public/projects/blog/screenshot.png` |
| `public/projects/humanoid-robotics/screenshot.png` |

## To clean up permanently (optional)

```bash
# Remove root-level junk
git rm --cached about.png about1.png conta.png eman.png eman1.png "eman (2).png" hero.png "hero (2).png" heroSec.png ideal-hero.png myherosection.png CHAINLIT.png project123.png trusticon.png tulip.png badui.PNG

# Remove unused SVGs
git rm --cached humanoid_robotics_book_architecture.svg todoflow_architecture_v2_jwt.svg

# Remove unused 3D models
git rm --cached "astronaut (1).glb" astronaut.usdz

# Remove unused PNG fallbacks
git rm --cached public/projects/crm/screenshot.png public/projects/todoflow/screenshot.png public/projects/npm-packages/screenshot.png public/projects/furniture/screenshot.png public/projects/tulip/screenshot.png public/projects/chainlit/screenshot.png public/projects/blog/screenshot.png public/projects/humanoid-robotics/screenshot.png
```
