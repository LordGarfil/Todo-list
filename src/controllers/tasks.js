import "../styles.css";
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import navHtml from "../views/nav.html";
import searchTasks from "../views/searchTasks.html";
import tableTasks from "../views/tableTasks.html";

import $ from 'jquery';
import popper from 'popper.js';
import checkImg from "../images/check.png";
import deleteImg from "../images/delete.png";
const idUserSendTo = document.getElementById('txtIdTask');
const titleTask = document.getElementById('txtTitleTask');
const messageTask = document.getElementById('txtMessageTask');

var task = {};
var idUser;

const divRoot = document.getElementById('root');
const divTasks = document.getElementById('div-tasks');

window.onload = function(){
    
    const divNav = document.getElementById('div-nav');
    divNav.innerHTML = navHtml
    divRoot.insertAdjacentHTML('beforeend', tableTasks);

    idUser = document.getElementById('lblUserId');
    $.get("backend/userId.php", function(){

    }).done((res) => idUser.textContent = res)
      .fail(()=> idUser.textContent = '#000') 
}



window.addEventListener('hashchange', (e)=>{
    e.preventDefault();
    hashchange();
})

window.addEventListener('load', (e)=>{
    e.preventDefault();
    window.location.hash = "#Home";
})

function mostrar_searchTasks(){
    divRoot.innerHTML = searchTasks;
    divRoot.insertAdjacentHTML('beforeend', tableTasks);
    sendTask()
}

function mostrar_homeTasks(){
    divRoot.innerHTML = "";
    divRoot.appendChild(divTasks);
    divRoot.insertAdjacentHTML('beforeend', tableTasks);
}

function hashchange(){
    switch(location.hash){
        case '#Home':
            return mostrar_homeTasks();
        case '#Tasks':
            return mostrar_searchTasks();
    }
}

function sendTask() {

        task = {
            idUser: idUser.textContent,
            idUserSendTo: idUserSendTo.value,
            title: titleTask.value,
            message: messageTask.value
        }

        const divTask = document.getElementById('tbl-taskBody');
        divTask.innerHTML += `
        <tr>
                    
                    <td>${task.idUser}</td>
                    <td>${task.idUserSendTo}</td>
                    <td>${task.title}</td>
                    <td>
                    
                    <div class="d-flex">
                    <button type="button" class="ml-auto btn-icon"> <img class="" src=${checkImg}/> </button>

                    <button type="button" class="mr-auto btn-icon"> <img class="" src=${deleteImg}/> </button>
                    </div>

                    </td>
                  </tr>
        `;

        console.log(task);

        return task;
    
}

document.getElementById('frmTask').addEventListener('submit', (e)=>{ 
    e.preventDefault();
    sendTask();
});