const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Load notes from localStorage
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  attachDeleteListeners();
  attachKeyupListeners();
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  let img = document.createElement("img");
  img.src = "images/delete.png";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  updateStorage();
  attachDeleteListeners();
  attachKeyupListeners();
});

function attachDeleteListeners() {
  notesContainer.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", function () {
      img.parentElement.remove();
      updateStorage();
    });
  });
}

function attachKeyupListeners() {
  notesContainer.querySelectorAll(".input-box").forEach((nt) => {
    nt.onkeyup = function () {
      updateStorage();
    };
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
    updateStorage();
  }
});
