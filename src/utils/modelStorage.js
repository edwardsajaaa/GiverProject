/**
 * modelStorage.js
 * Penyimpanan model 3D kustom (.glb / .gltf) menggunakan browser IndexedDB.
 * Mencegah file hilang saat halaman di-refresh tanpa batasan kuota kecil localStorage (5MB).
 */

const DB_NAME = 'GiverModelStorageDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_models';
const HERO_MODEL_KEY = 'central_hero_model';

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB tidak didukung pada browser ini.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const ModelStorage = {
  /**
   * Menyimpan file 3D (Blob / File) ke IndexedDB
   */
  async saveHeroModel(file) {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const buffer = await file.arrayBuffer();
      const modelRecord = {
        name: file.name,
        size: file.size,
        type: file.type || 'model/gltf-binary',
        buffer: buffer,
        updatedAt: Date.now()
      };

      store.put(modelRecord, HERO_MODEL_KEY);

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => {
          // Buat blob URL dari buffer yang baru disimpan
          const blob = new Blob([buffer], { type: modelRecord.type });
          const blobUrl = URL.createObjectURL(blob);
          resolve({ blobUrl, fileName: file.name });
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error('Gagal menyimpan model 3D ke IndexedDB:', err);
      throw err;
    }
  },

  /**
   * Memuat model 3D yang tersimpan di IndexedDB saat aplikasi pertama kali dibuka / di-refresh
   */
  async loadHeroModel() {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(HERO_MODEL_KEY);

      return new Promise((resolve) => {
        request.onsuccess = () => {
          const record = request.result;
          if (record && record.buffer) {
            const blob = new Blob([record.buffer], { type: record.type || 'model/gltf-binary' });
            const blobUrl = URL.createObjectURL(blob);
            resolve({ blobUrl, fileName: record.name });
          } else {
            resolve(null);
          }
        };
        request.onerror = () => resolve(null);
      });
    } catch (err) {
      console.warn('Tidak ada model 3D tersimpan di IndexedDB:', err);
      return null;
    }
  },

  /**
   * Menghapus model 3D yang tersimpan
   */
  async deleteHeroModel() {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(HERO_MODEL_KEY);
      return new Promise((resolve) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  }
};
