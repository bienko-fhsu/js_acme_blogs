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
  if (!jsonData) return;
  const optionElemArr = [];
  jsonData.forEach((user) => {
    const newOptionElem = document.createElement("option");
    newOptionElem.value = user.id;
    newOptionElem.textContent = user.name;
    optionElemArr.push(newOptionElem);
  });
  return optionElemArr;
}

function toggleCommentSection(postId) {
  const mySectionElem = document.querySelector(
    'section[data-post-id="' + postId + '"]'
  );
  if (mySectionElem) {
    mySectionElem.classList.toggle("hide");
  }
  return mySectionElem;
}

function toggleCommentButton(postId) {
  const myButton = document.querySelector(
    'button[data-post-id="' + postId + '"]'
  );
  if (myButton) {
    if (myButton.textContent == "Show Comments") {
      myButton.textContent = "Hide Comments";
    } else if (myButton.textContent == "Hide Comments") {
      myButton.textContent = "Show Comments";
    }
  }
  return myButton;
}

function deleteChildElements(parentElement) {
  if (!(parentElement instanceof HTMLElement)) return;
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  return parentElement;
}

function addButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  if (!buttons) return;
  for (let i = 0; i < buttons.length; i++) {
    if (!("postId" in buttons[i].dataset)) continue;
    const postId = buttons[i].dataset.postId;
    buttons[i].addEventListener("click", function (event) {
      toggleComments(event, postId);
    });
  }
  return buttons;
}

function removeButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  if (!buttons) return;
  for (let i = 0; i < buttons.length; i++) {
    if (!("postId" in buttons[i].dataset)) continue;
    const postId = buttons[i].dataset.postId;
    buttons[i].removeEventListener("click", function (event) {
      toggleComments(event, postId);
    });
  }
  return buttons;
}

function createComments(jsonCommentData) {
  if (!jsonCommentData) return;
  const newFragmentElement = document.createDocumentFragment();
  jsonCommentData.forEach((comment) => {
    const newArticle = document.createElement("article");
    const newH3Elem = createElemWithText("h3", comment.name);
    const newPElem1 = createElemWithText("p", comment.body);
    const newPElem2 = createElemWithText("p", `From: ${comment.email}`);
    newArticle.append(newH3Elem, newPElem1, newPElem2);
    newFragmentElement.append(newArticle);
  });
  return newFragmentElement;
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

document.addEventListener("DOMContentLoaded", (event) => {
  initApp();
});
