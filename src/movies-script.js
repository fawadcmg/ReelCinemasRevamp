var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/',
movieURL = 'http://www.reelcinemas.ae/en/KeyArts/Tarilers/',
weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
baseURL = window.location.protocol + "//" + window.location.host + "/",
searchMovieName = window.location.search.split('?param1=')[1],
playMoviesListing = $('.js-play-movies-listing'),
comingMoviesListing = $('.js-coming-movies-listing'),
moviesPerPage = 3,
currentPageName='',
movieSearchDate,
searchDateValue,
movieExperienceArray = new Array(),
movieListingArray = new Array(),
movieComingListingArray = new Array(),
movieGridListing = new Array(),
comingMovieListingArray = new Array(),
comingMovieComingListingArray = new Array(),
comingMovieGridListing = new Array(),
movieSessionListing = new Array(),
movieTilesListingArray = new Array(),
movieCinamaListing = new Array(),
moviewFilter = new Array(),
cinemaFilter = new Array(),
experienceFilter = new Array(),
genreFilter = new Array(),
showTimeFilter = new Array(),
comingMovieFilter = new Array(),
comingCinemaFilter = new Array(),
comingExperienceFilter = new Array(),
comingGenreFilter = new Array(),
cienmasFilterListing = new Array(),
comingCienmasFilterListing = new Array(),
tempExperienceFilter = new Array(),
movieListingTempArray = new Array(),
experienceMovieListing = new Array(),
showtimeMoviesByDate = new Array(),
showtimeMovieClass = new Array();

if($('.home-page').length > 0 ){
	currentPageName = 'home';
	initPageModules();
	loadHomePageModules();
}else if($('.movie-detail-page').length > 0){
	currentPageName = 'movie detail';
	initPageModules();	
}else if($('.showtime-page').length > 0){
	currentPageName = 'showtime grid';
	initPageModules();
	loadShowtimeGridModules();
}else if($('.showtime-tile-page').length > 0){
	initPageModules();
	currentPageName = 'showtime tile';
}

function loadHomePageModules(){	
	initMovieGrid("all");
	initComingMovieGrid();
}

function loadShowtimeGridModules(){
	var currentDate = new Date();
	searchDateValue = currentDate.getDate()+"-"+monthName[currentDate.getMonth()]+"-"+weekName[currentDate.getDay()];
	initMovieSessions();
	initMovieDates("all");
	initMovieGrid(searchDateValue);
}

function loadMovieDetailModules(){
	var currentDate = new Date();
	searchDateValue = currentDate.getDate()+"-"+monthName[currentDate.getMonth()]+"-"+weekName[currentDate.getDay()];
	initMovieSessions();
	loadMovieDetail(searchMovieName);
	initMovieDates(searchMovieName);	
	loadPopularMovies();
}

function loadShowtimeTileModules(){
	var currentDate = new Date();
	searchDateValue = currentDate.getDate()+"-"+monthName[currentDate.getMonth()]+"-"+weekName[currentDate.getDay()];
	initMovieSessions();	
	initMovieDates("all");	
	loadPopularMovies();
}

$(document).ready(function () {
	
	if(currentPageName == 'movie detail' 
		|| currentPageName == 'showtime grid'
		|| currentPageName == 'showtime tile'){
		setTimeout(function() {			
			$(".slick-current > div > .js-movieDateFilter").trigger('click');			
		    $(".slick-current > div > .js-movieDateFilter > dboxelement").addClass('active');
		}, 1000);
	}

	
	
	if(currentPageName == 'home'){
		$('.list-wrap-page').hide();
		moviePagination(1,'now');
		moviePagination(1,'coming');		
	}else if(currentPageName == 'showtime grid'){
		$('.js-play-movies-listing .list-wrap-page').hide();
		moviePagination(1,'now');
		$('.list-wrap-page').hide();
	}
	
	scrollCustomSelect();
	refreshAOS('refresh');

});

function initPageModules(){
	loadCinemasDropdown();
	loadMoviesDropdown();
	loadExperiencesDropdown();	
}

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
			movieCinamaListing.push(itemValue);							
		  
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
			filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
		});

		$('#select-all-locations').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "cinemaFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

		if( currentPageName == 'home' ){
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
				filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
			});

			$('#select-all-locations-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "comingCinemaFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter);
			});
		}

		var currentDate = new Date();
		searchDateValue = currentDate.getDate()+"-"+monthName[currentDate.getMonth()]+"-"+weekName[currentDate.getDay()];

		scrollCustomSelect();
		refreshAOS('refresh');
		selectAllEvent();
	  	
	  	tempArray = [];
		comingTempArray = [];
		tempEntry = [];	
		console.log("Cinemas completed");
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
			movieListingTempArray.push(itemValue);	
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
			filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");

		});

		$('#select-all-movies').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "movieFilter", moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

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
				filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
			});

			$('select-all-movies-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "comingMovieFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter);
			});
		}

		scrollCustomSelect();
		refreshAOS('refresh');

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
	
	    console.log("Experiences completed");
	    tempArray = [];
		tempEntry = [];
		loadExperiencesLogos()
		if(currentPageName == 'movie detail'){
			loadMovieDetailModules();
		}else if(currentPageName == 'showtime tile'){
			loadShowtimeTileModules();
		}
		
	}).fail(function( data ) {
	    console.log("Experiences failed");
	});

}

