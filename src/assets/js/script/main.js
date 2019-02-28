var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
	winWidth = viewport().width,
	winHeight = viewport().height,
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight(),
	bodyHeight,
	bodyTopPos,
	isIE = detectIE(),
	scrollHeight = 0,
	isMobil,
	movieListAnimating = false;

mobilecheck();
// loadPlayMovies();
charLimitInit();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();
adjustContentList2();
onlyPortrait();
removeLoaderInMob();


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
	calcScrollHeightDOM();
	heightMediaQuery();
	adjustContentList2();
	navDropDownHeight();

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
		addVideoPlugin();
		AOS.refresh();
		fixMobileCarouselWrongDisplay();
		movieListSetDropDownPos();
		calcScrollHeightDOM();
		heightMediaQuery();
	}, 200);
	navDropDownHeight();
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	if(winWidth != viewport().width){
		mobilecheck();
		winDimensions();
		heightMediaQuery();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();
		bgMobImg();
		adjustContentList2();
		removeLoaderInMob();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			winDimensions();
			animWrapHeight();
			heightMediaQuery();
			movieListSetHTML();
			calcScrollHeightDOM();
			onlyPortrait();
		}, 250);
		movieListCarousel();
		calcScrollHeightDOM();
		onlyPortrait();
		navDropDownHeight();
	}
});

function onlyPortrait() {
	if(winWidth > winHeight && isMobile){
		$('.c-landscape-msg').show();
	}else{
		$('.c-landscape-msg').hide();
	}
}

function calcScrollHeightDOM() {
	var body = document.body,
	    html = document.documentElement;

	scrollHeight = Math.max( body.scrollHeight, body.offsetHeight, 
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );
}

$(window).on('scroll', function () {
	var currentScroll = $(window).scrollTop();
	if((currentScroll + winHeight) >= scrollHeight){
		console.log((currentScroll + winHeight) >= scrollHeight);
		refreshAOS('refresh');
	}
});

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


function initSlick() {

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

	$('.js-banner-2').slick({
		arrows: true,
	});
	
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
	$('.js-offer-carousel-1').slick({
		slidesToShow: 5,
		arrows: false,
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
	$('.js-main-carousel').slick({
		arrows: false,
		infinite: true,
		fade: true,
		speed: 600,
		// autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.js-main-carousel-thumb',
	});
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 7,
		speed: 600,
		infinite: false,
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

	$('.js-nav-carousel').slick({
		dots: true,
		arrows: true,
	});
	$('.js-tile-inner-carousel').each(function () {
		var imgSelector = $(this).closest('.c-content-tiles').find('.js-content-bg-img-carousel');
		if(imgSelector.get(0)){
			$(this).slick({
				dots: true,
				arrows: false,
				asNavFor: imgSelector,
			});
			$(imgSelector).slick({
				dots: false,
				arrows: false,
				fade: true,
				asNavFor: $(this),
			});
		}else{
			$(this).slick({
				dots: true,
				arrows: false,
			});
		}
	});
	
	// EXP Carousel
	
	$('.js-exp-carousel').on('init', function(slick){
		$(slick.currentTarget).find('.slick-current video')[0].play();
	});
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
					      }
					    },
				   	],
	});
	$('.js-exp-carousel-thumb').slick({
		arrows: false,
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
		$(slick.currentTarget).find('.slick-current video')[0].pause();
	});

	$('.js-exp-carousel').on('afterChange', function(slick, currentSlide){
		$(slick.currentTarget).find('.slick-current video')[0].play();
	});

	$('.js-exp-carousel-thumb .item').click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
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


	$('.js-date-time').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 7,
		slidesToScroll: 1,
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
		      }
		    },
	  	]
	});

	$('.js-date-time').on('init', function(slick){
		$('.js-date-time .dboxelement').eq(0).addClass('active');
	});


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
		$('.js-mob-center-slider').slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: true,
		});
		$('.js-mob-center-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.js-mob-center-slider [data-slick-index="'+nextSlide+'"] a').trigger('click');
		});
	}

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
}


