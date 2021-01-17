// Variables delaration
let notCompletedArr = [];
let completedArr = [];
let addBtn = document.querySelector(".add-button"), taskInput = document.getElementById("task-input");
let deleteBtn = document.querySelectorAll(".delete");
let clearBtn = document.querySelector(".clear");
let notCompletedList = document.querySelector(".tasks-list.not-completed");
let completedList = document.querySelector(".tasks-list.completed");

// Add elements
function addElements (arr, list) {
    arr.forEach(function (el, i) {
        let newLi = document.createElement("li");
        newLi.classList.add("task");

        let icon = document.createElement("i");

        if (arr == completedArr) {
            icon.className += " fa fa-check";
        } else {
            icon.className += " fa fa-times";
        }
        newLi.appendChild(icon);

        let newTaskText = document.createTextNode(el);
        
        let label = document.createElement("label");
        label.appendChild(newTaskText);
        newLi.appendChild(label);
        
        let deleteBtnText = document.createTextNode("Delete");
        let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(deleteBtnText);
        deleteBtn.classList.add("delete");
        newLi.appendChild(deleteBtn);

        list.appendChild(newLi);
    });
}

function buildTasksList () {
    // Remove elements first    
    while (notCompletedList.firstChild) { 
        notCompletedList.removeChild(notCompletedList.firstChild);
    }

    while (completedList.firstChild) { 
        completedList.removeChild(completedList.firstChild);
    }

    // Add elements
    addElements(notCompletedArr, notCompletedList);
    addElements(completedArr, completedList);
}

// Add new task
addBtn.onclick = function () {
    if (taskInput.value !== "") {
        notCompletedArr.push(taskInput.value);
        buildTasksList();
        taskInput.value = "";
    }
};

// Delete task
document.addEventListener('click', function (e) {
    if (e.target.classList.contains("delete")) {
        if (e.target.previousElementSibling.parentNode.parentNode.classList.contains("completed")) {
            completedArr.splice(completedArr.indexOf(e.target.previousElementSibling.innerText), 1);
        } else {
            notCompletedArr.splice(notCompletedArr.indexOf(e.target.previousElementSibling.innerText), 1);
        }
        buildTasksList();
    }

    if (e.target.classList.contains("fa-times")) {
        let text = e.target.nextElementSibling.innerText;
        notCompletedArr.splice(notCompletedArr.indexOf(text), 1);
        completedArr.push(text);
        buildTasksList();
    }

    if (e.target.classList.contains("fa-check")) {
        let text = e.target.nextElementSibling.innerText;
        completedArr.splice(notCompletedArr.indexOf(text), 1);
        notCompletedArr.push(text);
        buildTasksList();
    }
});

// Clear tasks
clearBtn.onclick = function () {
    notCompletedArr = [];
    completedArr = [];
    buildTasksList();
}