function loadExperiencesLogos(){
	movieExperienceArray.push( ['dine','dine-in'] );
	movieExperienceArray.push( ['boutique','boutique'] );
	movieExperienceArray.push( ['dolby','dolby-cinema'] );
	movieExperienceArray.push( ['mx4d','mx4d'] );
	movieExperienceArray.push( ['screenx','screenx'] );	
	movieExperienceArray.push( ['platinum','platinum-suties'] );
	movieExperienceArray.push( ['premier','premier'] );
	movieExperienceArray.push( ['standard','standard'] );
	movieExperienceArray.push( ['junior','junior'] );

	for (arrayIndex = 0; arrayIndex < movieExperienceArray.length; arrayIndex++) {
		temp = movieExperienceArray[arrayIndex];			
		experienceMovieListing.push(temp[0]);		
	}
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

	// if($('.movie-detail-page').length > 0){
	// 	filterMoviesTiles(cinemaFilter, tempExperienceFilter, showTimeFilter);
	// }else{
	// 	filterMovieBlock(moviewFilter, cinemaFilter, experienceFilter, genreFilter, 'now');
	// }

	filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
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

function findAndReplace(string, target, replacement) {
	var i = 0, length = string.length;
 	for (i; i < length; i++) { 
		string = string.replace(target, replacement);
 	}
 	return string; 
}

function getShowTime(movieTimeValue){	
	var hourValue, minuteValue, result;	

	hourValue = parseInt(movieTimeValue.split(":"));
	minuteValue = movieTimeValue.split(":");

	if(hourValue == 12 && parseInt(minuteValue[1]) == 0 ){		
		result = "movie-show-morning";
	}else if(hourValue > 6 && hourValue < 12){		
		result = "movie-show-morning";
	}else if(hourValue == 18 && parseInt(minuteValue[1]) == 0){
		result = "movie-show-afternoon";
	}else if(hourValue > 12 && hourValue <= 18){
		result = "movie-show-afternoon";
	}else{
		result = "movie-show-evening";
	}

	return result;    
}

function initShowtimeMoviesByDate(argMovieDate){	
	showtimeMoviesByDate = [];
	var tempArray = new Array()
	for (var listCount = 0; listCount < movieSessionListing.length; listCount++) {
		tempArray = movieSessionListing[listCount];

		if(tempArray[2] == argMovieDate){
			showtimeMoviesByDate.push(tempArray[0]);
		}
	}	
	showtimeMoviesByDate = unique(showtimeMoviesByDate);
	tempArray = [];	
	loadMovieGridBlocks("moviveGrid");
}

function initMovieGrid(){

  	var movieItemClass, moviePG, movieName, movieCinema, movieGenreDetail, movieLanguage, movieSynopsis,
  	tempSynopsis, tempDirector, tempCast, strLen, strposition, tempDirector, tempCast,
  	movieExperience, movieExperienceTemp, movieGenre, movieExperienceClass,
  	movieNameClass, movieCinemaClass, movieGenreClass, showMovie;

  	var tempMovieSynopsis=[], tempGenre = [];

	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;

			moviePG = item.Rating;
			movieLanguage = item.MovieLanguage;
			movieSynopsis = item.Synopsis;
			movieExperience = item.Experience;
			movieGenre = item.Genre;			
			movieCinema = item.CinemaName;

			moviePG = moviePG.replace(/PG/g, "PG <br>");
			moviePG = moviePG.replace(/-/g, "<br>");			
			movieGenreDetail = moviePG.replace(/,/g, "</span><span>");
			
			movieLanguage = movieLanguage.replace(/Language /g, "");
			movieLanguage = movieLanguage.replace(/Language: /g, "");
			movieLanguage = movieLanguage.replace(/Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language: /g, "");
			movieLanguage = movieLanguage.replace(/ Language/g, "");
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");

			tempMovieSynopsis = movieSynopsis.split('\n');
		 	
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
		 	
		 	movieExperienceTemp = movieExperience;
		 	movieExperienceTemp = movieExperienceTemp.toLowerCase();
		 	movieExperience = "";

		 	for (arrayIndex = 0; arrayIndex < movieExperienceArray.length; arrayIndex++) {
				temp = movieExperienceArray[arrayIndex];			
				if(movieExperienceTemp.indexOf(temp[0]) > -1  ){					
					movieExperience += '<li><picture><source srcset="assets/img/logos/logo-reel-'+temp[1]+'--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-'+temp[1]+'.png" alt="Reel '+temp[0]+'"></picture></li>';
				}				
			}

			movieExperienceClass = movieExperienceTemp.replace(/,/g, " ");
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

			tempGenre = movieGenre.split(',');
			movieGenre = "";
			var spaceLabel;
			for(var counter=0; counter < tempGenre.length; counter++){
				spaceLabel = " | ";
				if(counter == 0){
					spaceLabel = ""
				}
		 		movieGenre += spaceLabel+  $.trim(tempGenre[counter]);
		 	}

			movieItemClass = movieNameClass + " " +movieCinemaClass + " "+ movieExperienceClass + " " +movieGenreClass;

			movieGridListing.push(
				[					
					movieItemClass,
					item.movieType,
					movieExperience,
					movieCinema,
					movieName,
					moviePostURL+item.MovieImage,
					movieURL+item.MovieTrailer,
					movieLanguage,
					item.Duration,
					moviePG,
					movieSynopsis,
					movieGenre,
					'movie-inner.html?param1='+movieName		
				]
			);			
		});
	  
	}).done(function( data ) {
		if(currentPageName == 'home'){
			loadMovieGridBlocks('all');
		}else if(currentPageName == 'showtime grid'){
			initShowtimeMoviesByDate(searchDateValue);
		}			
		console.log("Movie grid completed");		
	}).fail(function( data ) {
	    console.log("Movie grid  failed");
	});
}

