const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
const layout = document.getElementById("app-layout");
const menuItems = document.querySelectorAll(".menu-item");
const content = document.getElementById("app-content");

// window.addEventListener("resize", (e) => {
//   console.log(todo.clientHeight, todoTasks.clientHeight)
//   if (todo.clientHeight > content.clientHeight) {
//     alert("Update all tasks - fetch")
//   }
// })

// content.style.backgroundImage = `url(https://thumb.ac-illust.com/92/92c00f28aa29ce4d92fd65e59a48b24d_t.jpeg)`;
// content.style.backgroundRepeat = "no-repeat";
// content.style.backgroundAttachment = "fixed";
// content.style.backgroundSize = "100% 100%";
// content.style.backgroundSize = "100% 100%";

// const cover = document.createElement("div");
// cover.id = "cover";
// content.innerHTML = "";
// content.append(cover);

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


const SIZE = 200


let draggingItem = undefined;

const statusMap = {
  "TO_DO": "todo",
  "IN_PROGRESS": "inProgress",
  "DONE": "done",
  "REJECTED": "rejected",
}

const tasks = {
  todo: {
    color: "dimgray",
    status: "TO_DO",
    page: 0,
    tasks: [],
    total: 0,
    loadingElement: undefined,
    container: document.querySelector("#todo .tasks")
  },
  inProgress: {
    color: "orange",
    status: "IN_PROGRESS",
    page: 0,
    tasks: [],
    total: 0,
    loadingElement: undefined,
    container: document.querySelector("#inProgress .tasks")
  },
  done: {
    color: "green",
    status: "DONE",
    page: 0,
    tasks: [],
    total: 0,
    loadingElement: undefined,
    container: document.querySelector("#done .tasks")
  },
  rejected: {
    color: "red",
    status: "REJECTED",
    page: 0,
    tasks: [],
    total: 0,
    loadingElement: undefined,
    container: document.querySelector("#rejected .tasks")
  }
}

tasks.todo.container.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = tasks.todo.container;

  // console.log()
  // console.log(scrollTop, clientHeight, scrollHeight);
  // console.log(Math.ceil(scrollTop + clientHeight));

  // Check if user is at the bottom
  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    console.log("Reached the bottom of the todo div! Fetching new task!");
    if (tasks.todo.total > tasks.todo.tasks.length) {
      fetchTasks("todo", tasks.todo.page+1)
    }
    // const task = document.createElement("div")
    // task.className = "task";
    // task.innerText = "New task " + c++;
    // todoTasks.appendChild(task);
  }
})

tasks.todo.container.addEventListener("dragstart", (e) => {
  const data = {
    key: "todo",
    group: tasks.todo,
    task: tasks.todo.tasks.find(t => t.id === e.target.id)
  }
  // e.dataTransfer.setData('application/json', JSON.stringify(data));
  draggingItem = data
  e.dataTransfer.effectAllowed = 'move';
})
tasks.todo.container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  e.dataTransfer.dropEffect = 'move';
})
tasks.todo.container.addEventListener("drop", (e) => {
  console.log("Stopped at todo");
  // const data = JSON.parse(e.dataTransfer.getData('application/json'));
  const data = draggingItem
  draggingItem = undefined
  const draggedElement = document.getElementById(data.task.id);

  if (draggedElement.parentNode.contains(e.target) || draggedElement.parentNode === e.target) {
    console.log("Dragging to the same parent. Skipping...")
  } else {
    // let dragTarget = e.target.parentNode;
    // if (dragTarget.classList.contains("tasks")) {
    //   dragTarget = dragTarget.parentNode;
    // }

    // targetTask = tasks[dragTarget.id];
    moveTask(data.task, data.group, tasks.todo);
    // if (tasks.todo.total < SIZE) {
    //   fetchTasks("todo", tasks.todo.page)
    // }
    // if (tasks[data.key].tasks.length < SIZE) {
    //   fetchTasks(data.key, tasks[data.key].page)
    // }
  }

  //
  // // Append the element to the drop zone
  // event.target.appendChild(draggedElement);
})


