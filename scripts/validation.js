const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "button__disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const showInputError = (formEl, InputEl, errorMessage, config) => {
    const errorMessageEl = formEl.querySelector(`#${InputEl.id}-error`);
    errorMessageEl.textContent = errorMessage;
    InputEl.classList.add(config.inputErrorClass);
    errorMessageEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, InputEl, config) => {
    const errorMessageEl = formEl.querySelector(`#${InputEl.id}-error`);
    errorMessageEl.textContent = "";
    InputEl.classList.remove(config.inputErrorClass);
    errorMessageEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, InputEl, config) => {
    if (!InputEl.validity.valid) {
    showInputError(formEl, InputEl, InputEl.validationMessage, config);    
    } else {
        hideInputError(formEl, InputEl, config);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl, config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonEl, config);
    
    } else {
        buttonEl.disabled = false;
        buttonEl.classList.remove(config.inactiveButtonClass);
    }

};

const disableButton = (buttonEl, config) => {
    buttonEl.disabled = true; 
    buttonEl.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    inputList.forEach((input) => {
    hideInputError(formEl, input, config)
});

};

const setEventListeners = (formEl, config) => {
const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
const buttonEl = formEl.querySelector(config.submitButtonSelector);

toggleButtonState(inputList, buttonEl, config);

inputList.forEach((InputEl) => {
InputEl.addEventListener("input", function () {
checkInputValidity(formEl, InputEl, config);
toggleButtonState(inputList, buttonEl, config);

});
});
};

const enableValidation = (config) => {
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formEl) => {
    setEventListeners(formEl, config);
});
};

enableValidation(settings);
