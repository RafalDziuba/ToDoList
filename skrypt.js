let $todoInput; // miejsce na wpisanie zadania
let $alertInfo; // alert o braku zadań na liście
let $addBtn; // dodanie zadania
let $ulList; // lista zadań do wykonania
let $newTask; // nowo dodane LI
let $popup; // pobrany popup
let $popupInfo; //alert w popupie - pusty tekst
let $editedTodo; // edytowane zadanie
let $popupInput; //tekst wpisywany w inputa w popupie
let $addPopupBtn; //przycisk zatwierdz w popupie
let $closeTodoBtn; //przycisk do zamykania popupa
let $idNumber = 0; //nadanie id poszczególnym zadaniom
let $allTasks; //wszystkie zadania



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
    $allTasks = $ulList.getElementsByTagName('li');
};

//ustawienie nasłuchiwania
const prepareDomEvents = () => {
$addBtn.addEventListener('click',addNewTask);
$ulList.addEventListener('click', checkList);
$closeTodoBtn.addEventListener('click', closePopup);
$addPopupBtn.addEventListener('click', changeTodo);
$todoInput.addEventListener('keyup', enterCheck);
};


//funkcja dodająca nowe zadanie do listy
const addNewTask = () => {
if ($todoInput.value !== '') {
$idNumber++;
$newTask = document.createElement('li');
$ulList.appendChild($newTask);
$newTask.innerText = $todoInput.value;
$newTask.setAttribute('id', `todo-${$idNumber}`);
$todoInput.value = '';
$alertInfo.innerText = '';
createToolsArea();
} else {
$alertInfo.innerText = 'Musisz wpisać treść zadania!'
}};

const enterCheck = (event) => {
if (event.keyCode === 13){
    addNewTask();}
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
} else if (e.target.closest('button').classList.contains('edit')){
editTask(e);
} else if (e.target.closest('button').classList.contains('delete')){
deleteTask(e);
};
};

const editTask = (e) => {
const oldTodo = e.target.closest('li').id;
$editedTodo = document.getElementById(oldTodo);
$popupInput.value = $editedTodo.firstChild.textContent;

$popup.style.display = 'flex';
};

const changeTodo = () => {
if ($popupInput.value !== ''){
$editedTodo.firstChild.textContent = $popupInput.value;
$popup.style.display = 'none';
$popupInfo.textContent = '';
} else {
$popupInfo.textContent = 'Musisz podać jakąś treść!'
}
};

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.textContent = '';
};

const deleteTask = (e) => {
const deleteTodo = e.target.closest('li');
deleteTodo.remove();

if ($allTasks.length === 0){
$alertInfo.textContent = 'Brak zadań na liście';
    };
};





document.addEventListener('DOMContentLoaded', main);