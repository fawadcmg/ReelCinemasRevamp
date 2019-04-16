var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
	winWidth = viewport().width,
	winHeight = viewport().height,
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight(),
	bodyHeight,
	bodyTopPos,
	isIE = detectIE(),
	scrollHeight = 0,
	isMobile,
	movieListAnimating = false,
	heightMediaJumps = [1800,
		1600,
		1200,
		820,
		800,
		780,
		760,
		750,
		740,
		720,
		700,
		675,
		670,
		660,
		650,
		610,
		600,
		590,
		585,
		580,
		575,
		570,
		550,
		520,
		500,
		400];

changeToListViewInMob();
hideTabsId();
mobilecheck();
charLimitInit();
ChangeToSvg();
setOnTopClass();
initBgVideo();
initSlick();
headerSpace();
adjustContentList2();
removeLoaderInMob();
onlyPortrait(1);
addVideoPlugin();
customPhoneInput();
adjustForm();

$(function () {
	locMapInit();
	winDimensions();
	heightMediaQuery();
	ChangeToSvg();
    footerLogosCarousel(true);
	headerAdjust();
	movieListSetHTML();
	movieList();
	layerTabsAdjustment();
	tabs();
	js2LayerTabs();
	activeHashTab();
	sideNav();
	animWrapHeight();
	bindPopupEve();
	setOnTopClass();
	customSelectBox();
	filterSearch();
	scrollTo();
	bgMobImg();
	movieListSty1AutoCloseEvent();
	customScrollInit();
	addingAOSData();
	initSelect2();
	// mainNavClicksForMap();
	// calcScrollHeightDOM();
	heightMediaQuery();
	adjustContentList2();
	navDropDownHeight();
	filterCustomScroll();

	$('.c-loader').fadeOut('slow', function () {
	    if(winWidth > 1024){
		   AOS.init({
			once: true,
			offset: 0,
		   });
	    }
	});
});

//On Window Load
$(window).on('load', function () {
	 // calcBodyarea();
    footerLogosCarousel(true);
	setTimeout(function () {
		AOS.refresh();
		// fixMobileCarouselWrongDisplay();
		movieListSetDropDownPos();
		// calcScrollHeightDOM();
		heightMediaQuery();
	}, 200);
	navDropDownHeight();
});

//On Window Resize
var resizeTimer, resizeTimer1;
$(window).on('resize orientationchange', function () {
	// winDimensions();
	animWrapHeight();
	// onlyPortrait();
	clearTimeout(resizeTimer1);
	var resizeTimer1 = setTimeout(function() {
		mobilecheck();
		bgMobImg();
		// onlyPortrait();
	}, 250);
	if(winWidth != viewport().width){
		winDimensions();
		heightMediaQuery();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();
		adjustContentList2();
		removeLoaderInMob();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			winDimensions();
			mobilecheck();
			animWrapHeight();
			heightMediaQuery();
			movieListSetHTML();
			onlyPortrait();
			initSlick();
			filterCustomScroll();
			// calcScrollHeightDOM();
		}, 250);
		// movieListCarousel();
		// calcScrollHeightDOM();
	}else{
		winDimensions();
	}

	changeToListViewInMob();
	navDropDownHeight();
	adjustForm();
});

/*function calcScrollHeightDOM() {
	var body = document.body,
	    html = document.documentElement;

	scrollHeight = Math.max( body.scrollHeight, body.offsetHeight, 
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );
}*/

/*$(window).on('scroll', function () {
	var currentScroll = $(window).scrollTop();
	if((currentScroll + winHeight) >= scrollHeight){
		refreshAOS('refresh');
	}
});*/

//On Scroll
$(window).on('scroll', function () {
   setOnTopClass();
});


//Escape Functionality
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
    	$('html').removeClass('side-nav-is-open');
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select input[type="text"]').blur();

        closePopup();

        movieListSty1Close();
    }
});

//CLick on body
// $(document).on('click touchstart', function (e) {
	/*if ($(e.target).closest('.js-langSelector').length === 0) {
		$('.js-langSelector').find('ul').removeClass('active');
	}*/
// });

function customScrollInit() {
	if(winWidth > 1024){
		$(".js-custom-scroll").mCustomScrollbar({
			theme: "minimal-dark"
		});
		$('.js-custom-scroll-hoz').mCustomScrollbar({
			axis:"x",
			theme: "minimal-dark"
		});
	}
}

function setOnTopClass() {
   if($(window).scrollTop() === 0) {
		$('html').removeClass('not-at-top');
   }else{
   		$('html').addClass('not-at-top');
   }
}
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
function winDimensions() {
	winWidth = viewport().width,
	winHeight = viewport().height,
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight();
}
function ChangeToSvg() {
	$('img.js-inline-svg').each(function () {
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	    $.get(imgURL, function (data) {
	      var $svg = $(data).find('svg');
	      if (typeof imgID !== 'undefined') {
	        $svg = $svg.attr('id', imgID);
	      }
	      if (typeof imgClass !== 'undefined') {
	        $svg = $svg.attr('class', imgClass + ' insvg');
	      }
	      $svg = $svg.removeAttr('xmlns:a');
	      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	      }
	      $img.replaceWith($svg);
	    }, 'xml');
	});
}
function loadPath() {
	var currentLoc = window.location.pathname.split('/')[1];
    $('.secondary-nav a[href="'+currentLoc+'"]').addClass('active');
}
function actionsOnClick() {
	$('.js-langSelector').on('click', function(e){
		e.preventDefault();
		$(this).find('ul').toggleClass('active');
	});
}
function calcBodyarea() {
	bodyHeight = winHeight - headerHeight - footerHeight;
	$('.js-page-body').css('min-height', bodyHeight)
}

