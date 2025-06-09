const showInputError = (formEl, InputEl, errorMessage) => {
    const errorMessageEl = formEl.querySelector(`#${InputEl.id}-error`);
    errorMessageEl.textContent = errorMessage;
    InputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, InputEl) => {
    const errorMessageEl = formEl.querySelector(`#${InputEl.id}-error`);
    errorMessageEl.textContent = "";
    InputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, InputEl) => {
    if (!InputEl.validity.valid) {
    showInputError(formEl, InputEl, InputEl.validationMessage);    
    } else {
        hideInputError(formEl, InputEl);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl) => {
    if (hasInvalidInput(inputList)) {
        buttonEl.disabled = true;
        buttonEl.classList.add("button_disabled");

    } else {
        buttonEl.disabled = false;
        buttonEl.classList.remove("button_disabled");
    }

};

const setEventListeners = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
const buttonEl = formEl.querySelector(".modal__submit-btn");

inputList.forEach((InputEl) => {
InputEl.addEventListener("input", function () {
checkInputValidity(formEl, InputEl);
toggleButtonState(inputList, buttonEl);

});
});
};

const enableValidation = () => {
const formList = Array.from(document.querySelectorAll(".modal__form"));
formList.forEach((formEl) => {
    setEventListeners(formEl);
});
};

enableValidation();
