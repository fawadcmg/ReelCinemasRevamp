var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://www.reelcinemas.ae/en/KeyArts/Tarilers/';
var moviewFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var genreFilter = new Array();
var movieListingArray = new Array();
var cienmasFilterListing = new Array();
var pageNumber = 0;
var movieCount=1;
var comingMovieFilter = new Array();
var comingCinemaFilter = new Array();
var comingExperienceFilter = new Array();
var comingGenreFilter = new Array();
var comingmovieListingArray = new Array();
var comingCienmasFilterListing = new Array();
var comingmovieListingArray = new Array();
var comingPageNumber = 0;
var comingMovieCount=1;
var moviesPerPage = 3;

var playMoviesListing = $('.js-play-movies-listing');  	
var moreMoviesListing = $('.js-load-play-movies-listing');
var movieExperienceArray = new Array();

$(document).ready(function () {
	loadCinemasDropdown();
	loadMoviesDropdown();
	loadExperiencesDropdown();

	loadHomeMovies();

	scrollCustomSelect();
	refreshAOS('refresh');
});


// Load Cinema Listing
function loadCinemasDropdown(){
	var cinemasListing = $('.js-cimemas-listing');
	var comingCinemasListing = $('.js-coming-cimemas-listing');
	var itemValue, itemClass;
	var tempArray = [];
	var comingTempArray = [];
	var tempEntry = [];	

	cinemasListing.empty();
	comingCinemasListing.empty();

	$.getJSON('Cinemas.json', function (data) {
		$.each( data, function( i, item ) {        
			itemValue = item.CinemaName;
			itemID = item.CinemaID;
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.toLowerCase();

			cienmasFilterListing.push( [itemClass ] );
		  	tempArray.push( [itemValue, itemClass] );

			comingCienmasFilterListing.push( [itemClass ] );
			comingTempArray.push( [itemValue, itemClass] );
		  
		});
	}).done(function( data ) {   

		cinemasListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-locations"><label for="select-all-locations"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		cinemasListing.append('<div class="scroll-area"></div>');
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			cinemasListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}
		cinemasListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

		$('.js-cinemaItem').click(function () {
			var cinemaNames = $(this).val();
			if($(this).prop('checked') == true){
				cinemaFilter[cinemaFilter.length] = cinemaNames;
			}else{				
				cinemaFilter.splice($.inArray(cinemaNames, cinemaFilter),1);
			}
			cinemaFilter = startFromZero(cinemaFilter);						
			filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');
		});

		$('#select-all-locations').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "cinemaFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

		if( $('.home-page').length > 0 ){
			comingCinemasListing.append('<div class="item custom-action js-select-all js-select-all-location-coming"><input type="checkbox" id="select-all-locations-1"><label for="select-all-locations-1"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
			comingCinemasListing.append('<div class="scroll-area"></div>');
			for (arrayIndex = 0; arrayIndex < comingTempArray.length; arrayIndex++) {
				tempEntry = comingTempArray[arrayIndex];				
				comingCinemasListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem-coming" id="'+tempEntry[1]+'-1'+'"><label for="'+tempEntry[1]+'-1'+'">'+tempEntry[0]+'</label></div>');
			}
			comingCinemasListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

			$('.js-cinemaItem-coming').click(function () {
				var cinemaNames = $(this).val();
				if($(this).prop('checked') == true){
					comingCinemaFilter[comingCinemaFilter.length] = cinemaNames;
				}else{				
					comingCinemaFilter.splice($.inArray(cinemaNames, comingCinemaFilter),1);
				}
				comingCinemaFilter = startFromZero(comingCinemaFilter);			
				filterMovieBlock(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, 'coming');
			});

			$('#select-all-locations-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "comingCinemaFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter);
			});
		}

		scrollCustomSelect();
		refreshAOS('refresh');
		selectAllEvent();
	  	console.log("Cinemas completed");

	  	tempArray = [];
		comingTempArray = [];
		tempEntry = [];	

	}).fail(function( data ) {
	  	console.log("Cinemas failed");
	});
}

