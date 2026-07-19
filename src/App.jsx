import React, { useState } from 'react';
import { useSandboxState } from './hooks/useSandboxState';
import { HeaderToolbar } from './components/ui/HeaderToolbar';
import { InventoryBar } from './components/ui/InventoryBar';
import { TransformToolbar } from './components/ui/TransformToolbar';
import { TelemetryBadge } from './components/ui/TelemetryBadge';
import { OnboardingModal } from './components/ui/OnboardingModal';
import { CentralObjectModal } from './components/ui/CentralObjectModal';
import { MainCanvas } from './components/3d/MainCanvas';

export default function App() {
  const {
    timeMode, setTimeMode, isNight,
    autoRotate, setAutoRotate,
    paused,
    inventoryOpen, setInventoryOpen,
    inventoryExpanded, setInventoryExpanded,
    audioActive, setAudioActive,
    centralObjectType, setCentralObjectType,
    centralObjectColor, setCentralObjectColor,
    centralObjectMaterial, setCentralObjectMaterial,
    centralObjectScale, setCentralObjectScale,
    centralObjectUrl, setCentralObjectUrl,
    centralObjectName, setCentralObjectName,
    centralModalOpen, setCentralModalOpen,
    snapGrid, setSnapGrid,
    snapSize, setSnapSize,
    historyPast, historyFuture,
    placedObjects,
    handleUndo, handleRedo,
    draggingItem,
    activePlacementType, setActivePlacementType,
    deleteMode, setDeleteMode,
    selectedId, setSelectedId,
    resetConfirm, setResetConfirm,
    webglLost,
    showTutorial, setShowTutorial,
    performanceTier,
    handleFpsUpdate: sandboxHandleFpsUpdate,
    sceneRef, canvasContainerRef,
    inventory,
    handleStart, handleEnd,
    handleDragStart, handleDragEnd, handleDragOver, handleDrop,
    handleGroundTap,
    handleDeleteObject, handleDeleteSelected,
    handleRotateSelected, handleScaleSelected,
    handleResetAll
  } = useSandboxState();

  const [fps, setFps] = useState(60);

  const handleFpsUpdate = (newFps) => {
    setFps(newFps);
    sandboxHandleFpsUpdate(newFps);
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Outfit", system-ui, sans-serif',
      background: isNight ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' : 'linear-gradient(135deg, #e0eafc, #cfdef3)',
      color: isNight ? '#F5F5F7' : '#1D1D1F',
      overflow: 'hidden', userSelect: 'none', position: 'relative',
      transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* 1. Telemetry Performance Glass Badge */}
      <TelemetryBadge
        fps={fps}
        performanceTier={performanceTier}
        objectCount={placedObjects.length}
        isNight={isNight}
      />

      {/* 2. Apple Header Pill Controls & Snap-to-Grid / Photo Mode */}
      <HeaderToolbar
        isNight={isNight}
        audioActive={audioActive}
        setAudioActive={setAudioActive}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        timeMode={timeMode}
        setTimeMode={setTimeMode}
        snapGrid={snapGrid}
        setSnapGrid={setSnapGrid}
        snapSize={snapSize}
        setSnapSize={setSnapSize}
        historyPast={historyPast}
        historyFuture={historyFuture}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        setShowTutorial={setShowTutorial}
        canvasContainerRef={canvasContainerRef}
        centralObjectType={centralObjectType}
        centralObjectName={centralObjectName}
        setCentralModalOpen={setCentralModalOpen}
      />

      {/* 3. Transform Dynamic Island & Placement Hint Banners */}
      <TransformToolbar
        isNight={isNight}
        selectedId={selectedId}
        handleRotateSelected={handleRotateSelected}
        handleScaleSelected={handleScaleSelected}
        handleDeleteSelected={handleDeleteSelected}
        draggingItem={draggingItem}
        activePlacementType={activePlacementType}
        setActivePlacementType={setActivePlacementType}
      />

      {/* 4. Main 3D Canvas Sandbox Container */}
      <div
        ref={canvasContainerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}
      >
        {webglLost && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(16px)', color: '#fff', flexDirection: 'column', gap: 16
          }}>
            <h2 style={{ color: '#ef4444' }}>⚠️ WebGL Context Lost or Unsupported</h2>
            <p style={{ maxWidth: 420, textAlign: 'center' }}>Koneksi grafis GPU terputus atau driver tidak siap. Klik tombol di bawah untuk memuat ulang sandbox 3D.</p>
            <button onClick={() => window.location.reload()} style={{
              padding: '10px 24px', borderRadius: 30, background: '#38bdf8', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer'
            }}>🔄 Muat Ulang Sandbox</button>
          </div>
        )}

        <MainCanvas
          performanceTier={performanceTier}
          isNight={isNight}
          timeMode={timeMode}
          handleFpsUpdate={handleFpsUpdate}
          sceneRef={sceneRef}
          handleGroundTap={handleGroundTap}
          placedObjects={placedObjects}
          deleteMode={deleteMode}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleDeleteObject={handleDeleteObject}
          autoRotate={autoRotate}
          paused={paused}
          speed={1}
          handleStart={handleStart}
          handleEnd={handleEnd}
          centralObjectType={centralObjectType}
          centralObjectColor={centralObjectColor}
          centralObjectMaterial={centralObjectMaterial}
          centralObjectScale={centralObjectScale}
          centralObjectUrl={centralObjectUrl}
          setCentralModalOpen={setCentralModalOpen}
        />
      </div>

      {/* 5. Apple macOS / visionOS Bottom Dock Inventory Bar */}
      <InventoryBar
        isNight={isNight}
        inventoryOpen={inventoryOpen}
        setInventoryOpen={setInventoryOpen}
        inventoryExpanded={inventoryExpanded}
        setInventoryExpanded={setInventoryExpanded}
        inventory={inventory}
        activePlacementType={activePlacementType}
        setActivePlacementType={setActivePlacementType}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        setSelectedId={setSelectedId}
        resetConfirm={resetConfirm}
        setResetConfirm={setResetConfirm}
        handleResetAll={handleResetAll}
      />

      {/* 6. Onboarding Tutorial Overlay Modal */}
      <OnboardingModal
        isNight={isNight}
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
      />

      {/* 7. Central Altar Centerpiece Studio Modal */}
      <CentralObjectModal
        isNight={isNight}
        centralModalOpen={centralModalOpen}
        setCentralModalOpen={setCentralModalOpen}
        centralObjectType={centralObjectType}
        setCentralObjectType={setCentralObjectType}
        centralObjectColor={centralObjectColor}
        setCentralObjectColor={setCentralObjectColor}
        centralObjectMaterial={centralObjectMaterial}
        setCentralObjectMaterial={setCentralObjectMaterial}
        centralObjectScale={centralObjectScale}
        setCentralObjectScale={setCentralObjectScale}
        centralObjectUrl={centralObjectUrl}
        setCentralObjectUrl={setCentralObjectUrl}
        centralObjectName={centralObjectName}
        setCentralObjectName={setCentralObjectName}
      />
    </div>
  );
}