tasks.inProgress.container.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = tasks.inProgress.container;

  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    console.log("Reached the bottom of the in progress div! Fetching new task!");
    if (tasks.inProgress.total > tasks.inProgress.tasks.length) {
      fetchTasks("inProgress", tasks.inProgress.page+1)
    }
  }
})

tasks.inProgress.container.addEventListener("dragstart", (e) => {
  const data = {
    key: "inProgress",
    group: tasks.inProgress,
    task: tasks.inProgress.tasks.find(t => t.id === e.target.id)
  }
  // e.dataTransfer.setData('application/json', JSON.stringify(data));
  draggingItem = data
  e.dataTransfer.effectAllowed = 'move';
})
tasks.inProgress.container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  e.dataTransfer.dropEffect = 'move';
})
tasks.inProgress.container.addEventListener("drop", (e) => {
  console.log("Stopped at inProgress");
  // const data = JSON.parse(e.dataTransfer.getData('application/json'));
  const data = draggingItem
  draggingItem = undefined
  const draggedElement = document.getElementById(data.task.id);

  if (draggedElement.parentNode.contains(e.target) || draggedElement.parentNode === e.target) {
    console.log("Dragging to the same parent. Skipping...")
  } else {
    // let dragTarget = e.target.parentNode;
    // if (dragTarget.classList.contains("tasks")) {
    //   dragTarget = dragTarget.parentNode;
    // }

    // targetTask = tasks[dragTarget.id];
    moveTask(data.task, data.group, tasks.inProgress);
    // if (tasks.inProgress.total < SIZE) {
    //   fetchTasks("inProgress", tasks.inProgress.page)
    // }
    // if (tasks[data.key].tasks.length < SIZE) {
    //   fetchTasks(data.key, tasks[data.key].page)
    // }
  }

  //
  // // Append the element to the drop zone
  // event.target.appendChild(draggedElement);
})

tasks.done.container.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = tasks.done.container;

  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    console.log("Reached the bottom of the done div! Fetching new task!");
    if (tasks.done.total > tasks.done.tasks.length) {
      fetchTasks("done", tasks.done.page+1)
    }
  }
})

tasks.done.container.addEventListener("dragstart", (e) => {
  const data = {
    key: "done",
    group: tasks.done,
    task: tasks.done.tasks.find(t => t.id === e.target.id)
  }
  // e.dataTransfer.setData('application/json', JSON.stringify(data));
  draggingItem = data
  e.dataTransfer.effectAllowed = 'move';
})
tasks.done.container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  e.dataTransfer.dropEffect = 'move';
})
tasks.done.container.addEventListener("drop", (e) => {
  console.log("Stopped at done");
  // const data = JSON.parse(e.dataTransfer.getData('application/json'));
  const data = draggingItem
  draggingItem = undefined
  const draggedElement = document.getElementById(data.task.id);

  if (draggedElement.parentNode.contains(e.target) || draggedElement.parentNode === e.target) {
    console.log("Dragging to the same parent. Skipping...")
  } else {
    // let dragTarget = e.target.parentNode;
    // if (dragTarget.classList.contains("tasks")) {
    //   dragTarget = dragTarget.parentNode;
    // }

    // targetTask = tasks[dragTarget.id];
    moveTask(data.task, data.group, tasks.done);
    // if (tasks.done.total < SIZE) {
    //   fetchTasks("done", tasks.done.page)
    // }
    // if (tasks[data.key].tasks.length < SIZE) {
    //   fetchTasks(data.key, tasks[data.key].page)
    // }
  }

  //
  // // Append the element to the drop zone
  // event.target.appendChild(draggedElement);
})

