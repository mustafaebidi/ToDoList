//Button to Add Task
let add = document.querySelector("input i");

//Container Of All Tsks
let tasks = document.querySelector(".tesks");

///To open Setting of Task
let popUp = document.querySelector(".pop-up");

let inputDescription = document.querySelector(".con-description textarea");
let textInput = document.querySelector(".input input");
let textDescription = document.querySelector(".text-description");
let properties = document.querySelector(".properties");
let mainChoices = document.querySelectorAll(".main-Choices > div");
let priority = document.querySelectorAll(".priority > div");
let allPriority = document.querySelector(".con-priority .all");
let conPriority = document.querySelector(".con-priority");
let tasksAll = document.querySelectorAll(".tesks > .task");

let allDescription = document.querySelector(".con-description .all");
let conDescription = document.querySelector(".con-description");
let type = document.querySelectorAll(".type > div");

//those varible For Number Of The Tasks
let total = document.querySelector(".total > span");
let pending = document.querySelector(".pending > span");
let success = document.querySelector(".success > span");

//Alert massages
alertEmptyField = document.querySelector(".alret-massage");

//Global Varivel For Task
let importantCase = "";
let taskType = "";

let flag = true;

//Sort Date For Details Window
let storeDetails = {};
let arrayHaveAllInformationAboutTask = [];

if (localStorage.getItem("tasks") && localStorage.getItem("details")) {
  document.querySelector(".no-task").style.display = "none";
  storeDetails = JSON.parse(localStorage.getItem("details"));
  console.log(storeDetails,"aass")
  arrayHaveAllInformationAboutTask = JSON.parse(localStorage.getItem("tasks"));

  addElementFromLocalStorge();
}

document.addEventListener("click", function (e) {
  let noTask = document.querySelector(".no-task");

  ////Show the properties Window
  if (e.target.classList.contains("pop-up")) {
    if (textInput.value != "") {
      if (toCheakIfTheValueExist(textInput.value)) {
        ////If The Name In the Field Exists In The Tasks
        alertEmptyField.innerHTML = "The Task Name Already Exists";
        alertEmptyField.classList.add("active");
        setTimeout(function () {
          alertEmptyField.classList.remove("active");
        }, 1000);
      } else {
        properties.style.display = "flex";
        setTimeout(() => {
          properties.style.opacity = "1";
          document.querySelector(".box-properties").style.transform =
            "scale(1)";
        }, 10);
      }
    } else {
      popUp.classList.add("active");
      alertEmptyField.classList.add("active");
      setTimeout(function () {
        alertEmptyField.classList.remove("active");
        popUp.classList.remove("active");
      }, 1000);
    }
  }

  //To Finished task

  if (e.target.id === "finished") {
    //If CLICKED FINSHED
    if (e.target.checked) {
      //To Set Task finshed when click finshed's button
      finishedTask(e.target, true);
      //To Upadate the value in Local Stroge
      upadateLocalStroge(
        true,
        e.target.parentNode.parentNode.querySelector(".task-name")
      );
    }

    //If CLICKED CLOSE FINISHED
    else {
      ///To Set Task Unfinshed when click finshed's button
      finishedTask(e.target, false);
      //To Upadte the value in Local Stroge
      upadateLocalStroge(
        false,
        e.target.parentNode.parentNode.querySelector(".task-name")
      );
    }
  }

  if (
    e.target.className === "close" &&
    e.target.parentNode.parentNode.className === "container-task"
  ) {
    document.querySelector(".task-detail").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".task-detail").style.display = "none";
    }, 1000);
  }

  if (
    e.target.className === "close" &&
    e.target.parentNode.parentNode.className === "box-properties"
  ) {
    rest();
    document.querySelector(".box-properties").style.transform = "scale(0)";
    properties.style.opacity = "0";

    setTimeout(() => {
      properties.style.display = "none";
    }, 1000);
  }

  if (e.target.className === "priority-bt") {
    removeActiveFrom(mainChoices);
    document.querySelector(".priority-bt").classList.add("active");
    conDescription.style.height = `0px`;
    conPriority.style.height = `${allPriority.offsetHeight}px`;
  }

  if (e.target.className === "description-bt") {
    removeActiveFrom(mainChoices);
    document.querySelector(".description-bt").classList.add("active");
    conPriority.style.height = `0px`;

    conDescription.style.height = `${allDescription.offsetHeight}px`;
  }

  if (e.target.parentNode.className === "priority") {
    removeActiveFrom(priority);
    e.target.classList.add("active");
    importantCase = e.target.innerHTML;
  }

  if (e.target.parentNode.className === "type") {
    taskType = e.target.innerHTML;
    removeActiveFrom(type);
    e.target.classList.add("active");
  }

  if (
    e.target.className === "delete-all" ||
    e.target.parentNode.className === "delete-all"
  ) {
    let tasksAll = document.querySelectorAll(".tesks > .task");

    for (let i = 0; i < tasksAll.length; i++) {
      tasksAll[i].remove();
    }
    whenRemoveAllTasks();
  }

  if (e.target.className === "add") {
    tasksAll = document.querySelectorAll(".tesks > .task");

    if (importantCase === "" || taskType === "") {
      console.log(444);
    } else {

      addDateToArray()

      if (arrayHaveAllInformationAboutTask.length > 0 && flag) {
        /// Flage to entre in if statement 1 times only
        document.querySelector(".no-task").style.display = "none";
        flag = false;
      }

      ToInCreamentNumberOfTask();

      let lastElementFromTask = arrayHaveAllInformationAboutTask.length - 1;
      updateData();

      addTaskAtContainerOfTasks(
        arrayHaveAllInformationAboutTask[lastElementFromTask]
      );

      textInput.value = "";

      document.querySelector(".box-properties").style.transform = "scale(0)";
      properties.style.opacity = "0";

      setTimeout(() => {
        properties.style.display = "none";
      }, 1000);

      //To Rest All Variable And Remove All Class Active from Element
      rest();
    }
  }

  if (e.target.classList.contains("delete-task")) {
    let taskName =
      e.target.parentNode.parentNode.querySelector(".task-name").innerHTML;

    e.target.parentNode.parentNode.remove();
    todeCreamentNumberOfTask(e.target.parentNode);

    deleteData(taskName);
  }
});

