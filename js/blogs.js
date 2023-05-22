import { fullPostURL, stopLoader, displayErrorMessage, hamburger, navMenu } from "./constant.js";

const postContainer = document.querySelector("#postContainer");
const viewMoreContainer = document.querySelector("#viewMoreContainer");

let posts = [];
const postsPerPage = 10;
let currentPage = 1;
let isAllDisplayed = false;

// HAMBURGER MENU 

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

  const image = document.createElement("img");
  image.src = source_url;
  image.alt = title.rendered;
  image.dataset.postId = id;
  image.addEventListener("click", () => {
    window.location.href = `../blogpost.html?id=${id}`;
  });

  imgContainer.append(image);
  postContainer.append(imgContainer);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  const titleElement = document.createElement("h3");
  titleElement.innerText = title.rendered;
  textContainer.append(titleElement);
  postContainer.append(textContainer);

  const readMore = document.createElement("a");
  readMore.classList.add("read-link");
  readMore.innerText = "Read More";
  readMore.href = `../blogpost.html?id=${id}`;
  postContainer.append(readMore);

  return postContainer;
}

function displayPosts(postsToDisplay) {
  const fragment = document.createDocumentFragment();

  postsToDisplay.forEach((post) => {
      const postHTML = createPostHTML(post);
      fragment.appendChild(postHTML);
  });

  postContainer.appendChild(fragment);
}

function displayViewMoreButton() {
  const viewMoreButton = document.createElement("button");
  viewMoreButton.classList.add("view-more-button");

  if (isAllDisplayed) {
      viewMoreButton.innerText = "View Less";
  } else {
      viewMoreButton.innerText = "View More";
  }

  viewMoreButton.addEventListener("click", () => {
      if (isAllDisplayed) {
          currentPage = 1;
          isAllDisplayed = false;
          viewMoreButton.innerText = "View More";
          postContainer.innerHTML = '';
          const postsToDisplay = posts.slice(0, postsPerPage);
          displayPosts(postsToDisplay);
      } else {
          currentPage++;
          const startIndex = (currentPage - 1) * postsPerPage;
          const endIndex = currentPage * postsPerPage;
          const postsToDisplay = posts.slice(startIndex, endIndex);
          displayPosts(postsToDisplay);

          if (endIndex >= posts.length) {
              isAllDisplayed = true;
              viewMoreButton.innerText = "View Less";
          }
      }
  });

  viewMoreContainer.innerHTML = '';
  viewMoreContainer.appendChild(viewMoreButton);
}

// MAIN FUNCTION 

async function main() {
  try {
      posts = await getPosts();
      const initialPostsToDisplay = posts.slice(0, postsPerPage);
      displayPosts(initialPostsToDisplay);

      if (posts.length > postsPerPage) {
          displayViewMoreButton();
      }

      stopLoader();
  } catch (error) {
    console.error("Error:", error);
    stopLoader();
    displayErrorMessage(postContainer);
  }
}

main();