function unSlick(target) {
	if($(target).hasClass('slick-initialized')){
		$(target).slick('unslick');
	}
}
function initSlick() {
	unSlick('.js-banner-1a');
	$('.js-banner-1a').slick({
		arrows: true,
		fade: true,
		asNavFor: '.js-banner-1b',
	});
	
	// for places where txt will act as bullets like food page.
	var banner1bDots = true;
	if($('.carousel-txt-controls').get(0)){
		banner1bDots = false;
	}

	unSlick('.js-banner-1b');
	$('.js-banner-1b').slick({
		arrows: false,
		dots: banner1bDots,
		asNavFor: '.js-banner-1a',
	});

	if($('.js-banner-1-txt-controls').get(0)){
		$('.js-banner-1b').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.js-banner-1-txt-controls li').removeClass('is--active');
			$('.js-banner-1-txt-controls li:nth-child('+(nextSlide+1)+')').addClass('is--active');
		});
		$('.js-banner-1-txt-controls a').click(function (e) {
			e.preventDefault();
			var thisIndex = $(this).parent().index();
			$('.js-banner-1b').slick('slickGoTo', thisIndex);
		});
	}

	unSlick('.js-banner-2');
	$('.js-banner-2').slick({
		arrows: true,
	});

	unSlick('.js-offer-carousel');
	$('.js-offer-carousel').slick({
		slidesToShow: 4,
		arrows: false,
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					      	focusOnSelect: true,
					      	slidesToShow: 1,
					      }
					    },
				   	],
	});

	unSlick('.js-offer-carousel-1');
	$('.js-offer-carousel-1').slick({
		slidesToShow: 5,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
					    {
					      breakpoint: 1023,
					      settings: {
					      	focusOnSelect: true,
					      	slidesToShow: 3,
					      }
					    },
					    {
					      breakpoint: 768,
					      settings: {
					      	focusOnSelect: true,
					      	slidesToShow: 1,
					      }
					    },
				   	],
	});

	// Main Carousel
	$('.js-main-carousel-thumb .item img').each(function () {
		var imgUrl = $(this).attr('src');
		imgUrl = "url("+ imgUrl.replace(/\\/g,"/") +")";
		$(this).closest('.img').attr('style', 'background-image: '+ imgUrl + ';');
		$(this).closest('.item').find('.img-reflection').attr('style', 'background-image: '+ imgUrl + ';');
	});

	unSlick('.js-main-carousel');
	$('.js-main-carousel').slick({
		arrows: true,
		infinite: true,
		fade: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.js-main-carousel-thumb',
	});

	unSlick('.js-main-carousel-thumb');
	$('.js-main-carousel-thumb').on('init reInit', function(event, slick, currentSlide, nextSlide){
		var slideToShow = 6;
		if(winWidth <= 1200){
			slideToShow = 5;
		}else if(winWidth <= 920){
			slideToShow = 4;
		}
		if(slick.slideCount <= slideToShow){
			$(event.currentTarget).addClass('has--fixed-width');
		}else{
			$(event.currentTarget).removeClass('has--fixed-width');
		}
	});
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 7,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 600,
		infinite: true,
		asNavFor: '.js-main-carousel',
		focusOnSelect: true,
		responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 5,
				touchThreshold: 6,
		      }
		    },
		    {
		      breakpoint: 920,
		      settings: {
		        slidesToShow: 4,
				touchThreshold: 5,
		      }
		    },
	    ]
	});
	$('.js-main-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if(nextSlide == 0 || nextSlide == slick.slideCount-1){
			$('.js-main-carousel-thumb').slick('slickGoTo', nextSlide);
		}
	});

	unSlick('.js-nav-carousel');
	$('.js-nav-carousel').slick({
		dots: true,
		arrows: true,
	});
	$('.js-tile-inner-carousel').each(function () {
		var imgSelector = $(this).closest('.c-content-tiles').find('.js-content-bg-img-carousel');
		if(imgSelector.get(0)){
			unSlick(this);
			$(this).slick({
				dots: true,
				arrows: false,
				asNavFor: imgSelector,
			});
			unSlick(imgSelector);
			$(imgSelector).slick({
				dots: false,
				arrows: false,
				fade: true,
				asNavFor: $(this),
			});
		}else{
			unSlick(this);
			$(this).slick({
				dots: true,
				arrows: false,
			});
		}
	});
	
	// EXP Carousel
	$('.js-exp-carousel').on('init', function(slick){
		var _slick = slick;
		setTimeout(function() {
			var innerVideo = $(_slick.currentTarget).find('.slick-current video');
			if(innerVideo.get(0)){
				innerVideo[0].play();
			}else if($(_slick.currentTarget).find('.slick-current iframe').get(0)){
				var _self = _slick.currentTarget;
				setTimeout(function() {
					$(_self).find('.slick-current iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				}, 1000);
			}
		}, 1000);
	});

	unSlick('.js-exp-carousel');
	$('.js-exp-carousel').slick({
		arrows: false,
		fade: true,
		asNavFor: '.js-exp-carousel-thumb',
		infinite: false,
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
							fade: false,
					        infinite: true,
					      }
					    },
				   	],
	});

	unSlick('.js-exp-carousel-thumb');
	$('.js-exp-carousel-thumb').slick({
		arrows: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		swipeToSlide: true,
		touchThreshold: 6,
		asNavFor: '.js-exp-carousel',
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					        slidesToShow: 1,
							touchThreshold: 2,
					        slidesToScroll: 1,
					        infinite: true,
					        focusOnSelect: true,
							swipeToSlide: true,
					      }
					    },
				   	],
	});

	$('.js-exp-carousel').on('beforeChange', function(slick, currentSlide, nextSlide){
		var videoTag = $(slick.currentTarget).find('.slick-current video');
		if(videoTag.get(0)){
			videoTag[0].pause();
		}else if($(slick.currentTarget).find('.slick-current iframe').get(0)){
			$(slick.currentTarget).find('.slick-current iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}
	});

	$('.js-exp-carousel').on('afterChange', function(slick, currentSlide){
		var videoTag = $(slick.currentTarget).find('.slick-current video');
		if(videoTag.get(0)){
			videoTag[0].play();
		}else if($(slick.currentTarget).find('.slick-current iframe').get(0)){
			$(slick.currentTarget).find('.slick-current iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}
	});

	$('.js-exp-carousel-thumb .item, .js-exp-carousel-thumb .slick-slide').click(function (e) {
		e.preventDefault();
		if($(this).hasClass('slick-slide')){
			var thisIndex = $(this).attr('data-slick-index');
		}else{
			var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
		}
		$('.js-exp-carousel').slick('slickGoTo', thisIndex);
	});


	/*if (isRTL) {} else {
	    var bannerPrev = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="assets/img/icons/angle-left.svg" alt="caret-left" class="toSvg js-inline-svg svgWhite" /></button>'
	    var bannerNext = '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="assets/img/icons/angle-right.svg" alt="caret-right" class="toSvg js-inline-svg svgWhite" /></button>'
	}
	$('.js-eventsCarousel').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		fade: false,
		infinite: true,
		centerMode: true,
		centerPadding: '0',
		rtl: isRTL,
		appendArrows: '.eventsCarouselNav',
		prevArrow: bannerPrev,
		nextArrow: bannerNext,
	});
	$('.js-captionSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		draggable: false,
		infinite: false,
		rtl: isRTL,
		asNavFor: '.js-figureSlider, .js-figureCaptionSlider',
	});
	$('.js-figureSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		fade: false,
		infinite: false,
		rtl: isRTL,
		appendArrows: '.homeCarouselNav',
		prevArrow: bannerPrev,
		nextArrow: bannerNext,
		asNavFor: '.js-captionSlider, .js-figureCaptionSlider',
	});
	$('.js-figureCaptionSlider').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: false,
		draggable: false,
		infinite: false,
		rtl: isRTL,
		asNavFor: '.js-captionSlider, .js-figureSlider',
	});*/

	unSlick('.js-date-time');
	$('.js-date-time').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 7,
		slidesToScroll: 1,
		swipeToSlide: true,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 5,
		        dots: false
		      }
		    },
		    {
		      breakpoint: 767,
		      settings: {
		      	arrows: false,
		        slidesToShow: 5,
		        touchThreshold: 6,
		      }
		    },
	  	]
	});

	$('.js-date-time').on('init', function(slick){
		$('.js-date-time .dboxelement').eq(0).addClass('active');
	});

	unSlick('.time-itemss');
	$('.time-itemss').slick({
	  dots: false,
	  infinite: false,
	  speed: 300,
	 slidesToShow: 3,
	  slidesToScroll: 1,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 4,
	        slidesToScroll: 1,
			  arrows:false
	      }
	    }
	   
	  ]
	});
	if(winWidth < 767){
		// $('.js-mob-center-slider').css('opacity', 0);
		$('.js-mob-center-slider').on('init', function(slick){
			_slick = slick;
			if($('.c-maps-sec').get(0)){
				$(_slick.currentTarget).find('.is--active').each(function () {
					if($(this).closest('.slick-slide:not(.slick-cloned)').get(0)){
						var thisIndex = parseInt($(this).closest('.slick-slide').attr('data-slick-index'));
						setTimeout(function() {
							$('.js-mob-center-slider').slick('slickGoTo', thisIndex, true);
							// $('.js-mob-center-slider').css('opacity', '');
						}, 500);
					}
				});
			}else{
				// $('.js-mob-center-slider').css('opacity', '');
			}
		});

		unSlick('.js-mob-center-slider');
		$('.js-mob-center-slider').slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: true,
			speed: 400,
		});
		$('.js-mob-center-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			// $('.js-mob-center-slider [data-slick-index="'+nextSlide+'"] a').trigger('click');
		});
	}else{
		unSlick('.js-mob-center-slider');
	}

	unSlick('.js-exp-carousel-2');
	$('.js-exp-carousel-2').slick({
		arrows: false,
		focusOnSelect: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 6,
		touchThreshold: 6,
		responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			      	slidesToShow: 1,
			      	swipeToSlide: true,
					touchThreshold: 5,
			      }
			    },
		   	],
	});

	unSlick('.js-exp-carousel-2-test');
	$('.js-exp-carousel-2-test').slick({
		arrows: false,
		focusOnSelect: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 6,
		touchThreshold: 6,
		responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			      	slidesToShow: 1,
			      	swipeToSlide: true,
					touchThreshold: 5,
			      }
			    },
		   	],
	});

	setTimeout(function () {
		$('.slick-slide').bind('touchstart', function(){ console.log('touchstart') });
	}, 2000);
}


function headerAdjust() {
	$('.js-header-links ul ul').closest('li').addClass('has--sub-nav');
}

function initSelect2() {
	$('.js-select2').select2({
		// minimumResultsForSearch: Infinity
	});
}