function getMovieShowtime(argMovieName){

	var result = "";
	showtimeMovieClass = [];
	for (var listCount = 0; listCount < movieSessionListing.length; listCount++) {
		tempArray = movieSessionListing[listCount];

		if( tempArray[2] == searchDateValue 
			&& tempArray[0] == argMovieName){
			showtimeMovieClass.push(getShowTime(tempArray[3]));
		}
	}

	showtimeMovieClass = unique(showtimeMovieClass);
	result = showtimeMovieClass.toString();	
	result = findAndReplace(result,","," ");	
	return result;
}

function loadMovieGridBlocks(argMovie){

	playMoviesListing = $('.js-play-movies-listing')
  	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty();
	
	var result = "", bookNowClass = "", tempEntry = [], showMovie = 0, showtimeClass;

	movieListingArray = [];

	for(var counter=0; counter < movieGridListing.length; counter++){
		tempEntry = movieGridListing[counter];

		showMovie = 0;
		showtimeClass = "";

		if(argMovie == "all"){
			showMovie = 1;
		}else if ( argMovie == "moviveGrid" && $.inArray( tempEntry[4], showtimeMoviesByDate ) > -1 ){
			showMovie = 1;
		}

		if(showMovie == 1){

		showtimeClass =	getMovieShowtime(tempEntry[4]);

	if(tempEntry[1] == 'coming'){
		bookNowClass = '<div class="booknow-tag"><span>BOOK NOW</span></div>';
	}

	result = '<div class="movie-item '+tempEntry[0]+' '+showtimeClass+'">\
	<div class="bot-img" style="background-image: url('+tempEntry[5]+');"></div>\
	<div class="item-wrap"><div class="img"><div class="stamp">'+tempEntry[9]+'</div>'+bookNowClass+'<img src="'+tempEntry[5]+'" alt="'+tempEntry[4]+'"></div>\
		<div class="info"><div class="name">'+tempEntry[4]+'</div>\
			<div class="duration-language">\
			<div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[8]+'</span></div>\
			<div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div></div>\
			<div class="detail"><div class="detail-inner-wrap">'+tempEntry[11]+' | '+tempEntry[8]+'</div></div></div>\
		<div class="action"><a href="javascript:void(0);" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div>\
	<section class="item-details"> <a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a>\
		<div class="text"> <div class="title-wrap"> <h1 class="title">'+tempEntry[4]+'</h1> <div class="stamp">'+tempEntry[9]+'</div></div>\
			<div class="info genere"><span>'+tempEntry[11]+'</span></div>\
			<div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[8]+'</span></div>\
			<div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div>\
			<div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+tempEntry[2]+'</ul></div>\
			<div class="info"><strong>Storyline:</strong> '+tempEntry[10]+'</div>\
			<div class="action"><a href="'+tempEntry[12]+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#video-1" data-video='+tempEntry[6]+' class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div>\
		<div class="img"><img src="'+tempEntry[5]+'" alt="'+tempEntry[4]+'"></div>\
	</section></div>';

	movieListingArray.push(result);

	playMoviesListing.append(result);

		}
	}

	playMoviesListing.removeClass('is--loading');	
	movieListSetHTML();
	movieList();
}

function initComingMovieGrid(){

  	var movieItemClass, moviePG, movieName, movieCinema, movieGenreDetail, movieLanguage, movieSynopsis,
  	tempSynopsis, tempDirector, tempCast, strLen, strposition, tempDirector, tempCast,
  	movieGenre, movieExperienceClass,
  	movieNameClass, movieCinemaClass, movieGenreClass;

  	var tempMovieSynopsis=[], tempGenre = [];

	$.getJSON('ComingSoon.json', function (data) {
		$.each( data, function( i, item ) {

			moviePG = item.Rating;
			movieLanguage = item.MovieLanguage;
			movieSynopsis = item.Synopsis;
			movieGenre = item.Genre;
			movieName = item.MovieName;
			movieCinema = item.CinemaName;

			moviePG = moviePG.replace(/PG/g, "PG <br>");
			moviePG = moviePG.replace(/-/g, "<br>");			
			movieGenreDetail = moviePG.replace(/,/g, "</span><span>");
			
			movieLanguage = movieLanguage.replace(/Language /g, "");
			movieLanguage = movieLanguage.replace(/Language: /g, "");
			movieLanguage = movieLanguage.replace(/Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language: /g, "");
			movieLanguage = movieLanguage.replace(/ Language/g, "");
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class=''></i><span>");

			tempMovieSynopsis = movieSynopsis.split('\n');
		 	
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

			tempGenre = movieGenre.split(',');
			movieGenre = "";
			var spaceLabel;
			for(var counter=0; counter < tempGenre.length; counter++){
				spaceLabel = " | ";
				if(counter == 0){
					spaceLabel = ""
				}
		 		movieGenre += spaceLabel+  $.trim(tempGenre[counter]);
		 	}

			movieItemClass = movieNameClass + " " +movieCinemaClass + " " +movieGenreClass;

			comingMovieGridListing.push(
				[					
					movieItemClass,
					item.movieType,
					movieCinema,
					movieName,
					moviePostURL+item.MovieImage,
					movieURL+item.MovieTrailer,
					movieLanguage,
					item.Duration,
					moviePG,
					movieSynopsis,
					movieGenre,
					'movie-inner.html?param1='+movieName		
				]
			);
		});
	  
	}).done(function( data ) {
		loadComingMovieGridBlocks();		
		console.log("Coming movie grid completed");		
	}).fail(function( data ) {
	    console.log("Coming movie grid  failed");
	});
}

