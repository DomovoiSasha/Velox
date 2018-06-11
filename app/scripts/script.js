(function(){
	'use strict'
	
	const menuBtn = $('.top-header__btn-menu');
	const menu = $('.main-nav');
	const prevReview = $('.reviews__prev-review');
	const nextReview = $('.reviews__next-review');
	const reviewsListLength = $('.review').length;
	const firstReview = $('.review').eq(0);
	const lastReview = $('.review').eq(reviewsListLength - 1);
	
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
	
	$(nextReview).bind('click', function(){
		let currentReview = $('.review:visible');
		let nextReview = $($(currentReview).next());
		
		$(currentReview).hide();
		if($(currentReview).index() == reviewsListLength-1){
			$(firstReview).show();
		} else {
			$(nextReview).show();
		}
	});	
	
	$(prevReview).bind('click', function(){
		let currentReview = $('.review:visible');
		let prevReview = $($(currentReview).prev());
		$(currentReview).hide();
		if($(currentReview).index() == 0) {
			$(lastReview).show();
		} else {
			$(prevReview).show();
		}
	});
	
	
	
	
})()