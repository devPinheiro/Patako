//Javascript codes here!
//Author: Pinheiro Samuel

let singlePost = document.getElementById('button');
function nextPage() {
	if(singlePost){
		window.location = 'single.html';
	}	
};

let editPost = document.getElementById('new_button');
editPost.onclick = function() {
	window.location = 'edit.html';
};