var movieList_cip = false;
function gotoMovieItem(self, event) {
	var thisId = $(self).closest('.movie-item').attr('data-id');
	if(thisId){
		var currentHash = location.hash;
		if(currentHash){
			location.hash = currentHash.split('--')[0] + '--' + thisId;
		}else{
			if($(self).closest('.is-tab').get(0)){
				var tabId = $(self).closest('.is-tab').attr('data-id');
				location.hash = tabId + '--' + thisId;
			}else{
				location.hash = tabId;
			}
		}
	}

	if(winWidth > 767 || $(self).closest('.c-list-1').get(0)){
		if($(event.target).closest('.js-close-movie-list-detail').length || movieListAnimating){
			setTimeout(function () {
				movieList_cip = false;
			}, 500);
			return;
		}

		movieListAnimating = true;

		var _self = self;
		$(self).closest('.js-movie-list').removeClass('panel--closed');
		$(self).closest('.js-movie-list').addClass('has--open-panel');
		if(!$(self).closest('.js-movie-list').hasClass('js-movie-list--not-open')){

			if(!$(self).closest('.list-wrap').next().find('.item-details').get(0) && $(self).closest('.js-movie-list').find('.movie-details .item-details').get(0)){

				var openOnOtherRowDetail = $(self).closest('.js-movie-list').find('.movie-details .item-details');

				openOnOtherRowDetail.parent().slideUp();

				setTimeout(function () {
					openOnOtherRowDetail.closest('.movie-details').prev().find('.movie-item').removeClass('is--active');
					openOnOtherRowDetail.remove();
					slideDownMovieDetails(_self);
				}, 400);
			}else{
				slideDownMovieDetails(_self);
			}
		}
	}else{
		if($(self).closest('.movie-item').find('.action a:first-child()').get(0)){
			$(self).closest('.movie-item').find('.action a:first-child()')[0].click();
		}
	}
	setTimeout(function () {
		movieList_cip = false;
	}, 500);
}
var animateTabToScroll = true;
function movieList() {
	// if( (!$('.js-movie-list').hasClass('js-movie-list--sty-1')) || $('.js-movie-list').hasClass('js-movie-list--sty-1')){

		$('.js-movie-list .movie-item .item-wrap').off('click');
		$('.js-movie-list .movie-item .item-wrap').click(function (e) {
			if(movieList_cip == false){
				movieList_cip = true;
				e.preventDefault();

				var thisId = $(this).closest('.movie-item').attr('data-id');

				// Make sure if its in a tab that isn't activen then make it active.
				if($(this).closest('.is-tab').get(0) && !$(this).closest('.is-tab').hasClass('is--active')){
					var parentTabId = $(this).closest('.is-tab').attr('data-id');
					animateTabToScroll = false;
					$('.js-tab-link[href="'+parentTabId+'"]').click();
					var self = this;
					var event = e;
					setTimeout(function(){
						gotoMovieItem(self, event);
						animateTabToScroll = true;
					}, 500);
				}else{
					gotoMovieItem(this, e);
				}
			}
		});
	// }
}
function removeSubHash() {
	var winHashLoc = location.hash.split('--');
	if(winHashLoc[1]){
		takeHashChangeSerious = false;
		location.hash = winHashLoc[0];
		setTimeout(function () {
			takeHashChangeSerious = true;
		}, 1000);
	}
}
var takeHashChangeSerious = true;
function slideDownMovieDetails(thisSelf) {
	// if(winWidth >=768 || $(thisSelf).closest('.js-movie-list').hasClass('js-movie-list--sty-1')){
		$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
		$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

		var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
		$(thisSelf).closest('.movie-item').addClass('is--active');
		$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
		initBgVideo();
		$(thisSelf).closest('.list-wrap').next().stop().slideDown();
		$(thisSelf).closest('.list-wrap').next().find('.popup--event-binded').removeClass('popup--event-binded');
		bindPopupEve();

		var thisVideo = $(thisSelf).closest('.list-wrap').next().find('video');
		if(thisVideo.get(0)){
			thisVideo[0].play();
		}

		setInView($(thisSelf).closest('.list-wrap').next().find('.item-details')[0]);

		movieListAnimating = false;

		$('.js-movie-list .movie-details .js-close-movie-list-detail, .js-movie-list .list-wrap .js-close-movie-list-detail:not(.js-close-applied)').click(function (e) {
			e.preventDefault();

			if($(this).closest('.c-list-1').get(0)){
				movieListSty1Close();
			}else{

				$(this).addClass('js-close-applied');

				if(movieListAnimating){
					return;
				}

				movieListAnimating = true;

				if($(this).closest('.movie-details').get(0)){
					$(this).closest('.movie-details').slideUp();
				}else{
					$(this).closest('.list-row').find('.movie-details').slideUp();
				}

				$(this).closest('.js-movie-list').removeClass('has--open-panel');

				setTimeout(function () {
					$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
					$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();
					$(thisSelf).closest('.js-movie-list.js-movie-list--sty-1').addClass('panel--closed');
					movieListAnimating = false;
				}, 400);
			}
		});
	// }
}
function initBgVideo(){
	$('.js-bg-video:not(.js-bg-video-init)').each(function() {
		if(!$(this).closest('.movie-item').get(0)){
			$(this).addClass('js-bg-video-init');
			var videoUrl = $(this).attr('data-bg-video');
			var youtubeVideoID = videoUrl.split('youtube:')[1];
			var autoPlay = 1;
			var _self = this;

			if($(this).closest('.js-exp-carousel').get(0)){
				autoPlay = 0;
			}

			if(youtubeVideoID){
				$(this).append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+youtubeVideoID+'?&controls=0&enablejsapi=1&mute=1&theme=dark&autoplay='+autoPlay+'&autohide=1&modestbranding=0&fs=0&playlist='+youtubeVideoID+'&showinfo=0&rel=0&iv_load_policy=3&loop=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
				$(this).parent().find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				
				$(this).parent().find('iframe').eq(0).on('load', function(){
					this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				});
			}else{
				if(autoPlay == 1){
					autoPlay = 'autoplay';
				}else{
					autoPlay = '';
				}
				$(this).append('<video poster="http://www.reelcinemas.ae/en/movies/images/trailerload.png" playsinline loop '+autoPlay+' muted><source src="'+videoUrl+'" type="video/mp4"></video>')
			}
		}
	});
}
function setInView(el) {
	var initEl = el;

	var top = el.offsetTop;
	var height = el.offsetHeight + 20;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}
	var a = top;
	var b = height;
	var d = a + b;
	var e = window.innerHeight + window.pageYOffset;
	var c = d - e;
	var scroll = window.pageYOffset - c;

	if($(initEl).closest('.list-row').get(0)){
		var newEle = $(initEl).closest('.list-row')[0];
		var newTop = newEle.offsetTop;
		while(newEle.offsetParent) {
			newEle = newEle.offsetParent;
			newTop += newEle.offsetTop;
		}
		a = newTop;
		d = a + b;
	}

	var scrollTopOpenOffset = b+200;

	var scrollToPos = 0;

	console.log('a: ', a);
	console.log('b: ', b);
	console.log('c: ', c);
	console.log('d: ', d);
	console.log('e: ', e);

	var warpper = $(initEl).closest('.c-list-1');
	if(warpper.get(0)) {
		scrollTopOpenOffset = d - warpper[0].offsetTop + 200;
		var wrapperHeight = warpper.height();
		console.log('wrapperHeight: ', wrapperHeight);
		console.log('d+150: ', scrollTopOpenOffset);
		if(wrapperHeight <= scrollTopOpenOffset){
			warpper.css('height', scrollTopOpenOffset);
		}else{
			warpper.css('height', '');
		}
	}
	

	if(e < d){
		console.log('a');
		/*if(winWidth > 1024 && winHeight > 700){
			console.log('a1');
			var innerImg = $(initEl).closest('.list-row').find('.item-wrap .img').outerHeight();
			if(!innerImg){ innerImg = 0; }
			scrollToPos = a + b + innerImg - window.innerHeight;
		}else{*/
			console.log('a2', a);
			if($('.c-main-header').get(0)){
				scrollToPos = a - $('.c-main-header').outerHeight() - 25;
			}else{
				scrollToPos = a - 25;
			}
		// }
	}else if(window.pageYOffset > a && (window.pageYOffset-window.innerHeight) < a){
		console.log('b');
		if($('.c-main-header').get(0)){
			console.log('b1');
			scrollToPos = a - $('.c-main-header').outerHeight() - 50;
		}else{
			console.log('b2');
			scrollToPos = a - 50;
		}
	}
	if(scrollToPos != 0){
		console.log('c');
		$('html, body').stop().animate({
			scrollTop: scrollToPos
		}, 500);
	}
}

function createMovieListMobileSlider(){
	$('.js-movie-list').each(function () {
		var movieListInfinite = false;
		if($(' > *', this).length > 3){
			movieListInfinite = true;
		}
		unSlick(this);
		$(this).slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: movieListInfinite,
		});
	});
}

function movieListSetHTML() {
	var itemsPerRow = 2;

	if(winWidth < 768){
		itemsPerRow = 2;
	}else if(winWidth < 1024){
		itemsPerRow = 4;
	}else{
		itemsPerRow = 6;
	}

	if($('.js-movie-list').hasClass('js-movie-list--sty-1')){
		itemsPerRow = 4;
		if(winWidth < 1500){
			itemsPerRow = 3;
		}
		if(winWidth < 920){
			itemsPerRow = 2;
		}
		if(winWidth < 768){
			itemsPerRow = 1;
		}
	}

	// $('.js-movie-list').each(function () {
		if($('.js-movie-list').hasClass('slick-initialized')){
			$('.js-movie-list').slick('unslick');
			movieList();
			// if(winWidth >=768){
			// 	movieList();
			// }else{
			// 	createMovieListMobileSlider();
			// }
		}
	// });
	
	// Normalize First
	$('.js-movie-list .movie-item.is--active').removeClass('is--active');
	if($('.js-movie-list .list-wrap').get(0)){
		$('.js-movie-list').each(function () {
			$('.list-wrap .movie-item .is--active', this).removeClass('is--active');
			$('.list-wrap .movie-item', this).appendTo($(this));
			$('.list-wrap', this).remove();
			$('.list-row', this).remove();
			$('.movie-details', this).remove();
		});
	}

	$('.js-movie-list .is--last-item').removeClass('is--last-item');
	$('.js-movie-list .is--first-item').removeClass('is--first-item');

	if($('.js-movie-list').get(0)){
		// Set HTML
		$('.js-movie-list').each(function () {
			var i = 1;
			while ($('> .movie-item', this).length) {
				$('> .movie-item:lt('+itemsPerRow+')', this).wrapAll('<div class="list-wrap list-wrap-page list-wrap-page--'+ i +'" />');
				i++;
			}

			if($(this).hasClass('js-movie-list--sty-1')){
				$('.list-wrap', this).each(function(i){
					$(this).wrap('<div class="list-row"/>');
				});
			}
			$('.list-wrap', this).after('<div class="movie-details"></div>');

			if(!$('.u-loader', this).get(0)){
				$(this).append('<div class="u-loader"></div>');
			}
		});
		$('.js-movie-list .movie-item:last-child .item-details').addClass('is--last-item');
		$('.js-movie-list .movie-item:first-child .item-details').addClass('is--first-item');
	}
	movieListSetDropDownPos();
}
var tabsLinkFirstClick = true;
function tabs() {
	$('.js-tab-link').click(function (e) {
		e.preventDefault();
		
		var wasAlreadyActive = false;
		var tabName = $(this).attr('data-tab-name');

		// Mobile FAQ Layout, keep track of scroll possition.
		if(winWidth < 767 && $(this).closest('.layer-2-links').get(0)){
			var openTabHeight = $('.is-tab[data-tab-name="'+tabName+'"].is--active').height();
			var scrollPosition = $(window).scrollTop();
			var scrollToPos = scrollPosition - openTabHeight;
		}

		if($(this).hasClass('is--active')){
			wasAlreadyActive = true;
		}

		$('.js-tab-link[data-tab-name="'+tabName+'"]').removeClass('is--active');
		var linkParent = $('.js-tab-link[data-tab-name="'+tabName+'"]').parent();

		$(this).addClass('is--active');


		if(linkParent.is('li')){
			linkParent.removeClass('is--active');
			$(this).parent().addClass('is--active');
		}

		$('.is-tab[data-tab-name="'+tabName+'"]').removeClass('is--active');
		var target = $(this).attr('href');
		
		if(history.pushState) {
			history.pushState(null, null, target);
		}else{
			location.hash = target;
		}

		$('[data-id="'+target+'"]').addClass('is--active');

		if($('[data-id="'+target+'"]').find('.js-movie-list').get(0)){
			// movieListCarousel();
		}

		// Maps
		if($(this).closest('.c-selection-banner').get(0)){
			setMarkerTo($(this).index());
		}

		if(winWidth < 767 && $(this).hasClass('js-tab--mob-accord')){
			$('.is-tab[data-tab-name="'+tabName+'"]').stop().slideUp();
			if(!wasAlreadyActive || tabsLinkFirstClick){
				$('[data-id="'+target+'"]').stop().slideDown();
				$("html,body").stop().animate({
					scrollTop: scrollToPos
				}, 400);
			}else{
				$(this).removeClass('is--active');
				$(this).closest('li').removeClass('is--active');
			}
		}
		tabsLinkFirstClick = false;

		var self = this;
		setTimeout(function () {
			AOS.refresh();

			var filterHeight = 0;
			if(winWidth < 768 && $('.c-movie-filters').get(0)){
				filterHeight = $('.c-movie-filters').height();
			}

			if(!(($(self).closest('.c-movies-list').get(0)) || (winWidth < 768 && $(self).closest('.c-2-layer-content').get(0)))){

				// For FAQ Page 2 layer tabs.
				if($(self).closest('.layer-2-links').get(0)){
					self = $('.layer-1-links a')[0];
				}

				var topScroll = $(self).offset().top;
				var elemTopSpace = parseInt($(self).css('margin-top'));
				var scrollPos = topScroll - elemTopSpace - headerHeight - filterHeight;

				if($(self).closest('.c-selection-banner').get(0)){
					topScroll = $('.c-maps-sec').offset().top;
					elemTopSpace = parseInt($('.c-maps-sec').css('margin-top'));
					scrollPos = topScroll - elemTopSpace - headerHeight - filterHeight;
				}
				if(animateTabToScroll){
					$('html, body').stop().animate({
						scrollTop: scrollPos
					}, 500);
				}
			}
		}, 200);
	});

	// First tab shown in mobile if its suppose to be accordian.
	if(winWidth < 767 && $('.js-tab--mob-accord').get(0)){
		var tabMobAccName = [];
		$('.js-tab--mob-accord').each(function () {
			var thisTabName = $(this).attr('data-tab-name');
			if(!tabMobAccName.includes(thisTabName)){
				tabMobAccName.push(thisTabName);
				var thisTarget = $(this).attr('href');
				$('[data-id="'+thisTarget+'"]').eq(0).css('display', 'block');
			}
		});
	}
}

