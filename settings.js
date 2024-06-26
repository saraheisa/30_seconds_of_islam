const settingsButton = document.querySelector(".settings-button");
const modal = document.getElementById("settings-modal");
const closeButton = document.querySelector(".close-button");
const reciterSelect = document.getElementById("reciter-select");

const RECITER_KEY = "30_seconds_of_islam_reciter_selection";

function storeReciterSelection(reciter) {
  window.localStorage.setItem(RECITER_KEY, reciter);
}

function getReciterSelection() {
  return window.localStorage.getItem(RECITER_KEY);
}

let audioEdition = getReciterSelection() || "ar.alafasy"; // default reciter

async function populateReciterSelect() {
  try {
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

    // Set the initial value from localStorage
    const storedReciter = audioEdition;
    reciterSelect.value = storedReciter;
  } catch (error) {
    console.log(error);
  }
}

settingsButton.addEventListener("click", () => {
  populateReciterSelect();
  modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  modal.classList.add("fade-out");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.classList.add("slide-out");

  modalContent.addEventListener("animationend", () => {
    modal.style.display = "none";
    modal.classList.remove("fade-out");
    modalContent.classList.remove("slide-out");
  });
});

reciterSelect.addEventListener("change", () => {
  const newReciter = reciterSelect.value;
  audioEdition = newReciter;
  storeReciterSelection(newReciter);
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.classList.add("fade-out");
    const modalContent = modal.querySelector(".modal-content");
    modalContent.classList.add("slide-out");

    modalContent.addEventListener("animationend", () => {
      modal.style.display = "none";
      modal.classList.remove("fade-out");
      modalContent.classList.remove("slide-out");
    });
  }
});
