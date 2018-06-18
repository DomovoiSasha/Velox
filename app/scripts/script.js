(function(){
	'use strict'
	
	const menuBtn = $('.top-header__btn-menu');
	const menu = $('.main-nav');
	const prevReview = $('.reviews__prev-review');
	const nextReview = $('.reviews__next-review');
	const reviewsListLength = $('.review').length;
	const firstReview = $('.review').eq(0);
	const lastReview = $('.review').eq(reviewsListLength - 1);
	const feedbackForm = $('.feedback-form');
	const feedbackName = $('.feedback-form__input-name');
	const feedbackSubject = $('.feedback-form__input-subject');
	const feedbackMessage = $('.feedback-form__input-message');
	const links404 = $('a[href="#"]');
	const modalForm = $('.modal-form');
	const modalLink = $('.modal-link');
	const btnUp = $('.main-footer__up-btn');
	
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
	
	let nameValid = function () {
		let pattern = new RegExp(/^[a-zA-Zа-яА-Я]+$/);
		if (feedbackName.val() != '') {
			if (feedbackName.val().search(pattern) == 0) {
				$(feedbackName).css({'color': '#ffffff'});
				return true;
			}else{
				$(feedbackName).css({'color': 'red'});
				return false;
			}
		} else {
			return false;
		}
	};
	
	let subjectValid = function () {
		let pattern = new RegExp(/^[a-zA-Zа-яА-Я]+$/);
		if (feedbackSubject.val() != '') {
			if (feedbackSubject.val().search(pattern) == 0) {
				$(feedbackSubject).css({'color': '#ffffff'});
				return true;
			}else{
				$(feedbackName).css({'color': 'red'});
				return false;
			}
		} else {
			return false;
		}
	};
	
	let messageValid = function () {
		if (feedbackMessage.val() != '') {
			return true;
		} else {
			return false;
		}
	};
	
	$(feedbackName).bind('blur', function(e){
		nameValid();
	});
	
	$(feedbackSubject).bind('blur', function(e){
		subjectValid();
	});
	
	$(feedbackMessage).bind('blur', function(e){
		messageValid();
	});
	
	$(feedbackForm).submit(function () {
		event.preventDefault();
		nameValid ();
		subjectValid ();
		messageValid ();
		if ( nameValid () && subjectValid () && messageValid ()) {
			$(modalForm).show();
		} else {
			return false;
		}
		
	});
	
	$(modalForm).click(function () {
		$(this).hide();
	});
	
	$(modalLink).click(function () {
		$(this).hide();
	});

	$(document).keydown(function (e) {
		if (e.which === 27) {
			$(modalForm).hide();
			$(modalLink).hide();
		}
	});
	
	$(links404).bind('click', function(){
		event.preventDefault();
		$(modalLink).show();
	});
	
	$(btnUp).click(function(){
		$('body,html').animate({scrollTop:0},900);
	});
	
})()