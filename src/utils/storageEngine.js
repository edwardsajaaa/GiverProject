import { SecurityEngine } from './securityEngine';

const STORAGE_KEY = 'giver_sandbox_save_v3';
const ONBOARDED_KEY = 'giver_sandbox_onboarded_v3';
const CENTRAL_OBJECT_KEY = 'giver_central_object_v1';
const WORLD_CONFIG_KEY = 'giver_world_config_v1';

export const StorageEngine = {
  loadWorldConfig() {
    try {
      const saved = localStorage.getItem(WORLD_CONFIG_KEY);
      return saved ? JSON.parse(saved) : { biome: 'paris_romantique', artStyle: 'lowpoly' };
    } catch {
      return { biome: 'paris_romantique', artStyle: 'lowpoly' };
    }
  },

  saveWorldConfig(config) {
    try {
      localStorage.setItem(WORLD_CONFIG_KEY, JSON.stringify(config));
    } catch {
      /* ignore */
    }
  },
  loadCentralObject() {
    try {
      const saved = localStorage.getItem(CENTRAL_OBJECT_KEY);
      return saved ? JSON.parse(saved) : {
        type: 'cube',
        color: '#4f8cff',
        material: 'holographic',
        scale: 1.0,
        customUrl: null,
        customName: null
      };
    } catch {
      return { type: 'cube', color: '#4f8cff', material: 'holographic', scale: 1.0, customUrl: null, customName: null };
    }
  },

  saveCentralObject(config) {
    try {
      // Don't save large blob URLs directly to localStorage if they exceed quota, or only save lightweight base64/config
      const toSave = {
        type: config.type,
        color: config.color,
        material: config.material,
        scale: config.scale,
        customName: config.customName || null,
        // Only save customDataUrl if small (< 2MB)
        customUrl: (config.customUrl && config.customUrl.length < 2000000 && config.customUrl.startsWith('data:')) ? config.customUrl : null
      };
      localStorage.setItem(CENTRAL_OBJECT_KEY, JSON.stringify(toSave));
    } catch {
      /* ignore storage quota exceeded */
    }
  },

  loadScene() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveScene(placedObjects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(placedObjects));
    } catch {
      /* storage full or unavailable */
    }
  },

  isOnboarded() {
    try {
      return localStorage.getItem(ONBOARDED_KEY) === 'true';
    } catch {
      return false;
    }
  },

  setOnboarded(value = true) {
    try {
      localStorage.setItem(ONBOARDED_KEY, value ? 'true' : 'false');
    } catch {
      /* ignore */
    }
  },

  exportJson({ version = "3.1", timeMode, placedObjects }, onSuccess) {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ version, timeMode, placedObjects }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `giver_sandbox_scene_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Export failed:", err);
    }
  },

  importJson({ setPlacedObjects, setTimeMode, onSuccess, onError }) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // File size limit: 5MB max
      if (file.size > 5 * 1024 * 1024) {
        const msg = 'Ukuran file JSON terlalu besar (maksimal 5MB)!';
        if (onError) onError(msg);
        else alert(msg);
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          // Deep clean prototype pollution and unsafe keys
          const sanitized = SecurityEngine.sanitizeJsonScene(parsed);
          if (!sanitized) {
            throw new Error('Data tidak valid');
          }

          if (Array.isArray(sanitized.placedObjects)) {
            setPlacedObjects(sanitized.placedObjects);
          } else if (Array.isArray(sanitized)) {
            setPlacedObjects(sanitized);
          }

          if (sanitized.timeMode && setTimeMode) {
            const safeTime = ['day', 'night'].includes(sanitized.timeMode) ? sanitized.timeMode : 'day';
            setTimeMode(safeTime);
          }

          if (onSuccess) onSuccess();
        } catch {
          if (onError) onError('File JSON tidak valid atau rusak!');
          else alert('File JSON tidak valid atau rusak!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};