function js2LayerTabs() {
	$('.js-2-layer-tabs .layer-1-links a').click(function (e) {
		$(this).closest('.js-2-layer-tabs').addClass('is--active');
	});
	$('.js-2lt-back').click(function (e) {
		e.preventDefault();
		$(this).closest('.js-2-layer-tabs').removeClass('is--active');
		var thisTab = $(this).closest('.is-tab');

		setTimeout(function () {
			thisTab.removeClass('is--active');
		}, 350);
	});

	if(winWidth < 768 && $('.js-2lt-back').get(0)){
		$('.js-2lt-back').closest('.is-tab').removeClass('is--active');
	}
}

function layerTabsAdjustment() {
	if($('.layer-2-links').get(0) && winWidth < 768){
		$('.layer-2-content').each(function () {
			var thisContent = this;
			$('.is-tab', this).each(function (i) {
				var links = $(thisContent).closest('.is-tab').find('.layer-2-links > ul > li:nth-child('+ (i+1) +')')
				$(this).appendTo(links);
			});
		});
	}
}

function sideNav() {
	$('.js-open-side-nav').click(function (e) {
		e.preventDefault();
		setBodyTopOffset();
		$('html').addClass('side-nav-is-open');
	});
	$('.js-close-side-nav').click(function (e) {
		e.preventDefault();
		$('html').removeClass('side-nav-is-open');
		setBodyToNormal();
	});
}

function selectAllEvent() {
	$('.js-select-all:not(.has-select-all-event)').click(function () {
		if($(this).find('input').is(":checked")){
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
		}else{
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );
			
		}
	});
	$('.js-select-all').addClass('has-select-all-event');
}

function customSelectBox() {
	/*$('.js-custom-select .js-field').on('focus', function() {
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select.is--active-now').removeClass('is--active-now');
		
        if(winWidth > 1024){
		  $(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
        }
		$('html').addClass('filter-open');
	});*/
	// $('.js-custom-select .js-field').on('blur', function() {
		// $(this).closest('.js-custom-select').removeClass('is--active');
	// });

	$('.js-custom-select').each(function (i) {
		hideOnClickOutside($(this));
	});

	selectOutsideClickEvent();
	
	selectAllEvent();

	// for mobile
	$('.js-custom-select .field').click(function (e) {
			var self = this;
			
			$(this).closest('.js-custom-select').addClass('is--active');
			$(this).closest('.js-custom-select').addClass('is--active-now');
			$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
			$('.js-custom-select:not(.is--active-now) .field-dropdown .scroll').slideUp();
			$('.js-custom-select.is--active-now').removeClass('is--active-now');

			$(this).closest('.js-custom-select').find('.field-dropdown .scroll').slideDown();

			if(winWidth < 768){
				setBodyTopOffset();
				filterCustomScroll();
			}
			$('html').addClass('filter-open');
	});

	$('.js-close-filter-m').click(function (e) {
		e.preventDefault();
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		setBodyToNormal();
	});

	$('.js-filter-search').click(function (e) {
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		setBodyToNormal();
	});

	$(document).on('click', '.js-close-custom-select', function(e){
		e.preventDefault();
		var thisSelect = $(this).closest('.js-custom-select');
		thisSelect.find('input[type="text"]').blur();
		thisSelect.find('.field-dropdown .scroll').slideUp(function () {
			thisSelect.removeClass('is--active');
		});
	});

	// Keeping Track of items selected
	countFilterSelection();

	setTimeout(function () {
		$('.js-custom-select').on('click', '.item', function(){
		// $('.js-custom-select .item').click(function (e) {
			var totalChecked = $(this).closest('.js-custom-select').find('.field-dropdown .scroll .scroll-area input:checked').length;
			$(this).closest('.js-custom-select').find('.field input').each(function () {
				if($(this).is('input')){
					var currentVal = $(this).attr('placeholder');
					$(this).attr('placeholder', currentVal.split(' (')[0] + ' (' + totalChecked +')');
				}else{
					var currentVal = $(this).html();
					$(this).html(currentVal.split(' (')[0] + ' (' + totalChecked +')');
				}
			});
		});
	}, 1000);
}
function countFilterSelection() {
	$('.js-custom-select .field input').each(function() {
		var currentVal = $(this).attr('placeholder');
		var totalChecked = $(this).closest('.js-custom-select').find('.field-dropdown .scroll .scroll-area input:checked').length;
		$(this).attr('placeholder', currentVal.split(' (')[0] + ' ('+totalChecked+')');
	});
}
function setBodyTopOffset() {
	if(winWidth < 768){
		bodyTopPos = $(window).scrollTop();
		$('body').css('top', -bodyTopPos);
	}
}
function setBodyToNormal() {
	window.scrollTo(0, bodyTopPos);
}

function hideOnClickOutside(selector) {
	if(selector.hasClass('js-custom-select')){
		$('.js-custom-select input[type="text"]').blur();
	}
}

function selectOutsideClickEvent() {

  const outsideClickListener = (event) => {
    if(winWidth >= 768){
        if (!$(event.target).closest('.js-custom-select').length) {
			$('.js-custom-select.is--active').find('.field-dropdown .scroll').slideUp(function () {
				$('.js-custom-select.is--active').removeClass('is--active');
			});
			// removeClickListener();
        }
    }
  }

  /*const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }*/
  document.addEventListener('click', outsideClickListener);
}

function loadMoreOnScrollInit() {
	// if($('.list-main-action').get(0) && winWidth < 768 && $('.c-movies-list').get(0)){
	// 	$(window).scroll(function () {
	// 		if($('.list-main-action').offset().top > $(window).scrollTop()){
				
	// 		}
	// 	});
	// }
}

function scrollCustomSelect() {
	if(winWidth < 768){
		$('.js-custom-select').each(function () {

			if($(this).find('.scroll-area .item').length > 3 && !$(this).find('.js-custom-select--scroll-up').get(0)){
				// $(this).find('.scroll-area').after('<a href="#" class="scroll-up-arrow is--deactive js-custom-select--scroll-up"></a> <a href="#" class="scroll-down-arrow js-custom-select--scroll-down"></a>');
				$(this).find('.scroll-area').after('<a href="#" class="scroll-up-arrow js-custom-select--scroll-up"></a>');
				
				$(this).find('.js-custom-select--scroll-down').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos + itemHeight)+'px'}, 200);
				});

				$(this).find('.js-custom-select--scroll-up').click(function (e) {
					e.preventDefault();
					/*var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos - itemHeight)+'px'}, 200);*/

					var thisHeight = $(this).closest('.scroll').height();
					$(this).closest('.scroll').find('.scroll-area').mCustomScrollbar("scrollTo", "-="+(($(this).closest('.scroll').find('.item').height()+2)*3));
				});


				$(this).find('.scroll-area').scroll(function () {
					// scrollAreaScrolled(this);
				});
			}
		});
	}
}
var filterBarDownArrowCloosing = false;
function filterCustomScroll() {
	$('.c-movie-filters .c-select-box .field-dropdown .scroll-area').mCustomScrollbar("destroy");
	if(winWidth < 768){
		$('.c-movie-filters .c-select-box .field-dropdown .scroll-area').mCustomScrollbar({
			axis:"y",
			theme: "dark",
			callbacks:{
				onCreate: function(){
					var _self = this;
					setTimeout(function () {
						if($(_self).find('.mCSB_container .item').length <= 3){
							$(_self).closest('.scroll').find('.js-custom-select--scroll-up').addClass('is--deactive');
							// $(_self).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeOut();
						}else{
							$(_self).closest('.scroll').find('.js-custom-select--scroll-up').removeClass('is--deactive');
							// $(_self).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeIn();
						}
					}, 500);
				},
				onUpdate: function(){
					var _self = this;
					setTimeout(function () {
						if($(_self).find('.mCSB_container .item').length <= 3){
							$(_self).closest('.scroll').find('.js-custom-select--scroll-up').addClass('is--deactive');
							// $(_self).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeOut();
						}else{
							$(_self).closest('.scroll').find('.js-custom-select--scroll-up').removeClass('is--deactive');
							// $(_self).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeIn();
						}
					}, 500);
				},
				whileScrolling: function(){
					var $scrollerOuter  = $(this);
				    var $dragger        = $scrollerOuter.find( '.mCSB_dragger' );
				    var scrollHeight    = $scrollerOuter.find( '.mCSB_container' ).height();
				    var draggerTop      = $dragger.position().top;

				    var scrollTop = draggerTop / ($scrollerOuter.height() - $dragger.height()) * (scrollHeight - $scrollerOuter.height());

					if($dragger.position().top + $dragger.height() < $dragger.parent().height()){
						$(this).closest('.scroll').find('.js-custom-select--scroll-up').removeClass('is--deactive');
						// $(this).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeIn();
					}else{
						$(this).closest('.scroll').find('.js-custom-select--scroll-up').addClass('is--deactive');
						// if(filterBarDownArrowCloosing == false){
							// filterBarDownArrowCloosing = true;
							// $(this).closest('.scroll').find('.js-custom-select--scroll-up').stop().fadeOut(function () {
							// 	filterBarDownArrowCloosing = false;
							// });
						// }
					}
				}
			}
		});
	}
}

