<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);
ini_set('dispalay_startup_errors',1);
session_start();
if(isset($_SESSION['login'])) {
	echo $_SESSION['role'];
} else{
	echo 'fasdfasdf';
}
?>
