// create UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


// load all event listeners
loadAllEventListeners();


// load all event listeners
function loadAllEventListeners() {
    // load DOM event
    document.addEventListener('DOMContentLoaded', getTasks);
    // addTask
    form.addEventListener('submit', addTask);
    // removeTask
    taskList.addEventListener('click', removeTask);
    // filterTasks
    filter.addEventListener('keyup', filterTasks);
    // clearTasks
    clearBtn.addEventListener('click', clearTasks);
}


//get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create textNode and append to li
        li.appendChild(document.createTextNode(task));
        // create link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add i element
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });
}


//addTask
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create & append textNode
        li.appendChild(document.createTextNode(taskInput.value));
        // create link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add i element
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        
        // store task in LS
        storeTaskInLocalStorage(taskInput.value);

        // reset taskInput
        taskInput.value = '';
    }

    e.preventDefault();
}


// store task in LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // append current task to LS
    tasks.push(task);

    // append new tasks to LS
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// removeTask
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // removeTask from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}


// removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            task.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// clearTasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from LS
    clearTasksFromLocalStorage();
}


// clearTasksFromLocalStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


// filterTasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}