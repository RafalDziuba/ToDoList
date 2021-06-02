let $todoInput; // input for task
let $alertInfo; // no tasks info
let $addBtn; // add new task button
let $ulList; // lists of tasks
let $newTask; // new task(li)
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput; //input for task IN POPUP
let $addPopupBtn; //add new task button IN POPUP
let $closeTodoBtn; //close popup window
let $idNumber = 0; //unique id for each li
let $allTasks; //lists of all tasks (li)



const main = () => {
    prepareDomElements();
    prepareDomEvents();
};

//pobranie elementów
const prepareDomElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li'); //get live collection of all LI elements in ulList
};

//event listeners
const prepareDomEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkList);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};


//funkcja dodająca nowe zadanie do listy
const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++; // create unique id
        $newTask = document.createElement('li'); //creating new task
        $ulList.appendChild($newTask); // add li (task) to ul list
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = 'You have to enter something!'
    }
};

//insert task by keyboard
const enterCheck = (event) => {
    if (event.keyCode === 13) {
        addNewTask();
    }
};

const createToolsArea = () => {

    const toolsPanel = document.createElement('div');
    const completeBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    toolsPanel.classList.add('tools')
    completeBtn.classList.add('complete')
    editBtn.classList.add('edit')
    deleteBtn.classList.add('delete')

    completeBtn.innerHTML = '<i class = "fas fa-check"></i>'
    editBtn.innerText = 'EDIT'
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    $newTask.appendChild(toolsPanel);
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

}

const checkList = (e) => {

    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.closest('button').classList.toggle('completed')
    } else if (e.target.closest('button').classList.contains('edit')) {
        editTask(e);
    } else if (e.target.closest('button').classList.contains('delete')) {
        deleteTask(e);
    };
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent; // set popup input value same as task value

    $popup.style.display = 'flex'; // make popup visible
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none'; // close popup
        $popupInfo.textContent = '';
    } else {
        $popupInfo.textContent = 'You have to enter something!'
    }
};


//hide popup
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.textContent = '';
};

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    //after removing all tasks (li collection length === 0) view alert info
    if ($allTasks.length === 0) {
        $alertInfo.textContent = 'You have nothing to do';
    };
};





document.addEventListener('DOMContentLoaded', main);