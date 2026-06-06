const year = document.querySelector("#currentyear");
year.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✖";
  } else {
    menuButton.textContent = "☰";
  }
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/62/10/93/240_F_262109313_7MaObT7y7yrMrArQDomrZYZ3oR3otD6r.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://t4.ftcdn.net/jpg/19/86/92/67/240_F_1986926784_vODBuu1PHFKnaQ6bv2VO6ezmMQp9uGeX.jpg",
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/14/74/11/240_F_214741146_jApjeGkU3GSPSpLhzyMsupP7frpAh1XH.jpg",
  },
];

const gallery = document.querySelector(".gallery");
const mainHeading = document.querySelector("main h2");

function displayTemples(filteredTemples) {
  gallery.innerHTML = "";

  filteredTemples.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
    `;

    gallery.appendChild(card);
  });
}

displayTemples(temples);

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = e.target.textContent;
    mainHeading.textContent = filter;

    let filteredList = [];

    switch (filter) {
      case "Old":
        filteredList = temples.filter(
          (t) => parseInt(t.dedicated.split(",")[0]) < 1900,
        );
        break;
      case "New":
        filteredList = temples.filter(
          (t) => parseInt(t.dedicated.split(",")[0]) > 2000,
        );
        break;
      case "Large":
        filteredList = temples.filter((t) => t.area > 90000);
        break;
      case "Small":
        filteredList = temples.filter((t) => t.area < 10000);
        break;
      case "Home":
      default:
        filteredList = temples;
        break;
    }

    displayTemples(filteredList);

    if (navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      menuButton.textContent = "☰";
    }
  });
});
