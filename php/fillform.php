<?php
$workers=array(
	'status'	=> 0,
	'msg'	=> '',
	'list' => []
);
if(isset($_POST['fill'])){
	$db = new PDO('mysql:host=localhost;dbname=zadachi', 'root', 'gothic1321');
	if($db){
		$res=$db->query('
			select u.id, u.login
			from users as u
			left join roles as r on r.id=u.f_role
			where r.name="worker"
		');
		if($res){
			$workers['status']=0;
			$workers['msg']='Список работников получен.';
			foreach($res as $item){
				$workers['list'][]=array(
					'id'	=> $item['id'],
					'login'	=> $item['login']
				);
			}
		} else {
			$workers['status']=1;
			$workers['msg']='Ошибка получения списка работников.';
		}
	} else {
		$workers['status']=2;
		$workers['msg']='Ошибка подключения!.';
	}
	$db = null;
} else {
	$workers['status']=3;
	$workers['msg']='Доступ запрещен';
}
echo json_encode($workers);
?>