function loadComingMovieGridBlocks(){

  	comingMoviesListing.addClass('is--loading');
	comingMoviesListing.empty();
	var result = "", bookNowClass = "", tempEntry = [];
	for(var counter=0; counter < comingMovieGridListing.length; counter++){
		tempEntry = comingMovieGridListing[counter];

	if(tempEntry[1] == 'coming'){
		bookNowClass = '<div class="booknow-tag"><span>BOOK NOW</span></div>';
	}

	result = '<div class="movie-item '+tempEntry[0]+'">\
	<div class="bot-img" style="background-image: url('+tempEntry[4 ]+');"></div>\
	<div class="item-wrap"><div class="img"><div class="stamp">'+tempEntry[8 ]+'</div>'+bookNowClass+'<img src="'+tempEntry[4 ]+'" alt="'+tempEntry[3 ]+'"></div>\
		<div class="info"><div class="name">'+tempEntry[3 ]+'</div>\
			<div class="duration-language">\
			<div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div>\
			<div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[6]+'</span></div></div>\
			<div class="detail"><div class="detail-inner-wrap">'+tempEntry[10]+' | '+tempEntry[7]+'</div></div></div>\
		<div class="action"><a href="javascript:void(0);" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div>\
	<section class="item-details"> <a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a>\
		<div class="text"> <div class="title-wrap"> <h1 class="title">'+tempEntry[3]+'</h1> <div class="stamp">'+tempEntry[8]+'</div></div>\
			<div class="info genere"><span>'+tempEntry[10 ]+'</span></div>\
			<div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div>\
			<div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[6]+'</span></div>\
			<div class="info"><strong>Storyline:</strong> '+tempEntry[9 ]+'</div>\
			<div class="action"><a href="'+tempEntry[11 ]+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#video-1" data-video='+tempEntry[5]+' class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div>\
		<div class="img"><img src="'+tempEntry[4 ]+'" alt="'+tempEntry[3 ]+'"></div>\
	</section></div>';

		comingMovieListingArray.push(result);
		comingMoviesListing.append(result);
	}

	$('.is--loading').removeClass('is--loading');	
	movieListSetHTML();
	movieList();
}

