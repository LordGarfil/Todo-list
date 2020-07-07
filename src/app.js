import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "./controllers/login";
import registerForm from "./views/register.html";
import $ from "jquery";
import wave from "./images/wave.png";
import avatar from "./images/login.svg";

const { v4: uuid } = require("uuid");

const divRegister = document.getElementById("rootRegister");
var back = $("#backLogin");

window.onload = function (e) {
  e.preventDefault();
  loginImg();
  divRegister.insertAdjacentHTML("afterbegin" , registerForm);
  $(divRegister).hide();

  document.getElementById("backLogin").addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
  });

  document.getElementById("btnRegister").addEventListener("click", (e) => {
    e.preventDefault();
        

    var registrationInputs = {
      name : document.getElementById("txtName_registration").value,
      lastName : document.getElementById("txtLastName_registration").value,
      email : document.getElementById("txtEmail_registration").value,
      user : document.getElementById("txtUser_registration").value,
      password : document.getElementById("txtPassword_registration").value
    };

    validateRegistration(registrationInputs);
  });

  

};

//Register

document.getElementById("frmLogin").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

document.getElementById("aRegister").addEventListener("click", (e) => {
  e.preventDefault();
  showRegistration();
});

function validateRegistration(inputs = {}) { 
  let isEmpty = true;

  for(const element in inputs){
    
    if(Object.values(inputs[element])==""){
      isEmpty = true;
    }else{
      isEmpty = false;
    }

  };
  
  

  if(isEmpty){
    drawAlert("registerAlert", "danger", "Complete all fields.");    
  }else{   
    generateLog(inputs);    
  }
  
}

function drawAlert(id = "", typeAlert = "", message = ""){
  id = document.getElementById(id);
  id.classList.add("alert-" + typeAlert);
  id.innerHTML = message;

  $(id).show();

  setTimeout(()=>{
    $(id).hide("slow");
  }, 3000
  )}

function generateLog(aryLog = {}) {
  var logResult;
  $.ajax({
    url: "https://ipapi.co/json/",
    type: "GET",
    success: (data) => {
      logResult = {
        name: aryLog['name'],
        lastName: aryLog['lastName'],
        email: aryLog['email'],
        user: aryLog['user'],
        password: aryLog['password'],
        token: uuid(),
        ip: data["ip"],
        city: data["city"],
        region: data["region"],
        country: data["country_name"],
        network: data["org"],
        codePostal: data["postal"],
        userAgent: navigator.userAgent,
      };
      $.ajax({
        url: "http://localhost:80/createUser.php",
        //url: "./createUser.php",
        type: "POST",
        data: logResult,
        success: (res) => {
          return window.location.href = "./mainTasks.html";
        },
      });
    },
  });
}

function loginImg() {
  const divWave = document.getElementById("div-wave");
  const waveImg = new Image();
  waveImg.src = wave;
  waveImg.classList.add("wave");
  divWave.appendChild(waveImg);

  const divAvatar = document.getElementById("div-avatar");
  const avatarImg = new Image();
  avatarImg.src = avatar;
  divAvatar.appendChild(avatarImg);
}

function showRegistration() {
  $(divRegister).show();
  $("#frmLogin").hide();
  $("#div-wave").hide();
  $("#div-avatar").hide();

  $("#registerAlert").hide();

  }

function showLogin() {
  $(divRegister).hide();
  $("#frmLogin").show();
  $("#div-wave").show();
  $("#div-avatar").show();

  $(divRegister).hide();
}

export { drawAlert };