(function(){
	'use strict'
	
	const menuBtn = $('.top-header__btn-menu');
	const menu = $('.main-nav');
	
	$(menuBtn).click(function(e){
		$(menu).stop().slideToggle(400);
	});
	
	$('#tabs').tabs({
		event: "mouseover"
	});
	
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] 
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
	
})()