tasks.rejected.container.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = tasks.rejected.container;

  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    console.log("Reached the bottom of the rejected div! Fetching new task!");
    if (tasks.rejected.total > tasks.rejected.tasks.length) {
      fetchTasks("rejected", tasks.rejected.page+1)
    }
  }
})

tasks.rejected.container.addEventListener("dragstart", (e) => {
  const data = {
    key: "rejected",
    group: tasks.rejected,
    task: tasks.rejected.tasks.find(t => t.id === e.target.id)
  }
  // e.dataTransfer.setData('application/json', JSON.stringify(data));
  draggingItem = data
  e.dataTransfer.effectAllowed = 'move';
})
tasks.rejected.container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  e.dataTransfer.dropEffect = 'move';
})
tasks.rejected.container.addEventListener("drop", (e) => {
  console.log("Stopped at rejected");
  // const data = JSON.parse(e.dataTransfer.getData('application/json'));
  const data = draggingItem
  draggingItem = undefined
  const draggedElement = document.getElementById(data.task.id);

  if (draggedElement.parentNode.contains(e.target) || draggedElement.parentNode === e.target) {
    console.log("Dragging to the same parent. Skipping...")
  } else {
    // let dragTarget = e.target.parentNode;
    // if (dragTarget.classList.contains("tasks")) {
    //   dragTarget = dragTarget.parentNode;
    // }

    // targetTask = tasks[dragTarget.id];
    moveTask(data.task, data.group, tasks.rejected);
    // if (tasks.rejected.total < SIZE) {
    //   fetchTasks("rejected", tasks.rejected.page)
    // }
    // if (tasks[data.key].tasks.length < SIZE) {
    //   fetchTasks(data.key, tasks[data.key].page)
    // }
  }

  //
  // // Append the element to the drop zone
  // event.target.appendChild(draggedElement);
})

// fetchTasks("todo");
// fetchTasks("inProgress");
// fetchTasks("done");
// fetchTasks("rejected");

fetchTasks("todo", 0);
fetchTasks("inProgress", 0);
fetchTasks("done", 0);
fetchTasks("rejected", 0);
// fetchTasks("todo");

function createLoadingElementForTask(task) {
  const loadingElement = document.createElement("div");
  loadingElement.classList.add("loading");
  loadingElement.id = `loading-${task.id}`;
  loadingElement.innerHTML = "Loading...";
  return loadingElement;
}

function createNoTasksFoundMessage() {
  const emptyStateElement = document.createElement("div");
  emptyStateElement.classList.add("emptystate");
  emptyStateElement.innerHTML = "No tasks found.";
  return emptyStateElement;
}

