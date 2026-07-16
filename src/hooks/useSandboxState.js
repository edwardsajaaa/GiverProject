import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SoundEngine } from '../utils/SoundEngine';
import { StorageEngine } from '../utils/storageEngine';

export function useSandboxState() {
  const [timeMode, setTimeMode] = useState('night');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isCameraResetting, setIsCameraResetting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [inventoryExpanded, setInventoryExpanded] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  // Central Altar Hero Object State (Bukan objek hiasan dock, tapi Hero centerpiece utama)
  const [initialCentral] = useState(() => StorageEngine.loadCentralObject());
  const [centralObjectType, setCentralObjectType] = useState(initialCentral.type || 'cube');
  const [centralObjectColor, setCentralObjectColor] = useState(initialCentral.color || '#4f8cff');
  const [centralObjectMaterial, setCentralObjectMaterial] = useState(initialCentral.material || 'holographic');
  const [centralObjectScale, setCentralObjectScale] = useState(initialCentral.scale || 1.0);
  const [centralObjectUrl, setCentralObjectUrl] = useState(initialCentral.customUrl || null);
  const [centralObjectName, setCentralObjectName] = useState(initialCentral.customName || null);
  const [centralModalOpen, setCentralModalOpen] = useState(false);

  useEffect(() => {
    StorageEngine.saveCentralObject({
      type: centralObjectType,
      color: centralObjectColor,
      material: centralObjectMaterial,
      scale: centralObjectScale,
      customUrl: centralObjectUrl,
      customName: centralObjectName
    });
  }, [centralObjectType, centralObjectColor, centralObjectMaterial, centralObjectScale, centralObjectUrl, centralObjectName]);

  // Snap to Grid (New Feature V3.1)
  const [snapGrid, setSnapGrid] = useState(false);
  const [snapSize, setSnapSize] = useState(0.5); // 0.5m or 1.0m snap

  // Helper to snap values
  const snapVal = useCallback((val) => {
    if (!snapGrid) return val;
    return Math.round(val / snapSize) * snapSize;
  }, [snapGrid, snapSize]);

  // Undo/Redo & Persistence State (25 steps history stack)
  const [historyPast, setHistoryPast] = useState([]);
  const [placedObjects, setPlacedObjectsRaw] = useState(() => {
    return StorageEngine.loadScene();
  });
  const [historyFuture, setHistoryFuture] = useState([]);

  const setPlacedObjects = useCallback((updater) => {
    setPlacedObjectsRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setHistoryPast(p => [...p.slice(-25), prev]);
      setHistoryFuture([]);
      return next;
    });
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    StorageEngine.saveScene(placedObjects);
  }, [placedObjects]);

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast(p => p.slice(0, -1));
    setHistoryFuture(f => [placedObjects, ...f]);
    setPlacedObjectsRaw(previous);
    SoundEngine.playClick();
  }, [historyPast, placedObjects]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture(f => f.slice(1));
    setHistoryPast(p => [...p, placedObjects]);
    setPlacedObjectsRaw(next);
    SoundEngine.playClick();
  }, [historyFuture, placedObjects]);

  const [draggingItem, setDraggingItem] = useState(null);
  const [activePlacementType, setActivePlacementType] = useState(null); // Touch Tap-to-Place
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [webglLost, setWebglLost] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !StorageEngine.isOnboarded());

  // Performance Tiering
  const isLowEndDevice = useMemo(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) return true;
    return false;
  }, []);
  const [performanceTier, setPerformanceTier] = useState(isLowEndDevice ? 'low' : 'high');

  const handleFpsUpdate = useCallback((newFps) => {
    if (newFps < 42 && performanceTier === 'high') setPerformanceTier('low');
  }, [performanceTier]);

  const sceneRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const isNight = timeMode === 'night';

  const [inventory] = useState(() => [
    'flower', 'tree', 'rock', 'lamp', 'crystal', 'mushroom',
    'pyramid', 'fountain', 'tower', 'cactus', 'campfire', 'monument'
  ]);

  const handleStart = useCallback(() => setPaused(true), []);
  const handleEnd = useCallback(() => setPaused(false), []);

  const handleDragStart = useCallback((e, itemType) => {
    setDraggingItem(itemType);
    if (e && e.dataTransfer) {
      e.dataTransfer.setData('itemType', itemType);
    }
  }, []);

  const handleDragEnd = useCallback(() => setDraggingItem(null), []);

  const handleGroundTap = useCallback((x, z) => {
    if (!activePlacementType) return;
    const half = 10;
    const clampedX = snapVal(Math.max(-half, Math.min(half, x)));
    const clampedZ = snapVal(Math.max(-half, Math.min(half, z)));
    setPlacedObjects(prev => [...prev, {
      id: Date.now() + Math.random(),
      type: activePlacementType,
      position: [clampedX, 0, clampedZ],
      rotationY: 0,
      scale: 1,
    }]);
    SoundEngine.playPop();
    setActivePlacementType(null);
  }, [activePlacementType, setPlacedObjects, snapVal]);

  const handleDeleteObject = useCallback((id) => {
    setPlacedObjects(prev => prev.filter(o => o.id !== id));
    setSelectedId(s => s === id ? null : s);
    SoundEngine.playDelete();
  }, [setPlacedObjects]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.filter(o => o.id !== selectedId));
    setSelectedId(null);
    SoundEngine.playDelete();
  }, [selectedId, setPlacedObjects]);

  const handleRotateSelected = useCallback((angleDelta) => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.map(o => o.id === selectedId ? { ...o, rotationY: (o.rotationY || 0) + angleDelta } : o));
    SoundEngine.playClick();
  }, [selectedId, setPlacedObjects]);

  const handleScaleSelected = useCallback((scaleDelta) => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.map(o => o.id === selectedId ? { ...o, scale: Math.max(0.4, Math.min(2.8, (o.scale || 1) + scaleDelta)) } : o));
    SoundEngine.playClick();
  }, [selectedId, setPlacedObjects]);

  const handleResetAll = useCallback(() => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    setPlacedObjects([]);
    setSelectedId(null);
    setDeleteMode(false);
    setResetConfirm(false);
    SoundEngine.playDelete();
  }, [resetConfirm, setPlacedObjects]);

  const handleExportJson = useCallback(() => {
    StorageEngine.exportJson({ version: "3.1", timeMode, placedObjects }, () => {
      SoundEngine.playPop();
    });
  }, [timeMode, placedObjects]);

  const handleImportJson = useCallback(() => {
    StorageEngine.importJson({
      setPlacedObjects,
      setTimeMode,
      onSuccess: () => SoundEngine.playPop()
    });
  }, [setPlacedObjects]);

  // Comprehensive Keyboard Shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+S (Export), Ctrl+O (Import)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) { e.preventDefault(); handleRedo(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); handleExportJson(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') { e.preventDefault(); handleImportJson(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleExportJson, handleImportJson]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const itemType = e.dataTransfer ? e.dataTransfer.getData('itemType') : draggingItem;
    if (!itemType || !sceneRef.current || !canvasContainerRef.current) return;

    const rect = canvasContainerRef.current.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const { camera } = sceneRef.current;
    if (!camera) return;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    const hit = raycaster.ray.intersectPlane(floorPlane, intersection);

    if (hit) {
      const half = 10;
      const clampedX = snapVal(Math.max(-half, Math.min(half, intersection.x)));
      const clampedZ = snapVal(Math.max(-half, Math.min(half, intersection.z)));
      setPlacedObjects(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: itemType,
        position: [clampedX, 0, clampedZ],
        rotationY: 0,
        scale: 1,
      }]);
      SoundEngine.playPop();
    }
    setDraggingItem(null);
  }, [draggingItem, setPlacedObjects, snapVal]);

  return {
    timeMode, setTimeMode, isNight,
    autoRotate, setAutoRotate,
    isCameraResetting, setIsCameraResetting,
    paused, setPaused,
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
    placedObjects, setPlacedObjects,
    handleUndo, handleRedo,
    draggingItem, setDraggingItem,
    activePlacementType, setActivePlacementType,
    deleteMode, setDeleteMode,
    selectedId, setSelectedId,
    resetConfirm, setResetConfirm,
    webglLost, setWebglLost,
    showTutorial, setShowTutorial,
    performanceTier, setPerformanceTier, isLowEndDevice,
    handleFpsUpdate,
    sceneRef, canvasContainerRef,
    inventory,
    handleStart, handleEnd,
    handleDragStart, handleDragEnd, handleDragOver, handleDrop,
    handleGroundTap,
    handleDeleteObject, handleDeleteSelected,
    handleRotateSelected, handleScaleSelected,
    handleResetAll,
    handleExportJson, handleImportJson
  };
}
