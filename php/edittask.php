<?php
$task=$_POST['taskid'];
$title=$_POST['title'];
$complete=$_POST['complete'];
$text=$_POST['text'];
$user=$_POST['worker'];
$msg='';
if(isset($task)){
	$db=new PDO('mysql:host=localhost;dbname=zadachi','root', 'gothic1321');
	if($db){
		if($user){
			$res=$db->query('
				update tasks set
					name="'.$title.'",
					desciption="'.$text.'",
					is_complete='.(int)$complete.',
					f_user='.$user.'
				where id='.$task.'
			');
		} else {
			$res=$db->query('
				update tasks set
					name="'.$title.'",
					desciption="'.$text.'",
					is_complete='.(int)$complete.',
					f_user=NULL
				where id='.$task.'
			');
		}

		if($res){
			$msg='Задача изменена';
		}
	}else{
		$msg='Ошибка содединения';
	}
	$db=null;
}
echo $msg;
?>