function moveTask(task, fromTaskGroup, toTaskGroup) {
  const data = {
    "status": toTaskGroup.status,
  }
  fetch(`${window.APP_CONFIG.API_URL}/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.status === 200) {
      // console.log(task)
      task = await response.json();
      // console.log(task)

      const fromTasks = fromTaskGroup.tasks;
      const toTasks = toTaskGroup.tasks;
      // console.log(fromTasks)
      // console.log(fromTasks.findIndex(t => t.id === task.id))
      fromTasks.splice(fromTasks.findIndex(t => t.id === task.id), 1);
      toTasks.push(task);

      // console.log(task)
      // console.log(found)
      // console.log(toTaskGroup)
      // console.log(fromTaskGroup)

      toTaskGroup.tasks.sort((t1, t2) => {
        // console.log(new Date(t1.updatedAt) - new Date(t2.updatedAt)) <-- ASC
        return new Date(t2.updatedAt) - new Date(t1.updatedAt);
      });

      rerenderTasksFor(toTaskGroup);
      rerenderTasksFor(fromTaskGroup);

      const key = statusMap[task.status]
      fetchTasks(key, tasks[key].page)

      showToast(`Task ${task.id} moved to ${toTaskGroup.status}.`);
    }
  })
}

function showToast(text) {
  // alert(text)
}

function fetchTasks(type, page, size=SIZE) {
  const task = tasks[type];
  if (!task.loadingElement) {
    const loadingElement = createLoadingElementForTask(task);
    task.loadingElement = loadingElement;
    task.container.appendChild(loadingElement);

    // setTimeout(() => {
    fetch(`${window.APP_CONFIG.API_URL}/api/tasks?page=${page || task.page}&size=${size}&status=${task.status}`).then(res => {
      if (res.status === 200) {
        return res.json()
      }
    }).then(data => {
      addTasks(task, data);
    }).catch(err => {
      console.log(err);
      task.loadingElement.remove();
      task.container.appendChild(createNoTasksFoundMessage());
    })
    // }, 1000)
  }
}

function addTasks(task, data) {
  data.items.forEach((item) => {
    const foundIndex = task.tasks.findIndex(t => t.id === item.id);
    if (foundIndex !== -1) {
      console.log(`Already contains ${item.id}. removing it...`);
      task.tasks.splice(foundIndex, 1);
    }
  })
  task.tasks.push(...data.items);
  task.page = data.page
  task.total = data.totalElements;
  task.loadingElement = undefined;

  task.tasks.sort((t1, t2) => {
        // console.log(new Date(t1.updatedAt) - new Date(t2.updatedAt)) <-- ASC
        return new Date(t2.updatedAt) - new Date(t1.updatedAt);
      });

  rerenderTasksFor(task);
}

function rerenderTasksFor(task) {
  // console.log(task);
  const {container, tasks, color} = task;

  container.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.id = task.id;
    taskDiv.classList.add("task");
    taskDiv.draggable = true;
    taskDiv.addEventListener("click", async (e) => {
      openModal(await fetchById(task.id)); // here we get the latest data from BE, instead of using stored one...
    });

    taskDiv.innerHTML = `
    <div class="label" style="background-color: ${color}"></div>
    <div class="data">
        <h2>${task.title || "NOT_TITLED"}</h2>
        <span>${task.id}</span>
    </div>
    `

    container.appendChild(taskDiv);
  })
}

function fetchById(id) {
  return fetch(`${window.APP_CONFIG.API_URL}/api/tasks/${id}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
}




let editTicketModalBtn;
let deleteTicketModalBtn;


let selectedTicket = undefined;
const ticketDetailsModal = document.querySelector(".ticket-details-modal");
const ticketDetails = document.querySelector(".ticket-details");

ticketDetails.addEventListener("click", (e) => {
  e.stopPropagation();
})

ticketDetailsModal.addEventListener("click", (e) => {
  closeModal();
})

function openModal(ticket) {
  selectedTicket = ticket;
  populateModal(ticket)
  ticketDetailsModal.style.animation = "200ms appear";
  setTimeout(() => {
    ticketDetailsModal.classList.remove("hidden");
  }, 200);
}

function closeModal() {
  selectedTicket = undefined;
  ticketDetailsModal.style.animation = "200ms disappear";
  setTimeout(() => {
    ticketDetails.innerHTML = "";
    ticketDetailsModal.classList.add("hidden");
  }, 200);
}

function populateModal(ticket) {
  const description = document.createElement("pre");
  const date = document.createElement("div");
  const createdAt = new Date(ticket.createdAt);
  date.innerHTML = `<div id="createdAt">Created at: <b>${createdAt.toLocaleDateString()}:${createdAt.toLocaleTimeString()}</b></div>`;
  description.innerText = ticket.description;

  editTicketModalBtn = document.createElement("button");
  editTicketModalBtn.id = "open-edit-ticket-modal-btn";
  editTicketModalBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffa600" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
    Edit
`;
  editTicketModalBtn.addEventListener("click", openEditTicketModal);

  deleteTicketModalBtn = document.createElement("button");
  deleteTicketModalBtn.id = "open-delete-ticket-modal-btn";
  deleteTicketModalBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ff364e" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
    Delete
`;
  deleteTicketModalBtn.addEventListener("click", openDeleteTicketModal);

  // editTicketModalBtn = document.getElementById("open-edit-ticket-modal-btn");
  // editTicketFormCancelBtn.addEventListener("click", closeEditTicketModal);
  // deleteTicketModalBtn = document.getElementById("open-delete-ticket-modal-btn");
  // deleteTicketModalBtn.addEventListener("click", closeDeleteTicketModal);

  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-buttons");

  actionButtons.appendChild(editTicketModalBtn);
  actionButtons.appendChild(deleteTicketModalBtn);

  ticketDetails.innerHTML = `
<!--  <div class="action-buttons">-->
<!--    <button id="open-edit-ticket-modal-btn">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffa600" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>-->
<!--        Edit-->
<!--    </button>-->
<!--    <button id="open-delete-ticket-modal-btn">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ff364e" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>-->
<!--        Delete-->
<!--    </button>-->
<!--  </div>-->
  <h4>${ticket.id}</h4>
  <h1>${ticket.title}</h1>
  `;
  ticketDetails.appendChild(actionButtons);
  ticketDetails.appendChild(description);
  ticketDetails.appendChild(date);
}




const createTicketModal = document.querySelector(".ticket-add-modal");
const createTicketForm = document.getElementById("ticketAddForm");
const createTicketModalBtn = document.getElementById("open-add-task-modal-btn");
const createTicketFormCancelBtn = createTicketForm.querySelector(".cancel-button");
const createTicketFormSubmitBtn = createTicketForm.querySelector(".save-button");

createTicketFormCancelBtn.addEventListener("click", () => {
  createTicketForm.reset();
  closeCreateTicketModal()
});

createTicketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(createTicketForm);
  console.log(formData);

  createTicket(formData);
})

