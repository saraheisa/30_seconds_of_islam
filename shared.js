// Shared Constants
export const THEME_OPTIONS = {
  Dark: "dark",
  LIGHT: "light",
};

export const KEYS = {
  THEME: "30_seconds_of_islam_theme_selection",
  KHATMA_LAST_AYAH: "30_seconds_of_islam_khatma_last_ayah",
  KHATMA_MODE: "30_seconds_of_islam_khatma_mode",
  NO_OF_COMPLETED_KHATMA: "30_seconds_of_islam_no_of_completed_khatma",
  RECITER: "30_seconds_of_islam_reciter_selection",
};

// Utility Functions for Local Storage
export function getFromLocalStorage(key, defaultValue = null) {
  const value = window.localStorage.getItem(key);
  return value !== null ? value : defaultValue;
}

export function setToLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

export function incrementLocalStorage(key, defaultValue = 0) {
  const currentValue = parseInt(getFromLocalStorage(key, defaultValue), 10);
  setToLocalStorage(key, currentValue + 1);
}
