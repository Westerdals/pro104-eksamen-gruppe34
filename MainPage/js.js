var getLeftContainer = document.getElementById("task_container");
var getAddContainer = document.getElementById("add_category");
var getAddPerson = document.getElementById("addPerson");
var getPersonList = document.getElementById("personList")
var getTaskarea = document.getElementById("listoftasks")
var getAddMainTask = document.getElementById("addMainTask")
var getAddTask = document.getElementById("addTask");
var getTextbox = document.getElementById("textbox");
var getDate = document.getElementById("date");
var getMainTitle = document.getElementById("mainTitle");
var getTaskContainer = document.getElementById("taskContainer");

var categoryArray = [];
var mainTasksArray = [];
var taskArray = [];
var personArray = [];
buildItems("category");

getAddContainer.onclick = onclickAddCategory;
getAddPerson.onclick = onclickAddPerson;
getAddTask.onclick = onclickAddTask;
getAddMainTask.onclick = onclickaddMainTask;



function onclickAddCategory() {
    let text = document.getElementById("categoryText").value;
    categoryArray.push({ textToShow: `${text}`, backgroundcolor: "#28cc6d" });
    setLocalStorage(`category`, categoryArray);
    buildItems("category");
}

function onclickAddPerson() {
    personArray.push({ textToShow: "G", backgroundcolor: "#28cc6d", category: "CSS" });
    setLocalStorage(`person`, personArray);
    buildItems("person");
}

function onclickAddTask() {
    let text = getTextbox.value;
    let date = getDate.value;
    let category = document.getElementById("mainTitle").innerHTML;
    taskArray.push({ textToShow: `${text}`, backgroundcolor: "#28cc6d", date: `${date}`, WIP: "no", done: "no", category: `${category}` });
    setLocalStorage(`task`, taskArray);
    buildItems("task");
}

function onclickaddMainTask() {
    let category = document.getElementById("mainTitle").innerHTML;
    let getText = document.getElementById("addMainTaskText").value;
    mainTasksArray.push({ textToShow: `${getText}`, backgroundcolor: "beige", category: `${category}` })
    setLocalStorage(`mainTask`, mainTasksArray);
    buildItems("mainTask");
}

function buildMainSite(categoryToBuild) {
    getMainTitle.innerHTML = categoryToBuild;
    buildItems("mainTask");
}


function x_allowDrop(ev) {
    ev.preventDefault();
}

function x_drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function x_drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function buildItems(type) {
    if (type == "category") {
        getLeftContainer.innerHTML = "";
        categoryArray = getLocalStorage(`category`);
        for (var i = 0; i < categoryArray.length; i++) {
            let backgroundColor = categoryArray[i].backgroundcolor;
            let text = categoryArray[i].textToShow;
            getLeftContainer.innerHTML += `<div class="card" style="--background:${backgroundColor}; --text:white; onclick="buildMainSite(${text})">
        <div class="multi-button">
        <button class="fa fa-comment"></button>
        <button class="fa fa-cog"></button>
        <button class="fa fa-trash" id="trash" onclick="removeItem('${categoryArray[i].textToShow}')"></button>
        </div>
        <div class="container">${text}</div>
        </div>`;
        }
    }
    if (type === "person") {
        getPersonList.innerHTML = ``;
        personArray = getLocalStorage(`person`);
        for (var i = 0; i < personArray.length; i++) {
            let backgroundPerson = personArray[i].backgroundcolor;
            let textPerson = personArray[i].textToShow;
            getPersonList.innerHTML += `<div class="person">
			<img src="" alt="${textPerson}" id="personId" draggable="true" ondragstart="x_drag(event)">	
		</div>`;
        }
        getPersonList.innerHTML += `<div id="addPerson">
			<img src="../images/plus_icon.png" alt="Pluss" id="addPluss">
		</div>`;
    }

    if (type === "task") {
        getTaskarea.innerHTML = ``;
        taskArray = getLocalStorage(`task`);
        for (var i = 0; i < taskArray.length; i++) {
            let backgroundText = taskArray[i].backgroundcolor;
            let textTask = taskArray[i].textToShow;
            getTaskarea.innerHTML += `<div class="task" id="{textTask}" style="background-color: beige; position: relative; width: 250px">${textTask}<input type="button" id="${textTask}done" value="done"><input type="button" id="${textTask}WIP" value="WIP"></div>
            </div>`
        }

    }
    getAddPerson.onclick = onclickAddPerson;

    if (type === "mainTask") {
        getTaskContainer.innerHTML = ``;
        mainTasksArray = getLocalStorage(`mainTask`);
        let category = document.getElementById("mainTitle").innerHTML;
        let counter = 0;
        for (var i = 0; i < mainTasksArray.length; i++) {
            if (category === mainTasksArray[i].category) {
                let getMaintext = mainTasksArray[i].textToShow;
                getTaskContainer.innerHTML += `<div id="taskContainer${counter}"><div id="${getMaintext}" style="float: left">
		<div class="taskTabs" id="taskTab">
            <div class="overskrift" id="${getMaintext}">${getMaintext}</div>
            <div class="plus" onclick="expandTask()" id="test${counter}">
                <img src="../images/plus_icon.png" alt="Plus" class="plus_icon">
            </div>
            
            <div class="listoftasks" id="listoftasks">
            </div>
			<div class="miniChart" id="miniChart1"></div>
            <div id="addTasks">
            <input type="text" id="textbox${counter}" value="to add tasks">
                <input type="button" id="addTask{counter}" value="O"><br>
                <input type="date" id="date">
            </div>
			<div class="dropPerson" id="dropPerson1" ondrop="x_drop(event)" ondragover="x_allowDrop(event)"><p>Drop person here</p></div>
		</div>
	</div>
    </div>`;
                counter++;
            }
        }
    }
}


function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}