function headerAdjust() {
	$('.js-header-links ul ul').closest('li').addClass('has--sub-nav');
}

function initSelect2() {
	$('.js-select2').select2({
		// minimumResultsForSearch: Infinity
	});
}


function movieList() {
	if( (winWidth >= 768 && !$('.js-movie-list').hasClass('js-movie-list--sty-1')) || $('.js-movie-list').hasClass('js-movie-list--sty-1')){
		$('.js-movie-list .movie-item .item-wrap').click(function (e) {
			e.preventDefault();
			
			if($(e.target).closest('.js-close-movie-list-detail').length || movieListAnimating){
				return;
			}

			movieListAnimating = true;

			var _self = this;
			$(this).closest('.js-movie-list').removeClass('panel--closed');
			$(this).closest('.js-movie-list').addClass('has--open-panel');
			if(!$(this).closest('.js-movie-list').hasClass('js-movie-list--not-open')){

				if(!$(this).closest('.list-wrap').next().find('.item-details').get(0) && $(this).closest('.js-movie-list').find('.movie-details .item-details').get(0)){

					var openOnOtherRowDetail = $(this).closest('.js-movie-list').find('.movie-details .item-details');

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
		});
	}
}

function slideDownMovieDetails(thisSelf) {
	// if(winWidth >=768 || $(thisSelf).closest('.js-movie-list').hasClass('js-movie-list--sty-1')){
		$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
		$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

		var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
		$(thisSelf).closest('.movie-item').addClass('is--active');
		$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
		$(thisSelf).closest('.list-wrap').next().slideDown();
		$(thisSelf).closest('.list-wrap').next().find('.popup--even-binded').removeClass('popup--even-binded');
		bindPopupEve();

		var thisVideo = $(thisSelf).closest('.list-wrap').next().find('video');
		if(thisVideo.get(0)){
			thisVideo[0].play();
		}

		setInView($(thisSelf).closest('.list-wrap').next().find('.item-details')[0]);

		movieListAnimating = false;

		$('.js-movie-list .movie-details .js-close-movie-list-detail, .js-movie-list .list-wrap .js-close-movie-list-detail:not(.js-close-applied)').click(function (e) {
			e.preventDefault();
			
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
		});
	// }
}
function setInView(el) {

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

	if(e < d){
		$('html, body').stop().animate({
			scrollTop: a+b - window.innerHeight
		}, 500);
	}
}

function createMovieListMobileSlider(){
	$('.js-movie-list').each(function () {
		var movieListInfinite = false;
		if($(' > *', this).length > 3){
			movieListInfinite = true;
		}
		$(this).slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: movieListInfinite,
		});
	});
}

