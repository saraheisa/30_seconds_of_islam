const ayahText = document.querySelector(".ayah-text");
const ayahTranslation = document.querySelector(".ayah-translation");
const recitationButton = document.querySelector(".recitation-button");
const themeToggle = document.querySelector("#theme-switch");

const THEME_OPTIONS = {
  Dark: "dark",
  LIGHT: "light",
};
const THEME_KEY = "30_seconds_of_islam_theme_selection";

let currentAyahNumber = 0;
const bitrate = 64;
const audioEdition = "ar.alafasy";
const edition = "quran-uthmani";
const translationEdition = "en.asad";

async function getRandomAyah() {
  try {
    const surahNumber = Math.floor(Math.random() * 114) + 1;
    const ayahCountResponse = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}?offset=1&limit=1`
    );
    const ayahCountData = await ayahCountResponse.json();
    const ayahCount = ayahCountData.data.numberOfAyahs;
    const ayahNumber = Math.floor(Math.random() * ayahCount) + 1;

    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/editions/${edition},${translationEdition}`
    );
    const data = await response.json();
    const ayah = data.data[0].text;
    const surah = data.data[0].surah.name;
    const translation = data.data[1].text;
    const surahTranslation = data.data[1].surah.englishName;

    currentAyahNumber = data.data[0].number;
    ayahText.innerHTML = `${ayah} (${surah} ${ayahNumber})`;
    ayahTranslation.textContent = `${translation} (${surahTranslation} ${ayahNumber})`;
  } catch (error) {
    console.log(error);
    ayahText.innerHTML = "Error: Please try again later.";
  }
}

function storeThemeSelection(theme) {
  if (theme !== THEME_OPTIONS.Dark && theme !== THEME_OPTIONS.LIGHT) return;
  window.localStorage.setItem(THEME_KEY, theme);
}

function getThemeSelection() {
  return window.localStorage.getItem(THEME_KEY) || THEME_OPTIONS.Dark;
}

function applyTheme(theme) {
  const container = document.querySelector("#container");
  const ayahContainer = document.querySelector(".ayah-container");

  if (theme === THEME_OPTIONS.LIGHT) {
    container.classList.add("light-theme");
    ayahContainer.classList.add("light-theme");
  } else {
    container.classList.remove("light-theme");
    ayahContainer.classList.remove("light-theme");
  }
}

function setInitialTheme(theme) {
  if (theme !== THEME_OPTIONS.Dark && theme !== THEME_OPTIONS.LIGHT) return;
  themeToggle.checked = theme === THEME_OPTIONS.LIGHT;
  applyTheme(theme);
}

getRandomAyah();

const selectedTheme = getThemeSelection();
setInitialTheme(selectedTheme);

recitationButton.addEventListener("click", () => {
  const audioURL = `https://cdn.islamic.network/quran/audio/${bitrate}/${audioEdition}/${currentAyahNumber}.mp3`;
  const audio = new Audio(audioURL);
  audio.play();
});

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked
    ? THEME_OPTIONS.LIGHT
    : THEME_OPTIONS.Dark;
  applyTheme(newTheme);
  storeThemeSelection(newTheme);
});
