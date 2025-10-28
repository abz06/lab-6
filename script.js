// Utility functions for cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, val] = c.split("=");
    if (key === name) return val;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// DOM elements
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");
const commentInput = document.getElementById("commentInput");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const commentList = document.getElementById("commentList");

// Initialize
let likes = 100;
let dislikes = 20;
let comments = [];

// Load from cookies
window.onload = function () {
  const choice = getCookie("vote");
  const savedLikes = getCookie("likes");
  const savedDislikes = getCookie("dislikes");
  const savedComments = getCookie("comments");

  if (savedLikes) likes = parseInt(savedLikes);
  if (savedDislikes) dislikes = parseInt(savedDislikes);
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;

  if (savedComments) {
    comments = JSON.parse(savedComments);
    displayComments();
  }

  if (choice) {
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
    submitBtn.disabled = true;
  }
};

// Like
likeBtn.addEventListener("click", () => {
  if (!getCookie("vote")) {
    likes++;
    likeCount.textContent = likes;
    setCookie("vote", "like", 7);
    setCookie("likes", likes, 7);
    setCookie("dislikes", dislikes, 7);
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  }
});

// Dislike
dislikeBtn.addEventListener("click", () => {
  if (!getCookie("vote")) {
    dislikes++;
    dislikeCount.textContent = dislikes;
    setCookie("vote", "dislike", 7);
    setCookie("likes", likes, 7);
    setCookie("dislikes", dislikes, 7);
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  }
});

// Submit comment
submitBtn.addEventListener("click", () => {
  const comment = commentInput.value.trim();
  if (comment && !getCookie("commented")) {
    comments.push(comment);
    setCookie("comments", JSON.stringify(comments), 7);
    setCookie("commented", "true", 7);
    displayComments();
    commentInput.value = "";
    submitBtn.disabled = true;
  } else {
    alert("You already commented or input is empty.");
  }
});

// Clear (reset all)
clearBtn.addEventListener("click", () => {
  if (confirm("Reset likes, dislikes, and comments?")) {
    likes = 100;
    dislikes = 20;
    comments = [];
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;
    commentList.innerHTML = "";
    deleteCookie("vote");
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("comments");
    deleteCookie("commented");
    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
    submitBtn.disabled = false;
  }
});

// Display comments
function displayComments() {
  commentList.innerHTML = "";
  comments.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    commentList.appendChild(li);
  });
}
