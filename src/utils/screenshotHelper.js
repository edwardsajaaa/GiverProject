// ============ SCREENSHOT HELPER ============
export const ScreenshotHelper = {
  /**
   * Captures HD screenshot from Three.js renderer/canvas
   * @param {Object} options
   * @param {WebGLRenderer} options.gl - Three.js renderer instance
   * @param {Scene} options.scene - Three.js scene instance
   * @param {Camera} options.camera - Three.js camera instance
   * @param {string} [options.filename='giver_3d_snapshot.png'] - Output filename
   * @param {Function} [options.onSuccess] - Callback when snapshot succeeds
   */
  takePhoto({ gl, scene, camera, filename = `giver_3d_snapshot_${Date.now()}.png`, onSuccess }) {
    try {
      let dataUrl = null;

      if (gl && scene && camera) {
        // Force render immediately before taking snapshot to ensure buffer is populated
        gl.render(scene, camera);
        dataUrl = gl.domElement.toDataURL('image/png');
      } else {
        // Fallback to finding canvas in DOM
        const canvas = document.querySelector('canvas');
        if (canvas) {
          dataUrl = canvas.toDataURL('image/png');
        }
      }

      if (!dataUrl || dataUrl === 'data:,') {
        console.warn("Screenshot capture empty or preserveDrawingBuffer not enabled on gl.");
        return false;
      }

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onSuccess) onSuccess();
      return true;
    } catch (err) {
      console.error("Failed to take 3D photo:", err);
      return false;
    }
  }
};
