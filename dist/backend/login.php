<?php

session_start();
$_SESSION['userId'] = uniqid('', true);
echo $_SESSION['userId'];
