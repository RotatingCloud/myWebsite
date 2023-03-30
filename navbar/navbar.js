document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath.endsWith("index.html") || currentPath.endsWith("/");
    const isInHtmlFolder = currentPath.includes("/html/");
  
    let navbarPath;
  
    if (isIndexPage) {
      navbarPath = "navbar/navbar.html";
    } else if (isInHtmlFolder) {
      navbarPath = "../navbar/navbar.html";
    } else {
      navbarPath = "navbar/navbar.html";
    }
  
    fetch(navbarPath)
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("afterbegin", data);
      });
  });