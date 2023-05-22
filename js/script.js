import { fullPostURL, stopLoader, displayErrorMessage, hamburger, navMenu } from "./constant.js";

const resultContainer = document.querySelector(".result");

hamburger.addEventListener("click", () => {
  console.log("Hamburger clicked!");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

async function getPosts() {
  const response = await fetch(fullPostURL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

function createPostHTML(post) {
  const { id, title, _embedded: { "wp:featuredmedia": [{ source_url }] } } = post;

  const postContainer = document.createElement("div");
  postContainer.classList.add("card");
  postContainer.id = id;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("card-img");
  postContainer.append(imgContainer);

  const image = document.createElement("img");
  image.src = source_url;
  image.alt = title.rendered;
  image.dataset.postId = id;
  image.addEventListener("click", () => {
    window.location.href = `../blogpost.html?id=${id}`;
  });
  imgContainer.append(image);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  postContainer.append(textContainer);

  const titleElement = document.createElement("h3");
  titleElement.innerText = title.rendered;
  textContainer.append(titleElement);

  const readMore = document.createElement("a");
  readMore.classList.add("read-link");
  readMore.innerText = "Read More";
  readMore.href = `../blogpost.html?id=${id}`;
  postContainer.append(readMore);

  return postContainer;
}

async function main() {
  try {
    const posts = await getPosts();
    const fragment = document.createDocumentFragment();

    posts.forEach((post) => {
      const postHTML = createPostHTML(post);
      fragment.appendChild(postHTML);
    });

    resultContainer.innerHTML = '';
    resultContainer.appendChild(fragment);

    const slides = Array.from(resultContainer.children);
    const slidesPerView = 3;
    const totalSlidesPerView = Math.ceil(slides.length / slidesPerView);
    let slideIndex = 0;
    

    const showSlide = (index) => {
      const startIndex = index * slidesPerView;
      const endIndex = startIndex + slidesPerView;

      slides.forEach((slide, slideIndex) => {
        slide.style.display = slideIndex >= startIndex && slideIndex < endIndex ? "block" : "none";
      });
    };

    showSlide(slideIndex);

    const nextSlide = () => {
      if (slideIndex < totalSlidesPerView - 1) {
        slideIndex++;
        showSlide(slideIndex);
      }
    };

    const prevSlide = () => {
      if (slideIndex > 0) {
        slideIndex--;
        showSlide(slideIndex);
      }
    };

    const nextButton = document.querySelector(".scroll-button.right");
    const prevButton = document.querySelector(".scroll-button.left");
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    stopLoader();
    
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(resultContainer);
    stopLoader();
  }
}
  

main();

