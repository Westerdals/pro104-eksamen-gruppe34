let getMainContainer = document.getElementById("maincontainer");
let getColorRed = document.getElementById("red");
let getColorBlue = document.getElementById("blue");
let getColorGreen = document.getElementById("green");
let getColorGray = document.getElementById("gray");
let getColorYellow = document.getElementById("yellow");
let getColorPicture = document.getElementById("picture");
let getColorPicture2 = document.getElementById("picture2")
let getPlussAddProject = document.getElementById("createBox");
let getTrash = document.getElementById("trash");
let projectArray = [];
let counter = 0;
getPlussAddProject.onclick = onClickAddProject;

buildItems();

function onClickAddProject() {
    projectArray.push({
        textToShow: `New Project ${++counter}`,
        backgroundcolor: "#53bdb9"
    });
    setLocalStorage("project", projectArray);
    console.log(counter);
    buildItems();
};


function buildItems() {
    getMainContainer.innerHTML = "";
    projectArray = getLocalStorage(`project`);
    for (let i = 0; i < projectArray.length; i++) {
        let backgroundColor = projectArray[i].backgroundcolor;
        let text = projectArray[i].textToShow;
        getMainContainer.innerHTML += `
          <div class="column" ondrop="drop(event)" ondragover="allowDrop(event)">

           <div class="card" draggable="true" ondragstart="drag(event)" style="--background:${backgroundColor}; --text:white;">
        
            <div class="multi-button" id="${text}card">
        <button class="fa fa-edit" onclick="changeNamePart1('${text}')"></button>
        <button class="fa fa-paint-brush" id ="paint-brush" onclick ="changeColorBox('${text}')"></button>
        <button class="fa fa-trash" id="trash" onclick="removeItem('${projectArray[i].textToShow}')"></button>
        </div>

        <div class="container" id="${text}"><a href="#" onclick="newPage('test_page')">${text}</a></div>
        </div>
      </div>
      </div>
        `;
    }
    getMainContainer.innerHTML += `<div class="createBox" id="createBox">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </div>`;
    let getter = document.getElementById("createBox");
    getPlussAddProject = getter;
    getPlussAddProject.onclick = onClickAddProject;
}

function changeColorBox(whoToChange) {
    let box = document.getElementById(`${whoToChange}`);
    for (let i = 0; i < whoToChange.length; i++) {
        let rgbparameter1 = Math.floor(Math.random() * 255);
        let rgbparameter2 = Math.floor(Math.random() * 255);
        let rgbparameter3 = Math.floor(Math.random() * 255);
        let RandomColorGen = `rgb(${rgbparameter1},${rgbparameter2},${rgbparameter3})`;

        box.style.backgroundColor = RandomColorGen;
    }
    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].textToShow === `${whoToChange}`) {
            projectArray[i].backgroundcolor = RandomColorGen;
            setLocalStorage(`project`, projectArray);
        }

    }
}

function changeNamePart1(whoToChange) {
    let getIt = document.getElementById(`${whoToChange}`);
    getIt.innerHTML +=
        `<input type="text" id="${whoToChange}text" class="tekstboksen" placeholder="New name">`;
    getIt.innerHTML +=
        `<div id="${whoToChange}btn" class="okbtn" onclick="changeNamePart2()">OK</div>`;
    getit2 = document.getElementById(`${whoToChange}text`);
    getit2.focus();

    document.getElementsByClassName("tekstboksen")[0].onkeydown = function (event) {
        if (event.keyCode == 13) {
            changeNamePart2();
        }
    }


}

function changeNamePart2() {
    let newName = document.getElementsByClassName("tekstboksen")[0].value;
    let oldName = document.getElementsByClassName("tekstboksen")[0].parentElement.id;
    console.log(`${newName}${oldName}`);

    for (let i = 0; i < projectArray.length; i++) {
        if (oldName === projectArray[i].textToShow) {
            if (newName === "") {
                projectArray[i].textToShow = oldName;
                setLocalStorage(`project`, projectArray);
                buildItems();
            } else {
                projectArray[i].textToShow = newName;
                setLocalStorage(`project`, projectArray);
                buildItems();
            }

        }
    }


}

function removeItem(toBeRemoved) {
    console.log("test");
    for (let i in projectArray) {
        if (toBeRemoved === projectArray[i].textToShow) {
            projectArray.splice(i, 1);
        }
    }
    setLocalStorage(`project`, projectArray);
    buildItems();
}

getColorRed.onclick = function () {
    getMainContainer.style.backgroundColor = "#e74837";
    getMainContainer.style.backgroundImage = "";
};
getColorBlue.onclick = function () {
    getMainContainer.style.backgroundColor = "#2b8aca";
    getMainContainer.style.backgroundImage = "";
};
getColorGreen.onclick = function () {
    getMainContainer.style.backgroundColor = "#28cc6d";
    getMainContainer.style.backgroundImage = "";
};
getColorGray.onclick = function () {
    getMainContainer.style.backgroundColor = "#364c61";
    getMainContainer.style.backgroundImage = "";
};
getColorYellow.onclick = function () {
    getMainContainer.style.backgroundColor = "#e9bc0a";
    getMainContainer.style.backgroundImage = "";
};
getColorPicture.onclick = function () {
    getMainContainer.style.backgroundImage = "url(./images/gradient.jpg)";
};

getColorPicture2.onclick = function () {
    getMainContainer.style.backgroundImage = "url(./images/Mountain.jpg)";
};


function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}