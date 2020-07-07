<?php

session_start();
$_SESSION['userId'] = "";
if($_POST){
    $_SESSION['userId'] = $_POST['token'] ?? "#000";
}

echo $_SESSION['userId'];