# BUSINESS REQUIREMENTS DOCUMENT (BRD)
**Project Name:** GiverSource 3D Interactive Cosmic Sandbox (`my-3d-web`)  
**Version:** 2.0  
**Status:** Approved & Implemented  
**Date:** July 2026  

---

## 1. Executive Summary & Document Control

### 1.1 Purpose of the Document
This Business Requirements Document (BRD) defines the strategic objectives, functional and non-functional specifications, user experience (UX) standards, and technical architecture for the **GiverSource 3D Interactive Cosmic Sandbox**. It serves as the definitive reference for stakeholders, developers, UI/UX designers, and quality assurance engineers.

### 1.2 Document Version History
| Version | Date | Author / Role | Description of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 2026 | Product & Architecture Team | Initial core 3D interactive sandbox requirements and drag-and-drop system. |
| **1.5** | July 2026 | UI/UX & Graphics Engineering | Integration of day/night cosmic modes, 35k particle Andromeda Galaxy, custom flat vector SVG design system, and camera auto-rotate controls. |
| **2.0** | July 2026 | Lead Agentic AI Coding Assistant | Final refinement: 100% horizontal cosmic galaxy alignment, multi-layered realistic meteors & double-tail comets, exact camera centering reset on rotation activation, and zero-emoji flat SVG UI polish. |

---

## 2. Project Background & Vision

### 2.1 Problem Statement
Modern web applications frequently rely on flat 2D interfaces or static placeholder illustrations that fail to engage users deeply. Even when 3D graphics are introduced, they often suffer from rigid camera constraints, generic low-polygon environments, performance bottlenecks, or clunky browser-dependent UI elements (such as inconsistent OS emojis or non-responsive layout shifts).

### 2.2 Product Vision
The **GiverSource 3D Cosmic Sandbox** aims to deliver an **ultra-premium, real-time interactive 3D web experience** that combines state-of-the-art WebGL/Three.js rendering with a clean, glassmorphic UI. Users can freely explore, build, and interact within a floating island environment suspended above a vast cosmic abyss or beneath a dynamic sunny sky, all while enjoying 60 FPS performance and zero-dependency custom vector iconography.

---

## 3. Business Objectives & Success Metrics

### 3.1 Key Business Objectives
1. **Showcase Next-Generation Web Capability:** Demonstrate state-of-the-art browser 3D graphics and real-time physical lighting without requiring external plugins or heavy desktop downloads.
2. **Maximize User Engagement & Session Duration:** Provide an intuitive sandbox world where users can dynamically drag, drop, rotate, scale, and manipulate 3D objects, driving longer interactive sessions.
3. **Cross-Platform Visual Consistency:** Eliminate browser-specific rendering discrepancies (e.g., Windows Segoe UI Emoji vs. Apple Color Emoji) by implementing a unified, custom Flat Vector SVG Design System across all UI components.

### 3.2 Key Performance Indicators (KPIs)
- **Frame Rate Stability:** Maintain $\ge 60\text{ FPS}$ on standard laptop hardware during active drag-and-drop and camera rotation.
- **First Contentful Paint (FCP):** $< 1.2\text{ seconds}$ through procedural texture generation and optimized geometry buffering.
- **User Action Error Rate:** $< 0.1\%$ error rate during object placement, deletion, and scene reset.

---

## 4. Target Audience & User Personas

### 4.1 Primary User Persona: "The Creative Explorer"
- **Profile:** Tech-savvy web user, designer, or gamer seeking interactive digital experiences.
- **Behaviors:** Enjoys panning, zooming, and inspecting 3D details from creative angles. Likes building custom layouts and experiencing dynamic atmosphere shifts.
- **Needs:** Freedom of camera movement, immediate visual feedback when interacting with objects, and an aesthetic interface that feels modern and responsive.

### 4.2 Secondary Persona: "The Technical Reviewer"
- **Profile:** Software engineer, product manager, or technical evaluator assessing WebGL/Three.js performance and UI architecture.
- **Needs:** Clean codebase, component modularity, precise vector iconography, optimized draw calls (`InstancedMesh` / `BufferGeometry`), and robust linter/syntax compliance.

---

## 5. Functional Requirements (FR)

### 5.1 FR-1: Dual Atmospheric Environments (Day & Night Modes)
- **FR-1.1:** The application shall provide two distinct atmospheric lighting and environment modes toggleable via a floating UI switch: **Siang (Sunny Day Mode)** and **Galaxy Malam (Cosmic Night Mode)**.
- **FR-1.2 (Day Mode):** Shall feature a directional sun light (`#fff6dd`, intensity `1.9`) with high-resolution 2048x2048 soft shadow mapping, ambient warm daylight (`#fff8e7`), a soft blue gradient sky background (`#85cbee`), drifting volumetric cloud clusters, and a vibrant green grass terrain (`#4ade80`).
- **FR-1.3 (Night Mode):** Shall feature moonlight (`#b3d4ff`, intensity `0.9`), a deep cosmic abyss fog (`#060814`), dark cyber-navy terrain (`#1e293b`), and a multi-layered celestial sky dome.