// Load Movie Listing
function loadMoviesDropdown(){
	var moviesListing = $('.js-movies-listing');
	var comingMoviesListing = $('.js-movies-listing-coming');
	var moreMoviesListing = $('.js-load-play-movies-listing');
	var itemValue, itemClass;
	var tempArray = [];
	var comingTempArray = [];
	var tempEntry = [];	
	var count=0;
	var movieCounter = 0;

	moviesListing.empty();
	comingMoviesListing.empty();

	$.getJSON('MoviesSession.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = itemClass.toLowerCase();
			tempArray.push( [itemValue, itemClass] );
			comingTempArray.push( [itemValue, itemClass] );
			movieCounter++;
			count++;

		});
	}).done(function( data ) {  

		moviesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies"><label for="select-all-movies"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		moviesListing.append('<div class="scroll-area"></div>');
		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			moviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem" id="'+tempEntry[1]+'"><label for="'+tempEntry[1]+'">'+tempEntry[0]+'</label></div>');
		}
		moviesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

		$('.js-movieItem').click(function () {
			var movieNames = $(this).val();
			if($(this).prop('checked') == true){
				moviewFilter[moviewFilter.length] = movieNames;
			}else{				
				moviewFilter.splice($.inArray(movieNames, moviewFilter),1);
			}
			moviewFilter = startFromZero(moviewFilter);			
			filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');
		});

		$('#select-all-movies').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "movieFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

		movieGridPagination('.js-play-movies-listing .list-wrap-page--','.js-load-play-movies-listing',pageNumber);

		if( $('.home-page').length > 0 ){

			comingMoviesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies-coming"><label for="select-all-movies-coming"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
			comingMoviesListing.append('<div class="scroll-area"></div>');
			comingTempArray.sort(function(a, b){
			    if(a[0] < b[0]) { return -1; }
			    if(a[0] > b[0]) { return 1; }
			    return 0;
			});
			for (arrayIndex = 0; arrayIndex < comingTempArray.length; arrayIndex++) {
				tempEntry = comingTempArray[arrayIndex];				
				comingMoviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem-coming" id="'+tempEntry[1]+"-1"+'"><label for="'+tempEntry[1]+"-1"+'">'+tempEntry[0]+'</label></div>');
			}
			comingMoviesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

			$('.js-movieItem-coming').click(function () {
				var movieNames = $(this).val();
				if($(this).prop('checked') == true){
					comingMovieFilter[comingMovieFilter.length] = movieNames;
				}else{				
					comingMovieFilter.splice($.inArray(movieNames, comingMovieFilter),1);
				}

				comingMovieFilter = startFromZero(comingMovieFilter);			
				filterMovieBlock(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, 'coming');
			});

			$('select-all-movies-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "comingMovieFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter);
			});		

			movieGridPagination('.js-coming-movies-listing .list-wrap-page--','.js-load-coming-movies-listing',comingPageNumber);	
		}

		scrollCustomSelect();
		refreshAOS('refresh');

		
	    // resetPagination(1);
	    playMoviesListing.removeClass('is--loading');
	    selectAllEvent();
	  	console.log("Movies completed");
	  	tempArray = [];
		comingTempArray = [];
		tempEntry = [];

	}).fail(function( data ) {
	  	console.log("Movies failed");
	});

}

// Load Experiences
function loadExperiencesDropdown(){

  	var experiencesListing = $('.js-experiences-listing');
  	var itemValue;
  	var tempItem = new  Array();
  	var tempArray = [];
	var tempEntry = [];	
	var count=0;	

	experiencesListing.empty();

	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			itemValue = item.Experience;
			itemClass = itemValue;
		    itemClass = itemClass.replace(/\s+/g, "-");
		    itemClass = itemClass.toLowerCase();
			if(item.movieType == 'now'){
				tempArray.push( [itemValue, itemClass] );
			}

		});
	  
	}).done(function( data ) {
		experiencesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-exp"><label for="select-all-exp"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		experiencesListing.append('<div class="scroll-area"></div>');
		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			experiencesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-experienceItem" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}
		experiencesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

		scrollCustomSelect();
		refreshAOS('refresh');
		selectAllEvent();	

		loadExperiencesLogos();

	    console.log("Experiences completed");
	    tempArray = [];
		tempEntry = [];

	}).fail(function( data ) {
	    console.log("Experiences failed");
	});
}

