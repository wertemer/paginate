<?php
	$status=array(
		'status'=>0
	);
	if($_POST['logout']==1){
		session_start();
		$_SESSION['login']='';
		$_SESSION['role']='';
		session_destroy();
		$status['status']=1;
	}
	echo json_encode($status);
?>
