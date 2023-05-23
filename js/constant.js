const apiBase = "https://examproject1.onibodesign.no";
const postsBase = "/wp-json/wp/v2/posts?per_page=50&_embed=1";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const fullPostURL = apiBase + postsBase;
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://examproject1.onibodesign.no/wp-json/wp/v2/posts/${id}`;


function stopLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}

function displayErrorMessage(container) {
    container.textContent = "There seems to be a problem with our server. Please try again later.";
    container.classList.add("error-message");
}

export {
    apiBase,
    fullPostURL,
    queryString,
    params,
    id,
    url,
    stopLoader,
    displayErrorMessage,
    hamburger,
    navMenu,
};