/*function scrollAreaScrolled(scrollAreaRef) {
	var thisHeight = $(scrollAreaRef).height();
	var thisScrollHeight = scrollAreaRef.scrollHeight;
	var thisScrollPos = $(scrollAreaRef).scrollTop();
	var thisParent = $(scrollAreaRef).closest('.js-custom-select');
	var thisUpArrow = thisParent.find('.js-custom-select--scroll-up');
	var thisDownArrow = thisParent.find('.js-custom-select--scroll-down');
	
	if(thisScrollPos == 0){
		thisUpArrow.addClass('is--deactive');
	}else{
		thisUpArrow.removeClass('is--deactive');
	}

	if((thisScrollPos + thisHeight) >= thisScrollHeight){
		thisDownArrow.addClass('is--deactive');
	}else{
		thisDownArrow.removeClass('is--deactive');
	}
}*/

$.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.height();
}

$(document).ready(function(e) {
	scrollCustomSelect();
	toSVG();
});

function movieListRemoveCarousel(){
	if($('.js-movie-list').hasClass('slick-initialized')){
		$('.js-movie-list:not(.js-movie-list--sty-1)').slick('unslick');
	}
}
function movieListStartCarousel(){
	$('.js-movie-list').each(function () {
		if(viewport().width < 768 && !$(this).hasClass('js-movie-list--sty-1')){
			$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();
			var movieListInfinite = false;
			if($('.js-movie-list > *').length > 2){
				movieListInfinite = true;
			}
			$(this).slick({
				arrows: false,
				focusOnSelect: true,
				swipeToSlide: true,
				infinite: movieListInfinite,
			});
		}
	});
}
function movieListCarousel() {
	movieListRemoveCarousel();
	// movieListStartCarousel();
}
var jsMovieCarouselTimmer;
function fixMobileCarouselWrongDisplay() {
	setTimeout(function () {
		$('.js-movie-list').each(function () {
			if(viewport().width < 768 && !$(this).hasClass('js-movie-list--sty-1')){
				jsMovieCarouselTimmer = setInterval(function () {
					if(!$(this).hasClass('slick-initialized')){
						$(' .movie-item:nth-child(10) ~ .movie-item', this).remove();
						var movieListInfinite = false;
						if($(' > *', this).length > 2){
							movieListInfinite = true;
						}
						$(this).slick({
							arrows: false,
							focusOnSelect: true,
							swipeToSlide: true,
							infinite: movieListInfinite,
						});
					}
				}, 1000);
			}
		});
	}, 1000);
}

function toSVG() {
	$('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});
}


$('.js-footer-logos-carousel').imagesLoaded( function() {
	footerLogosCarousel();
});

function footerLogosCarousel(checking) {
	if(checking && $('.js-footer-logos-carousel').hasClass('slick-initialized')){
		return;
	}

    if($('.js-footer-logos-carousel').hasClass('slick-initialized')){
        $('.js-footer-logos-carousel').slick('unslick');
    }

    $('.js-footer-logos-carousel').slick({
        arrows: false,
        dots: false,
        infinite: true,
        focusOnSelect: true,
        slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 4,
		autoplay: true,
		autoplaySpeed: 5000,
        slidesToShow: 3,
		responsive: [
				    {
				      breakpoint: 768,
				      settings: {
				      	slidesToShow: 1,
						touchThreshold: 1,
				      }
				    },
			   	],
    });
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

var isChrome = false,
	isSafari = false;
var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
    isChrome = true;
    $('html').addClass('is--chrome');
  } else {
    isSafari = true;
    $('html').addClass('is--safari');
  }
}

if(isIE){
    $('html').addClass('is--ie');
    $('html').addClass('is--ie-'+isIE);

	if($('.c-booking-pages').get(0)){
		$('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');
	}else{
		$('[src*=reel-logo]').attr('src', '/en/assets/img/brand/logo.png');
	}

    if($('.c-main-banner').get(0)){
    	var itemHeight = $('.c-main-banner .item-inner').height();
    	$('.c-main-banner .item-inner .txt').each(function(){
			$(this).wrapAll('<div class="item-inner-wrap"></div>');
    	});

		$('.c-main-banner .item-inner .item-inner-wrap').height(itemHeight);
    }
}

function addingAOSData() {
	// if(winWidth > 1024 && isIE == false){
	// 	// Left
	// 	$('.movieheader .txt .movie-poster-detail').attr('data-aos', 'fade-left');
	// 	// Right
	// 	$('.movieheader .txt .movie-poster, .popular-heading, .logo img').attr('data-aos', 'fade-right');
	// 	// Down
	//     $('.c-main-header').attr('data-aos', 'fade-down');
	//     // Up
	//     $('.c-tabs .action, .c-banner-1 .bgimg-sec, .c-banner-1 .txt-sec .carousel, .c-content-block .img-txt-block .txt > *, .c-content-block .img-txt-block .img, .c-content-block h1, .c-offers .action, .c-offers .offers-list, .c-offers .heading-sec, .c-content-tiles, .movieheader, .c-whats-popular .sec-title, .tileview-movies-list, .c-show-list-page, .c-show-list-page .d-box-wrap, .c-show-list-page > .o-container:first-child, .list-main-action, .c-exp-views .carousel .item:first-child .txt, .c-main-footer, .c-main-footer > .o-container > .row > *, .c-exp-views, .c-movie-filters, .c-movies-list .list-tabs, .c-main-banner, .c-main-banner .main-carousel-thumb').attr('data-aos', 'fade-up');
		
	// 	$('.c-banner-1 .txt-sec .carousel').attr('data-aos-delay', 100);

	// 	$('.c-list-1 .list-wrap').each(function () {
	// 		$(this).find('.init-part').each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	// 	$('.c-content-tiles').each(function(){
	// 		$('.txt-block > *',this).each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	//     $('.c-exp-views .carousel-thumb .slick-slide').each(function (i) {
	//     	$(this).attr('data-aos', 'fade-right');
	//     	$(this).attr('data-aos-delay', (50*i));
	//     });
	// 	$('.popular-heading').attr('data-aos-delay', 300);
	// 	$('.movieheader .txt .movie-poster-detail, .movieheader .txt .movie-poster, .popular-heading').attr('data-aos-delay', 300);

	// 	$('.c-movies-list .list-wrap').each(function () {
	// 		$(this).find('.movie-item').each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	// 	AOS.refresh();
	// }
}

function refreshAOS(aosFunc){
	if(winWidth > 1024 && isIE == false){
		if(aosFunc == 'init'){
			AOS.init({
				once: true,
				offset: 0,
		   });
		}
		if(aosFunc == 'refresh'){
			AOS.refresh();
		}
	}
}

function headerSpace() {
	$('.header-space').css('height', '');
	var filterSpace = 0;
	if(winWidth < 768){
		filterSpace = 66;
		if(winHeight <= 650){
			filterSpace = 58;
		}
	}

	if(!$('.c-movie-filters').get(0) || !$('.c-movie-filters:visible').length){
		filterSpace = 0;
	}
	var headerHeight = $('.c-main-header').height();
	// if(headerHeight < 20){
		headerHeight = 85;
		if(winWidth<=1800){
			headerHeight = 83;
			if(winWidth<=1600){
				headerHeight = 82;
				if(winWidth<=767){
					headerHeight = 67;
					if(winHeight<=650){
						headerHeight = 57;
					}
				}
			}
		}
	// }
	$('.header-space').css('height', headerHeight + filterSpace);
}
ChangeToSvg();
function ChangeToSvg() {
	jQuery('img.tosvg').each(function () {
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	    jQuery.get(imgURL, function (data) {
	      var $svg = jQuery(data).find('svg');
	      if (typeof imgID !== 'undefined') {
	        $svg = $svg.attr('id', imgID);
	      }
	      if (typeof imgClass !== 'undefined') {
	        $svg = $svg.attr('class', imgClass + ' insvg');
	      }
	      $svg = $svg.removeAttr('xmlns:a');
	      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	      }
	      $img.replaceWith($svg);
	    }, 'xml');
	});
}

