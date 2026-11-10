const PIN_KEY = 'giver_capsule_pin';
const PIN_ENABLED_KEY = 'giver_capsule_lock_enabled';
const PASSCODE_HASH_KEY = 'giver_capsule_passcode_hash';

export const LoveLockManager = {
  isLockEnabled() {
    try {
      const enabled = localStorage.getItem(PIN_ENABLED_KEY);
      const pin = localStorage.getItem(PIN_KEY) || localStorage.getItem(PASSCODE_HASH_KEY);
      return enabled === 'true' && Boolean(pin);
    } catch {
      return false;
    }
  },

  setPasscode(pin) {
    if (!pin || pin.length < 4) return false;
    localStorage.setItem(PIN_KEY, pin);
    localStorage.setItem(PIN_ENABLED_KEY, 'true');
    return true;
  },

  removePasscode() {
    localStorage.removeItem(PIN_KEY);
    localStorage.removeItem(PASSCODE_HASH_KEY);
    localStorage.setItem(PIN_ENABLED_KEY, 'false');
  },

  verifyPasscode(inputPin) {
    const savedPin = localStorage.getItem(PIN_KEY);
    const savedHash = localStorage.getItem(PASSCODE_HASH_KEY);

    if (!savedPin && !savedHash) return { success: true };
    if (savedPin && inputPin === savedPin) return { success: true };
    if (savedHash && inputPin === savedHash) return { success: true };

    return { success: false };
  }
};
