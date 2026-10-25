/**
 * audioStorage.js
 * Sistem penyimpanan file audio kustom (.mp3 / .wav / .ogg / .m4a) menggunakan browser IndexedDB.
 * Memungkinkan lagu yang di-upload dari laptop/smartphone pengguna tetap tersimpan permanen
 * di browser tanpa batas ukuran kuota sempit localStorage (5MB).
 */

const DB_NAME = 'GiverAudioStorageDB';
const DB_VERSION = 1;
const STORE_NAME = 'user_audio_tracks';

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

export const AudioStorage = {
  /**
   * Menyimpan file audio lokal (File / Blob) ke IndexedDB berdasarkan trackId
   * @param {number|string} trackId - ID piringan vinyl (1-6)
   * @param {File} file - Objek file audio dari input upload
   * @returns {Promise<{ blobUrl: string, fileName: string }>}
   */
  async saveTrackAudio(trackId, file) {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const buffer = await file.arrayBuffer();
      const record = {
        trackId: Number(trackId),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || 'audio/mpeg',
        buffer,
        updatedAt: Date.now()
      };

      store.put(record, String(trackId));

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => {
          const blob = new Blob([buffer], { type: record.mimeType });
          const blobUrl = URL.createObjectURL(blob);
          resolve({ blobUrl, fileName: file.name });
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error('AudioStorage.saveTrackAudio error:', err);
      throw err;
    }
  },

  /**
   * Mengambil file audio tersimpan untuk track tertentu dan membuat Blob URL aktif
   * @param {number|string} trackId
   * @returns {Promise<{ blobUrl: string, fileName: string } | null>}
   */
  async getTrackAudio(trackId) {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      const request = store.get(String(trackId));

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const record = request.result;
          if (!record || !record.buffer) {
            resolve(null);
            return;
          }
          const blob = new Blob([record.buffer], { type: record.mimeType });
          const blobUrl = URL.createObjectURL(blob);
          resolve({ blobUrl, fileName: record.fileName });
        };
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.warn(`AudioStorage.getTrackAudio failed for track ${trackId}:`, err);
      return null;
    }
  },

  /**
   * Mengambil semua track audio lokal yang tersimpan di IndexedDB
   * @returns {Promise<Record<number, { blobUrl: string, fileName: string }>>}
   */
  async getAllTrackAudios() {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      const keysRequest = store.getAllKeys();

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => {
          const records = request.result || [];
          const keys = keysRequest.result || [];
          const map = {};
          keys.forEach((key, idx) => {
            const rec = records[idx];
            if (rec && rec.buffer) {
              const blob = new Blob([rec.buffer], { type: rec.mimeType });
              map[Number(key)] = {
                blobUrl: URL.createObjectURL(blob),
                fileName: rec.fileName
              };
            }
          });
          resolve(map);
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('AudioStorage.getAllTrackAudios failed:', err);
      return {};
    }
  },

  /**
   * Menghapus file audio lokal dari IndexedDB
   * @param {number|string} trackId
   */
  async deleteTrackAudio(trackId) {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(String(trackId));
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error(`AudioStorage.deleteTrackAudio failed for track ${trackId}:`, err);
      return false;
    }
  }
};