function updateData() {
  upadeNumberOftask();
  storeDetails[textInput.value] = [taskType, inputDescription.value];


  addDateToLocalStorge()
}

function addDateToArray() {
    dateofTask = `${new Date().getDate()}  ${new Date().toLocaleString("en", {
        month: "short",
      })}`;
    const data = {
      title: textInput.value,
      completed: false,
      leveloftask: importantCase,
      dateoftask: dateofTask,
      typeoftask: taskType,
    };
    arrayHaveAllInformationAboutTask.push(data);
  }



function deleteData(taskName) {
  for (let i = 0; i < arrayHaveAllInformationAboutTask.length; i++) {
    if (arrayHaveAllInformationAboutTask[i].title === taskName) {
      arrayHaveAllInformationAboutTask.splice(i, 1);
    }
  }

  delete storeDetails[taskName];
  upadeNumberOftask();
  addDateToLocalStorge();
}

tasks.addEventListener("dblclick", function (e) {
  //This condition is big until the user clicks anywhere in the taskbar, then the details appear to him

  if (
    (e.target.parentNode.className === "task" ||
      e.target.parentNode.parentNode.className === "task" ||
      e.target.className === "task") &&
    e.target.id != "finished"
  ) {
    if (e.target.parentNode.className === "task") {
      //To Show the details container
      showDetail(e.target.parentNode.querySelector(".task-name"));
    } else if (e.target.className === "task") {
      showDetail(e.target.querySelector(".task-name"));
    } else {
      showDetail(e.target.parentNode.parentNode.querySelector(".task-name"));
    }
  }
});

function removeActiveFrom(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
}

//Restart all the things To Default
function rest() {
  conPriority.style.height = `0px`;
  conDescription.style.height = `0px`;

  importantCase = "";
  taskType = "";

  inputDescription.value = "";
  ////Romove All Active Class
  removeActiveFrom(type);
  removeActiveFrom(priority);
  removeActiveFrom(mainChoices);
}