var popupTarget;
function openPopup(target, videoLink) {
	popupTarget = target;
	if(videoLink){
		var youtubeVideoID = videoLink.split('youtube:')[1];
		if(!isIE){
			// Destroy Plyr if there.
			var thisId = $(target).find('[data-video-instance]').attr('data-video-instance');
			if(players[thisId]){
				players[thisId].destroy();
			}
			$(target).find('.has--plyr').removeClass('has--plyr');
		}

		if(youtubeVideoID){
			var PrevVideo = $(target).find('.js-video');
			if($(target).find('.yt-iframe').get(0)){
				PrevVideo = $(target).find('.yt-iframe');
			}
			if(winWidth > 1024){
				PrevVideo.eq(0).after('<div class="js-video" data-plyr-provider="youtube" data-plyr-embed-id="'+youtubeVideoID+'"></div>')
				PrevVideo.remove();
			}else{
				PrevVideo.eq(0).after('<iframe class="yt-iframe" width="100%" height="100%" src="https://www.youtube.com/embed/'+youtubeVideoID+'?&controls=1&enablejsapi=1&mute=0&theme=dark&autoplay=1&autohide=1&modestbranding=0&fs=0&playlist='+youtubeVideoID+'&showinfo=0&rel=0&iv_load_policy=3&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
				
				PrevVideo.next()[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				
				PrevVideo.parent().find('iframe').eq(0).on('load', function(){
					this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				});
				PrevVideo.remove();
			}
		}else{
			var PrevVideo = $(target).find('.js-video');
			PrevVideo.eq(0).after('<video class="js-video" poster="http://www.reelcinemas.ae/en/movies/images/trailerload.png" id="player" playsinline controls><source src="" type="video/mp4"></video>')
			PrevVideo.remove();

			// Updating src tag.
			$(target).find('.js-video source').attr('src', videoLink);

			// Removing than re adding video tag for source tag update to work.
			var thisVideoTag = $(target).find('.js-video')[0].outerHTML;
			var parentRef = $(target).find('.js-video').parent();
			$(target).find('.js-video').remove();
			parentRef.append(thisVideoTag);
		}

		// Add or remove Plyr UI on video.
		jsVideo();
	}

	// $(target).find('.popup-wrap').css('opacity', 0);

	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function(){
		$(popupTarget).addClass('active');
		$(popupTarget).closest('.c-popup').addClass('popup--open');

		if($(popupTarget).find('.plyr').length){
			var videoInstance = $(popupTarget).find('.plyr').attr('data-video-instance');
			players[videoInstance].play();
			players[videoInstance].on('ready', event => {
				players[videoInstance].play();
			});
		}else{
			if($(popupTarget).find('.js-video > iframe').get(0) || $(popupTarget).find('.yt-iframe').get(0)){
				setTimeout(function () {
					$(popupTarget).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
					setTimeout(function () {
						$(popupTarget).find('.popup-wrap').css('opacity', 1);
					}, 750);
				}, 1500);
			}else{
				$(popupTarget).find('.js-video')[0].play();
				// setTimeout(function () {
				// 	$(popupTarget).find('.popup-wrap').css('opacity', 1);
				// }, 750);
			}
		}
	}, 10);


	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function(){
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');

		// Play Video
		if(winWidth > 1024 && $(target).find('.plyr').length){
			var videoInstance = $(target).find('.js-video').attr('data-video-instance');
			if(players[videoInstance]){
				players[videoInstance].play();
			}
		}else if($(target).find('.js-video').length){
			// $('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}

	}, 10);
}

function closePopup() {
	if($('.c-popup .active').length){
		// Pause Video In Popup
		if($('.c-popup .active .plyr').length){
			var videoInstance = $('.c-popup .active .plyr').attr('data-video-instance');
			if(players[videoInstance]){
				players[videoInstance].pause();
			}
		}else if($('.c-popup .active .js-video').length){
			if($('.c-popup .active .js-video iframe').get(0)){
				$('.c-popup .active .js-video iframe')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
			}else{
				$('.c-popup .active .js-video')[0].pause();
			}
			// $('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}else if($('.c-popup .active .yt-iframe').length){
			$('.c-popup .active .yt-iframe')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
		}

		// Close Popup
		$('.c-popup .active').removeClass('active');
		$('.c-popup').removeClass('popup--open');
		setTimeout(function () {
			$('.c-popup .popup').hide();
			$('.c-popup').hide();
			$('html').removeClass('popup-is-active');
		}, 310);
	}
}

function addVideoPlugin() {
	if($('.js-video').get(0) && isIE == false){
		var plyrScriptElement = document.createElement("script");
		plyrScriptElement.setAttribute('src', '/en/assets/js/plyr.min.js');

		plyrScriptElement.setAttribute('async', 'true');
		document.body.appendChild(plyrScriptElement);
	}else{
		jsVideoDirect();
	}
}

var players = [];
var playersIndex = 0;
function jsVideo() {
	// Custom player
	if($('.js-video').get(0) && isIE == false){
		if($('.js-video:not(.has--plyr)').length){
			$('.js-video:not(.has--plyr)').each(function(i) {
				$(this).addClass('has--plyr');
				var thisParent = $(this).parent();
				if(!players[playersIndex]){
					players[playersIndex] = new Plyr(this, {
						playsinline: true,
					});
					// players[playersIndex].on('ready', event => {
					//     if($(event.srcElement).closest('.popup.active').get(0)){
					//     	$(event.srcElement).closest('.popup-wrap').css('opacity', 1);
					//     }
					// });
				}
				thisParent.find('.plyr').attr('data-video-instance', playersIndex);
				playersIndex++;
			});
		}
	}else{
		jsVideoDirect();
	}
}

function jsVideoDirect() {
	if($('.js-video').length){
		$('.js-video').each(function(i) {
			$(this).attr('data-video-instance', i);
			var videoId = $(this).attr('data-plyr-embed-id');
			$(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
			$('iframe').each(function() {
			  var url = $(this).attr("src");
			  if (url.indexOf("?") > 0) {
			    $(this).attr({
			      "src" : url + "&wmode=transparent",
			      "wmode" : "opaque"
			    });
			  }
			  else {
			    $(this).attr({
			      "src" : url + "?wmode=transparent",
			      "wmode" : "opaque"
			    });
			  }
			});
		});
	}
}

function bindPopupEve() {
	// Popup Open
	$('.js-popup-link:not(.popup--event-binded)').click(function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		var videoLink = $(this).attr('data-video');
		openPopup(target, videoLink);
	}).addClass('popup--event-binded');

	// Popup Close
	$('.js-close-popup:not(.js-close-event-binded)').click(function (e) {
		e.preventDefault();
		closePopup();
	}).addClass('js-close-event-binded');
}

function animWrapHeight() {
	$('.anim-wrap').css('height', 'auto');
	$('.anim-wrap').removeClass('anim-wrap--ready');

	$('.anim-wrap').each(function () {
		$(this).css('height', $(this).height()).addClass('anim-wrap--ready');
	});
}

function filterSearch() {

	$('.js-custom-select .field-dropdown .js-field:not(.has--filter-func)').keyup(function() {
	    var input, filter, ul, li, a, i, txtValue, selectAllElem;
	    input = this;
	    filter = input.value.toUpperCase();
	    selectAllElem = $(input).closest('.field-dropdown').find('.js-select-all');
	    selectAllInput = $(input).closest('.field-dropdown').find('.js-select-all > input');

	    // Hide select all element when typing.
	    if($(input).val().length === 0){
	    	selectAllElem.show();
	    }else{
	    	selectAllElem.hide();
	    }

	    // Unselect "Select All" if selected all is active
	    if(selectAllInput[0].checked){
    		selectAllElem.trigger('click');
	    }

	    ul = $(this).closest('.js-custom-select').find('.field-dropdown .scroll-area')[0];
	    li = ul.getElementsByClassName("item");
	    for (i = 0; i < li.length; i++) {
	        a = li[i];
	        txtValue = a.textContent || a.innerText;
	        if (txtValue.toUpperCase().indexOf(filter) > -1) {
	            li[i].style.display = "";
	        } else {
	            li[i].style.display = "none";
	        }

	        // scrollAreaScrolled($(this).closest('.js-custom-select').find('.scroll-area')[0]);
	    }

	    typedInFilterSearch($(this).closest('.field-dropdown'));
	});
	$('.js-custom-select .field-dropdown .js-field').addClass('has--filter-func');
}


function scrollTo() {
	$('[data-scrollto]').click(function (e) {
		e.preventDefault();
		var target = '#' + $(this).attr('data-scrollto');
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top - $('.header-space').height()
		}, 500);
	});
}

function bgMobImg() {
	var sufixSelector = '-mob';
	if(winWidth >= 768){
		sufixSelector = '';
	}
	$('[data-bgimg'+sufixSelector+']').each(function () {
		$(this).css('backgroundImage', 'url("'+ $(this).attr('data-bgimg'+ sufixSelector) + '")');
	});
}

window.onhashchange = activeHashTab;
function hideTabsId(){
	$('.is-tab').each(function() {
		var thisId = $(this).attr('id');
		$(this).attr('data-id', '#'+thisId);
		$(this).attr('id', '');
	});
}
function activeHashTab(){
	
	/*var winHashVal = window.location.hash.substr(1);
	if(winHashVal){
		$('.js-tab-link[href="#'+winHashVal+'"]').click();
	}*/

	if(takeHashChangeSerious){
		var winHashVal = window.location.hash.substr(1);
		if(winHashVal){
			var movieItemHash = winHashVal.split('--')[1];
			if(movieItemHash){
				winHashVal = winHashVal.split('--')[0];
				// $('.js-tab-link[href="#'+winHashVal+'"]').click();
				setTimeout(function () {
					$('[data-id="'+movieItemHash+'"] .item-wrap').click();
				}, 500);
			}else{
				$('.js-tab-link[href="#'+winHashVal+'"]').click();
			}
		}

		// Close any popup or menu.
		$('html').removeClass('side-nav-is-open');
		/*$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select input[type="text"]').blur();

	    closePopup();

	    movieListSty1Close();*/
    }
}


// Close Movie List Sty 1
function movieListSty1Close() {
	removeSubHash();
	$('.js-movie-list.js-movie-list--sty-1 .movie-details').slideUp();
    $('.js-movie-list.js-movie-list--sty-1').removeClass('has--open-panel');

	setTimeout(function () {
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-item').removeClass('is--active');
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-details .item-details').remove();
		$('.js-movie-list.js-movie-list--sty-1').addClass('panel--closed');
	}, 400);

	$('.c-list-1').css('height', '');
}

function movieListSty1AutoCloseEvent() {
	if($('.js-movie-list--sty-1').get(0)){
		$('body').click(function(event) {
			var $target = $(event.target);
			if ($target.parents('.movie-item').length == 0 && $target.parents('.item-details').length == 0) {
				movieListSty1Close();
			}
		});
	}	
}
function movieListSetDropDownPos(){
	if($('.js-movie-list--sty-1').get(0)){
		var imgHeight = $('.js-movie-list--sty-1 .list-wrap .movie-item .img').height();
		$('.js-movie-list--sty-1 .movie-details').css('top', imgHeight);
	}
}

