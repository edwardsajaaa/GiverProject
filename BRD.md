# BUSINESS REQUIREMENTS DOCUMENT (BRD)
**Project Name:** GiverSource 3D Interactive Cosmic Sandbox (`my-3d-web`)  
**Version:** 3.0 (Comprehensive Enterprise & Mobile Interactive Release)  
**Status:** Approved & Fully Implemented  
**Date:** July 2026  

---

## 1. Executive Summary & Document Control

### 1.1 Purpose of the Document
This Business Requirements Document (BRD) defines the strategic objectives, functional and non-functional specifications, user experience (UX) standards, real-time analytics KPIs, and technical architecture for the **GiverSource 3D Interactive Cosmic Sandbox**. It serves as the definitive reference for stakeholders, developers, UI/UX designers, and quality assurance engineers. Version 3.0 elevates the system into a robust, enterprise-grade creative sandbox complete with persistent state storage, hybrid mobile touch placement, real-time performance tiering, synthesized Web Audio, transform manipulation, and full history stacks.

### 1.2 Document Version History
| Version | Date | Author / Role | Description of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 2026 | Product & Architecture Team | Initial core 3D interactive sandbox requirements and drag-and-drop system. |
| **1.5** | July 2026 | UI/UX & Graphics Engineering | Integration of day/night cosmic modes, 35k particle Andromeda Galaxy, custom flat vector SVG design system, and camera auto-rotate controls. |
| **2.0** | July 2026 | Lead Agentic AI Coding Assistant | Refinement of horizontal cosmic galaxy alignment, multi-layered realistic meteors & double-tail comets, exact camera centering reset on rotation activation, and zero-emoji flat SVG UI polish. |
| **3.0** | July 2026 | Full-Stack AI & Systems Architect | **Major Feature Upgrade:** Implemented all 9 high-priority functional & architectural requirements: (1) LocalStorage Persistence & JSON Export/Import, (2) Hybrid Mobile Touch Tap-to-Place, (3) WebGL Context Loss & GPU Recovery, (4) Adaptive Performance Tiering (`RealTimeAnalytics`), (5) Placed Object Transform Controls (Rotate & Scale), (6) Synthesized Web Audio Engine, (7) Interactive Onboarding Tutorial Modal, (8) Real-Time KPI Telemetry Badge, and (9) 25-Step Undo/Redo History Stack (`Ctrl+Z`/`Ctrl+Y`). |

---

## 2. Project Background & Vision

### 2.1 Problem Statement
Modern web applications frequently rely on flat 2D interfaces or static placeholder illustrations that fail to engage users deeply. Even when 3D graphics are introduced, they often suffer from rigid camera constraints, generic low-polygon environments, performance bottlenecks on low-end devices, lack of mobile touch ergonomics, unhandled GPU driver crashes (`webglcontextlost`), zero sound feedback, and session volatility where page refreshes erase user progress.

### 2.2 Product Vision
The **GiverSource 3D Cosmic Sandbox** delivers an **ultra-premium, persistent, real-time interactive 3D web experience** accessible across desktops, tablets, and mobile devices. Users can freely explore, build, rotate, scale, and save custom 3D island environments suspended above a vast cosmic galaxy or beneath a dynamic sunny sky—supported by synthesized sound feedback, real-time FPS telemetry, and intelligent hardware adaptation.

---

## 3. Business Objectives & Success Metrics

### 3.1 Key Business Objectives
1. **Showcase Next-Generation Web Capability:** Demonstrate state-of-the-art browser 3D graphics, procedural starfields, and real-time lighting across desktop and touch mobile devices without plugins.
2. **Maximize Engagement & Eliminate Session Volatility:** Provide instant `localStorage` autosave, JSON scene export/import, multi-step Undo/Redo, and object transform controls (`Rotate`/`Scale`) to turn casual visitors into long-term sandbox creators.
3. **Hardware Agnostic Accessibility & GPU Resilience:** Ensure smooth $\ge 60\text{ FPS}$ standard execution while automatically downgrading particle/shadow complexity on low-end hardware or gracefully recovering from WebGL crashes.

### 3.2 Key Performance Indicators (KPIs) & Real-Time Monitoring
- **Frame Rate Stability (Real-Time Monitored):** Maintain $\ge 60\text{ FPS}$ on high-tier devices. Monitored continuously via `<RealTimeAnalytics />` with automatic tier degradation if FPS drops below $42\text{ FPS}$ for $>3\text{ seconds}$.
- **First Contentful Paint (FCP):** $< 1.2\text{ seconds}$ through procedural canvas textures (`createStarTexture`) and optimized buffer geometry arrays.
- **User Action Error Rate:** $< 0.05\%$ error rate during drag-drop, mobile touch placement, undo/redo state transitions, and file export/import.
- **Telemetry Display:** Live KPI status displayed in the top-left UI badge (`⚡ FPS: {fps} | Mode: High/Low Tier | Objek: {count}`).