function loadExperiencesLogos(){
	movieExperienceArray.push( ['dine','dine-in'] );
	movieExperienceArray.push( ['boutique','boutique'] );
	movieExperienceArray.push( ['dolby','dolby-cinema'] );
	movieExperienceArray.push( ['mx4d','mx4d'] );
	movieExperienceArray.push( ['platinum','platinum-suties'] );
	movieExperienceArray.push( ['premier','premier'] );
	movieExperienceArray.push( ['standard','standard'] );
	movieExperienceArray.push( ['junior','junior'] );
}

function dropdownSelectAll(targetObj, filterName, tempMovieArray, tempCinemaArray, tempExperienceArray, tempGenreArray ){
	var filterObject = [];

	if(filterName == 'movieFilter'){
		targetObj.each(function (i) {
			if($(this).css('display') == 'block' 
			 	&& $(this).find('.js-movieItem').prop('checked') == true ){

				filterObject.push(	$(this).find('.js-movieItem').val() );

			 }		
		});
		tempMovieArray = filterObject;		
	}else if(filterName == 'cinemaFilter'){
		targetObj.each(function (i) {
			if($(this).css('display') == 'block' 
			 	&& $(this).find('.js-cinemaItem').prop('checked') == true ){

				filterObject.push(	$(this).find('.js-cinemaItem').val() );

			 }		
		});
		tempCinemaArray = filterObject;
	}else if(filterName == 'experienceFilter'){
		targetObj.each(function (i) {
			if($(this).css('display') == 'block' 
			 	&& $(this).find('.js-experienceItem').prop('checked') == true ){

				filterObject.push(	$(this).find('.js-experienceItem').val() );

			 }		
		});
		tempExperienceArray = filterObject;
	}else if(filterName == 'genreFilter'){
		targetObj.each(function (i) {
			if($(this).css('display') == 'block' 
			 	&& $(this).find('.js-genreItem').prop('checked') == true ){

				filterObject.push(	$(this).find('.js-genreItem').val() );

			 }		
		});
		tempGenreArray = filterObject;
	}

	moviewFilter = tempMovieArray;
	cinemaFilter = tempCinemaArray;
	experienceFilter = tempExperienceArray;
	genreFilter = tempGenreArray;
	filterObject = [];

	filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');	
}

function startFromZero(arr) {
    var newArr = [];
    var count = 0;

    for (var i in arr) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

$('#select-all-exp').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "experienceFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
});

$('.js-experienceItem').click(function () {

	var experienceNames = $(this).val();
	if($(this).prop('checked') == true){
		experienceFilter[experienceFilter.length] = experienceNames;
	}else{				
		experienceFilter.splice($.inArray(experienceNames, experienceFilter),1);
	}

	experienceFilter = startFromZero(experienceFilter);			
	filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');
});

$('.js-genreItem').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		genreFilter[genreFilter.length] = genreNames;
	}else{				
		genreFilter.splice($.inArray(genreNames, genreFilter),1);
	}	

	genreFilter = startFromZero(genreFilter);			
	filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');
});	

$('#select-all-exp-coming').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "experienceFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
});

$('.js-genreItem-coming').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		comingGenreFilter[comingGenreFilter.length] = genreNames;
	}else{				
		comingGenreFilter.splice($.inArray(genreNames, comingGenreFilter),1);
	}	

	comingGenreFilter = startFromZero(comingGenreFilter);			
	filterMovieBlock(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, 'coming');
});	

