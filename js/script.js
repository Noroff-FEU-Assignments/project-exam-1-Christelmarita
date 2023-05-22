import { fullPostURL, stopLoader, displayErrorMessage, hamburger, navMenu } from "./constant.js";

const resultContainer = document.querySelector(".result");

hamburger.addEventListener("click", () => {
  console.log("Hamburger clicked!");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// FETCH AND CREATE HTML  

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

  const dateElement = document.createElement("p");
  const postDate = new Date(post.date);
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  const europeanDate = postDate.toLocaleDateString("en-GB", dateOptions);
  dateElement.innerText = europeanDate;

  const titleElement = document.createElement("h3");
  titleElement.innerText = title.rendered;
  titleElement.addEventListener("click", () => {
    window.location.href = `../blogpost.html?id=${id}`;
  })
  textContainer.append(dateElement, titleElement);

  const readMore = document.createElement("a");
  readMore.classList.add("read-link");
  readMore.innerText = "Read More";
  readMore.href = `../blogpost.html?id=${id}`;
  postContainer.append(readMore);

  return postContainer;
}

// MAIN FUNCTION

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
  
        // Show or hide the left scroll button based on the current slide index
        prevButton.style.display = slideIndex > 0 ? "block" : "none";
        };
  
        const prevSlide = () => {
        if (slideIndex > 0) {
          slideIndex--;
          showSlide(slideIndex);
        }
  
        // Show or hide the left scroll button based on the current slide index
        prevButton.style.display = slideIndex > 0 ? "block" : "none";
        };
  
        const nextButton = document.querySelector(".scroll-button.right");
        const prevButton = document.querySelector(".scroll-button.left");
        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);

        // Hide the left scroll button initially
        prevButton.style.display = "none";

        stopLoader();

        } catch (error) {
        console.error("Error:", error);
        displayErrorMessage(resultContainer);
        stopLoader();
    }
}

main();

