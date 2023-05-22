import { url, stopLoader, displayErrorMessage, hamburger, navMenu} from "./constant.js";

const postContainer = document.querySelector(".specific-result");
const modalContainer = document.getElementById("modalContainer");
const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.getElementById("modalImage");

// HAMBURGER

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

// FETCH AND CREATE HTML  

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(({ id, title, content }) => {

    const titleContainer = document.querySelector(".hero-text");
    const titleElement = document.createElement("h1");
    titleElement.innerText = title.rendered;
    titleContainer.append(titleElement);

    changeSiteTitle(title.rendered);

    const textContainer = document.createElement("div");
    textContainer.classList.add("post-text-container");
    const blogTextElement = document.createElement("p");
    blogTextElement.innerText = new DOMParser().parseFromString(content.rendered, "text/html").body.textContent; 
    textContainer.append(blogTextElement);

    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    const { imgUrls, imgAlts } = getPictures(content.rendered);
    const image1 = createImage(imgUrls[0], imgAlts[0], id, () => {
      const heroImageUrl = imgUrls[0];
      changeHeroImage(heroImageUrl);
    });
    const image2 = createImage(imgUrls[1], imgAlts[1], id);
    galleryContainer.append(image1, image2);

    postContainer.append(textContainer, galleryContainer);

    stopLoader();

    document.querySelector(".specific-result").append(postContainer);

  })
  .catch((error) => {
    console.error("Error:", error);
    displayErrorMessage(resultContainer);
    stopLoader();
  });

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

// FUNCTION TO CREATE THE IMAGES

function createImage(src, alt, postId, callback) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.dataset.postId = postId;
    image.addEventListener("load", callback);
  
    // FUNCTION TO OPEN THE MODAL
    image.addEventListener("click", () => {
      modalImage.src = src;
      modalContainer.style.display = "flex";
    });
  
    return image;
  }

// FUNCTION TO CLOSE MODAL
  
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      modalContainer.style.display = "none";
    }
});

// FUNCTION TO CHANGE HERO IMAGE

function changeHeroImage(imageUrl) {
  const heroSection = document.querySelector(".hero");
  heroSection.style.backgroundImage = `url(${imageUrl})`;
}

// FUNCTION TO CHANGE SITE TITLE

function changeSiteTitle(title) {
    document.title = `SCANDI GAZETTE /` + ` ` + title;
  }