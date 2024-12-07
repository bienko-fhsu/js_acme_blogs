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

function populateSelectMenu(jsonUserData) {
  if (!jsonUserData) return;
  const menu = document.querySelector("#selectMenu");
  if (!menu) return;
  const options = createSelectOptions(jsonUserData);
  for (let i = 0; i < options.length; i++) {
    menu.append(options[i]);
  }
  return menu;
}

async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUsersData = await response.json();
    return jsonUsersData;
  } catch (e) {
    console.log(e);
  }
}

async function getUserPosts(userId) {
  if (!userId) return;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + userId
    );
    const jsonPostsData = await response.json();
    return jsonPostsData;
  } catch (e) {
    console.log(e);
  }
}

async function getUser(userId) {
  if (!userId) return;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
    const jsonUserData = await response.json();
    return jsonUserData;
  } catch (e) {
    console.log(e);
  }
}

async function getPostComments(postId) {
  if (!postId) return;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?postId=" + postId
    );
    const jsonCommentData = await response.json();
    return jsonCommentData;
  } catch (e) {
    console.log(e);
  }
}

async function displayComments(postId) {
  if (!postId) return;
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments");
  section.classList.add("hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  return section;
}

async function createPosts(jsonPostsData) {
  if (!jsonPostsData) return;
  const fragment = document.createDocumentFragment();
  for (const post of jsonPostsData) {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", post.title);
    const p1 = createElemWithText("p", post.body);
    const p2 = createElemWithText("p", `Post ID: ${post.id}`);
    const author = await getUser(post.userId);
    const p3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    const p4 = createElemWithText("p", author.company.catchPhrase);
    const commButton = createElemWithText("button", "Show Comments");
    commButton.dataset.postId = post.id;
    article.append(h2, p1, p2, p3, p4, commButton);
    const section = await displayComments(post.id);
    article.append(section);
    fragment.append(article);
  }
  return fragment;
}

async function displayPosts(jsonPostsData) {
  const main = document.querySelector("main");
  let element = undefined;
  if (jsonPostsData) {
    element = await createPosts(post);
  } else {
    element = createElemWithText(
      "p",
      "Select an Employee to display their posts.",
      "default-text"
    );
  }
  main.append(element);
  return element;
}

function toggleComments(event, postId) {
  if (!event || !postId) return;
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  return [section, button];
}

async function refreshPosts(jsonPostsData) {
  if (!jsonPostsData) return;
  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(jsonPostsData);
  const addButtons = addButtonListeners();
  return [removeButtons, main, fragment, addButtons];
}

async function selectMenuChangeEventHandler(event) {
  //if (!event) return;
  //if (!event?.type) return;
  if (event?.type != "change") return;
  if (event.target) event.target.disabled = true;
  let userId = event.target?.value || 1;
  if (userId === "Employees") userId = 1;
  const jsonPostsData = await getUserPosts(userId);
  const refreshPostsArray = await refreshPosts(jsonPostsData);
  if (event?.target) event.target.disabled = false;
  return [userId, jsonPostsData, refreshPostsArray];
}

async function initPage() {
  const jsonUsersData = await getUsers();
  const select = populateSelectMenu(jsonUsersData);
  return [jsonUsersData, select];
}

function initApp() {
  initPage();
  const selectMenu = document.querySelector("#selectMenu");
  selectMenu.addEventListener("change", selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", (event) => {
  initApp();
});
