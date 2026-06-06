const CARDS_DATA = {
  totalTasks: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 256 256"><path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path></svg>`,
    iconBg: "#c7c7c7",
    title: 'Total Tasks',
    description: 'Total tasks you have.',
  },
  toDo: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" viewBox="0 0 256 256"><path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z"></path></svg>`,
    iconBg: "#cfd8fa",
    title: 'To Do',
    description: 'Tasks you have to do.',
  },
  inProgress: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" viewBox="0 0 256 256"><path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path></svg>`,
    iconBg: "#ffe6cc",
    title: 'In Progress',
    description: 'Tasks you have in progress.',
  },
  completed: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" viewBox="0 0 256 256"><path d="M243.28,68.24l-24-23.56a16,16,0,0,0-22.59,0L104,136.23l-36.69-35.6a16,16,0,0,0-22.58.05l-24,24a16,16,0,0,0,0,22.61l71.62,72a16,16,0,0,0,22.63,0L243.33,90.91A16,16,0,0,0,243.28,68.24ZM103.62,208,32,136l24-24a.6.6,0,0,1,.08.08l42.35,41.09a8,8,0,0,0,11.19,0L208.06,56,232,79.6Z"></path></svg>`,
    iconBg: "#ccffcf",
    title: 'Completed',
    description: 'Tasks you have done.',
  },
  rejected: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>`,
    iconBg: "#ffd6d6",
    title: 'Rejected',
    description: 'Tasks you have rejected.',
  }
}


const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
const layout = document.getElementById("app-layout");
const menuItems = document.querySelectorAll(".menu-item");
const content = document.getElementById("app-content");

content.style.backgroundImage = `url(https://i.pinimg.com/originals/44/c7/c1/44c7c1f3fbd68b2151c37af5f08198f1.gif)`;
content.style.backgroundRepeat = "no-repeat";
content.style.backgroundAttachment = "fixed";
content.style.backgroundSize = "100% 100%";
content.style.backgroundSize = "100% 100%";

const cover = document.createElement("div");
cover.id = "cover";
content.innerHTML = "";
content.append(cover);

const header = document.createElement("h1");
header.id = "greeting";
header.innerText = "Welcome!"

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    window.location.href = menuItem.dataset.href;
  });
})

sidebarCloseBtn.addEventListener("click", () => {
  if (layout.classList.contains("sidebar-hidden")) {
    layout.classList.remove("sidebar-hidden");
  } else {
    layout.classList.add("sidebar-hidden");
  }
})





let statistics = {};

fetchStatistics();

function fetchStatistics() {
  fetch(`${window.APP_CONFIG.API_URL}/api/tasks/statistics`).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((data) => {
    setStatistics(data);
  });
}

function setStatistics(data) {
  statistics = data;
  // setTimeout(() => rerenderStatistics(), 5000)
  rerenderStatistics();
}

function rerenderStatistics() {
  const cards = document.createElement("div");
  cards.id = "cards";
  cards.append(header);

  const cardsSection = document.createElement("div");
  cardsSection.id = "cards-section";

  const entries = Object.entries(statistics)
  entries.filter(k => k[0] !== "totalTasks")
    .forEach(([key, value], index) => {
      const cardData = CARDS_DATA[key];
      cardsSection.append(createStatCard(`${cardData.title}: ${value}`, cardData.description, cardData.icon, cardData.iconBg))
    })
  const total = createStatCard(`${CARDS_DATA["totalTasks"].title}: ${statistics.totalTasks}`, CARDS_DATA["totalTasks"].description, CARDS_DATA["totalTasks"].icon, CARDS_DATA["totalTasks"].iconBg);
  total.style.gridColumn = "1 / span 2";
  cardsSection.append(total);

  // cover.innerHTML = cardsSection.outerHTML;
  cards.append(cardsSection);
  cover.append(cards);
}

function createStatCard(title, description, icon, color, delay=0) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.animationDelay = `${delay}ms`;
  card.innerHTML = `
  <div style="background-color: ${color}" class="card-icon">
    ${icon}
  </div>
  <div class="card-content">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
  `;
  return card;
}