---

## 4. Target Audience & User Personas

### 4.1 Primary User Persona: "The Creative Explorer & Mobile Builder"
- **Profile:** Tech-savvy web user, designer, gamer, or mobile tablet user seeking interactive digital sandbox experiences.
- **Behaviors:** Enjoys building custom layouts, adjusting object orientation, listening to immersive cosmic/daytime soundscapes, and sharing design blueprints.
- **Needs:** Zero data loss upon refresh, intuitive tap-to-place touch controls on mobile screens, rotate/scale precision, and instant undo capability.

### 4.2 Secondary Persona: "The Technical Reviewer & Systems Evaluator"
- **Profile:** Software engineer, product manager, or technical evaluator assessing WebGL/Three.js performance, memory management, and error handling.
- **Needs:** Clean React 18 / R3F codebase, component modularity, strict `react-hooks/purity` compliance, Web Audio API synthesis without external asset overhead, and robust `webglcontextlost` boundaries.

---

## 5. Functional Requirements (FR)

### 5.1 FR-1: Dual Atmospheric Environments (Day & Night Modes)
- **FR-1.1:** The application shall provide two distinct atmospheric lighting and environment modes toggleable via a floating UI switch: **Siang (Sunny Day Mode)** and **Galaxy Malam (Cosmic Night Mode)**.
- **FR-1.2 (Day Mode):** Shall feature a directional sun light (`#fff6dd`, intensity `1.9`) with high-resolution shadow mapping (`1024x1024` or `2048x2048` based on tier), ambient warm daylight (`#fff8e7`), a soft blue gradient sky background (`#85cbee`), drifting volumetric cloud clusters, and a vibrant green grass terrain (`#4ade80`).
- **FR-1.3 (Night Mode):** Shall feature moonlight (`#b3d4ff`, intensity `0.9`), a deep cosmic abyss fog (`#060814`), dark cyber-navy terrain (`#1e293b`), and a multi-layered celestial sky dome.

### 5.2 FR-2: 42,000-Particle Horizontal Andromeda Galaxy System
- **FR-2.1:** In Night Mode, the system shall procedurally generate and render a spinning spiral galaxy (Andromeda) containing up to **42,000 additive-glow particle stars** (`16,000` in Low Tier mode) with a custom soft-circle `CanvasTexture`.
- **FR-2.2 (Horizontal Orientation):** The galaxy disc shall be oriented **100% horizontally** (`rotation={[-0.15, 0, 0.05]}`) and positioned directly underneath the center of the floating island (`position={[0, -20, 0]}`).
- **FR-2.3 (Span & Coloring):** The galaxy shall span a massive horizontal radius (`radius = 48`), featuring a brilliant white core (`#ffffff`), warm golden bulge (`#ffe0b2`), sapphire-cyan inner arms (`#38bdf8`), electric lavender outer arms (`#c084fc`), and deep cosmic dust lanes (`#1e3a8a`).
- **FR-2.4 (Rotation Physics):** The horizontal galaxy shall rotate smoothly around its central vertical axis (`rotation.y += delta * 0.035`) independent of camera movement.

### 5.3 FR-3: Multi-Layered Celestial Meteors & Comets
- **FR-3.1:** The night sky shall dynamically spawn and animate two distinct classes of celestial phenomena with accurate velocity-aligned tails:
  - **Streaking Meteors (`MeteorItem`):** High-speed shooting stars spawning at randomized intervals (`Math.random() < 0.008`) with a white core, cyan additive bloom, and a multi-layered tapered tail pointing precisely backward along the velocity vector (`quaternion.setFromUnitVectors`).
  - **Majestic Comets (`CosmicCometItem`):** Slow-moving cosmic travelers featuring an icy nucleus, a glowing purple-cyan coma halo, and a **Double Tail System** consisting of a straight ion/gas violet tail (`#c084fc`) and an angled golden dust tail (`#fef08a`).