// loadPlayPopup();
function loadPlayPopup(){
	var moviesListing = $('.js-c-popup');
	var itemValue, itemClass, itemPopupClass;
	moviesListing.empty();
	result = '<div class="overlay js-close-popup"></div>';

	$.getJSON('MoviesSession.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = 'play-video-'+itemClass.toLowerCase();
			itemPopupClass = 'popup-play-video-'+itemClass.toLowerCase();
			var movieImage = moviePostURL+item.MovieImage;			
			var movieTrailer = movieURL+item.MovieTrailer;
			
	        result += '<section id="'+itemClass+'" class="popup popup--full-screen">\
	            <div class="popup-wrap">\
	                <video class="js-video" poster="" id="'+itemPopupClass+'" autoplay playsinline controls>\
	                    <source src="'+movieTrailer+'" type="video/mp4">\
	                </video>\
	                <div class="popup-action">\
	                    <a href="javascript:void(0);" class="c-close js-close-popup"><span>Close</span></a>\
	                </div>\
	            </div>\
	        </section>';

		});
	}).done(function( data ) {  
		moviesListing.append(result);
		
	  	console.log("Movies popup completed");
	}).fail(function( data ) {
	  	console.log("Movies popup failed");
	});

	result = '';

	$.getJSON('ComingSoon.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = 'coming-video-'+itemClass.toLowerCase();
			itemPopupClass = 'popup-coming-video-'+itemClass.toLowerCase();
			var movieImage = moviePostURL+item.MovieImage;			
			var movieTrailer = movieURL+item.MovieTrailer;
			
	        result += '<section id="'+itemClass+'" class="popup popup--full-screen">\
	            <div class="popup-wrap">\
	                <video class="js-video" poster="" id="'+itemPopupClass+'" autoplay playsinline controls>\
	                    <source src="'+movieTrailer+'" type="video/mp4">\
	                </video>\
	                <div class="popup-action">\
	                    <a href="javascript:void(0);" class="c-close js-close-popup"><span>Close</span></a>\
	                </div>\
	            </div>\
	        </section>';

		});
	}).done(function( data ) {  
		moviesListing.append(result);
		
	  	console.log("Coming popup completed");
	}).fail(function( data ) {
	  	console.log("Coming popup failed");
	});
}

$('.js-load-play-movies-listing').click(function () {		
	movieGridPagination('.js-play-movies-listing .list-wrap-page--','.js-load-play-movies-listing',pageNumber);
});	

$('.js-load-coming-movies-listing').click(function () {		
	movieGridPagination('.js-coming-movies-listing .list-wrap-page--','.js-load-coming-movies-listing',comingPageNumber);
});	

$('.js-tab-link').click(function () {	
	if($('.home-page').length > 0 ){
		var sourceObj = $(this).attr('href');
		var countBlock = $(sourceObj).find('.js-movie-list').find('.list-wrap').length;
		if(countBlock == 0 && sourceObj == '#whats-coming'){
			loadHomeComingMovies();
		}
	}
});	

function movieGridPagination(parentItem, loadMoreItem, currentPageNumber){

	var currentPage = currentPageNumber;
	var startItem = (currentPage*moviesPerPage)-moviesPerPage;
	var endItem = (currentPage+1)*moviesPerPage;	
	var counter;

	if(startItem < 0){
		startItem = 1;
	}

    $('.js-play-movies-listing .list-wrap-page--1').fadeIn('slow');
	$('.js-play-movies-listing .list-wrap-page--2').fadeIn('slow');
	$('.js-play-movies-listing .list-wrap-page--3').fadeIn('slow');
	$('.js-coming-movies-listing .list-wrap-page--1').fadeIn('slow');
	$('.js-coming-movies-listing .list-wrap-page--2').fadeIn('slow');
	$('.js-coming-movies-listing .list-wrap-page--3').fadeIn('slow');
		
	for(counter= startItem; counter <= endItem ; counter++){		
		$(parentItem+counter).fadeIn('slow');
	}
	
	if($('.list-wrap-page--1').length == 0 || $('.list-wrap-page--'+counter).length == 0){
		$(loadMoreItem).fadeOut('fast');		
	}else if(movieCount < counter){
    	$(loadMoreItem).fadeOut('fast');    	
    }else if(endItem > 1){
    	$(loadMoreItem).fadeIn('slow');
    }

    if(loadMoreItem == '.js-load-play-movies-listing' ){		
    	pageNumber++;
    }else if( loadMoreItem == '.js-load-coming-movies-listing'){    	
    	comingPageNumber++;
    }
}

