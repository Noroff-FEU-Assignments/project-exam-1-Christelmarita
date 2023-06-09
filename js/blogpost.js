import { url, stopLoader, displayErrorMessage, hamburger, navMenu } from "./constant.js";

const postContainer = document.querySelector(".specific-result");
const modalContainer = document.getElementById("modalContainer");
const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.getElementById("modalImage");

// HAMBURGER

hamburger.addEventListener("click", () => {
  console.log("Hamburger clicked!");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.querySelector(".dark-underlay").classList.toggle("show-underlay");
});

// FETCH AND CREATE HTML

async function fetchPosts() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There is something wrong with the response");
  }
  return response.json();
}

function createImage(src, alt, postId, imageLoad) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.dataset.postId = postId;
  image.addEventListener("load", imageLoad);

  // FUNCTION TO OPEN THE MODAL
  image.addEventListener("click", () => {
    modalImage.src = src;
    modalImage.alt = alt;
    modalContainer.style.display = "flex";
  });

  return image;
}

// MAIN FUNCTION
async function main() {
  try {
    const { id, date, title, excerpt, content } = await fetchPosts();

    const heroContainer = document.querySelector(".hero-text");

    const titleElement = document.createElement("h1");
    titleElement.innerText = title.rendered;
    changeSiteTitle(title.rendered);

    heroContainer.append(titleElement);

    const dateElement = document.createElement("h2");
    dateElement.classList.add("specific-h2");
    const postDate = new Date(date);
    const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
    const europeanDate = postDate.toLocaleDateString("en-GB", dateOptions);
    dateElement.innerText = europeanDate;

    const excerptElement = document.createElement("h3");
    excerptElement.innerText = new DOMParser().parseFromString(excerpt.rendered, "text/html").body.textContent;

    const textContainer = document.createElement("div");
    textContainer.classList.add("post-text-container");
    const blogTextElement = document.createElement("p");
    blogTextElement.innerHTML = new DOMParser().parseFromString(content.rendered, "text/html").body.innerHTML;
    blogTextElement.querySelectorAll("br").forEach((br) => br.remove());
    blogTextElement.querySelectorAll("img").forEach((img) => img.remove());
    textContainer.append(dateElement, excerptElement, blogTextElement);

    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    const { imgUrls, imgAlts } = getPictures(content.rendered);
    const image1 = createImage(imgUrls[0], imgAlts[0], id, () => {
    });
    const image2 = createImage(imgUrls[1], imgAlts[1], id);
    galleryContainer.append(image1, image2);

    postContainer.append(textContainer, galleryContainer);

    stopLoader();

  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(postContainer);
    stopLoader();
  }
}

// FUNCTION TO GET THE IMAGES FROM API

function getPictures(post) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(post, "text/html");
  const postImages = doc.getElementsByTagName("img");
  const imgUrls = [];
  const imgAlts = [];

  for (let i = 0; i < postImages.length; i++) {
    const { src, alt } = postImages[i];
    imgUrls.push(src);
    imgAlts.push(alt);
  }

  return { imgUrls, imgAlts };
}

// FUNCTION TO CLOSE MODAL

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalContainer.style.display = "none";
  }
});

// FUNCTION TO CHANGE SITE TITLE

function changeSiteTitle(title) {
  document.title = `SCANDI GAZETTE / ${title}`;
}

main();