### 5.4 FR-4: Interactive 3D Sandbox & Hybrid Floor Placement
- **FR-4.1:** The central floating island shall act as a raycasted placement floor (`Plane(Vector3(0,1,0), 0)` bounded within $[-10, 10]$).
- **FR-4.2 (Desktop Drag & Drop):** Users shall be able to drag items (`onDragStart`) from the UI inventory and drop (`onDrop`) them directly onto any valid floor coordinate.
- **FR-4.3 (Mobile & Touch Tap-to-Place):** To guarantee seamless operation on mobile/touch devices where HTML5 drag-drop requires heavy polyfills, clicking or tapping any inventory slot activates **"Siap Taruh (Tap-to-Place)" Mode** (`activePlacementType`). Tapping directly on the 3D island terrain (`onPointerDown`) instantly calculates exact coordinates and spawns the item.
- **FR-4.4:** Each placed object shall feature interactive selection (`onClick`), real-time hovering indicators, vertical bounce entrance animation (`scale` elastic interpolation), and procedural drop shadow generation.

### 5.5 FR-5: Persistent LocalStorage Autosave & JSON Scene Export/Import
- **FR-5.1 (Real-Time Autosave):** Every addition, deletion, rotation, or scaling of an object in `placedObjects` shall be automatically serialized and saved to the browser's `localStorage` under key `giver_sandbox_save_v3`. Upon page load or refresh, the exact previous state is instantly restored.
- **FR-5.2 (JSON Blueprint Export):** Users can click **`[💾 Ekspor]`** to generate and download a clean structured JSON blueprint file (`giver_sandbox_scene.json`) containing scene version, active time mode, and all object coordinates/transformations.
- **FR-5.3 (JSON Blueprint Import):** Users can click **`[📂 Impor]`** to upload any valid JSON scene file, instantly hydrating the 3D sandbox and playing confirmation sound feedback.

### 5.6 FR-6: Transform Controls (Rotate & Scale) for Placed Objects
- **FR-6.1 (Transform Floating Toolbar):** When a user selects any object (`selectedId`), a floating glassmorphic toolbar (`top: 76px`) shall appear showing precise manipulation controls:
  - **Putar Kiri / Kanan:** `-45°` and `+45°` incremental Y-axis rotation (`handleRotateSelected`).
  - **Skala Perbesar / Perkecil:** `-20%` and `+20%` scale adjustments bounded between `0.4x` and `2.8x` (`handleScaleSelected`).
  - **Hapus Objek:** Instant deletion (`handleDeleteSelected`).

### 5.7 FR-7: Synthesized Web Audio & Ambient Sound Engine (`SoundEngine`)
- **FR-7.1 (Zero External Dependency Audio):** The application shall include a dedicated `SoundEngine` utilizing the native **Web Audio API (`AudioContext` / `webkitAudioContext`)** to synthesize procedural sound effects without loading external MP3/WAV assets:
  - **`playPop()`:** Sweet triangle/sine harmonic chord sweep played when placing or dropping objects.
  - **`playDelete()`:** Soft downward sawtooth sweep played upon deleting items or clearing scenes.
  - **`playClick()`:** Crisp high-frequency sine tap played on UI button interactions.
- **FR-7.2 (Ambient Audio Drone):** Users can toggle audio (`[Audio: ON/OFF]`). When active, `SoundEngine.setAmbient()` generates a continuous, soothing $108\text{Hz}$ sine pad for Night Mode or a $164\text{Hz}$ warm triangle drone for Day Mode.

### 5.8 FR-8: WebGL Context Loss Handling & GPU Recovery
- **FR-8.1:** The application shall actively monitor `window.addEventListener('webglcontextlost', ...)` and `webglcontextrestored`.
- **FR-8.2:** If a GPU driver crash occurs or WebGL context is lost, the system shall intercept the event (`e.preventDefault()`), prevent black-screen freezing, and display an elegant glassmorphic alert modal (`⚠️ WebGL Context Lost or Unsupported`) complete with a one-click **`[🔄 Muat Ulang Sandbox]`** recovery button.

### 5.9 FR-9: Interactive Onboarding & First-Time User Tutorial Modal
- **FR-9.1:** Upon initial visit (`!localStorage.getItem('giver_sandbox_onboarded_v3')`), the system shall automatically display a 4-step glassmorphic onboarding guide (`👋 Selamat Datang di GiverSource Sandbox!`).
- **FR-9.2:** The tutorial clearly illustrates: (1) Drag or Tap-to-Place mechanics, (2) Transform rotation & scaling, (3) Camera Auto-Rotate & Center Reset, and (4) Autosave & Undo/Redo shortcuts.
- **FR-9.3:** Users can dismiss the tutorial or reopen it at any time via the `[❓]` header button.

