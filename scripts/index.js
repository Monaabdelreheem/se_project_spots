const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfiledescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const addProfileBtn = document.querySelector(".profile__add-btn");
const addProfileModal = document.querySelector("#new-post-modal");
const addProfileCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const addProfileForm = addProfileModal.querySelector(".modal__form");
const addProfileCardImageInput =
  addProfileModal.querySelector("#card-image-input");
const addProfileCaptionInput = addProfileModal.querySelector("#caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfiledescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddProfileSubmit(evt) {
  evt.preventDefault();
  console.log("Image URL:", addProfileCardImageInput.value);
  console.log("Caption:", addProfileCaptionInput.value);
  closeModal(addProfileModal);
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfiledescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

addProfileBtn.addEventListener("click", function () {
  openModal(addProfileModal);
});

addProfileCloseBtn.addEventListener("click", function () {
  closeModal(addProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addProfileForm.addEventListener("submit", handleAddProfileSubmit);

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});