function createTicket(formData) {
  createTicketFormSubmitBtn.innerHTML = "Saving...";

  formData = Object.fromEntries(formData);

  const request = {
    "title": formData.title,
    "description": formData.description,
    "status": tasks[formData.status].status
  }

  fetch(`${window.APP_CONFIG.API_URL}/api/tasks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(res => {
    if (res.status === 201) {
      return res.json()
    }
  }).then(data => {
    fetchTasks(formData.status, 0)
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    createTicketFormSubmitBtn.innerHTML = "Save";
    createTicketForm.reset();
    closeCreateTicketModal();
  })
}

createTicketModalBtn.addEventListener("click", openCreateTicketModal);

createTicketForm.addEventListener("click", (e) => {
  e.stopPropagation();
})

createTicketModal.addEventListener("click", (e) => {
  createTicketForm.reset();
  closeCreateTicketModal();
})

function openCreateTicketModal() {
  createTicketModal.style.animation = "200ms appear";
  setTimeout(() => {
    createTicketModal.classList.remove("hidden");
  }, 200);
}

function closeCreateTicketModal() {
  createTicketModal.style.animation = "200ms disappear";
  setTimeout(() => {
    createTicketModal.classList.add("hidden");
  }, 200);
}






const editTicketModal = document.querySelector(".ticket-details-edit-modal");
const editTicketForm = document.getElementById("ticketDetailsEditForm");
let editTicketFormCancelBtn;
let editTicketFormSubmitBtn;

function renderEditTicketForm(ticket) {
  editTicketFormCancelBtn = document.createElement("button");
  editTicketFormCancelBtn.classList.add("cancel-button");
  editTicketFormCancelBtn.type = "button";
  editTicketFormCancelBtn.addEventListener("click", () => {
    editTicketForm.reset();
    closeEditTicketModal();
  });
  editTicketFormCancelBtn.innerHTML = "Cancel";

  editTicketFormSubmitBtn = document.createElement("button");
  editTicketFormSubmitBtn.classList.add("save-button");
  editTicketFormSubmitBtn.innerHTML = "Edit";

  const buttonsSection = document.createElement("section");
  buttonsSection.classList.add("buttons");
  buttonsSection.append(editTicketFormCancelBtn);
  buttonsSection.append(editTicketFormSubmitBtn);

  editTicketForm.innerHTML = `
      <h2>Edit ${ticket.id} ticket</h2>
      <section class="data">
          <div class="field-group">
            <label for="edit-title">Title:</label>
            <input type="text" name="title" id="edit-title" placeholder="Ticket Title" value="${ticket.title}" required>
          </div>
          <div class="field-group">
            <label for="edit-description">Description:</label>
            <textarea name="description" id="edit-description" placeholder="Ticket Description">${ticket.description}</textarea>
          </div>
      </section>`;
  editTicketForm.appendChild(buttonsSection);

  editTicketForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(editTicketForm);
    console.log(formData);

    editTicket(selectedTicket, formData);
  });

  editTicketForm.addEventListener("click", (e) => {
    e.stopPropagation();
  })
}

function editTicket(ticket, formData) {
  editTicketFormSubmitBtn.innerHTML = "Editing...";

  formData = Object.fromEntries(formData);

  const request = {
    "title": formData.title || null,
    "description": formData.description || null
  }

  fetch(`${window.APP_CONFIG.API_URL}/api/tasks/${ticket.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(res => {
    if (res.status === 200) {
      return res.json()
    }
  }).then(data => {
    populateModal(data);
    fetchTasks(statusMap[data.status], 0)
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    editTicketFormSubmitBtn.innerHTML = "Edit";
    editTicketForm.reset();
    closeEditTicketModal();
  })
}

editTicketModal.addEventListener("click", (e) => {
  editTicketForm.reset();
  closeEditTicketModal();
})

function openEditTicketModal() {
  if (selectedTicket) {
    renderEditTicketForm(selectedTicket);
    editTicketModal.style.animation = "200ms appear";
    setTimeout(() => {
      editTicketModal.classList.remove("hidden");
    }, 200);
  }
}

function closeEditTicketModal() {
  editTicketModal.style.animation = "200ms disappear";
  setTimeout(() => {
    editTicketModal.classList.add("hidden");
  }, 200);
}









const deleteTicketModal = document.querySelector(".ticket-delete-modal");
const deleteTicketForm = document.getElementById("ticketDeleteForm");
let deleteTicketFormCancelBtn = deleteTicketForm.querySelector(".cancel-button");
let deleteTicketFormSubmitBtn = deleteTicketForm.querySelector(".save-button");

deleteTicketFormCancelBtn.addEventListener("click", closeDeleteTicketModal);

deleteTicketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  deleteTicket(selectedTicket);
});

