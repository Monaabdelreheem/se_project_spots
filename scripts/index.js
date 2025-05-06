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

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfiledescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

const addProfileBtn = document.querySelector(".profile__add-btn");
const addProfileModal = document.querySelector("#new-post-modal");
const addProfileCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const addProfileForm = addProfileModal.querySelector(".modal__form");
const addProfileCardImageInput =
  addProfileModal.querySelector("#card-image-input");
const addProfileCaptionInput = addProfileModal.querySelector("#caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

addProfileBtn.addEventListener("click", function () {
  addProfileModal.classList.add("modal_is-opened");
});

addProfileCloseBtn.addEventListener("click", function () {
  addProfileModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfiledescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

function handleAddProfileSubmit(evt) {
  evt.preventDefault();
  console.log("Image URL:", addProfileCardImageInput.value);
  console.log("Caption:", addProfileCaptionInput.value);
  addProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addProfileForm.addEventListener("submit", handleAddProfileSubmit);