function loadHomeMovies(){
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExprerience, movieExprerienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass, movieCounter, movieURL;

  	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty();

	movieCounter =0;
	movieCount = 1;	

	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;
			movieImage = moviePostURL+item.MovieImage;
			movieGenre = item.Genre;
			movieTrailer = movieURL+item.MovieTrailer;
			movieDuration = item.Duration;
			moviePG = item.Rating; // PG <br> 13			
			movieLanguage = item.MovieLanguage;		
			movieExprerienceTemp = item.Experience;
			movieCinema = item.CinemaName;
			movieSynopsis = item.Synopsis;
			movieURL = 'movie-inner.html?param1='+movieName;

			moviePG = moviePG.replace(/PG/g, "PG <br>");
			moviePG = moviePG.replace(/-/g, "<br>");			
			movieGenreDetail = movieGenre.replace(/,/g, "</span><span>");
			movieLanguage = movieLanguage.replace(/Language /g, "");
			movieLanguage = movieLanguage.replace(/Language: /g, "");
			movieLanguage = movieLanguage.replace(/Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language: /g, "");
			movieLanguage = movieLanguage.replace(/ Language/g, "");
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");
		
			movieExprerience = "";
			movieExprerienceTemp = movieExprerienceTemp.toLowerCase();		

			var tempMovieSynopsis = movieSynopsis.split('\n');
		 	var tempVal = "";
		 	var tempSynopsis, tempDirector, tempCast;
		 	var movieTrailerURL, temp, arrayIndex;

		 	for(var counter=0; counter < tempMovieSynopsis.length; counter++){
		 		if (tempMovieSynopsis[counter].indexOf('Synopsis') > -1) {
		 			strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Synopsis: ');
		  			tempSynopsis = tempMovieSynopsis[counter].substring(strposition+10,strLen);
	            }            
	            if (tempMovieSynopsis[counter].indexOf('Director') > -1) {	                
	                strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Director: ');
		  			tempDirector = "<br><br><strong>Director:</strong>" + tempMovieSynopsis[counter].substring(strposition+10,strLen);
	            }
	            if (tempMovieSynopsis[counter].indexOf('Cast') > -1) {
	            	strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Cast: ');
		  			tempCast = "<br><br><strong>Cast:</strong>" + tempMovieSynopsis[counter].substring(strposition+6,strLen);	                
	            }	            
		 	}
		 	    		 	
			movieSynopsis =  tempSynopsis + tempDirector + tempCast;

		  	movieCinemaClass = "";
		  	movieGenreClass = "";
	  				  	
		  	for (arrayIndex = 0; arrayIndex < movieExperienceArray.length; arrayIndex++) {
				temp = movieExperienceArray[arrayIndex];			
				if(movieExprerienceTemp.indexOf(temp[0]) > -1  ){					
					movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-'+temp[1]+'--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-'+temp[1]+'.png" alt="Reel '+temp[0]+'"></picture></li>';
				}				
			}

			movieExprerienceClass = movieExprerienceTemp.replace(/,/g, " ");
			movieNameClass = movieName.replace(/\s+/g, "-");
			movieNameClass = movieNameClass.replace(" ", "-");
			movieNameClass = movieNameClass.replace(".", "-");
			movieNameClass = movieNameClass.toLowerCase();

			movieCinemaClass = movieCinema;			
			movieCinemaClass = movieCinemaClass.replace(/\s+/g, "-");
			movieCinemaClass = movieCinemaClass.replace(/,/g, " ");
			movieCinemaClass = movieCinemaClass.toLowerCase();

			movieGenreClass = "genre-"+movieGenre;
			movieGenreClass = movieGenreClass.replace(/\s+/g, "");
			movieGenreClass = movieGenreClass.replace(/,/g, " genre-");
			movieGenreClass = movieGenreClass.toLowerCase();
			bookNowClass = "";

			if(item.movieType == 'coming'){
				bookNowClass = '<div class="booknow-tag"><span>BOOK NOW</span></div>';
			}	

			movieTrailerURL = 'play-video-'+movieNameClass;

			movieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="javascript:void(0);" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#'+movieTrailerURL+'" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(movieListingArray[movieCounter]);
			movieCounter++;
			movieCount++;
		});
	  
	}).done(function( data ) {

	    playMoviesListing.removeClass('is--loading');
	    movieListSetHTML();
	    movieList();

		scrollCustomSelect();
		refreshAOS('refresh');
	    toSVG();
		movieListCarousel();
		filterSearch();

		$('.js-play-movies-listing .list-wrap').fadeOut('fast');
		movieGridPagination('.js-play-movies-listing .list-wrap-page--','.js-load-play-movies-listing',pageNumber);

		if(winWidth > 1024 && isIE == false){
			$('.c-movies-list .list-wrap').each(function () {
				$(this).find('.movie-item').each(function (i) {
			    	$(this).attr('data-aos', 'fade-up');
			    	$(this).attr('data-aos-delay', (50*i));
				});
			});
		}
		refreshAOS('init');
		

		console.log("Play movies completed");		
	}).fail(function( data ) {
	    console.log("Play movies failed");
	});
}