function initMovieDates(argMovieName){
	
  	var movieDate, movieDateValue, targetItem, movieDates, counter, itemClass,
  	movieName, showMovie, movieDates = "", tempMovieDateList = [], tempArray = [];

  	targetItem = $('.js-date-time');
  	if(argMovieName != 'all'){
  		if(argMovieName.indexOf("%20") > -1){
	  		argMovieName = findAndReplace(argMovieName, "%20", " ");	
	  	}
  	}
  	
	targetItem = $('.js-date-time').removeClass('slick-initialized');
	targetItem = $('.js-date-time').removeClass('slick-slider');

  	targetItem.empty();
  	counter=0;

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {

			showMovie = 0;			
			movieDate = item.SessionDate;
			movieName = item.MovieName;
			if(argMovieName == movieName || argMovieName == "all"){
				showMovie = 1;
			}

			if(showMovie == 1){
				var movieDateValue = new Date(movieDate);
				tempArray.push(
					[
						movieDateValue.getFullYear(),
						movieDateValue.getDate(),
						monthName[movieDateValue.getMonth()],
						weekName[movieDateValue.getDay()]
					]
				);
			}
		});
	  
	}).done(function( data ) {	

		var currentDate = new Date(), activeClass;
		for(var counter=0;counter < tempArray.length; counter++){
			tempEntry = tempArray[counter];

			if(currentDate.getFullYear() == tempEntry[0]){
				itemClass = tempEntry[1]+"-"+tempEntry[2]+"-"+tempEntry[3];

				if(counter==0){
					movieSearchDate = itemClass;
					activeClass = 'active';
				}

				movieDates = '<div class="d-box js-movieDateFilter " attr-movie-date="'+itemClass+'">\
		                  <div class="dboxelement" >\
		                     <div class="month">'+tempEntry[2]+'</div>\
		                     <div class="date">'+tempEntry[1]+'</div>\
		                     <div class="day">'+tempEntry[3]+'</div>\
		                  </div>\
		               </div>';
		        
		        tempMovieDateList.push(movieDates);
			}			
		}

		for(var counter=0;counter < tempArray.length; counter++){
			tempEntry = tempArray[counter];

			if(currentDate.getFullYear() < tempEntry[0]){
				itemClass = tempEntry[1]+"-"+tempEntry[2]+"-"+tempEntry[3];

				if(counter==0){
					movieSearchDate = itemClass;
					activeClass = 'active';
				}

				movieDates = '<div class="d-box js-movieDateFilter " attr-movie-date="'+itemClass+'">\
		                  <div class="dboxelement" >\
		                     <div class="month">'+tempEntry[2]+'</div>\
		                     <div class="date">'+tempEntry[1]+'</div>\
		                     <div class="day">'+tempEntry[3]+'</div>\
		                  </div>\
		               </div>';
		        
		        tempMovieDateList.push(movieDates);
			}			
		}	

		tempMovieDateList = unique(tempMovieDateList);
		targetItem.html(tempMovieDateList);
		targetItem.slick({
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

		$('.js-movieDateFilter').click(function () {	
			$('.list-main-action a').attr('attr-current-page',1);
			$('.js-loadCinamaListing').empty();
			var movieDateFilter = $(this).attr('attr-movie-date');
			searchDateValue = movieDateFilter;
			$('.dboxelement').removeClass('active');
			$(this).find('.dboxelement').addClass('active');
			if (currentPageName == 'movie detail'){
				initMovieListing(searchMovieName);
			}else if (currentPageName == 'showtime tile'){				
				for(counter=0; counter < movieListingTempArray.length; counter++ ){				
					initMovieListing(movieListingTempArray[counter]);
				}
			}else if (currentPageName == 'showtime grid'){			
				initMovieSessions(searchDateValue);				
			}
			$('.js-loadCinamaListing .tileview-movies-list').hide();
			moviePagination(1, 'now');
		});		
		console.log("Movies dates completed");
	}).fail(function( data ) {
	    console.log("Movies dates failed");
	});
}

function loadMovieDetail(argMovieName){
	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG,
  	movieLanguage, movieSubtitle, movieSynopsis, strLen, strposition, movieNameClass,
  	movieExperienceClass, movieCinemaClass, movieCinema, movieGenreClass,
  	bookNowClass, movieTrailerHref;  	
	if(argMovieName.indexOf("%20") > -1){
		argMovieName = findAndReplace(argMovieName, "%20", " ");	
	}
  	
	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;			
			if(movieName == argMovieName){
								
				movieImage = moviePostURL+item.MovieImage;
				movieGenre = item.Genre;
				movieTrailer = movieURL+item.MovieTrailer;				
				movieTrailerHref = "#video-1";
				movieDuration = item.Duration;
				moviePG = item.Rating; // PG <br> 13			
				movieLanguage = item.MovieLanguage;		
				movieExperienceTemp = item.Experience;
				movieCinema = item.CinemaName;
				movieSynopsis = item.Synopsis;

				moviePG = moviePG.replace(/PG/g, "PG <br>");
				moviePG = moviePG.replace(/-/g, "<br>");			
				movieGenreDetail = movieGenre.replace(/,/g, "</span><span>");

				var tempMovieLanguage = movieLanguage.split('\n');
			 	var tempVal = "";
			 	var tempLanguage, tempSubtile;

			 	for(var counter=0; counter < tempMovieLanguage.length; counter++){
			 		if (tempMovieLanguage[counter].indexOf('Language') > -1) {
			 			strLen = tempMovieLanguage[counter].length;
			  			strposition = tempMovieLanguage[counter].indexOf('Language: ');
			  			tempLanguage = tempMovieLanguage[counter].substring(strposition+10,strLen);
			  			movieLanguage = '<i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempLanguage+'</span>';
		            }            
		            if (tempMovieLanguage[counter].indexOf('Subtitle') > -1) {	                
		                strLen = tempMovieLanguage[counter].length;
			  			strposition = tempMovieLanguage[counter].indexOf('Subtitle: ');
			  			tempSubtile = tempMovieLanguage[counter].substring(strposition+10,strLen);
			  			movieSubtitle =  '<i class="icon medium"><picture><source srcset="assets/img/icons/subtitles.svg" media="(max-width: 767px)"><img src="assets/img/icons/subtitles-white.svg" alt="FB" class=""></picture></i><span>'+tempSubtile+'</span>'			  			
		            }
			 	}
			
				movieExperience = "";
				movieExperienceTemp = movieExperienceTemp.toLowerCase();		

				var tempMovieSynopsis = movieSynopsis.split('\n');
			 	tempVal = "";
			 	var tempSynopsis, tempDirector, tempCast;

			 	for(var counter=0; counter < tempMovieSynopsis.length; counter++){
			 		if (tempMovieSynopsis[counter].indexOf('Synopsis') > -1) {
			 			strLen = tempMovieSynopsis[counter].length;
			  			strposition = tempMovieSynopsis[counter].indexOf('Synopsis: ');
			  			tempSynopsis = "<strong>About: </strong>" + tempMovieSynopsis[counter].substring(strposition+10,strLen);
			  			if (tempMovieSynopsis[counter].substring(strposition+10,strLen).indexOf(':') > -1) {
			  				tempSynopsis = "<strong>About: </strong>" + tempMovieSynopsis[counter].substring(strposition+11,strLen);
			  			}			  			
		            }            
		            if (tempMovieSynopsis[counter].indexOf('Director') > -1) {	                
		                strLen = tempMovieSynopsis[counter].length;
			  			strposition = tempMovieSynopsis[counter].indexOf('Director: ');
			  			tempDirector = "<strong>Director: </strong>" + tempMovieSynopsis[counter].substring(strposition+10,strLen);
		            }
		            if (tempMovieSynopsis[counter].indexOf('Cast') > -1) {
		            	strLen = tempMovieSynopsis[counter].length;
			  			strposition = tempMovieSynopsis[counter].indexOf('Cast: ');
			  			tempCast = "<strong>Cast: </strong>" + tempMovieSynopsis[counter].substring(strposition+6,strLen);
		            }	            
			 	}

				movieSynopsis =  tempDirector + tempCast + tempSynopsis;

				$('.js-movieImage').attr('src',movieImage);
				$('.js-movieTitle').html(movieName);
				$('.js-movieGenere').html(movieGenre);
				$('.js-movieDuration').html(movieDuration);
				$('.js-movieLanguage').html(movieLanguage);
				$('.js-movieSubtitle').html(movieSubtitle);
				$('.js-movieDirector').html(tempDirector);
				$('.js-movieDirector').html(tempDirector);
				$('.js-movieCast').html(tempCast);
				$('.js-movieAbout').html(tempSynopsis);
				movieNameClass = movieName.replace(/\s+/g, "-");
				movieNameClass = movieNameClass.replace(" ", "-");
				movieNameClass = movieNameClass.replace(".", "-");
				movieNameClass = movieNameClass.toLowerCase();				
				$('.js-popup-link').attr('href',movieTrailerHref);
				$('.js-popup-link').attr('data-video',movieTrailer);

				return false;
			}			
		});
	  
	}).done(function( data ) {		
		bindPopupEve();  
		toSVG(); 
		console.log("Movies detail completed");
	}).fail(function( data ) {
	    console.log("Movies detail failed");
	});
}

