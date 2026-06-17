const encounterData = [
  {
    id: "enc-otter",
    name: "River Otter Playtime",
    timeSlot: "morning",
    timeString: "10:00 AM",
    location: "North Creek Wetlands Zone",
    image: "https://picsum.photos/id/437/300/200",
  },
  {
    id: "enc-deer",
    name: "Woodland Deer Feeding",
    timeSlot: "morning",
    timeString: "11:30 AM",
    location: "Whispering Pines Grove Area",
    image: "https://picsum.photos/id/1020/300/200",
  },
  {
    id: "enc-owl",
    name: "Screech Owl Presentation",
    timeSlot: "afternoon",
    timeString: "2:00 PM",
    location: "Community Education Center Pavillion",
    image: "https://picsum.photos/id/1024/300/200",
  },
  {
    id: "enc-turtle",
    name: "Pond Turtle Identification Walk",
    timeSlot: "afternoon",
    timeString: "3:30 PM",
    location: "South Sanctuary Ponds Track",
    image: "https://picsum.photos/id/593/300/200",
  },
];

function displayEncounters(filterChoice) {
  const gridContainer = document.getElementById("encounters-grid");
  if (!gridContainer) return;

  let filteredArray;
  if (filterChoice === "all") {
    filteredArray = encounterData;
  } else {
    filteredArray = encounterData.filter(
      (item) => item.timeSlot === filterChoice,
    );
  }

  let htmlOutputContent = "";

  filteredArray.forEach((item) => {
    htmlOutputContent += `
            <div class="card" style="background:#FFF; padding:15px; border:1px solid #DDD; border-radius:6px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                <img src="${item.image}" alt="${item.name}" loading="lazy" style="width:100%; height:auto; border-radius:4px;">
                <h3 style="color:var(--primary-green); margin:10px 0 5px 0;">${item.name}</h3>
                <p style="margin:4px 0;"><strong>Time:</strong> ${item.timeString}</p>
                <p style="margin:4px 0; font-size:0.9rem; color:#666;"><strong>Where:</strong> ${item.location}</p>
                <button onclick="addEncounterToWatchlist('${item.id}')" style="margin-top:10px; width:100%; padding:8px; background:var(--secondary-earth); color:#2B2D2F; border:none; font-weight:bold; border-radius:4px; cursor:pointer;">Save to Watchlist</button>
            </div>
        `;
  });

  gridContainer.innerHTML = htmlOutputContent;
}

function addEncounterToWatchlist(id) {
  let storedWatchlist = localStorage.getItem("funZooWatchlist");
  let watchlistArray = storedWatchlist ? JSON.parse(storedWatchlist) : [];

  const targetEncounter = encounterData.find((item) => item.id === id);

  if (targetEncounter) {
    const alreadyExists = watchlistArray.some(
      (savedItem) => savedItem.id === id,
    );

    if (!alreadyExists) {
      watchlistArray.push(targetEncounter);
      localStorage.setItem("funZooWatchlist", JSON.stringify(watchlistArray));
      renderWatchlistUI();
    } else {
      alert(
        `The event "${targetEncounter.name}" is already saved in your Watchlist memory!`,
      );
    }
  }
}

function renderWatchlistUI() {
  const watchlistDisplayElement = document.getElementById("favorites-output");
  if (!watchlistDisplayElement) return;

  let storedWatchlist = localStorage.getItem("funZooWatchlist");
  let watchlistArray = storedWatchlist ? JSON.parse(storedWatchlist) : [];

  if (watchlistArray.length === 0) {
    watchlistDisplayElement.innerHTML = `No saved watchlist entries yet.`;
  } else {
    let listHtmlMarkup = `<ul style="margin:10px 0; padding-left:20px;">`;
    watchlistArray.forEach((savedItem) => {
      listHtmlMarkup += `<li><strong>${savedItem.name}</strong> - Scheduled at ${savedItem.timeString} (${savedItem.location})</li>`;
    });
    listHtmlMarkup += `</ul><button onclick="clearWatchlistCache()" style="padding:5px 10px; background:#D9534F; color:white; border:none; border-radius:4px; cursor:pointer; font-size:0.85rem;">Clear Entire Watchlist</button>`;

    watchlistDisplayElement.innerHTML = listHtmlMarkup;
  }
}

function clearWatchlistCache() {
  localStorage.removeItem("funZooWatchlist");
  renderWatchlistUI();
}

window.addEventListener("DOMContentLoaded", () => {
  displayEncounters("all");
  renderWatchlistUI();

  const btnAll = document.getElementById("btn-all");
  const btnMorning = document.getElementById("btn-morning");
  const btnAfternoon = document.getElementById("btn-afternoon");

  if (btnAll) {
    btnAll.addEventListener("click", () => {
      displayEncounters("all");
    });
  }
  if (btnMorning) {
    btnMorning.addEventListener("click", () => {
      displayEncounters("morning");
    });
  }
  if (btnAfternoon) {
    btnAfternoon.addEventListener("click", () => {
      displayEncounters("afternoon");
    });
  }
});