function movieListSetHTML() {
	var itemsPerRow = 1;
	if(winWidth < 1024){
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
			if(winWidth >=768){
				movieList();
			}else{
				createMovieListMobileSlider();
			}
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

	if(winWidth >= 768 || $('.js-movie-list').hasClass('js-movie-list--sty-1')){
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

function tabs() {
	$('.js-tab-link').click(function (e) {
		e.preventDefault();
		var tabName = $(this).attr('data-tab-name');

		// Mobile FAQ Layout, keep track of scroll possition.
		if(winWidth < 767 && $(this).closest('.layer-2-links').get(0)){
			var openTabHeight = $('.is-tab[data-tab-name="'+tabName+'"].is--active').height();
			var scrollPosition = $(window).scrollTop();
			var scrollToPos = scrollPosition - openTabHeight;
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

		$(target).addClass('is--active');

		if($(target).find('.js-movie-list').get(0)){
			movieListCarousel();
		}

		// Maps
		if($(this).closest('.c-selection-banner').get(0)){
			setMarkerTo($(this).index());
		}

		if(winWidth < 767 && $(this).hasClass('js-tab--mob-accord')){
			$('.is-tab[data-tab-name="'+tabName+'"]').stop().slideUp();
			$(target).stop().slideDown();

			$("html,body").stop().animate({
				scrollTop: scrollToPos
			}, 400);
		}

		var self = this;
		setTimeout(function () {
			AOS.refresh();

			var filterHeight = 0;
			if(winWidth < 768 && $('.c-movie-filters').get(0)){
				filterHeight = $('.c-movie-filters').height();
			}

			if(!((winWidth < 768 && $(self).closest('.c-movies-list').get(0)) || (winWidth < 768 && $(self).closest('.c-2-layer-content').get(0)))){

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

				$('html, body').stop().animate({
					scrollTop: scrollPos
				}, 500);
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
				$(thisTarget).eq(0).css('display', 'block');
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

function scrollCustomSelect() {
	if(winWidth < 768){
		$('.js-custom-select').each(function () {

			if($(this).find('.scroll-area .item').length > 3 && !$(this).find('.js-custom-select--scroll-up').get(0)){
				$(this).find('.scroll-area').after('<a href="#" class="scroll-up-arrow is--deactive js-custom-select--scroll-up"></a> <a href="#" class="scroll-down-arrow js-custom-select--scroll-down"></a>');
				
				$(this).find('.js-custom-select--scroll-down').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos + itemHeight)+'px'}, 200);
				});

				$(this).find('.js-custom-select--scroll-up').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({scrollTop: (currentScrollPos - itemHeight)+'px'}, 200);
				});


				$(this).find('.scroll-area').scroll(function () {
					scrollAreaScrolled(this);
				});
			}
		});
	}
}

function scrollAreaScrolled(scrollAreaRef) {
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
}

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
	movieListStartCarousel();
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

    $('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');

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
	var filterSpace = 0;
	if(winWidth < 768){
		filterSpace = 66;
		if(winHeight <= 650){
			filterSpace = 58;
		}
	}

	if(!$('.c-movie-filters').get(0)){
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
		if(isIE == false){
			var thisId = $(target).find('[data-video-instance]').attr('data-video-instance');
			if(players[thisId]){
				players[thisId].destroy();
			}
			$(target).find('.has--plyr').removeClass('has--plyr');
		}

		$(target).find('.js-video source').attr('src', videoLink);
		var thisVideoTag = $(target).find('.js-video')[0].outerHTML;
		var parentRef = $(target).find('.js-video').parent();
		$(target).find('.js-video').remove();
		parentRef.append(thisVideoTag);

		if(isIE == false){
			jsVideo();
		}
	}

	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function(){
		$(popupTarget).addClass('active');
		$(popupTarget).closest('.c-popup').addClass('popup--open');
		if($(popupTarget).find('.plyr').length){
			var videoInstance = $(popupTarget).find('.plyr').attr('data-video-instance');
			players[videoInstance].play();
		}else{
			$(popupTarget).find('.js-video')[0].play();
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
		if(winWidth > 1024 && $('.c-popup .active .plyr').length){
			var videoInstance = $('.c-popup .active .plyr').attr('data-video-instance');
			if(players[videoInstance]){
				players[videoInstance].pause();
			}
		}else if($('.c-popup .active .js-video').length){
			$('.c-popup .active .js-video')[0].pause();
			// $('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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
	if(winWidth > 1024 && $('.js-video').get(0) && isIE == false){
		var plyrScriptElement = document.createElement("script");
		plyrScriptElement.setAttribute('src', 'assets/js/plyr.min.js');

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
	if($('.js-video:not(.has--plyr)').length){
		$('.js-video:not(.has--plyr)').each(function(i) {
			$(this).addClass('has--plyr');
			var thisParent = $(this).parent();
			if(players[playersIndex]){
				players[playersIndex] = new Plyr(this, {
					playsinline: true,
				});
			}
			thisParent.find('.plyr').attr('data-video-instance', playersIndex);
			playersIndex++;
		});
	}
}

function jsVideoDirect() {
	/*if($('.js-video').length){
		$('.js-video').each(function(i) {
			$(this).attr('data-video-instance', i);
			var videoId = $(this).attr('data-plyr-embed-id');
			$(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		});
	}*/
}

function bindPopupEve() {
	// Popup Open
	$('.js-popup-link:not(.popup--even-binded)').click(function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		var videoLink = $(this).attr('data-video');
		openPopup(target, videoLink);
	}).addClass('popup--even-binded');

	// Popup Close
	$('.js-close-popup:not(.js-close-even-binded)').click(function (e) {
		e.preventDefault();
		closePopup();
	}).addClass('js-close-even-binded');
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

	        scrollAreaScrolled($(this).closest('.js-custom-select').find('.scroll-area')[0]);
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
		$(this).css('backgroundImage', 'url('+ $(this).attr('data-bgimg'+ sufixSelector) + ')');
	});
}

function activeHashTab(){
	var winHashVal = window.location.hash.substr(1);
	if(winHashVal){
		$('.js-tab-link[href="#'+winHashVal+'"]').click();
	}
}


// Close Movie List Sty 1
function movieListSty1Close() {
	$('.js-movie-list.js-movie-list--sty-1 .movie-details').slideUp();
    $('.js-movie-list.js-movie-list--sty-1').removeClass('has--open-panel');

	setTimeout(function () {
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-item').removeClass('is--active');
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-details .item-details').remove();
		$('.js-movie-list.js-movie-list--sty-1').addClass('panel--closed');
	}, 400);
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
	var activeLinkIndex = $('.c-selection-banner .selectors a.is--active').index();
	
	if(winWidth < 768){ hideDefaultUi = true; }

	locMap = new google.maps.Map($('.js-loc-map')[0], {
	  center: markers[activeLinkIndex].position,
	  zoom: 16,
	  disableDefaultUI: hideDefaultUi,
	  mapTypeControlOptions: {
	    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
	  }
	});

	// Map Style
	locMap.mapTypes.set('styled_map', styledMapType);
	locMap.setMapTypeId('styled_map');

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
			$('.c-selection-banner .selectors a').eq(index).trigger('click');
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
		$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhXFH3diOrb9h_znP9ndacEZ0FGfDSwas&callback=initMap" async defer></script>');
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

var heightMediaJumps = [1800,
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
	400]
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
		calcFAQHeight();
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
		$('.c-movies-list').css('min-height', winHeight-133);
		$('.c-movies-list .list-tabs').css('margin-top', winHeight*0.04);
		$('.c-movies-list .list-tabs').css('margin-bottom', winHeight*0.04);
		$('.c-exp-views').css('height', winHeight-133);
		$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-66);
		$('.c-content-tiles .wrap-col').css('min-height', winHeight-66);

		if(winHeight<=750){
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight-82);
			$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-100);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight-100);
		}
		if(winHeight<=720){
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width',winHeight*0.30);
		}
		if(winHeight<=675){
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width',winHeight*0.295);
		}
		if(winHeight<=650){
			minHeightSelctor1.css('min-height', winHeight-57);
			// heightSelector2.css('height', winHeight - 57);
			$('.c-movies-list').css('min-height', winHeight-115);
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.29);
			$('.c-exp-views').css('height', winHeight-115);
			$('.c-content-tiles .wrap-col').css('padding-top', (winHeight*0.5)-58);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight-58);
		}
		if(winHeight<=610){
			$('.c-movies-list .list-tabs').css('margin-top', winHeight*0.03);
			$('.c-movies-list .list-tabs').css('margin-bottom', winHeight*0.03);
		}
		if(winHeight<=590){
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.26);
		}
		if(winHeight<=585){
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.26);
		}
		if(winHeight<=550){
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.28);
		}
		if(winHeight<=520){
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.24);
		}
	}else{
		$('.c-main-banner .main-carousel .item .item-inner').css('height', '');
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
		links1.height('auto');
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
	}
}

function removeLoaderInMob() {
	if(winWidth<768){
		$('.js-movie-list .u-loader').remove();
	}
}