function initMovieSessions(){
	
	movieSessionListing = [];

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {

			var movieDate = item.SessionDate;
			var movieDateValue = new Date(movieDate);
			var movieMonthValue = new Date(movieDate);
			var movieDayValue = new Date(movieDate);

			movieDateValue = movieDateValue.getDate();
			movieMonthValue = monthName[movieMonthValue.getMonth()];
			movieDayValue = weekName[movieDayValue.getDay()];

			movieDate = movieDateValue+"-"+movieMonthValue+"-"+movieDayValue;

			movieSessionListing.push(
				[					
					item.MovieName,
					item.CinemaName,
					movieDate,
					item.SessionTime,
					item.Experience,
					item.SessionDate
				]
			);
		});
	  
	}).done(function( data ) {	 		
		$('.js-loadCinamaListing').empty();
		if (currentPageName == 'movie detail'){
			initMovieListing(searchMovieName);
		}else if (currentPageName == 'showtime tile'){			
			for(counter=0; counter < movieListingTempArray.length; counter++ ){
				initMovieListing(movieListingTempArray[counter]);
			}
		}else if (currentPageName == "showtime grid"){
			initShowtimeMoviesByDate(searchDateValue);
		}			
		console.log("Movie sessions completed");
		
	}).fail(function( data ) {
	    console.log("Movie sessions failed");
	});	
}

function initMovieListing(argMovieName){
	
  	var movieDate, movieDateValue, targetItem, movieResult, counter, itemClass,
  	movieCinema, movieExperienceTemp;  
  	if(currentPageName == 'movie detail'){
  		if(argMovieName.indexOf("%20") > -1){
	  		argMovieName = findAndReplace(argMovieName, "%20", " ");
	  	}
  	}

  	movieResult = "";   
  	var tempCinemaListing = [];
  	var movieExperience;
  	targetItem = $('.js-loadCinamaListing');  	
  	tempCounter = 0;

  	tempCinemaListing = movieCinamaListing;
  	movieCount = 1;
  	pageNumber=0;
  	movieTilesListingArray = [];  	

  	for(counter=0; counter< tempCinemaListing.length; counter++){				
  		tempValue1 = tempCinemaListing[counter];
  		for(innercounter=0; innercounter < experienceMovieListing.length; innercounter++){
  			loadMovieListing(argMovieName, tempCinemaListing[counter], searchDateValue, experienceMovieListing[innercounter]);
  		}
	}
}

