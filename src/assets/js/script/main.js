var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
	winWidth = $(window).width(),
	winHeight = $(window).height(),
	headerHeight = $('.c-main-header').outerHeight(),
	footerHeight = $('.c-main-footer').outerHeight(),
	bodyHeight,
	bodyTopPos,
	isIE = detectIE(),
	movieListAnimating = false;

// loadPlayMovies();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();

if(winWidth<768){
	$('.js-movie-list .u-loader').remove();
}


$(function () {
	locMapInit();
	winDimensions();
	ChangeToSvg();
    footerLogosCarousel();
	headerAdjust();
	movieListSetHTML();
	movieList();
	tabs();
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

	addingAOSData();

	$('.c-loader').fadeOut('slow', function () {
	    if(winWidth > 1024){
		   AOS.init({
			once: true,
			offset: 10,
		   });
	    }
	});
});

//On Window Load
$(window).on('load', function () {
	 // calcBodyarea();
	setTimeout(function () {
		addVideoPlugin();
		AOS.refresh();
		fixMobileCarouselWrongDisplay();
		movieListSetDropDownPos();
	}, 200);
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	if(winWidth != $(window).width()){
		winDimensions();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();
		bgMobImg();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			winDimensions();
			movieListSetHTML();
		}, 250);
		movieListCarousel();
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
$(document).on('click touchstart', function (e) {
	/*if ($(e.target).closest('.js-langSelector').length === 0) {
		$('.js-langSelector').find('ul').removeClass('active');
	}*/
});

function setOnTopClass() {
   if($(window).scrollTop() === 0) {
		$('html').removeClass('not-at-top');
   }else{
   		$('html').addClass('not-at-top');
   }
}

function winDimensions() {
	winWidth = $(window).width(),
	winHeight = $(window).height(),
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
	$('.js-banner-1b').slick({
		arrows: false,
		dots: true,
		asNavFor: '.js-banner-1a',
	});
	
	$('.js-offer-carousel').slick({
		slidesToShow: 4,
		arrows: false,
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					      	slidesToShow: 1,
					      }
					    },
				   	],
	});

	// Main Carousel
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
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 7,
		infinite: false,
		asNavFor: '.js-main-carousel',
		focusOnSelect: true,
	});
	$('.js-main-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log(slick.slideCount, currentSlide, nextSlide);
		if(nextSlide == 0 || nextSlide == slick.slideCount-1){
			$('.js-main-carousel-thumb').slick('slickGoTo', nextSlide);
		}
	});

	$('.js-nav-carousel').slick({
		dots: true,
		arrows: true,
	});

	// EXP Carousel
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
		slidesToScroll: 5,
		infinite: false,
		asNavFor: '.js-exp-carousel',
		responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1,
					        infinite: true,
					        focusOnSelect: true,
							swipeToSlide: true,
					      }
					    },
				   	],
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
}


function headerAdjust() {
	$('.js-header-links ul ul').closest('li').addClass('has--sub-nav');
}

function initSelect2() {
	$('.js-select2').select2();
}


