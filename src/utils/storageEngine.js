// ============ STORAGE ENGINE ============
const STORAGE_KEY = 'giver_sandbox_save_v3';
const ONBOARDED_KEY = 'giver_sandbox_onboarded_v3';

export const StorageEngine = {
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
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed && Array.isArray(parsed.placedObjects)) {
            setPlacedObjects(parsed.placedObjects);
          } else if (Array.isArray(parsed)) {
            setPlacedObjects(parsed);
          }
          if (parsed && parsed.timeMode && setTimeMode) {
            setTimeMode(parsed.timeMode);
          }
          if (onSuccess) onSuccess();
        } catch {
          if (onError) onError('File JSON tidak valid!');
          else alert('File JSON tidak valid!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};
