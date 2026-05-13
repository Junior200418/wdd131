const currentYear = document.querySelector("#currentyear");
const today = new Date();
currentYear.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
