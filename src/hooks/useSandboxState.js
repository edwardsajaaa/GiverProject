import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SoundEngine } from '../utils/SoundEngine';
import { StorageEngine } from '../utils/storageEngine';
import { ModelStorage } from '../utils/modelStorage';
import { ITEM_DEFS } from '../components/objects/ItemDefs';

export function useSandboxState() {
  const [timeMode, setTimeMode] = useState('day');
  const [autoRotate, setAutoRotate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [inventoryExpanded, setInventoryExpanded] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [pendingGreeting, setPendingGreeting] = useState(null); // Menahan objek sebelum pesan diisi

  // Central Altar Hero Object State (Bukan objek hiasan dock, tapi Hero centerpiece utama)
  const [initialCentral] = useState(() => StorageEngine.loadCentralObject());
  const [centralObjectType, setCentralObjectType] = useState(initialCentral.type || 'cube');
  const [centralObjectColor, setCentralObjectColor] = useState(initialCentral.color || '#4f8cff');
  const [centralObjectMaterial, setCentralObjectMaterial] = useState(initialCentral.material || 'holographic');
  const [centralObjectScale, setCentralObjectScale] = useState(initialCentral.scale || 1.0);
  const [centralObjectUrl, setCentralObjectUrl] = useState(initialCentral.customUrl || null);
  const [centralObjectName, setCentralObjectName] = useState(initialCentral.customName || null);
  const [centralModalOpen, setCentralModalOpen] = useState(false);

  // World Biome & Art Style Customization State
  const [initialWorld] = useState(() => StorageEngine.loadWorldConfig());
  const [biome, setBiome] = useState(initialWorld.biome || 'floating_island');
  const [artStyle, setArtStyle] = useState(initialWorld.artStyle || 'lowpoly');
  const [worldModalOpen, setWorldModalOpen] = useState(false);

  useEffect(() => {
    StorageEngine.saveWorldConfig({ biome, artStyle });
  }, [biome, artStyle]);

  // Otomatis pulihkan file 3D kustom dari IndexedDB saat halaman dimuat ulang
  useEffect(() => {
    ModelStorage.loadHeroModel().then(saved => {
      if (saved && saved.blobUrl) {
        setCentralObjectUrl(saved.blobUrl);
        setCentralObjectName(saved.fileName);
      }
    });
  }, []);

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

  const setPlacedObjects = useCallback((action) => {
    setPlacedObjectsRaw((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      if (JSON.stringify(prev) !== JSON.stringify(next)) {
        setHistoryPast((past) => [...past.slice(-24), prev]);
        setHistoryFuture([]);
        StorageEngine.saveScene(next);
      }
      return next;
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast((past) => past.slice(0, past.length - 1));
    setHistoryFuture((future) => [placedObjects, ...future]);
    setPlacedObjectsRaw(previous);
    StorageEngine.saveScene(previous);
    SoundEngine.playClick();
  }, [historyPast, placedObjects]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture((future) => future.slice(1));
    setHistoryPast((past) => [...past, placedObjects]);
    setPlacedObjectsRaw(next);
    StorageEngine.saveScene(next);
    SoundEngine.playClick();
  }, [historyFuture, placedObjects]);

  // Transform Toolbar mode ('translate' | 'rotate' | 'scale')
  const [transformMode, setTransformMode] = useState('translate');

  // Selected object in 3D scene
  const [selectedId, setSelectedId] = useState(null);

  // Active item from bottom dock ready to tap on ground to place
  const [activePlacementType, setActivePlacementType] = useState(null);

  // Dragging state from Bottom Dock
  const [draggingItem, setDraggingItem] = useState(null);

  // Delete mode
  const [deleteMode, setDeleteMode] = useState(false);

  // Reset confirmation
  const [resetConfirm, setResetConfirm] = useState(false);

  // WebGL context loss recovery
  const [webglLost, setWebglLost] = useState(false);

  // First time tutorial
  const [showTutorial, setShowTutorial] = useState(() => !StorageEngine.isOnboarded());

  // Performance telemetry (tier: 'high' | 'low')
  const [performanceTier, setPerformanceTier] = useState(() => {
    const saved = localStorage.getItem('giver_perf_tier');
    if (saved) return saved;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    return (isMobile || lowCores) ? 'low' : 'high';
  });

  const togglePerformanceTier = useCallback(() => {
    setPerformanceTier(prev => {
      const next = prev === 'high' ? 'low' : 'high';
      try { localStorage.setItem('giver_perf_tier', next); } catch { /* ignore */ }
      SoundEngine.playClick();
      return next;
    });
  }, []);

  const isLowEndDevice = useMemo(() => performanceTier === 'low', [performanceTier]);

  const fpsDropCount = useRef(0);
  const handleFpsUpdate = useCallback((fps) => {
    if (fps < 24) {
      fpsDropCount.current += 1;
      if (fpsDropCount.current > 12 && performanceTier !== 'low') {
        console.warn('⚡ Low FPS detected for sustained period, switching to ECO GPU Mode.');
        setPerformanceTier('low');
        try { localStorage.setItem('giver_perf_tier', 'low'); } catch { /* ignore */ }
      }
    } else {
      fpsDropCount.current = Math.max(0, fpsDropCount.current - 1);
    }
  }, [performanceTier]);

  const handleDeleteObject = useCallback((id) => {
    setPlacedObjects((prev) => prev.filter((obj) => obj.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
    SoundEngine.playDelete();
  }, [setPlacedObjects]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    handleDeleteObject(selectedId);
  }, [selectedId, handleDeleteObject]);

  const handleDuplicateSelected = useCallback(() => {
    if (!selectedId) return;
    setPlacedObjects((prev) => {
      const target = prev.find((o) => o.id === selectedId);
      if (!target) return prev;
      const clone = {
        ...target,
        id: Date.now() + Math.random().toString(),
        position: [target.position[0] + 0.6, target.position[1], target.position[2] + 0.6]
      };
      setSelectedId(clone.id);
      return [...prev, clone];
    });
    SoundEngine.playPop();
  }, [selectedId, setPlacedObjects]);

  const handleUpdateSelectedStyle = useCallback((styleId) => {
    if (!selectedId) return;
    setPlacedObjects((prev) => prev.map((o) => {
      if (o.id === selectedId) {
        return { ...o, artStyle: styleId === 'auto' ? null : styleId };
      }
      return o;
    }));
    SoundEngine.playPop();
  }, [selectedId, setPlacedObjects]);

  // Global Keybindings (Ctrl+Z, Ctrl+Y, Escape, Delete, Space, T, R, S, D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Escape') {
        setSelectedId(null);
        setActivePlacementType(null);
        setDeleteMode(false);
        setResetConfirm(false);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          handleDeleteSelected();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        setAutoRotate((prev) => !prev);
      } else if (e.key.toLowerCase() === 't') {
        setTransformMode('translate');
      } else if (e.key.toLowerCase() === 'r') {
        setTransformMode('rotate');
      } else if (e.key.toLowerCase() === 's') {
        setTransformMode('scale');
      } else if (e.key.toLowerCase() === 'd') {
        if (selectedId) handleDuplicateSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedId, handleDeleteSelected, handleDuplicateSelected]);

  // Context Loss Handler
  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL Context Lost!');
      setWebglLost(true);
    };
    const handleContextRestored = () => {
      console.log('WebGL Context Restored!');
      setWebglLost(false);
    };

    window.addEventListener('webglcontextlost', handleContextLost, false);
    window.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  const sceneRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const isNight = timeMode === 'night';

  const inventory = Object.keys(ITEM_DEFS);

  const handleStart = () => setPaused(true);
  const handleEnd = () => setPaused(false);

  const handleDragStart = (e, type) => {
    setDraggingItem(type);
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', type);
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    // Cek jika ada file 3D (.glb / .gltf) yang di-drag langsung dari Windows Explorer / Desktop
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const lower = file.name.toLowerCase();
      if (lower.endsWith('.glb') || lower.endsWith('.gltf')) {
        ModelStorage.saveHeroModel(file).then(blobUrl => {
          setCentralObjectUrl(blobUrl);
          setCentralObjectName(file.name);
          setCentralObjectType('custom');
          setCentralObjectMaterial('original');
          SoundEngine.playPop();
        }).catch(err => {
          console.error("Gagal menyimpan model drag-drop:", err);
          const tempUrl = URL.createObjectURL(file);
          setCentralObjectUrl(tempUrl);
          setCentralObjectName(file.name);
          setCentralObjectType('custom');
        });
        return;
      }
    }

    const itemType = e.dataTransfer ? e.dataTransfer.getData('text/plain') : draggingItem;
    if (!itemType) return;

    if (!canvasContainerRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // Convert mouse to ground coordinate on radius 7.5
    const groundX = snapVal((xRatio - 0.5) * 15);
    const groundZ = snapVal((yRatio - 0.5) * 15);

    const dist = Math.sqrt(groundX * groundX + groundZ * groundZ);
    if (dist <= 8.5) {
      spawnObject(itemType, groundX, groundZ);
    }
    setDraggingItem(null);
  };

  const spawnObject = (type, x, z) => {
    const newObj = {
      id: Date.now() + Math.random().toString(),
      type,
      position: [snapVal(x), 0, snapVal(z)],
      rotationY: Math.random() * Math.PI * 2,
      scale: 1,
      senderName: 'Tamu',
      message: ''
    };

    setSelectedId(newObj.id);
    setActivePlacementType(null);
    setPendingGreeting(newObj);
    SoundEngine.playPop();
  };

  const handleGroundTap = (x, z) => {
    if (activePlacementType) {
      spawnObject(activePlacementType, snapVal(x), snapVal(z));
      return;
    }
    // Deselect if tapping empty ground
    setSelectedId(null);
  };

  const handleRotateSelected = () => {
    if (!selectedId) return;
    setPlacedObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          return {
            ...obj,
            rotationY: (obj.rotationY || 0) + Math.PI / 4
          };
        }
        return obj;
      })
    );
    SoundEngine.playClick();
  };

  const handleScaleSelected = () => {
    if (!selectedId) return;
    setPlacedObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          const currentScale = typeof obj.scale === 'number' ? obj.scale : 1;
          const newScale = currentScale >= 2.0 ? 0.5 : currentScale + 0.3;
          return {
            ...obj,
            scale: Number(newScale.toFixed(1))
          };
        }
        return obj;
      })
    );
    SoundEngine.playClick();
  };

  const handleResetAll = () => {
    setPlacedObjects([]);
    setSelectedId(null);
    setResetConfirm(false);
    StorageEngine.saveScene([]);
    SoundEngine.playDelete();
  };

  const handleExportJson = () => {
    StorageEngine.exportJson({ timeMode, placedObjects }, () => SoundEngine.playPop());
  };

  const handleImportJson = () => {
    StorageEngine.importJson({
      setPlacedObjects,
      setTimeMode,
      onSuccess: () => SoundEngine.playPop()
    });
  };

  return {
    timeMode, setTimeMode, isNight,
    autoRotate, setAutoRotate,
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
    biome, setBiome,
    artStyle, setArtStyle,
    worldModalOpen, setWorldModalOpen,
    snapGrid, setSnapGrid,
    snapSize, setSnapSize,
    historyPast, historyFuture,
    placedObjects, setPlacedObjects,
    handleUndo, handleRedo,
    draggingItem, setDraggingItem,
    transformMode, setTransformMode,
    activePlacementType, setActivePlacementType,
    pendingGreeting, setPendingGreeting,
    deleteMode, setDeleteMode,
    selectedId, setSelectedId,
    resetConfirm, setResetConfirm,
    webglLost, setWebglLost,
    showTutorial, setShowTutorial,
    performanceTier, setPerformanceTier, isLowEndDevice, togglePerformanceTier,
    handleFpsUpdate,
    sceneRef, canvasContainerRef,
    inventory,
    handleStart, handleEnd,
    handleDragStart, handleDragEnd, handleDragOver, handleDrop,
    handleGroundTap,
    handleDeleteObject, handleDeleteSelected,
    handleDuplicateSelected,
    handleUpdateSelectedStyle,
    handleRotateSelected, handleScaleSelected,
    handleResetAll,
    handleExportJson, handleImportJson
  };
}