function loadHomeComingMovies(){

  	var playMoviesListing = $('.js-coming-movies-listing');  	
	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExprerience, movieExprerienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass, movieCounter, movieURL;

	playMoviesListing.empty();
	movieCounter =0;

	$.getJSON('ComingSoon.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;
			movieImage = moviePostURL+item.MovieImage;
			movieGenre = item.Genre;
			movieTrailer = movieURL+item.MovieTrailer;
			movieDuration = item.Duration;
			moviePG = item.Rating; // PG <br> 13			
			movieLanguage = item.MovieLanguage;		
			movieExprerienceTemp = item.Experience;
			movieCinema = item.CinemaName;
			movieSynopsis = item.Synopsis;
			movieURL = 'movie-inner.html?param1='+movieName;

			moviePG = moviePG.replace(/PG/g, "PG <br>");
			moviePG = moviePG.replace(/-/g, "<br>");			
			movieGenreDetail = movieGenre.replace(/,/g, "</span><span>");
			movieLanguage = movieLanguage.replace(/Language /g, "");
			movieLanguage = movieLanguage.replace(/Language: /g, "");
			movieLanguage = movieLanguage.replace(/Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language: /g, "");
			movieLanguage = movieLanguage.replace(/ Language/g, "");
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");

			movieExprerience = "";

			var tempMovieSynopsis = movieSynopsis.split('\n');
		 	var tempVal = "";
		 	var tempSynopsis, tempDirector, tempCast;

		 	for(var counter=0; counter < tempMovieSynopsis.length; counter++){
		 		if (tempMovieSynopsis[counter].indexOf('Synopsis') > -1) {
		 			strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Synopsis: ');
		  			tempSynopsis = tempMovieSynopsis[counter].substring(strposition+10,strLen);
	            }            
	            if (tempMovieSynopsis[counter].indexOf('Director') > -1) {	                
	                strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Director: ');
		  			tempDirector = "<br><br><strong>Director:</strong>" + tempMovieSynopsis[counter].substring(strposition+10,strLen);
	            }
	            if (tempMovieSynopsis[counter].indexOf('Cast') > -1) {
	            	strLen = tempMovieSynopsis[counter].length;
		  			strposition = tempMovieSynopsis[counter].indexOf('Cast: ');
		  			tempCast = "<br><br><strong>Cast:</strong>" + tempMovieSynopsis[counter].substring(strposition+6,strLen);	                
	            }	            
		 	}
		 	    		 	
			movieSynopsis =  tempSynopsis + tempDirector + tempCast;

		  	movieCinemaClass = "";
		  	movieGenreClass = "";
	  	
			movieNameClass = movieName.replace(/\s+/g, "-");
			movieNameClass = movieNameClass.replace(" ", "-");
			movieNameClass = movieNameClass.replace(".", "-");
			movieNameClass = movieNameClass.toLowerCase();

			movieCinemaClass = movieCinema;			
			movieCinemaClass = movieCinemaClass.replace(/\s+/g, "-");
			movieCinemaClass = movieCinemaClass.replace(/,/g, " ");
			movieCinemaClass = movieCinemaClass.toLowerCase();

			movieGenreClass = "genre-"+movieGenre;
			movieGenreClass = movieGenreClass.replace(/\s+/g, "");
			movieGenreClass = movieGenreClass.replace(/,/g, " genre-");
			movieGenreClass = movieGenreClass.toLowerCase();

			bookNowClass = '<div class="booknow-tag"><span>BOOK NOW</span></div>';

			movieTrailerURL = 'coming-video-'+movieNameClass;
				
			comingmovieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="javascript:void(0);" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#'+movieTrailerURL+'" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(comingmovieListingArray[movieCounter]);
			movieCounter++;
			comingMovieCount++;
		});

		scrollCustomSelect();
	  
	}).done(function( data ) {	    

	    movieListSetHTML();
	    movieList();

		scrollCustomSelect();
		refreshAOS('refresh');
	    toSVG();
		movieListCarousel();
		filterSearch();

	    $('.js-coming-movies-listing').removeClass('is--loading');
	    $('.js-coming-movies-listing .list-wrap').fadeOut('fast');
	    movieGridPagination('.js-coming-movies-listing .list-wrap','.js-load-coming-movies-listing',comingPageNumber);

		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});
		refreshAOS('init');

	    console.log("Coming soon movies completed");
	}).fail(function( data ) {
	    console.log("Coming soon movies failed");
	});
}

