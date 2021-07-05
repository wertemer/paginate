<?php
//определяем текущую страницу
if (isset($_POST['page'])){
   $page = (int)$_POST['page'];
	if($page==0){
		$page=1;
	}
}else {
	$page = 1;
}
//колличество элементов на странице
$count_items=3;
//определяем, с какой записи нам выводить
$start = ($page * $count_items) - $count_items;
//общее количество задач
$count=1;
//колличество страниц
$count_pages=1;
//список задач для вывода
$tasks=array(
	'status'	=> 0,
	'msg'	=> '',
	'page'	=> $page,
	'count_items'	=> $count_items,
	'count_page'	=> $count_pages,
	'count_tasks'	=> $count,
	'list' => []
);
if(isset($_POST['view'])){
	$db = new PDO('mysql:host=localhost;dbname=zadachi', 'root', 'gothic1321');
	if($db){
		$res=$db->query('
			select t.name,t.is_complete,t.desciption,u.login,u.email
			from tasks as t
			left join users as u on u.id=t.f_user
			limit '.$start.','.$count_items.'
		');
		//определяем колличество созданных задач
		$cnt=$db->query('select count(*) from tasks;');
		foreach($cnt as $c){
			$count=$c[0];
		}
		//получаем колличество страниц
		$count_pages = ceil($count/$count_items);
		if($res){
			$tasks['status']=0;
			$tasks['msg']='Список созданных задач получен.';
			$tasks['page']	= $page;
			$tasks['count_items']	= $count_items;
			$tasks['count_page']	= $count_pages;
			$tasks['count_tasks']	= $count;
			foreach($res as $item){
				$tasks['list'][]=array(
					'title'	=> $item['name'],
					'desc'	=> $item['desciption'],
					'complete'	=> $item['is_complete']==1 ? 'завершена' : 'в работе',
					'user'	=> $item['login'] ? $item['login'] : 'не назначен',
					'email'	=> $item['email'] ? $item['email'] : 'не задан'
				);
			}
		} else {
			$tasks['status']=1;
			$tasks['msg']='Ошибка получения списка задач';
		}
	} else {
		$tasks['status']=2;
		$tasks['msg']='Ошибка подключения';
	}
	$db = null;
}
echo json_encode($tasks);
?>