### 5.10 FR-10: Multi-Step Undo/Redo History Stack (`Ctrl+Z` / `Ctrl+Y`)
- **FR-10.1 (History Stack Architecture):** All object placement, deletion, rotation, scaling, and reset actions shall be managed through a robust 25-step history state stack (`historyPast` & `historyFuture`).
- **FR-10.2 (Header Buttons & Shortcuts):** Users can click **`[↩ Undo]`** (`Ctrl+Z` / `Cmd+Z`) and **`[↪ Redo]`** (`Ctrl+Y` / `Cmd+Y` / `Shift+Ctrl+Z`) to seamlessly traverse their design chronology.

### 5.11 FR-11: Dynamic Camera Auto-Rotate & Centering Reset (`CameraResetter`)
- **FR-11.1:** Users have full freedom to pan (`enablePan={true}`), zoom (`enableZoom={true}`), and orbit (`enableRotate={true}`) the camera around the 3D world when auto-rotate is `OFF`.
- **FR-11.2 (Exact Center Reset):** When the user activates **`Putar: ON`** (Auto-Rotate Mode), the system triggers `<CameraResetter />`, smoothly interpolating over ~1.2 seconds:
  1. The camera target (`controls.target`) lerps to exact world center `[0, 0, 0]`.
  2. The camera position (`cam.position`) lerps to exact default starting coordinates **`[6, 4, 6]`** where the central island and blue cube (`Box`) are perfectly centered in the viewport.
- **FR-11.3 (Transition Lock):** During this centering transition (`isCameraResetting === true`), `OrbitControls.autoRotate` is temporarily paused to prevent rotation conflicts. Once arrived at `[6, 4, 6]`, auto-rotate seamlessly begins orbiting from the centered view.

---

## 6. Non-Functional Requirements (NFR)

### 6.1 Performance & Adaptive Rendering Efficiency
- **NFR-1 (Instanced & Buffered Geometry):** The galaxy starfield and background dome shall utilize raw `Float32Array` buffers inside `BufferGeometry` to ensure zero garbage-collection stutter during render loops.
- **NFR-2 (Shadow Map Optimization):** Directional shadow maps shall use tight orthographic bounding (`left/right/top/bottom = ±16`, `far = 60`) with normal bias tuning (`0.04`) to eliminate shadow acne.
- **NFR-3 (Adaptive Device Tiering & Auto-Degradation):** The system shall evaluate `navigator.hardwareConcurrency <= 4` and live frame rates (`RealTimeAnalytics`). If low hardware is detected or FPS drops below $42\text{ FPS}$ for $>3\text{ seconds}$, the system automatically switches `performanceTier` to `'low'`:
  - Reduces Andromeda Galaxy particles from $42,000$ to $16,000$.
  - Reduces Sky Stars from $3,500$ to $1,200$.
  - Disables heavy directional shadows (`shadows={false}`).

### 6.2 Reliability & React Pure Render Compliance
- **NFR-4 (React Hooks & Purity Compliance):** All camera manipulations inside `useFrame` shall modify `controls.object.position.set()` or `copy()`. Furthermore, all performance timing refs (`useRef(0)`) shall be initialized safely during side effects (`useFrame`), satisfying strict `react-hooks/purity` and `eslint` standards.

### 6.3 Usability & Vector Design Integrity
- **NFR-5 (Zero-Emoji Flat Vector SVG UI):** All UI components, buttons, and inventory cards shall use **100% custom Flat Vector SVG icons** (`IconFlower`, `IconTree`, `IconRock`, `IconLamp`, `IconUndo`, `IconRedo`, `IconAudioOn/Off`, `IconRotateOn/Off`, `IconSun`, `IconGalaxy`, `IconTrash`, `IconReset`, `IconWarning`). No native OS text emojis shall be permitted.

---

## 7. Technical Architecture & Technology Stack

