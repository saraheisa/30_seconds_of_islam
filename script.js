const ayahText = document.querySelector(".ayah-text");
const ayahTranslation = document.querySelector(".ayah-translation");
const recitationButton = document.querySelector(".recitation-button");
const themeToggle = document.querySelector("#theme-switch");

const apiUrl = "https://api.alquran.cloud/v1/ayah/random";

let currentAyahNumber = 0;
const bitrate = 64;
const edition = "ar.alafasy";

async function getRandomAyah() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const ayah = data.data.text;
    const surah = data.data.surah.name;
    const ayahNumber = data.data.numberInSurah;
    const surahNumber = data.data.surah.number;
    currentAyahNumber = data.data.number;
    ayahText.innerHTML = `${ayah} (${surah} ${ayahNumber})`;

    const translationResponse = await fetch(
      `http://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/en.asad`
    );
    const translationData = await translationResponse.json();
    const translation = translationData.data.text;
    const surahTranslation = data.data.surah.englishName;

    ayahTranslation.textContent = `${translation} (${surahTranslation} ${ayahNumber})`;
  } catch (error) {
    console.log(error);
    ayahText.innerHTML = "Error: Please try again later.";
  }
}

getRandomAyah();

recitationButton.addEventListener("click", () => {
  // Make a request to the Quran API to get the recitation audio URL for the current ayah
  const audioURL = `https://cdn.islamic.network/quran/audio/${bitrate}/${edition}/${currentAyahNumber}.mp3`;
  const audio = new Audio(audioURL);
  audio.play();
});

// Handle theme toggle switch
themeToggle.addEventListener("change", () => {
  const container = document.querySelector("#container");
  const ayahContainer = document.querySelector(".ayah-container");

  if (themeToggle.checked) {
    container.classList.add("light-theme");
    ayahContainer.classList.add("light-theme");
  } else {
    container.classList.remove("light-theme");
    ayahContainer.classList.remove("light-theme");
  }
});
