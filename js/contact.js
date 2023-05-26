import {hamburger, navMenu } from "./constant.js";

const form = document.querySelector("#form-container");
const firstNameInput = document.querySelector('input[name="your-name"]');
const firstNameError = document.querySelector("#first-name-error");
const emailInput = document.querySelector('input[name="your-email"]');
const emailError = document.querySelector("#email-error");
const subjectInput = document.querySelector('input[name="your-subject"]');
const subjectError = document.querySelector("#subject-error");
const messageInput = document.querySelector('textarea[name="your-message"]');
const messageError = document.querySelector("#message-error");
const button = document.querySelector(".submitForm");
const formSuccess = document.querySelector(".formSuccess");

// HAMBURGER

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.querySelector(".dark-underlay").classList.toggle("show-underlay");
  });

// FORM VALIDATION
  
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
        // POST FORM
        const formId = "120";
        const formURL = `https://examproject1.onibodesign.no/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
        const formData = new FormData();
        formData.append('your-name', firstNameInput.value.trim());
        formData.append('your-email', emailInput.value.trim());
        formData.append('your-subject', subjectInput.value.trim());
        formData.append('your-message', messageInput.value.trim());

        fetch(formURL, {
            method: 'POST',
            body: formData
        })
        .then(function (response) {
            if (response.ok) {
                form.style.display = "none";
                formSuccess.style.display = "contents";
                document.querySelector("h1").style.display = "none";
                const heroElement = document.querySelector(".hero-secondary");
                heroElement.style.backgroundColor = "var(--background)";
                heroElement.style.minHeight = "100px";
                document.querySelector(".contact-wrapper").style.marginBottom = "20%";
                document.querySelector("footer").style.position = "absolute";

                window.scrollTo({ top: 1, behavior: 'smooth' });
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
}

form.addEventListener("submit", formValidation);

// CHECK LENGTH

function checkingLength(value, len) {
    return value.length >= len;
}

// CHECK IF IT´S AN EMAIL

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}
  