```
+-----------------------------------------------------------------------------------+
|                            CLIENT BROWSER LAYER                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                    React 18 / Vite SPA SPA Interface                        |  |
|  |  +-----------------------+  +-------------------+  +---------------------+  |  |
|  |  | Glassmorphic Toolbar  |  | Custom Flat SVG   |  | Onboarding Modal &  |  |  |
|  |  | & Undo/Redo Actions   |  | Vector Icon Engine|  | WebGL Crash Alert   |  |  |
|  |  +-----------+-----------+  +---------+---------+  +----------+----------+  |  |
|  +--------------|------------------------|-----------------------|-------------+  |
|                 |                        |                       |                |
|  +--------------v------------------------v-----------------------v-------------+  |
|  |               STATE, AUDIO & TELEMETRY CONTROLLER LAYER                     |  |
|  |  +--------------------+  +-----------------------+  +--------------------+  |  |
|  |  | LocalStorage Save  |  | Synthesized Web Audio |  | RealTimeAnalytics  |  |  |
|  |  | & JSON Blueprint   |  | (AudioContext Pop/    |  | (Live FPS Monitor  |  |  |
|  |  | Exporter/Importer  |  | Delete & Ambient Pad) |  | & Auto-Tier Switch)|  |  |
|  |  +--------------------+  +-----------------------+  +--------------------+  |  |
|  +---------------------------------------|-------------------------------------+  |
|                                          | (Interactive Props & Touch Placement)  |
|  +---------------------------------------v-------------------------------------+  |
|  |             React Three Fiber (R3F) & Three.js WebGL Engine                 |  |
|  |  +---------------------------+  +----------------------------------------+  |  |
|  |  | OrbitControls & Camera    |  | Adaptive Celestial Engine              |  |  |
|  |  | Resetter ([6,4,6] Lerp)   |  | (42k/16k Galaxy & Double-Tail Comets)  |  |  |
|  |  +---------------------------+  +----------------------------------------+  |  |
|  |  +---------------------------+  +----------------------------------------+  |  |
|  |  | PlacedObjectWrapper       |  | Raycasted Ground Plane                 |  |  |
|  |  | (Rotate/Scale Transform)  |  | (Drag-Drop & Mobile Tap-to-Place)      |  |  |
|  |  +---------------------------+  +----------------------------------------+  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 7.1 Core Stack
- **Frontend Framework:** React 18 with Vite (`npm run dev`)
- **3D Graphics Library:** Three.js (`v0.160+`) & `@react-three/fiber` (`v8.15+`)
- **Camera & Controls:** `@react-three/drei` (`OrbitControls`)
- **Audio Engine:** Native Web Audio API (`AudioContext` / `webkitAudioContext`)
- **Code Quality & Linter:** ESLint with React & R3F hooks strict validation

---

## 8. User Workflows & Journey Mapping

### 8.1 Core Sandbox Exploration & Mobile Construction Workflow
1. **First-Time Onboarding:** User opens application -> System checks `localStorage` -> Displays **Welcome Tutorial Guide** -> User clicks **`[🚀 Mulai Membangun Dunia!]`**.
2. **Hybrid Object Placement:**
   - *On Desktop:* User drags `Pohon Pinus` from bottom drawer -> Drops onto green/dark ground -> Item bounces into existence with shadow cast (`playPop` audio triggers).
   - *On Mobile/HP:* User taps `Lampu` in drawer -> Banner appears (`💡 Mode Taruh Aktif`) -> User taps island ground -> Item spawns instantly.
3. **Interactive Transform Adjustment:** User clicks placed `Pohon Pinus` -> Floating Transform Toolbar opens -> User clicks **`[🔄 +45°]`** and **`[🔍 + Skala]`** to customize tree size and angle.
4. **Undo / Redo Corrections:** User accidentally deletes an item -> Clicks **`[↩ Undo]`** (or presses `Ctrl+Z`) -> Object reappears instantly in its exact previous location (`playClick` audio triggers).
5. **Camera Centering & Orbit:** User clicks **`Putar: ON`** -> Auto-rotate pauses -> Camera smoothly lerps directly back to **`[6, 4, 6]`** over 1.2s -> Once arrived, camera begins orbiting gracefully around the island center.
6. **Atmospheric & Audio Immersion:** User clicks **`Siang`** -> Sky transitions to bright sunny blue -> User clicks **`[Audio: ON]`** -> Soothing ambient drone begins -> User switches to **`Galaxy Malam`** -> $432\text{Hz}$ cosmic pad envelops the scene while 42k-star Andromeda Galaxy spins below.
7. **Persistence & Blueprint Sharing:** User clicks **`[💾 Ekspor]`** -> Downloadable JSON blueprint `giver_sandbox_scene.json` is generated -> User refreshes browser -> `localStorage` automatically restores the scene exactly as left!

---

## 9. Future Enhancements & Roadmap

- **Phase 4 (Q4 2026):** Physics Engine Integration (e.g., `@react-three/rapier`) for rigid-body collisions, domino effects, and real-time stacking dynamics on the island surface.
- **Phase 5 (Q1 2027):** Custom Material & Color Editor allowing real-time HSL/Hex color picker adjustments and roughness/metalness tuning for placed objects directly within the UI.
- **Phase 6 (Q2 2027):** Multiplayer Cloud Sync (`WebSockets` / `Firebase`) enabling collaborative real-time island co-creation across remote browser sessions.

---

*End of Business Requirements Document*