function loadMovieListing(argMovieName, argCinemaName, argMovieDate, argMovieExprience){

	var movieDate, targetItem, movieResult, counter, itemClass, movieNameValue,
	movieCinema, movieExperience, listCount, tempArray = [], result='';
  	
  	if(currentPageName == 'movie detail'){
  		if(argMovieName.indexOf("%20") > -1){
	  		argMovieName = findAndReplace(argMovieName, "%20", " ");
	  	}
  	}

  	movieResult = "";
  	targetItem = $('.js-loadCinamaListing');  	

  	var tempMovieDateList = [], tempCinemaListing = [];
  	var movieExperienceValue, movieImage, movieTime, movieAvailability, showTime, movieExperienceTemp;  	
  	var movieExperienceClass, movieCinemaClass, tempDateClass, movieExprience; 	

  	counter = 0;
  	movieExperience = "";
 	showTime = ""; 
 	var speratorLabel = "";
 	movieImage = "";
 	var movieCountClass= "js-movie-list-";

 	var tempMovieDate, movieDateValue, movieMonthValue, movieDayValue;

	for (listCount = 0; listCount < movieSessionListing.length; listCount++) {
		tempArray = movieSessionListing[listCount];

		movieNameValue = tempArray[0];		
		movieCinema = tempArray[1];
		movieDate = new Date(tempArray[5]);
		movieExperienceClass = tempArray[4];
		movieExperience = tempArray[4];	
		movieTime = tempArray[3];

		movieDate = movieDate.getDate()+"-"+monthName[movieDate.getMonth()]+"-"+weekName[movieDate.getDay()];		
	
		movieExperience = movieExperience.toLowerCase();
		argMovieExprience = argMovieExprience.toLowerCase();	

		if(movieNameValue == argMovieName 
			&& movieCinema == argCinemaName
			&& movieDate == argMovieDate
			&& movieExperience.indexOf(argMovieExprience) > -1 ){
			
			var currentDate = new Date();				
			var tempBaseURL;

			if(argMovieName.indexOf(' ') > -1){
				argMovieName = findAndReplace(argMovieName, " ", "-");	
			}
			
			movieImage = moviePostURL+movieNameValue+'.jpg';				
						
			speratorLabel = ",";
			if(counter ==0){
				speratorLabel = "";
			}

			for (arrayIndex = 0; arrayIndex < movieExperienceArray.length; arrayIndex++) {
				temp = movieExperienceArray[arrayIndex];				
				if(movieExperience.indexOf(temp[0]) > -1  ){
					movieExperienceValue = 'logo-reel-'+temp[1]+'.png';
				}				
			}

			showTime += speratorLabel+movieTime;
			counter++;
		}
	}
				
	if(showTime){

		if(showTime.indexOf(',') > -1 ){				
			var showTimeValue = [];
			showTimeValue = showTime.split(',');
		}else{				
			var showTimeValue = [showTime];	
		}

		var showtimeClass = [];
		
		showTimeResult = "";
		for(counter=0; counter < showTimeValue.length; counter++){
			itemClass = getShowTime(showTimeValue[counter]);
			showtimeClass.push(itemClass);
			showTimeResult += '<li class='+itemClass+'><div class="showtime">'+showTimeValue[counter]+'</div></li>';
		}

		if($('.movie-detail-page').length>0){
			var tempMovieImage = $('.js-movieImage').attr('src');
		}

		if(movieImage.indexOf(' ') > -1){
			movieImage = findAndReplace(movieImage," ", "-");
		}

		itemClass = "";
		showtimeClass = unique(showtimeClass);
		for(counter=0; counter < showtimeClass.length; counter++){
			itemClass += " "+showtimeClass[counter];
		}

		showtimeClass = [];

		movieCinemaClass = argCinemaName;			
		movieCinemaClass = movieCinemaClass.replace(/\s+/g, "-");
		movieCinemaClass = movieCinemaClass.replace(/,/g, " ");
		movieCinemaClass = movieCinemaClass.toLowerCase();
		movieExperienceClass = argMovieExprience.toLowerCase();
		movieCountClass += movieCount;	
		argMovieName = argMovieName.toLowerCase();
		argMovieName = findAndReplace(argMovieName,"-", " ");
		var movieLabel = "";
		var hideMovieClass = 'tileview-movies-list--sty1';

		if($('.showtime-tile-page').length > 0 ){
			movieLabel = '<div class="img">\
		                        <img src="'+movieImage+'" alt="'+argMovieName+'">\
		                     </div>\
		                     <div class="moviename">'+argMovieName+'</div>\
		                     <div class="locationmobile">'+argCinemaName+'</div>';
		                     hideMovieClass= "";
		}

		result = '<div class="tileview-movies-list'+itemClass+' '+hideMovieClass+' '+argMovieName+' '+movieExperienceClass+' '+movieCinemaClass+'">\
	                     <div class="item">\
	                        <div class="movielocation">\
	                           '+argCinemaName+'\
	                        </div>\
	                     </div>\
	                     <div class="item">'+movieLabel+'</div>\
	                     <div class="item">\
	                        <div class="logoimg">\
	                           <img src="assets/img/logos/'+movieExperienceValue+'" alt="'+movieExperienceClass+'">\
	                        </div>\
	                     </div>\
	                     <div class="item">\
	                        <div class="showtimewrap">\
		                        <ul>\
		                           '+showTimeResult+'\
		                        </ul>\
		                     </div>\
	                     </div>\
	                  </div>';

	    if(result){
	    	movieTilesListingArray.push(result);
	    	$('.js-loadCinamaListing').append(result);
	    	movieCount++;
	    }
	}
	$('.is--loading').removeClass('is--loading');
}

function loadPopularMovies(){
	
  	var playMoviesListing = $('.js-play-popular-listing');  	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExperience, movieExperienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExperienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass, movieCounter, movieURL;

  	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty();
	movieCounter =1;

	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			if(movieCounter == 7){
				return false;
			}
				movieName = item.MovieName;
				movieImage = moviePostURL+item.MovieImage;
				movieGenre = item.Genre;
				movieTrailer = moviePostURL+item.MovieTrailer;
				movieDuration = item.Duration;
				moviePG = item.Rating; // PG <br> 13			
				movieLanguage = item.MovieLanguage;		
				movieExperienceTemp = item.Experience;
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
			
				movieExperience = "";
				movieExperienceTemp = movieExperienceTemp.toLowerCase();		

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

				movieExperienceClass = movieExperienceTemp.replace(/,/g, " ");
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

				movieURL =  "window.location='"+movieURL+"'";

				playMoviesListing.append('<div onclick="'+movieURL+'" class="movie-item"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="#" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="#" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExperience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#video-1" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>');
				movieCounter++;
		});
	  
	}).done(function( data ) {
	    movieListSetHTML();
	    movieList();

	    scrollCustomSelect();
		refreshAOS('refresh');
	    toSVG();
		movieListCarousel();
		filterSearch();
	    
	    playMoviesListing.removeClass('is--loading');
	    console.log("Play movies completed");

	    if(winWidth > 1024 && isIE == false){
		    // $('.c-movies-list .list-wrap').attr('data-aos', 'fade-up');
			$('.c-movies-list .list-wrap').each(function () {
				$(this).find('.movie-item').each(function (i) {
			    	$(this).attr('data-aos', 'fade-up');
			    	$(this).attr('data-aos-delay', (50*i));
				});
			});
		}
	}).fail(function( data ) {
	    console.log("Play movies failed");
	});
}

