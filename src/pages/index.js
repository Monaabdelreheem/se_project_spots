import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import logo from "../images/logo.svg";
import avatarImage from "../images/spots-avatar-and-card-images/Avatar.png";
import plusIcon from "../images/plus-icon.svg";
import pencilIcon from "../images/pencil.svg";
import pencilAvatar from "../images/spots-avatar-and-card-images/pencil-avatar.png";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];
const logoEl = document.querySelector(".header__logo");
const plusIconEl = document.querySelector(".plus-icon");
const pencilEl = document.querySelector(".pencil-icon");
const profileAvatarEl = document.querySelector(".profile__avatar");
logoEl.src = logo;
plusIconEl.src = plusIcon;
pencilEl.src = pencilIcon;
const pencilIconImg = document.querySelector(".profile__pencil-icon");
pencilIconImg.src = pencilAvatar;
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
const addProfileBtn = document.querySelector(".profile__add-btn");
const addProfileModal = document.querySelector("#new-post-modal");
const addProfileCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const cardSubmitBtn = addProfileModal.querySelector(".modal__submit-btn");
const addProfileForm = addProfileModal.querySelector(".modal__form");
const addProfileCardImageInput =
  addProfileModal.querySelector("#card-image-input");
const addProfileCaptionInput = addProfileModal.querySelector("#caption-input");
const profileNameEl = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_preview"
);
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const modals = document.querySelectorAll(".modal");

logoEl.src = logo;
plusIconEl.src = plusIcon;
pencilEl.src = pencilIcon;

// Avatar form element 
const avatarModal = document.querySelector("#avatar-profile-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInputError = avatarModal.querySelector("#profile-avatar-input-error");


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "38712cdd-b471-4c1d-89fb-357ab7c34c12",
    "Content-Type": "application/json",
  },
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardDeleteBtnEl.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
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
    });
  // profileNameEl.textContent = editProfileNameInput.value;
  // profileDescription.textContent = editProfileDescriptionInput.value;
}

function handleAddProfileSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: addProfileCaptionInput.value,
    link: addProfileCardImageInput.value,
  };

  evt.target.reset();

  disableButton(cardSubmitBtn, settings);

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addProfileModal);
}

// Avatar submission handler 
function handleAvatarSubmit(evt) {
  evt.preventDefault(); 
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
    });
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

addProfileBtn.addEventListener("click", function () {
  openModal(addProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addProfileForm.addEventListener("submit", handleAddProfileSubmit);

avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault(); 

});

avatarForm.addEventListener("submit", handleAvatarSubmit);

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

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
enableValidation(settings);