function movieList() {
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

			// Check if some other movie is already open and if its on another row
			// then make sure we keep scroll jerk off the bay
			if(!$(this).closest('.list-wrap').next().find('.item-details').get(0) && $(this).closest('.js-movie-list').find('.movie-details .item-details').get(0)){

				var openOnOtherRowDetail = $(this).closest('.js-movie-list').find('.movie-details .item-details');

				// START -  Make sure there is enough space
				/*if($(this).closest('.js-movie-list').hasClass('js-movie-list--sty-1')){
					openOnOtherRowDetail.parent().css('display', 'block');
					var thisHeight = openOnOtherRowDetail.height();
					openOnOtherRowDetail.parent().css('display', 'none');

					var innerTab = $(this).closest('.is-tab').height() + $(this).closest('.is-tab');

					var botValue = thisHeight + openOnOtherRowDetail.parent().offset().top;
				}*/
				// END

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

function slideDownMovieDetails(thisSelf) {
	if(winWidth >=768 || $(thisSelf).closest('.js-movie-list').hasClass('js-movie-list--sty-1')){
		$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
		$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

		var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
		$(thisSelf).closest('.movie-item').addClass('is--active');
		$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
		$(thisSelf).closest('.list-wrap').next().slideDown();
		$(thisSelf).closest('.list-wrap').next().find('.popup--even-binded').removeClass('popup--even-binded');
		bindPopupEve();

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
	}
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

	if($('.js-movie-list').hasClass('slick-initialized')){
		$('.js-movie-list').slick('unslick');
		if(winWidth >=768){
			movieList();
		}else{
			$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

			var movieListInfinite = false;
			if($('.js-movie-list > *').length > 2){
				movieListInfinite = true;
			}
			$('.js-movie-list').slick({
				arrows: false,
				focusOnSelect: true,
				swipeToSlide: true,
				infinite: movieListInfinite,
			});
		}
	}
	
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
		$('.js-tab-link[data-tab-name="'+tabName+'"]').removeClass('is--active');
		$(this).addClass('is--active');
		$('.is-tab[data-tab-name="'+tabName+'"]').removeClass('is--active');
		var target = $(this).attr('href');
		$(target).addClass('is--active');
		if($(target).find('.js-movie-list').get(0)){
			movieListCarousel();
		}

		// Maps
		if($(this).closest('.c-selection-banner').get(0)){
			setMarkerTo($(this).index());
		}

		var self = this;
		setTimeout(function () {
			AOS.refresh();

			var filterHeight = 0;
			if(winWidth < 768 && $('.c-movie-filters').get(0)){
				filterHeight = $('.c-movie-filters').height();
			}
			if(!(winWidth < 768 && $(self).closest('.c-movies-list').get(0))){
				var topScroll = $(self).offset().top;
				var elemTopSpace = parseInt($(self).css('margin-top'));
				$('html, body').stop().animate({
					scrollTop: topScroll - elemTopSpace - headerHeight - filterHeight
				}, 500);
			}
		}, 200);
	});
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
		$(this).addClass('has-select-all-event');
		if($(this).find('input').is(":checked")){
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
		}else{
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );
			
		}
	});
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
	if($(window).width() < 768 && $('.js-movie-list:not(.js-movie-list--sty-1)').get(0)){
		$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

		var movieListInfinite = false;
		if($('.js-movie-list > *').length > 2){
			movieListInfinite = true;
		}
		$('.js-movie-list').slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: movieListInfinite,
		});
	}
}
function movieListCarousel() {
	movieListRemoveCarousel();
	movieListStartCarousel();
}
var jsMovieCarouselTimmer;
function fixMobileCarouselWrongDisplay() {
	setTimeout(function () {
		if($(window).width() < 768 && $('.js-movie-list:not(.js-movie-list--sty-1)').get(0)){
			jsMovieCarouselTimmer = setInterval(function () {
				if(!$('.js-movie-list').hasClass('slick-initialized')){
					$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();

					var movieListInfinite = false;
					if($('.js-movie-list > *').length > 2){
						movieListInfinite = true;
					}
					$('.js-movie-list').slick({
						arrows: false,
						focusOnSelect: true,
						swipeToSlide: true,
						infinite: movieListInfinite,
					});
				}
			}, 1000);
		}
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

function footerLogosCarousel() {
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
	if(winWidth > 1024 && isIE == false){
		// Left
		$('.movieheader .txt .movie-poster-detail').attr('data-aos', 'fade-left');
		// Right
		$('.movieheader .txt .movie-poster, .popular-heading, .logo img').attr('data-aos', 'fade-right');
		// Down
	    $('.c-main-header').attr('data-aos', 'fade-down');
	    // Up
	    $('.c-tabs .action, .c-banner-1 .bgimg-sec, .c-banner-1 .txt-sec .carousel, .c-content-block .img-txt-block .txt > *, .c-content-block .img-txt-block .img, .c-content-block h1, .c-offers .action, .c-offers .offers-list, .c-offers .heading-sec, .c-content-tiles, .movieheader, .c-whats-popular .sec-title, .tileview-movies-list, .c-show-list-page, .c-show-list-page .d-box-wrap, .c-show-list-page > .o-container:first-child, .list-main-action, .c-exp-views .carousel .item:first-child .txt, .c-main-footer, .c-main-footer > .o-container > .row > *, .c-exp-views, .c-movie-filters, .c-movies-list .list-tabs, .c-main-banner, .c-main-banner .main-carousel-thumb').attr('data-aos', 'fade-up');
		
		$('.c-banner-1 .txt-sec .carousel').attr('data-aos-delay', 100);

		$('.c-list-1 .list-wrap').each(function () {
			$(this).find('.init-part').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});

		$('.c-content-tiles').each(function(){
			$('.txt-block > *',this).each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});

	    $('.c-exp-views .carousel-thumb .slick-slide').each(function (i) {
	    	$(this).attr('data-aos', 'fade-right');
	    	$(this).attr('data-aos-delay', (50*i));
	    });
		$('.popular-heading').attr('data-aos-delay', 300);
		$('.movieheader .txt .movie-poster-detail, .movieheader .txt .movie-poster, .popular-heading').attr('data-aos-delay', 300);

		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});

		AOS.refresh();
	}
}

function refreshAOS(aosFunc){
	if(winWidth > 1024 && isIE == false){
		if(aosFunc == 'init'){
			AOS.init({
			once: true,
			offset: 10,
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
	if(headerHeight < 20){
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
	}
	
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
	console.log('1', videoLink);
	popupTarget = target;

	if(videoLink){
		if(isIE == false){
			var thisId = $(target).find('[data-video-instance]').attr('data-video-instance');
			players[thisId].destroy();
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
		console.log($(popupTarget).find('.plyr').length, $(popupTarget).find('.js-video')[0]);
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
			players[playersIndex] = new Plyr(this, {
				playsinline: true,
			});
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
	locMap = new google.maps.Map($('.js-loc-map')[0], {
	  center: markers[0].position,
	  zoom: 16,
	  mapTypeControlOptions: {
	    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
	  }
	});

	// Map Style
	locMap.mapTypes.set('styled_map', styledMapType);
	locMap.setMapTypeId('styled_map');

	// Adding Marker
	for (var i = 0; i < markers.length; i++) {
	    markersRef[i] = new google.maps.Marker({
		    position: markers[i].position,
		    icon: markerImage,
		    map: locMap
		});
	}
}

function setMarkerTo(targetIndex) {
	for (var i = markersRef.length - 1; i >= 0; i--) {
		markersRef[i].icon = markerImage;
	}

	markersRef[targetIndex].icon = markerImageActive;
	locMap.setCenter(markersRef[targetIndex].position);
}

function locMapInit() {
	if($('.js-loc-map').get(0)){
		$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhXFH3diOrb9h_znP9ndacEZ0FGfDSwas&callback=initMap" async defer></script>');
	}
}