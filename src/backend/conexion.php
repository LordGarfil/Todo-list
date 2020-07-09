<?php

/* Conectar a una base de datos de MySQL invocando al controlador */
$dsn = 'mysql:dbname=bd_tasks;host=localhost';
$user = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}