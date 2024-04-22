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

const itemWidth = 253;
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

// to open and close the dialog
const openDialogButton = document.getElementById("openDialogButton");
const closeDialogButton = document.getElementById("closeDialogButton");
const playlistDialog = document.getElementById("playlistDialog");

// Function to open the dialog
function openDialog() {
  playlistDialog.showModal();
}

// Function to show the success popup with a message
function showSuccessPopup(message) {
  const successPopup = document.getElementById("successPopup");
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;
  successPopup.style.display = "block";
  setTimeout(() => {
    successPopup.style.display = "none";
  }, 3000); // Hide after 3 seconds
}

// Add event listener to the button to open the dialog
openDialogButton.addEventListener("click", openDialog);

// Add event listener to the close button inside the dialog
closeDialogButton.addEventListener("click", () => {
  playlistDialog.close();
});