function filterMovies(argMoviesIDs, argCinemaIDs, argExperienceIDs, argGenreIDs, argShowTimeIDs, argSourceObj){
	
	var movieItems = [], tempArray = [], tempMovieArrayList = [], movieCounter, playMoviesListing;
	movieCounter=0;	
	pageNumber = 0;

	if(argSourceObj == 'now'){
		pageNumber = 0;
		tempMovieArrayList = movieListingArray;
		playMoviesListing = $('.js-play-movies-listing');		
	}else if(argSourceObj == 'coming'){
		comingPageNumber =0;
		tempMovieArrayList = comingMovieListingArray;
		playMoviesListing = $('.js-coming-movies-listing');		
	}

	if(currentPageName == 'showtime tile' || currentPageName == 'movie detail' ){		
		tempMovieArrayList = movieTilesListingArray;
		playMoviesListing = $('.js-loadCinamaListing');			
	}

	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 

	tempArray = [];	
	movieCounter = 0;		
	if( argMoviesIDs.length == 0 
		&& argCinemaIDs.length == 0 
		&& argExperienceIDs.length == 0 
		&& argGenreIDs.length == 0 
		&& argShowTimeIDs.length == 0 ){

		for(innerCounter=0; innerCounter < tempMovieArrayList.length; innerCounter++){		
			tempArray[movieCounter] = tempMovieArrayList[innerCounter];
			movieCounter++;			
		}
		movieItems = tempArray;

	}else{	

		movieItems = tempMovieArrayList;	
		
		if(argCinemaIDs.length > 0 ){
			movieCounter=0;
			for(counter=0; counter < argCinemaIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argCinemaIDs[counter];
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(argExperienceIDs.length > 0 ){	
			movieCounter = 0;	
			tempArray = [];		
			for(counter=0; counter < argExperienceIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argExperienceIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(argGenreIDs.length > 0 ){	
			movieCounter = 0;	
			tempArray = [];				
			for(counter=0; counter < argGenreIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argGenreIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;
					}	
				}
			}
			movieItems = tempArray;
		}

		if(argShowTimeIDs.length > 0 ){	
			movieCounter = 0;	
			tempArray = [];				
			for(counter=0; counter < argShowTimeIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argShowTimeIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray[movieCounter] = movieItems[innerCounter];
						movieCounter++;						
					}
				}
			}
			movieItems = tempArray;
		}

		if(argMoviesIDs.length > 0 ){	
			movieCounter = 0;
			tempArray = [];					
			for(counter=0; counter < argMoviesIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argMoviesIDs[counter];						
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

	if(argShowTimeIDs.length > 0 ){		
		$('.showtimewrap ul li').fadeOut('fast');
		for(counter=0; counter < argShowTimeIDs.length; counter++){				
			for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
				var findItem = "."+argShowTimeIDs[counter];						
				$(findItem).fadeIn('slow');
			}
		}
	}

	movieListSetHTML();
	movieList();

	playMoviesListing.removeClass('is--loading');
	playMoviesListing.removeClass('empty--record');
	if(movieItems.length == 0){
		playMoviesListing.addClass('empty--record');
	}	

	movieItems = [];
	tempArray = [];
	moviePagination(1, 'now');
}

function moviePagination(argCurrentPageNumber, argSourceObj){	

	var pageNumber = parseInt(argCurrentPageNumber), targetObj, nextItem;

	targetObj = $('.js-load-play-movies-listing');
		
	if(currentPageName == 'home'){

		nextItem = (pageNumber*3)+1;
		if(argSourceObj == 'now'){

			$('.js-play-movies-listing .list-wrap-page:nth-child(-n+'+(pageNumber*6)+')').show();
			if($('.js-play-movies-listing .list-wrap-page:nth-child('+nextItem+')').length == 0){
		 		$(targetObj).hide();
		 	}else{
		 		$(targetObj).show();
		 	}

		}else if(argSourceObj == 'coming'){

			targetObj = $('.js-load-coming-movies-listing');
			$('.js-coming-movies-listing .list-wrap-page:nth-child(-n+'+(pageNumber*6)+')').show();
			if($('.js-coming-movies-listing .list-wrap-page:nth-child('+nextItem+')').length == 0){
		 		$(targetObj).hide();
		 	}else{
		 		$(targetObj).show();
		 	}

		}

	}else if(currentPageName == 'showtime grid' ){		
		
		nextItem = (pageNumber*2)+1;
		$('.c-movies-list .list-wrap-page:nth-child(-n+'+(pageNumber)+')').show();
		if($('.c-movies-list .list-wrap:nth-child('+nextItem+')').length == 0){
	 		$(targetObj).hide();
	 	}else{
	 		$(targetObj).show();
	 	}

	}else if(currentPageName == 'showtime tile' || currentPageName == 'movie detail' ){		

		nextItem = (pageNumber*3)+1;
		targetObj = $('.js-load-movie-listing');
		$('.tileview-movies-list:nth-child(-n+'+(pageNumber*3)+')').show();
		if($('.tileview-movies-list:nth-child('+nextItem+')').length == 0){
	 		$(targetObj).hide();
	 	}else{
	 		$(targetObj).show();
	 	}
	}
 	
 	pageNumber++;
 	$(targetObj).attr('attr-current-page',pageNumber);
}

$('.js-load-play-movies-listing').click(function () {
	moviePagination($(this).attr('attr-current-page'),'now');
});

$('.js-load-movie-listing').click(function () {
	moviePagination($(this).attr('attr-current-page'),'now');
});	

$('.js-load-coming-movies-listing').click(function () {		
	moviePagination($(this).attr('attr-current-page'),'coming');
});

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
	filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");

	experienceNames = "";
});

$('.js-genreItem').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		genreFilter[genreFilter.length] = genreNames;
	}else{				
		genreFilter.splice($.inArray(genreNames, genreFilter),1);
	}

	genreFilter = startFromZero(genreFilter);
	filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
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
	filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
});	

$('.js-showTime').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		showTimeFilter[showTimeFilter.length] = genreNames;
	}else{				
		showTimeFilter.splice($.inArray(genreNames, showTimeFilter),1);
	}

	showTimeFilter = startFromZero(showTimeFilter);
	filterMovies(moviewFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");

});
	