function ToInCreamentNumberOfTask() {
  total.innerHTML = +total.innerHTML + 1;
  pending.innerHTML = +pending.innerHTML + 1;
}
function todeCreamentNumberOfTask(element) {
  total.innerHTML = +total.innerHTML - 1;

  if (element.querySelector("#finished").hasAttribute("checked")) {
    success.innerHTML = +success.innerHTML - 1;
  } else {
    pending.innerHTML = +pending.innerHTML - 1;
  }

  if (+total.innerHTML === 0) {
    document.querySelector(".no-task").style.display = "block";
    flag = true;
  }
}

function whenRemoveAllTasks() {
  total.innerHTML = 0;
  pending.innerHTML = 0;
  success.innerHTML = 0;

  flag = true;
  localStorage.clear();

  document.querySelector(".no-task").style.display = "block";
}

function toCheakIfTheValueExist(value) {
  let alltasksName = document.querySelectorAll(".tesks > .task > .task-name");

  for (let i = 0; i < alltasksName.length; i++) {
    if (alltasksName[i].innerHTML === value) {
      return true;
    }
  }
  return false;
}

//Set Dateils And Show Details Window
function showDetail(element) {
  textDescription.innerHTML = storeDetails[element.innerHTML][1];
  document.querySelector(".task-detail").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".task-detail").style.opacity = "1";
  }, 10);
}


function addDateToLocalStorge() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(arrayHaveAllInformationAboutTask)
  );
  localStorage.setItem("details", JSON.stringify(storeDetails));
}

function addElementFromLocalStorge() {
  if (arrayHaveAllInformationAboutTask.length < 1) {
    document.querySelector(".no-task").style.display = "block";
  } else {
    for (let task = 0; task < arrayHaveAllInformationAboutTask.length; task++) {
      addTaskAtContainerOfTasks(arrayHaveAllInformationAboutTask[task]);
    }
    showNumberOfTasksFromLocalStorge();
  }
}

function showNumberOfTasksFromLocalStorge() {
  total.innerHTML = storeDetails["listofnumbertask"][0];
  success.innerHTML = storeDetails["listofnumbertask"][1];
  pending.innerHTML = storeDetails["listofnumbertask"][2];
}

function addTaskAtContainerOfTasks(data) {
  let check = data["completed"] ? "active" : "";

  console.log(data)

  tasks.innerHTML =
    `
        <div class="task">
            <div class="task-name ${check}">${data["title"]}</div>
            <div class="status">
                <div class="color ${data["leveloftask"].toLowerCase()}"></div>
                <div class="status-name">${data["leveloftask"]}</div>
            </div>
            <div class="date">
                <i class="fas fa-calendar"></i>
                <div class="time">${data["dateoftask"]}</div>
            </div>
            <div class="delete">
                <input type="checkbox" id="finished" value=${data["title"]} ${
      data["completed"] ? "checked" : ""
    } >
                <i class="fas fa-trash-alt delete-task"></i>
            </div>
        </div>
    ` + tasks.innerHTML;
}

function upadateLocalStroge(bool, element) {
  
    seachAndModifyAnyElementWhichModfiy(element, bool);
    upadeNumberOftask();
    addDateToLocalStorge();
}

function seachAndModifyAnyElementWhichModfiy(element, bool) {
  for (let i = 0; i < arrayHaveAllInformationAboutTask.length; i++) {
    if (arrayHaveAllInformationAboutTask[i]["title"] === element.innerHTML) {
      arrayHaveAllInformationAboutTask[i]["completed"] = bool;
    }
  }
}

function finishedTask(element, bool) {
  if (bool) {
    element.setAttribute("checked", "checked");
    element.parentNode.parentNode
      .querySelector(".task-name")
      .classList.add("active");
    success.innerHTML = +success.innerHTML + 1;
    pending.innerHTML = +pending.innerHTML - 1;
  } else {
    element.removeAttribute("checked");
    element.parentNode.parentNode
      .querySelector(".task-name")
      .classList.remove("active");
    success.innerHTML = +success.innerHTML - 1;
    pending.innerHTML = +pending.innerHTML + 1;
  }
}

function upadeNumberOftask() {
  storeDetails["listofnumbertask"] = [
    total.innerHTML,
    success.innerHTML,
    pending.innerHTML,
  ];
}