### 5.2 FR-2: 42,000-Particle Horizontal Andromeda Galaxy System
- **FR-2.1:** In Night Mode, the system shall procedurally generate and render a spinning spiral galaxy (Andromeda) containing **42,000 additive-glow particle stars** with a custom soft-circle `CanvasTexture`.
- **FR-2.2 (Horizontal Orientation):** The galaxy disc shall be oriented **100% horizontally** (`rotation={[-0.15, 0, 0.05]}`) and positioned directly underneath the center of the floating island (`position={[0, -20, 0]}`).
- **FR-2.3 (Span & Coloring):** The galaxy shall span a massive horizontal radius (`radius = 48`), featuring a brilliant white core (`#ffffff`), warm golden bulge (`#ffe0b2`), sapphire-cyan inner arms (`#38bdf8`), electric lavender outer arms (`#c084fc`), and deep cosmic dust lanes (`#1e3a8a`).
- **FR-2.4 (Rotation Physics):** The horizontal galaxy shall rotate smoothly around its central vertical axis (`rotation.y += delta * 0.035`) independent of camera movement.

### 5.3 FR-3: Multi-Layered Celestial Meteors & Comets
- **FR-3.1:** The night sky shall dynamically spawn and animate two distinct classes of celestial phenomena with accurate velocity-aligned tails:
  - **Streaking Meteors (`MeteorItem`):** High-speed shooting stars spawning at randomized intervals (`Math.random() < 0.008`) with a white core, cyan additive bloom, and a multi-layered tapered tail pointing precisely backward along the velocity vector (`quaternion.setFromUnitVectors`).
  - **Majestic Comets (`CosmicCometItem`):** Slow-moving cosmic travelers featuring an icy nucleus, a glowing purple-cyan coma halo, and a **Double Tail System** consisting of a straight ion/gas violet tail (`#c084fc`) and an angled golden dust tail (`#fef08a`).

### 5.4 FR-4: Interactive 3D Sandbox & Floor Placement
- **FR-4.1:** The central floating island shall act as a raycasted placement floor (`Plane(Vector3(0,1,0), 0)` bounded within $[-10, 10]$).
- **FR-4.2:** Users shall be able to drag items from the UI inventory and drop them directly onto any valid floor coordinate.
- **FR-4.3:** Each placed object shall feature interactive selection (`onClick`), real-time hovering indicators, vertical bounce entrance animation (`scale` elastic interpolation), and procedural drop shadow generation.

### 5.5 FR-5: Glassmorphic Inventory Drawer & Zero-Emoji Vector Design System
- **FR-5.1:** All UI components, buttons, and inventory cards shall use **100% custom Flat Vector SVG icons** (`IconFlower`, `IconTree`, `IconRock`, `IconMushroom`, `IconCrate`, `IconLantern`, `IconRotateOn/Off`, `IconSun`, `IconGalaxy`, `IconTrash`, `IconReset`, `IconWarning`). No native OS text emojis shall be permitted.
- **FR-5.2:** The inventory drawer (`bottom: 0`) shall support smooth collapse/expand toggling (`setInventoryOpen`), styled with dark/light glassmorphic backdrops (`backdropFilter: 'blur(16px)'`).

### 5.6 FR-6: Dynamic Camera Auto-Rotate & Centering Reset (`CameraResetter`)
- **FR-6.1:** Users shall have full freedom to pan (`enablePan={true}`), zoom (`enableZoom={true}`), and orbit (`enableRotate={true}`) the camera around the 3D world when auto-rotate is `OFF`.
- **FR-6.2 (Exact Center Reset):** When the user activates **`Putar: ON`** (Auto-Rotate Mode), the system shall trigger `<CameraResetter />`, which smoothly interpolates over ~1.2 seconds:
  1. The camera target (`controls.target`) lerps to exact world center `[0, 0, 0]`.
  2. The camera position (`cam.position`) lerps to exact default starting coordinates **`[6, 4, 6]`** where the central island and blue cube (`Box`) are perfectly centered in the viewport.
- **FR-6.3 (Transition Lock):** During this centering transition (`isCameraResetting === true`), `OrbitControls.autoRotate` shall be temporarily paused to prevent rotation conflicts. Once arrived at `[6, 4, 6]`, auto-rotate shall seamlessly begin orbiting from the centered view.

### 5.7 FR-7: Object Deletion Mode & Protected Scene Reset
- **FR-7.1:** A dedicated **Mode Hapus (Delete Mode)** toggle (`deleteMode`) shall allow users to click any placed object directly in the 3D scene to remove it instantly (`handleDeleteObject`).
- **FR-7.2:** A selected object shall also display a context-action button (`Hapus Dipilih`) in the bottom toolbar.
- **FR-7.3:** The **Reset Semua** action shall require a two-step confirmation (`resetConfirm state` with warning pulse animation) to protect against accidental wiping of user-constructed scenes.