// Check movie filter functionality for combine with Movie Cinema and Experience
function filterMovieBlock(movieIDs, cinemaIDs, experienceIDs, genreIDs, targetObj){
	movieListRemoveCarousel();

	var movieItems = [];
	var tempArray = [];
	var movieCounter=0;
	var tempMovieArrayList = [];	
	var playMoviesListing;	

	if(targetObj == 'now'){
		pageNumber = 0;
		tempMovieArrayList = movieListingArray;
		playMoviesListing = $('.js-play-movies-listing');		
	}else if(targetObj == 'coming'){
		comingPageNumber =0;
		tempMovieArrayList = comingmovieListingArray;
		playMoviesListing = $('.js-coming-movies-listing');		
	}	
	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 

	if(movieIDs.length == 0 && cinemaIDs.length == 0 && experienceIDs.length == 0 && genreIDs.length == 0  ){
		for(innerCounter=0; innerCounter < tempMovieArrayList.length; innerCounter++){		
			movieItems[movieCounter] = tempMovieArrayList[innerCounter];
			movieCounter++;			
		}
	}else{

		movieItems = tempMovieArrayList;
		
		if(cinemaIDs.length > 0 ){
			movieCounter=0;
			for(counter=0; counter < cinemaIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = cinemaIDs[counter];
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(experienceIDs.length > 0 ){	
			movieCounter = 0;	
			tempArray = [];		
			for(counter=0; counter < experienceIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = experienceIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(genreIDs.length > 0 ){	
			movieCounter = 0;	
			tempArray = [];				
			for(counter=0; counter < genreIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = genreIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(movieIDs.length > 0 ){	
			movieCounter = 0;
			tempArray = [];					
			for(counter=0; counter < movieIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = movieIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}
	}

	movieItems = unique(movieItems);
	
	for(counter=0; counter < movieItems.length; counter++){
		playMoviesListing.append(movieItems[counter]);	
	}

	movieListSetHTML();
	movieList();

	if(targetObj == 'now'){		
		$('.js-play-movies-listing .list-wrap').fadeOut('fast');
		movieGridPagination('.js-play-movies-listing .list-wrap-page--','.js-load-play-movies-listing',pageNumber);
	}else if(targetObj == 'coming'){
		$('.js-coming-movies-listing .list-wrap').fadeOut('fast');
	    movieGridPagination('.js-coming-movies-listing .list-wrap','.js-load-coming-movies-listing',comingPageNumber);
	}
	playMoviesListing.removeClass('is--loading');

	if(winWidth > 1024 && isIE == false){
		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});
	}

	tempMovieArrayList = [];
	movieItems = [];
	tempArray = [];	
	tempMovieArrayList = [];
	playMoviesListing = '';	
	
	toSVG();
	movieListStartCarousel();
	refreshAOS('init');
}