function clickedMovieEvent(){
	$('[data-link-to]:not("has--event-link-to")').click(function(e) {
		e.preventDefault();
		var toUrl = $(this).attr('has--event-link-to');
		if(winWidth >= 768){
			window.location = toUrl;
		}else{

		}
	});
}

var locMap;
var markersRef = [];
var markerImage;
var markerImageActive;

var activeLinkIndex = $('.c-selection-banner .selectors a.is--active').index();

// var setMapStyle = 'hybrid';
var currentMapStyle = 'styled_map';
function initMap() {
	// Styles
	var styledMapType = new google.maps.StyledMapType(
		[
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#414141"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      },
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#bdbdbd"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.business",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#dadada"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#e0e5e9"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  }
		],
	    {name: 'Styled Map'});

	// Marker Image
	markerImage = new google.maps.MarkerImage('http://theprojectstagingserver.com/reelcinemas/website1.2/v3/assets/img/locations/loc-marker.png',
		new google.maps.Size(101, 101),
		new google.maps.Point(0, 0),
		new google.maps.Point(50, 50));

	// Marker Image Active
	markerImageActive = new google.maps.MarkerImage('http://theprojectstagingserver.com/reelcinemas/website1.2/v3/assets/img/locations/loc-marker--selected.png',
		new google.maps.Size(101, 101),
		new google.maps.Point(0, 0),
		new google.maps.Point(50, 50));

	// Initiate Map
	var hideDefaultUi = false;
	if($('.c-selection-banner .selectors a.is--active').closest('.slick-slide') && winWidth < 768){
		activeLinkIndex = $('.c-selection-banner .selectors a.is--active').closest('.slick-slide').attr('data-slick-index');
		if(activeLinkIndex < 0){
			activeLinkIndex = 6
		}
	}
	
	if(winWidth < 768){
		hideDefaultUi = true;
	}
	
	var mapStyleHolder = "styled_map";
	if(typeof setMapStyle !== 'undefined'){
		mapStyleHolder = setMapStyle;
	}

	locMap = new google.maps.Map($('.js-loc-map')[0], {
	  center: markers[activeLinkIndex].position,
	  zoom: 16,
	  mapTypeId: mapStyleHolder,
	  disableDefaultUI: hideDefaultUi,
	  mapTypeControlOptions: {
	    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
	  }
	});
	locMap.addListener('maptypeid_changed', function() {
		currentMapStyle = locMap.mapTypeId;
	});

	// Map Style
	locMap.mapTypes.set('styled_map', styledMapType);

	// Adding Marker
	var markerImgType = markerImage;
	for (var i = 0; i < markers.length; i++) {
		
		if(i == activeLinkIndex){ markerImgType = markerImageActive; }else{ markerImgType = markerImage; }

	    markersRef[i] = new google.maps.Marker({
		    position: markers[i].position,
		    icon: markerImgType,
		    map: locMap,
		    selfId: i,
		});
		markersRef[i].addListener('click', function(e) {
			var index = this.selfId;
			if($('.c-selection-banner .slick-slide').get(0)){
				window.location = $('.c-selection-banner .selectors .slick-slide:not([data-slick-index="-1"]) a').eq(index).attr('href');
			}else{
				window.location = $('.c-selection-banner .selectors a').eq(index).attr('href');
			}
        });
	}
}

var prevActiveMarkerIndex = 0;
function setMarkerTo(targetIndex) {
	if((typeof google === 'object' && typeof google.maps === 'object')){
		// Remove Active State from Previous Marker
		markersRef[prevActiveMarkerIndex].setIcon(markerImage);

		// Set Active State on New Marker
		markersRef[targetIndex].setIcon(markerImageActive);
		prevActiveMarkerIndex = targetIndex;

		locMap.setCenter(markersRef[targetIndex].position);	
	}else{
		var locTargetIndex = targetIndex;
		setTimeout(function () {
			setMarkerTo(locTargetIndex);
		}, 200);
	}
}

function locMapInit() {
	if($('.js-loc-map').get(0)){
		$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNsXun56tRLQoR7hHVKI9V9XnC0xLmqrA&callback=initMap" async defer></script>');
	}
}


// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(valueToFind, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        // c. Increase k by 1. 
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

var keepScroll = false;
keepScroll = document.body.scrollTop;

$(window).on('click', function () {
	keepScroll
});


function mainNavClicksForMap() {
	if($('.c-maps-sec').get(0)){
		$('.header-links a').click(function (e) {
			var newHash = $(this).attr('href').split('#')[1];
			if(newHash){
				newHash = '#' + newHash;
				var tabDiv = $('.js-tab-link[href="'+newHash+'"]');
				if(tabDiv.get(0)){
					e.preventDefault();
					if(history.pushState) {
						history.pushState(null, null, newHash);
					}else{
						location.hash = newHash;
					}
					tabDiv.trigger('click');
				}
			}
		});
	}
}

// ========================================
// Validations

// Validate Gift Card

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

var cardNumber = '';
$('.js-gift-card #gift-card-number').on('input',function(e){
	if(cardNumber != $(this).val() || $(this).val() == ''){
		removeGiftCardMsg();
	}
	cardNumber = $(this).val();
});

$('.js-dummy-input-result').click(function (e) {
	e.preventDefault();
	var randVal = Math.floor(Math.random() * 2) + 1;

	if(randVal == 1 || $('#gift-card-number').val() == ''){
		errorGiftCard();
	}else{
		successGiftCard();
	}
});

function removeGiftCardMsg() {
	$('.js-gift-card .msg').hide();
}

function errorGiftCard() {
	removeGiftCardMsg();
	$('.js-gift-card .msg--error').show();
}

function successGiftCard(amount) {
	removeGiftCardMsg();
	$('.js-gift-card .msg').hide();
	$('.js-gift-card .msg--success').show();
	if(amount){
		$('.js-gift-card .msg--success strong').html(amount);
	}else{
		$('.js-gift-card .msg--success strong').html('XXXX');
	}
}

// Validate Email Address

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

var KITValue = '';
$('#email-keep-in-touch').on('input',function(e){
	if(KITValue != $(this).val() || $(this).val() == ''){
		removeKITMsg();
	}
	KITValue = $(this).val();
});

$('.js-get-email .js-dummy-result').click(function (e) {
	e.preventDefault();
	var status = validateKIT();

	if(status){
		successKIT();
	}
});

function validateKIT() {
	if(isEmail($('#email-keep-in-touch').val())){
		return true;
	}else{
		errorKIT();
		return false;
	}
}

function removeKITMsg() {
	$('.js-get-email .msg').hide();
}

function errorKIT() {
	removeKITMsg();
	$('.js-get-email .msg--error').show();
}

function successKIT() {
	removeKITMsg();
	$('.js-get-email .msg').hide();
	$('.js-get-email .msg--success').show();
}
function heightMediaQuery() {
	var winHeightScope = winHeight;

	if(winWidth < 768){
		winHeightScope = viewport().height;
	}

	$("html").removeClass (function (index, className) {
    	return (className.match (/(^|\s)hl-\S+/g) || []).join(' ');
	});

	$("html").removeClass (function (index, className) {
    	return (className.match (/(^|\s)hg-\S+/g) || []).join(' ');
	});

	for(var i = 0; i <= heightMediaJumps.length; i++) {
		if(winHeightScope <= heightMediaJumps[i]){
			$('html').addClass('hl-'+heightMediaJumps[i]);
		}
		if(winHeightScope >= heightMediaJumps[i]){
			$('html').addClass('hg-'+heightMediaJumps[i]);
		}
	}

	// Adjust Height CSS

	var minHeightSelctor1 = $('.height-cover--solid, .c-maps-sec .map-wrap, .c-maps-sec .txt-wrap, .height-cover, .c-exp-highlight > .o-container, .c-banner-1, .c-banner-1 .bgimg-sec .item, .c-banner-2');
	var heightSelector2 = $('.height-cover--tabs--solid, .c-2-layer-content .layer-1-content .this-row');
	
	minHeightSelctor1.css('min-height', winHeight-85);

	if(winWidth<=1800){
		minHeightSelctor1.css('min-height', winHeight-83);
	}
	if(winWidth<=1600){
		minHeightSelctor1.css('min-height', winHeight-82);
	}
	if(winWidth<=1023){
		$('.c-maps-sec .txt-wrap').css('min-height', 0);
	}
	if(winWidth>=768){
		heightSelector2.css('height', winHeight - 168);
		if(winWidth<=1800){
			heightSelector2.css('height', winHeight - 83);
		}
		if(winWidth<=1600){
			heightSelector2.css('height', winHeight - 82);
		}
	}
	if(winWidth<=767){
		// calcFAQHeight();
		minHeightSelctor1.css('min-height', winHeight-67);
		$('.c-maps-sec .txt-wrap').css('min-height', 0);
		// heightSelector2.css('height', winHeight - 67);
		$('.c-side-nav .nav > *:first-child').css('margin-top', winHeight*0.03);
		$('.c-side-nav .nav > *:last-child').css('margin-bottom', (winHeight*0.06)-93);
		$('.c-side-nav .nav').css('height', winHeight - ($('.c-main-header').height() + 120));
		$('.c-side-nav .c-social').css('padding-top',winHeight*0.03);
		$('.c-side-nav .c-social').css('margin-bottom',winHeight*0.03);
		$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight-80);
		$('.c-movie-filters .c-select-box .field-dropdown').css('height', winHeight-118);
		// $('.c-movies-list').css('min-height', winHeight-133);
		// $('.c-movies-list .list-tabs').css('margin-top', winHeight*0.04);
		// $('.c-movies-list .list-tabs').css('margin-bottom', winHeight*0.04);
		$('.c-exp-views').css('height', winHeight-133);
		$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-66);
		$('.c-content-tiles .wrap-col').css('min-height', winHeight-66);

		if(winHeight<=750){
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight-82);
			$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-100);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight-100);
		}
		if(winHeight<=720){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width',winHeight*0.30);
		}
		if(winHeight<=675){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width',winHeight*0.295);
		}
		if(winHeight<=650){
			minHeightSelctor1.css('min-height', winHeight-57);
			// heightSelector2.css('height', winHeight - 57);
			// $('.c-movies-list').css('min-height', winHeight-115);
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.29);
			$('.c-exp-views').css('height', winHeight-115);
			$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-58);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight-58);
		}
		if(winHeight<=610){
			// $('.c-movies-list .list-tabs').css('margin-top', winHeight*0.03);
			// $('.c-movies-list .list-tabs').css('margin-bottom', winHeight*0.03);
		}
		if(winHeight<=590){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.26);
		}
		if(winHeight<=585){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.26);
		}
		if(winHeight<=550){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.28);
		}
		if(winHeight<=520){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.24);
		}
	}else{
		$('.c-exp-views').css('height', '');
		$('.c-main-banner .main-carousel .item .item-inner').css('height', '');
		$('.c-movie-filters .c-select-box .field-dropdown').css('height', '');
	}

	if(winWidth>=1025){
		if(winHeight<=660){
			$('.c-main-banner .main-carousel .item .item-inner').css('height',winHeight-80);
		}
		if(winHeight<=575){
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight - 140);
		}
	}
}

