import { KEYS, getFromLocalStorage, setToLocalStorage } from "./shared.js";

const settingsButton = document.querySelector(".settings-button");
const modal = document.getElementById("settings-modal");
const modalContent = modal.querySelector(".modal-content");
const closeButton = document.querySelector(".close-button");
const reciterSelect = document.getElementById("reciter-select");
const khatmaModeCheckbox = document.getElementById("khatma-mode-checkbox");

let audioEdition = getFromLocalStorage(KEYS.RECITER) || "ar.alafasy"; // default reciter

async function populateReciterSelect() {
  try {
    // Check if reciterSelect is already populated
    if (reciterSelect.options.length > 0) {
      return;
    }

    const response = await fetch(
      "https://api.alquran.cloud/v1/edition/format/audio"
    );
    const data = await response.json();
    const reciters = data.data;
    reciters.forEach((reciter) => {
      const option = document.createElement("option");
      option.value = reciter.identifier;
      option.textContent = `${reciter.englishName} (${reciter.language})`;
      reciterSelect.appendChild(option);
    });

    const storedReciter = audioEdition;
    reciterSelect.value = storedReciter;
  } catch (error) {
    console.log(error);
  }
}

function closeModal() {
  modal.classList.add("fade-out");
  modalContent.classList.add("slide-out");
}

settingsButton.addEventListener("click", () => {
  populateReciterSelect();
  khatmaModeCheckbox.checked = getFromLocalStorage(KEYS.KHATMA_MODE) === "true";
  modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  closeModal();
});

reciterSelect.addEventListener("change", () => {
  const newReciter = reciterSelect.value;
  audioEdition = newReciter;
  setToLocalStorage(KEYS.RECITER, newReciter);
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

modalContent.addEventListener("animationend", () => {
  // only fire when it's being closed
  if (!modal.classList.contains("fade-out")) return;
  modal.style.display = "none";
  modal.classList.remove("fade-out");
  modalContent.classList.remove("slide-out");
});

/************** Khatma mode implementation ****************/

khatmaModeCheckbox.addEventListener("change", () => {
  setToLocalStorage(KEYS.KHATMA_MODE, !!khatmaModeCheckbox.checked);
});
