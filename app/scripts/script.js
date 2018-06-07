(function(){
	'use strict'
	
	const menuBtn = $('.top-header__btn-menu');
	const menu = $('.main-nav');
	
	$(menuBtn).click(function(e){
		$(menu).stop().slideToggle(400);
	});
	
})()