function calcFAQHeight() {
	if($('.c-2-layer-content').get(0)){
		$('.c-2-layer-content').addClass('is--calculating');
		var links1 = $('.c-2-layer-content .layer-1-links');
		links1.css('height', '');
		links1.height(links1.height());
		$('.c-2-layer-content').removeClass('is--calculating');
		setTimeout(function () {
			$('.c-2-layer-content').addClass('has--transition');
		}, 250);
	}
}


function charLimitInit() {
	$('[data-charlim]').each(function () {
		if(!$(this).hasClass('js-char-limited')){
			var totalLimit = parseInt($(this).attr('data-charlim')),
				thisHtml = $(this).html(),
				wordsList = thisHtml.split(' '),
				charCount = 0,
				trimmedText = '';

			for(i=0; i<wordsList.length; i++){
				charCount += wordsList[i].length + 1;
				if(charCount < totalLimit){
					trimmedText += wordsList[i] + ' ';
				}else{
					trimmedText += '...';
					break;
				}
			}
			$(this).html(trimmedText);
			$(this).addClass('js-char-limited');
		}
	});
}

function adjustContentList2() {
	if($('.c-list-2').get(0)){
		$('.c-list-2').each(function() {
			var totalMaxLines = 8,
				headingMaxLines = 4,
				paraMaxLines = 4;

			$(this).find('.pad').each(function (i) {
				var thisHeading = $(this).find('h1').eq(0),
					thisHeadingHtml,
					thisPara = $(this).find('p').eq(0),
					thisParaHtml,
					extrParaLines = 0;

				if(!thisHeading[0].hasAttribute('data-content')){
					thisHeadingHtml = thisHeading.html();
					thisParaHtml = thisPara.html();
					thisHeading.attr('data-content', thisHeadingHtml);
					thisPara.attr('data-content', thisParaHtml);
				}else{
					thisHeadingHtml = thisHeading.attr('data-content');
					thisHeading.html(thisHeadingHtml);
					thisParaHtml = thisPara.attr('data-content');
					thisPara.html(thisParaHtml);
				}

				/*var headingLH = parseInt(thisHeading.css('lineHeight').split('px')[0]),
					headingHeight = thisHeading.outerHeight(),
					headingLines = headingHeight / headingLH;*/
				
				var headingLines = calcNumberOfLines(thisHeading);

				// Number of lines Exceed for heading.
				if(headingLines > headingMaxLines){
					// Reduce Heading Lines.
					var headingWordsList = thisHeadingHtml.split(' ');
					var newHtml = '',
						newHtmlTemp = '';
					for (var i = 0; i < headingWordsList.length; i++) {
						newHtmlTemp += headingWordsList[i] + ' ';
						thisHeading.html(newHtmlTemp + ' ...');
						if(calcNumberOfLines(thisHeading) > headingMaxLines){
							thisHeading.html(newHtml + ' ...');
							break;
						}
						newHtml += headingWordsList[i] + ' ';
					}
				}else if(headingLines < headingMaxLines){
					var headingMissingLines = headingMaxLines - headingLines,
						headingLineHeight = parseInt(thisHeading.css('lineHeight').split('px')[0]),
						extraSpacePx = headingMissingLines * headingLineHeight,
						paraLineHeight = parseInt(thisHeading.css('lineHeight').split('px')[0]);
					extrParaLines = extraSpacePx / paraLineHeight;
				}

				// Paragraph
				var paraLines = calcNumberOfLines(thisPara),
					thisParaMaxLines = (paraMaxLines + extrParaLines);

				if(paraLines > thisParaMaxLines){
					// Reduce Heading Lines.
					var paraWordsList = thisParaHtml.split(' ');
					var newHtml = '',
						newHtmlTemp = '';
					for (var i = 0; i < paraWordsList.length; i++) {
						newHtmlTemp += paraWordsList[i] + ' ';
						thisPara.html(newHtmlTemp + ' ...');
						if(calcNumberOfLines(thisPara) > thisParaMaxLines){
							thisPara.html(newHtml + ' ...');
							break;
						}
						newHtml += paraWordsList[i] + ' ';
					}
				}
			});
		});
	}
}
function calcNumberOfLines(target) {
	var lineHeight = parseInt(target.css('lineHeight').split('px')[0]),
		targetHeight = target.outerHeight(),
		numberOfLines = targetHeight / lineHeight;
	return numberOfLines;
}

function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  isMobile = check;

  if(isMobile){
  	$('html').addClass('is--mobile');
  }else{
  	$('html').removeClass('is--mobile');
  }
}

function changeToListViewInMob() {
	if (typeof viewmode === 'function' && winWidth < 1024 && $('.c-movie-filters .viewbar').get(0)) {
		viewmode(1);
	}
}


var navDropDownHeightFirstRun = false;
function navDropDownHeight() {
	bodyHeight = winHeight - headerHeight - 40;
	$('.c-main-header .header-links > ul > li > ul').css('maxHeight', bodyHeight);
	if(navDropDownHeightFirstRun == false && winWidth > 1024){
		navDropDownHeightFirstRun = true;
		$('.c-main-header .header-links > ul > li > ul').mCustomScrollbar({
			axis:"y",
			theme: "minimal-dark"
		});
	}else{
		if(winWidth > 1024){
			$('.c-main-header .header-links > ul > li > ul').mCustomScrollbar('update');
		}else{
			$('.c-main-header .header-links > ul > li > ul').mCustomScrollbar('destroy');
		}
	}
}

function removeLoaderInMob() {
	if(winWidth<768){
		$('.js-movie-list .u-loader').remove();
	}
}
var firstRunPortrait = true;
var onRotateRefresh = false;
function onlyPortrait(){
	// if(viewport().width > viewport().height && isMobile){
	// 	$('html').addClass('landscape-msg--on');
	// 	$('.c-landscape-msg').show();
	// 	if(firstRunPortrait){
	// 		onRotateRefresh = true;
	// 	}
	// }else{
	// 	if(onRotateRefresh){
	// 		// location.reload();
	// 	}
	// 	$('.c-landscape-msg').hide();
	// 	if($('html').hasClass('landscape-msg--on')){
	// 		$('html').removeClass('landscape-msg--on');
	// 		heightMediaQuery();
	// 		headerSpace();
	// 	}
	// }
	// firstRunPortrait = false;
}

function isIOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}

/*$('html').addClass('sabotage-smartbanner');
$(window).on('load', function () {
	if(isIOS()){
		var timestamp             = new Date().getTime();
		var timerDelay              = 5000;
		var processingBuffer  = 2000;

		var redirect = function(url) {
		  window.location = url;
		  log('ts: ' + timestamp + '; redirecting to: ' + url);
		}
		var isPageHidden = function() {
		    var browserSpecificProps = {hidden:1, mozHidden:1, msHidden:1, webkitHidden:1};
		    for (var p in browserSpecificProps) {
		        if(typeof document[p] !== "undefined"){
		        return document[p];
		      }
		    }
		    return false; // actually inconclusive, assuming not
		}
		var elapsedMoreTimeThanTimerSet = function(){
		    var elapsed = new Date().getTime() - timestamp;
		  log('elapsed: ' + elapsed);
		  return timerDelay + processingBuffer < elapsed;
		}
		var redirectToFallbackIfBrowserStillActive = function() {
		  var elapsedMore = elapsedMoreTimeThanTimerSet();
		  log('hidden:' + isPageHidden() +'; time: '+ elapsedMore);
		  if (isPageHidden() || elapsedMore) {
		    log('not redirecting');
		  }else{
		    // redirect('https://itunes.apple.com/ae/app/reel-cinemas/id432316358');
		    $('html').removeClass('sabotage-smartbanner');
		  }
		}
		var log = function(msg){
		}
		setTimeout(redirectToFallbackIfBrowserStillActive, timerDelay);
		redirect('reelCinemas://');
	}else{
		$('html').removeClass('sabotage-smartbanner');
	}
});*/


if('objectFit' in document.documentElement.style === false) {
	$('html').addClass('no--object-fit');
}else{
	$('html').addClass('object-fit');
}

function customPhoneInput() {
	if($('.js-phone-field').get(0)){
		$('.js-phone-field').each(function () {
			window.intlTelInput(this, {
				separateDialCode: true
			});
		});
	}
}
function adjustForm() {
	$('.js-form input, .js-form-sty-1 input').each(function () {
		var attr = $(this).attr('placeholder');
		var dataAttr = $(this).attr('placeholder');
		if(typeof attr !== typeof undefined && attr !== false){
			if(winWidth < 768){
				$(this).attr('placeholder', '');
				$(this).attr('data-placeholder', attr);
			}else if(typeof dataAttr !== typeof undefined && dataAttr !== false){
				$(this).attr('placeholder', dataAttr);
			}
		}
	});	
}
if($('input[name="phone"]').get(0)){
	$('input[name="phone"]').live('keyup', function(key) {
	    if(key.charCode < 48 || key.charCode > 57) return false;
	});
}