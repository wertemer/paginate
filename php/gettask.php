<?php
$taskid=$_POST['task'];
$msg='';
$result=array(
	'status'	=> 0,
	'msg'	=> ''
);
$db=new PDO('mysql:host=localhost;dbname=zadachi','root', 'gothic1321');
if($db){
	$res=$db->query('
		select t.*, u.login from tasks as t left join users as u on u.id=t.f_user where t.id='.$taskid.'
	');
	if($res){
		$result['status']=0;
		$result['msg']='Данные получены.';
		foreach($res as $item){
			$result['taskid']=$item['id'];
			$result['title']=$item['name'];
			$result['desc']=$item['desciption'];
			$result['complete']=$item['is_complete'];
			$result['userid']=$item['f_user'];
			$result['user']=$item['login'];
		}
	}else{
		$result['status']=1;
		$result['msg']='Ошибка получения задачи';
	}
}else {
	$result['status']=2;
	$result['msg']='Ошибка подключения';
}
$db=null;
echo json_encode($result);
?>
