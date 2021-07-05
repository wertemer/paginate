<?php
$worker=$_POST['addworker'];
$title=$_POST['addtitle'];
$desc=$_POST['addtext'];
$msg='';
$db=new PDO('mysql:host=localhost;dbname=zadachi','root', 'gothic1321');
if($db){
	if(is_null($worker)||$worker==''){
		$res=$db->query('insert into tasks(name,desciption,f_user)
			values("'.$title.'","'.$desc.'",NULL)');
	} else {
		$res=$db->query('insert into tasks(name,desciption,f_user)
			values("'.$title.'","'.$desc.'",'.$worker.')');
	}
	if($res){
		$msg='Новая задача создана.';
	} else {
		$msg='Ошибка добавления задачи!';
	}
}else{
	$msg='Ошибка подключения';
}
$db=null;
echo $msg;
?>
