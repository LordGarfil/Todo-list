import $ from "jquery";
import {drawAlert} from "../app";

const loginInputs = {
  user : document.getElementById("txtUser_login"),
  pass : document.getElementById("txtPass_login")
};

function login() {
validateLogin(loginInputs)
}

function validateLogin(inputs = {}){
  let isEmpty = true;

  for(const element in inputs){
    
    if(Object.values(inputs[element].value)==""){
      isEmpty = true;
    }else{
      isEmpty = false;
    }    
  };
  if(isEmpty){
    drawAlert("loginAlert", "danger", "Complete all fields.");
  }else{
    $.ajax({
      url: "http://localhost:80/Users_API/login.php",
      type: 'POST',
      data: inputs['user'].value,
      success: function(res){
        if(userLogin.user == res){
          return window.location.href = "./mainTasks.html";
        }else{
          alert('Wrong')
        }     
      }
    });
  }
}

export { login };
