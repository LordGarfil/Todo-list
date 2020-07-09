<?php

require_once 'conexion.php';
header("Access-Control-Allow-Origin: *");

$user = $_POST['user'] ?? null;
$pass =  $_POST['pass'] ?? null;

if($user && $pass){

$stmt = $pdo->prepare("SELECT user FROM users
WHERE user = ? and password = ?");     
$stmt->execute(array($user, $pass));
if($userLogin = $stmt->fetch()){
    echo($user);
}else{
    echo "$user no encontrado";
}
}