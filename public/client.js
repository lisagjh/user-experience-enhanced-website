// form new playlist
const dropArea = document.querySelector("#dropArea");
const inputFile = document.querySelector("#myFile");
const imageView = document.querySelector("#image-view");
const button = document.querySelector("button");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  button.disabled = false;
}

// playlist carousel

const itemWidth = 220;
const nextPlaylist = document.querySelector(".playlist-next-btn");
const prevPlaylist = document.querySelector(".playlist-prev-btn");
const listPlaylist = document.querySelector(".playlist-container");

prevPlaylist.addEventListener("click", function () {
  console.log("click");
  listPlaylist.scrollLeft -= itemWidth;
});

nextPlaylist.addEventListener("click", function () {
  listPlaylist.scrollLeft += itemWidth;
});

// fav list carousel buttons

const favWidth = 250;
const nextFav = document.querySelector(".fav-next-btn");
const prevFav = document.querySelector(".fav-prev-btn");
const listFav = document.querySelector(".fav-playlists");

prevFav.addEventListener("click", function () {
  console.log("click");
  listFav.scrollLeft -= favWidth;
});

nextFav.addEventListener("click", function () {
  listFav.scrollLeft += favWidth;
});