---

## 6. Non-Functional Requirements (NFR)

### 6.1 Performance & Rendering Efficiency
- **NFR-1 (Instanced & Buffered Geometry):** The 42,000-star galaxy and 3,500-star background dome shall utilize raw `Float32Array` buffers inside `BufferGeometry` to ensure zero garbage-collection stutter during render loops.
- **NFR-2 (Shadow Map Optimization):** Directional shadow maps shall use tight orthographic bounding (`left/right/top/bottom = ±16`, `far = 60`) with normal bias tuning (`0.04`) to eliminate shadow acne while keeping draw overhead minimal.

### 6.2 Reliability & Immutability Standards
- **NFR-3 (React Hooks Compliance):** All camera manipulations inside `useFrame` shall modify `controls.object.position.set()` or `copy()` rather than mutating destructured hook returns, satisfying `eslint-plugin-react-hooks` immutability rules.

### 6.3 Usability & Accessibility
- **NFR-4 (Visual Feedback & Tooltips):** Every interactive button and control switch shall provide descriptive title tooltips (`title="..."`) and visual hover/active state transformations (`transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'`).

---

## 7. Technical Architecture & Technology Stack

```
+-----------------------------------------------------------------------+
|                       CLIENT BROWSER LAYER                            |
|  +-----------------------------------------------------------------+  |
|  |                React 18 / Vite SPA Interface                    |  |
|  |  +-------------------+  +------------------------------------+  |  |
|  |  | Glassmorphic UI   |  | Custom Flat Vector SVG Icon Engine |  |  |
|  |  | (Toolbar/Drawer)  |  | (12+ Zero-Emoji Crisp Vectors)     |  |  |
|  |  +---------+---------+  +-----------------+------------------+  |  |
|  +------------|------------------------------|---------------------+  |
|               | (DOM Events & HTML5 Drag/Drop)                        |
|  +------------v------------------------------v---------------------+  |
|  |           React Three Fiber (R3F) & Three.js WebGL Engine       |  |
|  |  +------------------------+  +-------------------------------+  |  |
|  |  | Scene & OrbitControls  |  | CameraResetter Controller     |  |  |
|  |  | (Target & Camera Lerp) |  | (Smooth [6,4,6] Centering)    |  |  |
|  |  +------------------------+  +-------------------------------+  |  |
|  |  +------------------------+  +-------------------------------+  |  |
|  |  | Celestial Engine       |  | Raycasted Ground Plane        |  |  |
|  |  | (42k Galaxy/Comets)    |  | (Interactive Object Sandbox)  |  |  |
|  |  +------------------------+  +-------------------------------+  |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### 7.1 Core Stack
- **Frontend Framework:** React 18 with Vite (`npm run dev`)
- **3D Graphics Library:** Three.js (`v0.160+`) & `@react-three/fiber` (`v8.15+`)
- **Camera & Controls:** `@react-three/drei` (`OrbitControls`)
- **Code Quality & Linter:** ESLint with React & R3F hooks strict validation

---

## 8. User Workflows & Journey Mapping

### 8.1 Core Sandbox Exploration Workflow
1. **Scene Initialization:** User opens application -> Camera starts at centered default `[6, 4, 6]` looking at central floating island `[0, 0, 0]` in cosmic night mode.
2. **Object Placement:** User drags `Pohon Pinus` (or `Bunga Api`) from bottom drawer -> Hover hint appears over 3D scene -> User drops item onto green/dark ground -> Object bounces into existence with shadow cast.
3. **Free Camera Exploration:** User right-click drags to pan camera away from center (`[x=-8, y=2, z=14]`) and zooms closely onto placed object.
4. **Camera Centering Reset:** User clicks **`Putar: ON`** -> Auto-rotate pauses -> Camera smoothly lerps directly back to **`[6, 4, 6]`** over 1.2s -> Once arrived, camera begins orbiting gracefully around the island center.
5. **Atmospheric Switch:** User clicks **`Siang`** -> Sky transitions to bright sunny blue with volumetric clouds -> User clicks **`Galaxy Malam`** -> Sky transitions back to 42k-star Andromeda Galaxy spinning underneath the island with streaking meteors and double-tail comets.

---

## 9. Future Enhancements & Roadmap

- **Phase 3 (Q4 2026):** LocalStorage & JSON Export/Import allowing users to save their constructed 3D sandbox island blueprints and share them via URL hashes.
- **Phase 4 (Q1 2027):** Physics Engine Integration (e.g., `@react-three/rapier`) for rigid-body collisions, domino effects, and stacking dynamics.
- **Phase 5 (Q2 2027):** Custom Material Editor allowing real-time color picker adjustments and roughness/metalness tuning for placed objects directly within the UI.

---
*End of Business Requirements Document*
