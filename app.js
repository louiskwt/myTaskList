// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

function loadEventListener() {
    // DOM Loaded Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filteredTasks);
     
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
             // create li element
             const li = document.createElement('li');
             li.className = 'collection-item';
             // create text node and append to li
             li.appendChild(document.createTextNode(task));
             // create new link
             const link = document.createElement('a');
             // add class
             link.className = 'delete-item secondary-content';
             // Add icon html
             link.innerHTML = '<i class="fas fa-trash"></i>';
             // append the link to li
             li.appendChild(link);
             // append the li to ul
             taskList.appendChild(li);
    })
}

// Add task 
function addTask(e) {
    e.preventDefault();
    // check if the input value is empty
    if(taskInput.value === '') {
        // popup a modal to tell the user to enter something
        const addTaskModal = document.querySelector('#add-task-modal');
        const instance = M.Modal.init(addTaskModal, {startingTop: '16%'});
        instance.open();
    } else {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-trash"></i>';
        // append the link to li
        li.appendChild(link);
        // append the li to ul
        taskList.appendChild(li);

        // store in LS
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure")) {
            e.target.parentElement.parentElement.remove();
            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
    // clear the item UI
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.removeItem('tasks');
}

// filteredTasks
function filteredTasks(e) {
    const text = e.target.value.toLowerCase();
    // get the nodelist by using querySelector to use for Each
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}