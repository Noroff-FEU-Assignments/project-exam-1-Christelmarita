import {hamburger, navMenu } from "./constant.js";

hamburger.addEventListener("click", () => {
  console.log("Hamburger clicked!");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});