<?php
$login=$_POST['login'];
$password=$_POST['password'];
$msg='';
$result=array(
	'status'	=> 0,
	'msg'	=> '',
	'role'	=> ''
);
$db=new PDO('mysql:host=localhost;dbname=zadachi','root', 'gothic1321');
if($db){
	$exists=$db->query('
		select u.login,u.password,r.name
		from users as u
		left join roles as r on r.id=u.f_role
		where u.login="'.$login.'"
		limit 1
	');
	if($exists){
		if($exists->rowCount()>0){
			foreach($exists as $user){
				if($user['password']!=$password){
					$msg='Введен не верный пароль.';
					$result['status']=1;
				}else{
					$result['status']=0;
					$result['role']=$user['name'];
					session_start();
					$_SESSION['login'] = $login;
					$_SESSION['role'] = $user['name'];
				}
			}
		}else{
			$msg='Введен не верный логин.';
			$result['status']=2;
		}
	}
}else{
	$msg='Ошибка подключения';
	$result['status']=3;
}
$result['msg']=$msg;
$db=null;
echo json_encode($result);
?>
