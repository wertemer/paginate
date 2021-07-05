var base = document.getElementById('Paginator');
var selector = '.pgBtn';
base.addEventListener('click', function(event) {
	//console.log(taskid);
	if (event.target.matches(selector)) {
		indexview(event.target.innerHTML);
	}
});
var viewtask= document.getElementById('view-tasks');
var seltask = '.edTask';
var taskid =null;
viewtask.addEventListener('click', function(event) {
	if (event.target.matches(seltask)) {
		var result=$.ajax({
			url:'./php/gettask.php',
			type:'post',
			data:{
				task:event.target.value
			},
			dataType:'json'
		});
		result.done(function(data){
			$('#taskid').val(data['taskid']);
			if(data['complete']==1){
				$('#edStatus').prop('checked', true);
			} else {
				$('#edStatus').prop('checked', false);
			}
			//$('#edUser').val(data['userid']);
			taskid=data['userid'];
			//$('#edUser').val(taskid);
			//$('#edUser option[value="2"]').attr('selected',true).change();
			//$('select[name=edUser] option[value='+data['userid']+']').attr('selected','selected');
			//$("#edUser option[value='"+data['userid']+"']").prop('selected', true);
			//document.getElementById("#edUser").selectedIndex = data['userid'];
			$('#edUser option[value="'+data['userid']+'"]').prop('selected', true);
			$('#edTitle').val(data['title']);
			$('#eddesc').val(data['desc']);
		});
		result.fail(function(jqXHR,textStatus){
			//console.log(textStatus);
			//console.log(jqXHR);
		});
	}
});
$('#AddTaskModal').on('show.bs.modal',function(){
	var result=$.ajax({
		url:'./php/fillform.php',
		type:'POST',
		data:{
			'fill':1
		},
		dataType:'json',
		success: function(data){
			html='';
			html+='<option value="">нет</option>';
			if(data['status']==0){
				for(i=0;i<data['list'].length;i++){
					html+='<option value="'+data['list'][i]['id']+'">'+data['list'][i]['login']+'</option>';
				}
				$('#addworker').html(html);
			} else {
				//console.log(data['msg']);
			}
		},
		error: function (jqXHR, exception) {
			//
		}
	});
});
function addtask(){
	var worker=$('#addworker').val();
	var title=$('#addtitle').val();
	var text=$('#addtext').val();
	if(worker==''){
		worker=null;
	}
	$('#AddTaskModal').modal('hide');
	var result=$.ajax({
		url:'./php/addtask.php',
		type:'POST',
		data:{
			addworker:worker,
			addtitle:title,
			addtext:text
		},
		dataType:'text'
	});
	result.done(function(data){
		alert(data);
		window.location.reload();
	});
	result.fail(function(jqXHR,textStatus){
		//console.log(testStatus);
	});
}
$('#AddTaskModal').on('hidden.bs.modal',function(){
	$('#addworker').val('');
	$('#addtitle').val('');
	$('#addtext').val('');
});
function indexview(page){
	var result=$.ajax({
		url:'./php/adminview.php',
		type:'post',
		data:{
			view:'view',
			page:page,
		},
		dataType:'json'
	});
	result.done(function(data){
		html='';
		html_pg='';
		if(data['status']==0){
			for(i=0;i<data['list'].length;i++){
				html+='<div class="row">';
				html+='<div class="col-md-6"><strong>Пользователь: '+data['list'][i]['user']+'</strong></div>';
				html+='<div class="col-md-6">e-mail:'+data['list'][i]['email']+'</strong></div>';
				html+='</div>';
				html+='<div class="row">';
				html+='<div class="col-md-6"><strong> Статус : '+data['list'][i]['complete']+'</strong></div>';
				html+='<div class="col-md-6"><button class="btn btn-secondary edTask" name="edTask" value="'
					+data['list'][i]['taskid']
					+'" data-toggle="modal" data-target="#EditTaskModal">Изменить</button></div>';
				html+='</div>';
				html+='<div class="row">';
				html+='<div class="col-md-12"><strong> Задача: '+data['list'][i]['title']+'</strong></div>';
				html+='</div>';
				html+='<div class="row line">';
				html+='<div class="col-md-12"><strong>Описание:</strong>'+data['list'][i]['desc']+'</div>';
				html+='</div>';
			}
		}
		if(data['status']==3){
			document.location.href = "index.html";
		}
		$('#view-tasks').html(html);
		//пагинация
		html_pg+='<div class="col-md-12">';
		for(j=1;j<=data['count_page'];j++){
			if(data['page']==j){
				html_pg+='<button class="btn btn-primary pgBtn" name="pgBtn">';
			}else{
				html_pg+='<button class="btn btn-secondary pgBtn" name="pgBtn">';
			}
			html_pg+=j;
			html_pg+='</button>';
		}
		html_pg+='</div>';
		$('#Paginator').html(html_pg);
	});
	result.fail(function(jqXHR,textStatus){
		//console.log(textStatus);
		//console.log(jqXHR);
	});
}

$(document).ready(function(){
	indexview(1);
});
$('#EditTaskModal').on('shown.bs.modal',function(){
	taskid=null;
});
$('#EditTaskModal').on('show.bs.modal',function(){
	var result=$.ajax({
		url:'./php/fillform.php',
		type:'POST',
		data:{
			'fill':1
		},
		dataType:'json',
		success: function(data){
			html='';
			html+='<option value="">нет</option>';
			if(data['status']==0){
				for(i=0;i<data['list'].length;i++){
					if(taskid==data['list'][i]['id']){
						html+='<option value="'+data['list'][i]['id']+'" selected>'
							+data['list'][i]['login']+'</option>';
					}else{
						html+='<option value="'+data['list'][i]['id']+'">'+data['list'][i]['login']+'</option>';
					}
				}
				$('#edUser').html(html);
			} else {
				//console.log(data['msg']);
			}
		},
		error: function (jqXHR, exception) {
			//
		}
	});
});
$('#EditTaskModal').on('hiden.bs.modal',function(){
	//taskid=0;
});

function edittask(){
	var worker=$('#edUser').val();
	var title=$('#edTitle').val();
	var text=$('#eddesc').val();
	var complete=0;
	if ($('#edStatus').is(':checked')){
		complete=1;
	} else {
		complete=0;
	}
	var task=$('#taskid').val();

	$('#EditTaskModal').modal('hide');
	var result=$.ajax({
		url:'./php/edittask.php',
		type:'POST',
		data:{
			taskid:task,
			worker:worker,
			title:title,
			text:text,
			complete:complete
		},
		dataType:'text'
	});
	result.done(function(data){
		alert(data);
		window.location.reload();
	});
	result.fail(function(jqXHR,textStatus){
		//console.log(testStatus);
	});
}

$('#btnLogout').on('click',function(){
	var result=$.ajax({
		url:'./php/loggout.php',
		type:'post',
		data:{
			logout:1
		},
		dataType:'json'
	});
	result.done(function(data){
		if(data['status']==1){
			document.location.href = "index.html";
		}
	});
	result.fail(function(jqXHR,textStatus){
		//console.log(textStatus);
		//console.log(jqXHR);
	});
});
