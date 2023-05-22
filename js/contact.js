import {hamburger, navMenu } from "./constant.js";

const form = document.querySelector("#form-container");
const firstNameInput = document.querySelector("#first-name");
const firstNameError = document.querySelector("#first-name-error");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const subjectInput = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const messageInput = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const button = document.querySelector(".submitForm");
const formSuccess = document.querySelector(".formSuccess");

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });


function formValidation(event) {
    event.preventDefault();
    let formError = false;

    if (validateEmail(emailInput.value.trim())) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        formError = true;
    }

    if (checkingLength(firstNameInput.value.trim(), 5)) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display = "block";
        formError = true;
    }

    if (checkingLength(subjectInput.value.trim(), 15)) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
        formError = true;
    }

    if (checkingLength(messageInput.value.trim(), 25)) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
        formError = true;
    }

    if (formError) {
        formSuccess.style.display = "none";
    } else {
        form.style.display = "none";
        formSuccess.style.display = "contents";
        document.querySelector("h1").style.display = "none";
        document.querySelector(".contact-wrapper p").style.display = "none";
    }
}

form.addEventListener("submit", formValidation);

function checkingLength(value, len) {
    return value.length >= len;
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}
