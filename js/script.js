var base = document.getElementById('Paginator');
var selector = '.pgBtn';
base.addEventListener('click', function(event) {
	if (event.target.matches(selector)) {
		indexview(event.target.innerHTML);
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
			/*if (jqXHR.status === 0) {
				alert('Not connect. Verify Network.');
			} else if (jqXHR.status == 404) {
				alert('Requested page not found (404).');
			} else if (jqXHR.status == 500) {
				alert('Internal Server Error (500).');
			} else if (exception === 'parsererror') {
				alert('Requested JSON parse failed.');
			} else if (exception === 'timeout') {
				alert('Time out error.');
			} else if (exception === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error. ' + jqXHR.responseText);
			}*/
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
$('#LoginInModal').on('hidden.bs.modal',function(){
	$('#edLogin').val('');
	$('#edPassword').val('');
});
$(document).ready(function(){
	indexview(1);
});
function indexview(page){
	var result=$.ajax({
		url:'./php/indexview.php',
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
				html+='<div class="col-md-12"><strong> Статус : '+data['list'][i]['complete']+'</strong></div>';
				html+='</div>';
				html+='<div class="row">';
				html+='<div class="col-md-12"><strong> Задача: '+data['list'][i]['title']+'</strong></div>';
				html+='</div>';
				html+='<div class="row line">';
				html+='<div class="col-md-12"><strong>Описание:</strong>'+data['list'][i]['desc']+'</div>';
				html+='</div>';
			}
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
function logginig(){
	var login=$('#edLogin').val();
	var password=$('#edPassword').val();
	var result=$.ajax({
		url:'./php/logging.php',
		type:'post',
		data:{
			login:login,
			password:password
		},
		dataType:'json'
	});
	result.done(function(data){
		if(data['status']==0&&data['role']=='Administrator'){
			document.location.href = "admin.html";
		}
		if(data['status']==1){
			alert(data['msg']);
		}
		if(data['status']==2){
			alert(data['msg']);
		}
		if(data['status']==3){
			alert(data['msg']);
			$('#LoginInModal').modal('hide');
		}
	});
	result.fail(function(jqXHR,textStatus){
		//console.log(textStatus);
		//console.log(jqXHR);
	});
}
