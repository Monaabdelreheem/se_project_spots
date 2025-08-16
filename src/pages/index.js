import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import logo from "../images/logo.svg";
// import avatarImage from "../images/spots-avatar-and-card-images/Avatar.png";
import plusIcon from "../images/plus-icon.svg";
import pencilIcon from "../images/pencil.svg";
import pencilAvatar from "../images/spots-avatar-and-card-images/pencil-avatar.png";
import Api from "../utils/Api.js";
// import { set } from "core-js/core/dict";
import { setButtonText, addIsLiked } from "../utils/helpers.js";


// GLOBAL VARIABLE 
let currentUserData = null; 
let selectedCard = null;
let selectedCardId = null; 
let currentUserId = null;

// DOM SELECTORS
// Headers
const logoEl = document.querySelector(".header__logo");
const plusIconEl = document.querySelector(".plus-icon");
const pencilEl = document.querySelector(".pencil-icon");
const pencilIconImg = document.querySelector(".profile__pencil-icon");

// Profile (header text & avatar)
const profileAvatarEl = document.querySelector(".profile__avatar");
const profileNameEl = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Generic modals
const modals = document.querySelectorAll(".modal");

// Edit profile modal 
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileSubmitBtn = editProfileModal.querySelector(
  ".modal__submit-btn"
);

// New post modal
const addProfileBtn = document.querySelector(".profile__add-btn");
const addProfileModal = document.querySelector("#new-post-modal");
const addProfileCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const addProfileForm = addProfileModal.querySelector(".modal__form");
const addProfileCardImageInput =
  addProfileModal.querySelector("#card-image-input");
const addProfileCaptionInput = addProfileModal.querySelector("#caption-input");
const cardSubmitBtn = addProfileModal.querySelector(".modal__submit-btn");

// Avatar modal 
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-profile-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInputError = avatarModal.querySelector("#profile-avatar-input-error");

// preview modal 
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_preview"
);
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Delete form elements 
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn--delete");
const deleteForm = deleteModal.querySelector(".modal__form--delete"); 
const deleteSubmitBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

// Static UI asset binding(icons/images)
logoEl.src = logo;
plusIconEl.src = plusIcon;
pencilEl.src = pencilIcon;
pencilIconImg.src = pencilAvatar;

// API init
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "38712cdd-b471-4c1d-89fb-357ab7c34c12",
    "Content-Type": "application/json",
  },
});

// Utilities: modal open/close & esc
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// CARD FACTORY 
// Build a card DOM element for server data
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  // Set the like&delete button state
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  // fill content
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  // make sure card element stores the id
  cardElement.dataset.id = data._id;
// set initial like state if API gives it
if (data.isLiked) {
  cardLikeBtnEl.classList.add("card__like-btn_active");
}
// like toggle
cardLikeBtnEl.addEventListener("click", () => {
  toggleLike(cardLikeBtnEl, data._id);
});
// delete open confirmation modal
  cardDeleteBtnEl.addEventListener("click", () => {
  handleDeleteCard(cardElement, data._id);   
});
// Image preview
  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Function to handle liking a card
function toggleLike(likeBtnEl, cardId) {
  const isActive = likeBtnEl.classList.contains("card__like-btn_active");
  likeBtnEl.disabled = true;

  api.handleLike(cardId, isActive)
    .then((updatedCard) => {
      const { isLiked } = addIsLiked(updatedCard, currentUserId); // ← use helper
      likeBtnEl.classList.toggle("card__like-btn_active", isLiked);
    })
    .catch((err) => console.error("Failed to toggle like:", err))
    .finally(() => {
      likeBtnEl.disabled = false;
    });
}