deleteTicketForm.addEventListener("click", (e) => {
  e.stopPropagation();
})

function deleteTicket(ticket) {
  deleteTicketFormSubmitBtn.innerHTML = "Deleting...";

  fetch(`${window.APP_CONFIG.API_URL}/api/tasks/${ticket.id}`,
    {
      method: 'DELETE',
    }).then(res => {
    if (res.status === 204) {
      const storedTickets = tasks[statusMap[ticket.status]].tasks;
      storedTickets.splice(storedTickets.findIndex(t => t.id === ticket.id), 1);
      fetchTasks(statusMap[ticket.status], 0);
    }
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    deleteTicketFormSubmitBtn.innerHTML = "Delete";
    closeDeleteTicketModal();
    closeModal()
  })
}

deleteTicketModal.addEventListener("click", (e) => {
  closeDeleteTicketModal();
})

function openDeleteTicketModal() {
  if (selectedTicket) {
    deleteTicketModal.style.animation = "200ms appear";
    setTimeout(() => {
      deleteTicketModal.classList.remove("hidden");
    }, 200);
  }
}

function closeDeleteTicketModal() {
  deleteTicketModal.style.animation = "200ms disappear";
  setTimeout(() => {
    deleteTicketModal.classList.add("hidden");
  }, 200);
}