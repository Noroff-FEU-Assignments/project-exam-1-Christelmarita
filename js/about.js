import {hamburger, navMenu } from "./constant.js";

hamburger.addEventListener("click", () => {
  console.log("Hamburger clicked!");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

function fadeInOnScroll() {
    var breakDiv = document.querySelector('.break');
    var breakDivOffset = breakDiv.offsetTop;
    var windowHeight = window.innerHeight;

    function handleScroll() {
        var scrollTop = window.scrollY;

        if (scrollTop + (windowHeight * 0.8) > breakDivOffset) {
            breakDiv.classList.add('visible');
        } else {
            breakDiv.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
}

fadeInOnScroll();