// DELETE CARD FLOW (OPEN, CONFIRM, CANCEL)
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
} 
// function delete submission handler
function handleDeleteSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission
  const submitBtn = evt.submitter; 
  setButtonText(submitBtn, true, "Delete", "Deleting…");
  
  if (selectedCard && selectedCardId) {
    api.deleteCard(selectedCardId)
      .then((res) => {
        console.log("This post has been deleted", res);
        
        // Remove the card element from the DOM
        selectedCard.remove();
        closeModal(deleteModal);
        selectedCard = null; // Reset the variable after deletion
        selectedCardId = null; // Reset the variable after deletion
      })
      .catch((err) => {
        console.error("Failed to delete card:", err);
        closeModal(deleteModal); // Close the modal even if deletion fails
      })
      .finally(() => {
        setButtonText(submitBtn, false, "Delete", "Deleting..."); // Reset button text
        deleteForm.reset(); // Reset the form
        resetValidation(deleteForm, settings); // Reset validation state
      });
  }
}
// Close + reset on Cancel
deleteCancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  selectedCard = null;
  selectedCardId = null;
  closeModal(deleteModal);
});

// Close + reset on the X button too (optional but consistent)
deleteModalCloseBtn.addEventListener("click", () => {
  selectedCard = null;
  selectedCardId = null;
  closeModal(deleteModal);
});


// PROFILE: EDIT PROFILE SUBMIT 
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatarEl.src = userData.avatar;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error("Failed to update profile:", err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
      editProfileForm.reset();
      resetValidation(editProfileForm, settings); // reset validation state
      
    });
  
}

// CARDS: ADD NEW CARD SUBMIT 
// Function to handle adding a new card
function handleAddProfileSubmit(evt) {
  evt.preventDefault();
  const name = addProfileCaptionInput.value;
  const link = addProfileCardImageInput.value;
  if (!name || !link) return; // guard; your validator should block anyway

  // simple loading state
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api.addNewCard({ name, link })
    .then((serverCard) => {
      // serverCard includes _id, name, link, owner, etc.
      const cardElement = getCardElement(serverCard);
      cardsList.prepend(cardElement);

      addProfileForm.reset();
      disableButton(cardSubmitBtn, settings); // keep submit disabled until valid again
      closeModal(addProfileModal);
    })
    .catch((err) => {
      console.error("Failed to add card:", err);
      // (optional) surface an inline error near the inputs
    })
    .finally(() => {
      setButtonText(submitBtn, false); // reset button text
      resetValidation(addProfileForm, settings); // reset validation state
      
    });
}

// AVATAR: UPDATE AVATAR SUBMIT
// Avatar submission handler 
function handleAvatarSubmit(evt) {
  evt.preventDefault(); 

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  
  api
    .editAvatarInfo({
      avatar: avatarInput.value,
    })
    .then((userData) => {
      profileAvatarEl.src = userData.avatar;
      avatarForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error("Failed to update avatar:", err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
      avatarInput.value = ""; // clear the input field
      // Optionally reset validation state if you have validation set up
      resetValidation(avatarForm, settings);
      // avatarInputError.textContent = ""; // clear any previous error
      // avatarInput.classList.remove("modal__input_type_error");
    });
}

// EVENT LISTENERS (ALL IN ONE PLACE)
// Open modals
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

addProfileBtn.addEventListener("click", function () {
  openModal(addProfileModal);
});

avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

// Form submits
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addProfileForm.addEventListener("submit", handleAddProfileSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
// Delete form submission handler
deleteForm.addEventListener("submit", handleDeleteSubmit);

// Close on overlay or X 
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-btn")
    ) {
      closeModal(modal);
    }
  });
});

// INITIAL LOAD
enableValidation(settings);

// LOAD USER & CARDS
api
  .getAppInfo()
  .then(([userData, cards]) => {
    currentUserData = userData; // now available anywhere
    // Save current user id 
    currentUserId = userData._id;

    // Profile header
    profileNameEl.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;
    // Render cards from the server 
    cardsList.innerHTML = ""; // clear, then render 
    cards.forEach((item) => {
      // const cardElement = getCardElement(item);
      const cardWithLikeInfo = addIsLiked(item, currentUserId); // helper in use
      const cardElement = getCardElement(cardWithLikeInfo);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error("Failed to load app info", err);
  });

















  






