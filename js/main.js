/**
 * Tatsiana Bienko
 * 12-09-2024
 * INF651 Final Project
 */

function createElemWithText(elementType = "p", textContent = "", className) {
  const newElement = document.createElement(elementType);
  newElement.textContent = textContent;
  if (className) newElement.classList.add(className);
  return newElement;
}

function createSelectOptions(jsonData) {
  if (jsonData == null) return undefined;
}

function toggleCommentSection() {}

function toggleCommentButton() {}

function deleteChildElements(parentElement) {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild;
    child = parentElement.lastElementChild;
  }
  return parentElement;
}

function addButtonListeners() {}

function removeButtonListeners() {}

function createComments(jsonCommentData) {
  const newFragmentElement = document.createDocumentFragment();
}

function populateSelectMenu(jsonUserData) {}

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const jsonUserData = await response.json();
  return jsonUserData;
}

async function getUserPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const jsonPostsData = await response.json();
  return jsonPostsData;
}

async function getUser(userId) {}

async function getPostComments(postId) {}

async function displayComments() {}

async function createPosts() {}

async function displayPosts() {}

function toggleComments(clickEvent, postId) {}

async function refreshPosts(jsonPostsData) {}

async function selectMenuChangeEventHandler() {}

async function initPage() {
  await getUsers();
}

function initApp() {
  initPage();
}

//addEventListener
