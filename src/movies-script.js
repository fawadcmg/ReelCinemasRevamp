var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/',
movieURL = 'http://www.reelcinemas.ae/en/KeyArts/Tarilers/',
weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
baseURL = window.location.protocol + "//" + window.location.host + "/",
searchMovieName,
searchMovieType,
searchMovieName,
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
movieFilter = new Array(),
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
showtimeMovieClass = new Array(),
initMovieExperienceCinema = new Array(),
noRecordMessage = 'No results found';
genreFilter = [];

if($('.home-page').length > 0 ){
	currentPageName = 'home';
	initPageModules();
	loadHomePageModules();
}else if($('.movie-detail-page').length > 0){
	currentPageName = 'movie detail';
	searchMovieName = window.location.search.split('?param1=')[1];
	searchMovieType = window.location.search.split('&param2=')[1];
	searchMovieName = searchMovieName.split('&param2=')[0];
	initPageModules();	
}else if($('.showtime-page').length > 0){
	currentPageName = 'showtime grid';
	initPageModules();
	loadShowtimeGridModules();
}else if($('.showtime-tile-page').length > 0){
	initPageModules();
	currentPageName = 'showtime tile';
}else if ($('.experience-inner-page').length > 0){
	currentPageName = 'experience inner';
}

function loadHomePageModules(){	
	initMovieSessions();
	/*initMovieGrid("all");
	initComingMovieGrid();*/
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
	}else if(currentPageName == 'showtime grid'){
		moviePagination(1,'now');
		$('.list-wrap-page').hide();
	}else if(currentPageName == 'experience inner'){
		loadPopularMovies();
	}else if(currentPageName == 'movie detail' || currentPageName == 'showtime tile'){
		setTimeout(function(){
			moviePagination(1,'now');
		},500);
	}

	
	scrollCustomSelect();
	refreshAOS('refresh');

});

function initPageModules(){
	loadCinemasDropdown();
	if(currentPageName == 'home'){
		loadMoviesComingDropdown();
	}
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
			var self = this;
			setTimeout(function () {
				var cinemaNames = $(self).val();
				if($(self).prop('checked') == true){
					cinemaFilter[cinemaFilter.length] = cinemaNames;
				}else{				
					cinemaFilter.splice($.inArray(cinemaNames, cinemaFilter),1);
				}
				cinemaFilter = startFromZero(cinemaFilter);
				filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
			}, 100);
		});

		$('#select-all-locations').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "cinemaFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'now');
		});

		if( currentPageName == 'home' ){

			comingCinemasListing.append('<div class="item custom-action js-select-all "><input type="checkbox" id="select-all-locations-coming"><label for="select-all-locations-coming"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
			comingCinemasListing.append('<div class="scroll-area"></div>');
			for (arrayIndex = 0; arrayIndex < comingTempArray.length; arrayIndex++) {
				tempEntry = comingTempArray[arrayIndex];				
				comingCinemasListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem-coming" id="'+tempEntry[1]+'-1'+'"><label for="'+tempEntry[1]+'-1'+'">'+tempEntry[0]+'</label></div>');
			}
			comingCinemasListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

			$('.js-cinemaItem-coming').click(function () {
				var self = this;
				setTimeout(function () {
					var cinemaNames = $(self).val();
					if($(self).prop('checked') == true){
						comingCinemaFilter[comingCinemaFilter.length] = cinemaNames;
					}else{				
						comingCinemaFilter.splice($.inArray(cinemaNames, comingCinemaFilter),1);
					}
					comingCinemaFilter = startFromZero(comingCinemaFilter);
					filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
				}, 100);				
			});

			$('#select-all-locations-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "cinemaFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, 'coming');
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
		/*tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});*/
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			moviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem" id="'+tempEntry[1]+'"><label for="'+tempEntry[1]+'">'+tempEntry[0]+'</label></div>');
		}
		moviesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

		$('.js-movieItem').click(function () {
			var self = this;
			setTimeout(function () {
				var movieNames = $(self).val();
				if($(self).prop('checked') == true){
					movieFilter[movieFilter.length] = movieNames;
				}else{				
					movieFilter.splice($.inArray(movieNames, movieFilter),1);
				}
				movieFilter = startFromZero(movieFilter);	

				filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
			}, 100);
		});

		$('#select-all-movies').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "movieFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
		});

		if( $('.home-page').length > 0 && 1 == 2){

			comingMoviesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies-coming"><label for="select-all-movies-coming"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
			comingMoviesListing.append('<div class="scroll-area"></div>');
			/*comingTempArray.sort(function(a, b){
			    if(a[0] < b[0]) { return -1; }
			    if(a[0] > b[0]) { return 1; }
			    return 0;
			});*/
			for (arrayIndex = 0; arrayIndex < comingTempArray.length; arrayIndex++) {
				tempEntry = comingTempArray[arrayIndex];				
				comingMoviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem-coming" id="'+tempEntry[1]+"-1"+'"><label for="'+tempEntry[1]+"-1"+'">'+tempEntry[0]+'</label></div>');
			}
			comingMoviesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

			$('.js-movieItem-coming').click(function () {
				var self = this;
				setTimeout(function () {

					var movieNames = $(self).val();
					if($(self).prop('checked') == true){
						comingMovieFilter[comingMovieFilter.length] = movieNames;
					}else{				
						comingMovieFilter.splice($.inArray(movieNames, comingMovieFilter),1);
					}

					comingMovieFilter = startFromZero(comingMovieFilter);				
					filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
				}, 100);
			});

			$('#select-all-movies-coming').click(function () {
				var obj =$(this).parent().parent().find(".scroll-area .item");
				dropdownSelectAll(obj, "movieFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
			});
		}

		scrollCustomSelect();
		refreshAOS('refresh');
	    
	    selectAllEvent();
	  	console.log("Movies completed");
	  	tempArray = [];
		comingTempArray = [];
		tempEntry = [];

	}).fail(function( data ) {
	  	console.log("Movies failed");
	});

}

function loadMoviesComingDropdown(){	
	var comingMoviesListing = $('.js-movies-listing-coming');	
	var itemValue, itemClass;	
	var comingTempArray = [];
	var tempEntry = [];	
	var count=0;
	var movieCounter = 0;
	
	comingMoviesListing.empty();

	$.getJSON('ComingSoon.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = itemClass.toLowerCase();
			comingTempArray.push( [itemValue, itemClass] );

		});
	}).done(function( data ) {  

		comingMoviesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies-coming"><label for="select-all-movies-coming"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		comingMoviesListing.append('<div class="scroll-area"></div>');
		/*comingTempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});*/
		for (arrayIndex = 0; arrayIndex < comingTempArray.length; arrayIndex++) {
			tempEntry = comingTempArray[arrayIndex];				
			comingMoviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem-coming" id="'+tempEntry[1]+"-1"+'"><label for="'+tempEntry[1]+"-1"+'">'+tempEntry[0]+'</label></div>');
		}
		comingMoviesListing.append('<div class="item item--close"><a href="javascript:void(0);" class="js-close-custom-select">Close</a></div>');

		$('.js-movieItem-coming').click(function () {
			var self = this;
			setTimeout(function () {
				var movieNames = $(self).val();
				if($(self).prop('checked') == true){
					comingMovieFilter[comingMovieFilter.length] = movieNames;
				}else{				
					comingMovieFilter.splice($.inArray(movieNames, comingMovieFilter),1);
				}

				comingMovieFilter = startFromZero(comingMovieFilter);							
				filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
			},100);
		});

		$('#select-all-movies-coming').click(function () {
			var obj =$(this).parent().parent().find(".scroll-area .item");
			dropdownSelectAll(obj, "movieFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
		});
		

		scrollCustomSelect();
		refreshAOS('refresh');
	    
	    selectAllEvent();
	  	console.log("Movies completed");	  	
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
		/*tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});*/
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

function dropdownSelectAll(argTargetObj, argFilterName, argTempMovieArray, argTempCinemaArray, argTempExperienceArray, argTempGenreArray , argTempShowtimeArray, argMovieType ){
	
	setTimeout(function () {
		var filterObject = [];
		
		console.log(argTargetObj);
		console.log(argFilterName);
		console.log(argTempMovieArray);
		console.log(argTempCinemaArray);
		console.log(argTempExperienceArray);
		console.log(argTempGenreArray);
		console.log(argTempShowtimeArray);
		console.log(argMovieType);

		if(argMovieType == 'now'){
			if(argFilterName == 'movieFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-movieItem').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-movieItem').val() );

					 }		
				});
				movieFilter = filterObject;		
			}else if(argFilterName == 'cinemaFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-cinemaItem').prop('checked') == true ){
						console.log($(this).find('.js-cinemaItem').val());
						filterObject.push(	$(this).find('.js-cinemaItem').val() );

					 }		
				});
				cinemaFilter = filterObject;
			}else if(argFilterName == 'experienceFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-experienceItem').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-experienceItem').val() );

					 }		
				});
				experienceFilter = filterObject;
			}else if(argFilterName == 'genreFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-genreItem').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-genreItem').val() );

					 }		
				});
				genreFilter = filterObject;

			}else if(argFilterName == 'showtimeFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-showtime').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-showtime').val() );

					 }		
				});
				showtimeFilter = filterObject;
			}

			filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, argMovieType);
		}else if(argMovieType == 'coming'){


			if(argFilterName == 'movieFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-movieItem-coming').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-movieItem-coming').val() );

					 }		
				});
				comingMovieFilter = filterObject;		
			}else if(argFilterName == 'cinemaFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-cinemaItem-coming').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-cinemaItem-coming').val() );

					 }		
				});
				comingCinemaFilter = filterObject;
			}else if(argFilterName == 'experienceFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-experienceItem-coming').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-experienceItem-coming').val() );

					 }		
				});
				comingExperienceFilter = filterObject;
			}else if(argFilterName == 'genreFilter'){
				argTargetObj.each(function (i) {
					if($(this).css('display') == 'block' 
					 	&& $(this).find('.js-genreItem-coming').prop('checked') == true ){

						filterObject.push(	$(this).find('.js-genreItem-coming').val() );

					 }		
				});
				comingGenreFilter = filterObject;
			}

			console.log("Movie : ", comingMovieFilter);
			console.log("Cinema : ",comingCinemaFilter);
			console.log("Experience : ",comingExperienceFilter);
			console.log("Genre : ",comingGenreFilter);
			console.log("Showtime : ",showTimeFilter);
			console.log("Filter Type ",argMovieType);
			
			filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, argMovieType);
		}

		filterObject = [];	
	}, 100);
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
	initCinemaExperienceByMovie(argMovieDate, "all");
}

function initCinemaExperienceByMovie(argMovieDate, argMovieName){	
	initMovieExperienceCinema = [];
	var tempArray = new Array(), tempValue='';
	for (var listCount = 0; listCount < movieSessionListing.length; listCount++) {
		tempArray = movieSessionListing[listCount];
		tempValue = tempArray[0]+"-"+tempArray[1]+"-"+tempArray[4];
		tempValue = findAndReplace(tempValue," ","-");
		tempValue = tempValue.toLowerCase();
		if(argMovieDate == 'all' && argMovieName == 'all'){			
			initMovieExperienceCinema.push(tempValue);			
		}else if(argMovieName == 'all'){
			if(tempArray[2] == argMovieDate){
				initMovieExperienceCinema.push(tempValue);				
			}
		}else{				
			if(tempArray[2] == argMovieDate && tempArray[0] == argMovieName ){
				initMovieExperienceCinema.push(tempValue);
			}	
		}		
	}	
	initMovieExperienceCinema = unique(initMovieExperienceCinema);
	tempArray = [];
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
			
			movieItemClass = movieGenre.toLowerCase();
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
					'movie-inner.html?param1='+movieName+'&param2='+item.movieType
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
	
	var result = "", bookNowClass = "", tempEntry = [], showMovie = 0, showtimeClass,
	movieCinemaExperience="", movieCinemaExperienceClass, tempMovieGenre, tempMovieGenreArray;

	movieListingArray = [];

	for(var counter=0; counter < movieGridListing.length; counter++){
		tempEntry = movieGridListing[counter];

		tempMovieGenreArray= [];
		tempMovieGenre = "";
		showMovie = 0;
		showtimeClass = "";
		movieCinemaExperienceClass = "";

		if(argMovie == "all"){
			showMovie = 1;
		}else if ( argMovie == "moviveGrid" && $.inArray( tempEntry[4], showtimeMoviesByDate ) > -1 ){
			showMovie = 1;
		}

		if(showMovie == 1){

		showtimeClass =	getMovieShowtime(tempEntry[4]);
		tempMovieGenre = tempEntry[0];
		if(tempMovieGenre.indexOf(',') > -1){
			tempMovieGenreArray = tempMovieGenre.split(',');
		}else{
			tempMovieGenreArray.push(tempMovieGenre);
		}
		
		for(var innerCounter=0; innerCounter < initMovieExperienceCinema.length; innerCounter++){			
			var tempCinameExperience = tempEntry[4].toLowerCase();
			tempCinameExperience = findAndReplace(tempCinameExperience," ","-");			
			if(initMovieExperienceCinema[innerCounter].indexOf(tempCinameExperience) > -1 ){
				for(genreCount=0; genreCount < tempMovieGenreArray.length; genreCount++){
					movieCinemaExperienceClass += initMovieExperienceCinema[innerCounter]+"-genre-"+tempMovieGenreArray[genreCount].trim()+" ";
				}				
			}
		}

	bookNowClass = "";
	if(tempEntry[1] == 'coming'){
		bookNowClass = '<div class="booknow-tag"><span>BOOK NOW</span></div>';
	}

	result = '<div class="movie-item '+movieCinemaExperienceClass+' '+showtimeClass+'">\
	<div class="bot-img" style="background-image: url('+tempEntry[5]+');"></div>\
	<div class="item-wrap"><div class="img"><div class="stamp">'+tempEntry[9]+'</div>'+bookNowClass+'<img src="'+tempEntry[5]+'" alt="'+tempEntry[4]+'"></div>\
		<div class="info"><div class="name">'+tempEntry[4]+'</div>\
			<div class="duration-language">\
			<div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[8]+'</span></div>\
			<div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div></div>\
			<div class="detail"><div class="detail-inner-wrap">'+tempEntry[11]+' | '+tempEntry[8]+'</div></div></div>\
		<div class="action"><a href="'+tempEntry[12]+'" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#video-1" data-video='+tempEntry[6]+' class="c-btn-white btn--txt-black btn--play btn--sm js-popup-link" tabindex="0">Trailer</a></div></div>\
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
	refreshAOS('refresh');	
	bindPopupEve()
		
	moviePagination(1, 'now');

	filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");

}

function initComingMovieGrid(){

  	var movieItemClass, moviePG, movieName, movieCinema, movieGenreDetail, movieLanguage, movieSynopsis,
  	tempSynopsis, tempDirector, tempCast, strLen, strposition, tempDirector, tempCast,
  	movieGenre, movieExperienceClass,
  	movieNameClass, movieCinemaClass, movieGenreClass, movieGenreClassArray;

  	var tempMovieSynopsis=[], tempGenre = [];

	$.getJSON('ComingSoon.json', function (data) {
		$.each( data, function( i, item ) {

			movieGenreClassArray= [];
			moviePG = item.Rating;
			movieLanguage = item.MovieLanguage;
			movieSynopsis = item.Synopsis;
			movieGenre = item.Genre;
			movieName = item.MovieName;
			movieCinema = item.CinemaName;

			movieItemClass = "";
			if(movieGenre.indexOf(',') > -1){
				movieGenreClassArray = movieGenre.split(',');
			}else{
				movieGenreClassArray.push(movieGenre);
			}
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
		 	
			for(var counter=0; counter < movieGenreClassArray.length; counter++){
				movieItemClass += movieNameClass + "-" +movieCinemaClass + "-genre-" +movieGenreClassArray[counter].trim().toLowerCase()+" ";
		 	}		 	

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
					'movie-inner.html?param1='+movieName+'&param2='+item.movieType		
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
		<div class="info"><div class="name">'+tempEntry[3]+'</div>\
			<div class="duration-language">\
			<div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div>\
			<div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[6]+'</span></div></div>\
			<div class="detail"><div class="detail-inner-wrap">'+tempEntry[10]+' | '+tempEntry[7]+'</div></div></div>\
		<div class="action"><a href="'+tempEntry[11]+'" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#video-1" data-video='+tempEntry[5]+' class="c-btn-white btn--txt-black btn--play btn--sm js-popup-link" tabindex="0">Trailer</a></div></div>\
	<section class="item-details"> <a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a>\
		<div class="text"> <div class="title-wrap"> <h1 class="title">'+tempEntry[3]+'</h1> <div class="stamp">'+tempEntry[8]+'</div></div>\
			<div class="info genere"><span>'+tempEntry[10]+'</span></div>\
			<div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+tempEntry[7]+'</span></div>\
			<div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+tempEntry[6]+'</span></div>\
			<div class="info"><strong>Storyline:</strong> '+tempEntry[9]+'</div>\
			<div class="action"><a href="'+tempEntry[11]+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#video-1" data-video='+tempEntry[5]+' class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div>\
		<div class="img"><img src="'+tempEntry[4]+'" alt="'+tempEntry[3]+'"></div>\
	</section></div>';

		comingMovieListingArray.push(result);
		comingMoviesListing.append(result);
	}

	$('.is--loading').removeClass('is--loading');	
	movieListSetHTML();
	movieList();
		
	moviePagination(1, 'coming');
	bindPopupEve();
	
}
var clickCheck =0;
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

		if(tempArray.length > 0){

			var currentDate = new Date(), activeClass;
			for(var counter=0;counter < tempArray.length; counter++){
				tempEntry = tempArray[counter];

				if(monthName[currentDate.getMonth()] == tempEntry[2]){
					itemClass = tempEntry[1]+"-"+tempEntry[2]+"-"+tempEntry[3];

					if(counter==0){
						movieSearchDate = itemClass;
						activeClass = 'active';
					}

					movieDates = '<div class="d-box js-movieDateFilter " attr-movie-date="'+itemClass+'">\
			                  <div class="dboxelement" >\
			                     <div class="month">'+tempEntry[2].toUpperCase()+'</div>\
			                     <div class="date">'+tempEntry[1]+'</div>\
			                     <div class="day">'+tempEntry[3].toUpperCase()+'</div>\
			                  </div>\
			               </div>';
			        
			        tempMovieDateList.push(movieDates);
				}			
			}

			for(var counter=0;counter < tempArray.length; counter++){
				tempEntry = tempArray[counter];

				if(currentDate.getMonth() != tempEntry[2]){
					itemClass = tempEntry[1]+"-"+tempEntry[2]+"-"+tempEntry[3];

					if(counter==0){
						movieSearchDate = itemClass;
						activeClass = 'active';
					}

					movieDates = '<div class="d-box js-movieDateFilter " attr-movie-date="'+itemClass+'">\
			                  <div class="dboxelement" >\
			                     <div class="month">'+tempEntry[2].toUpperCase()+'</div>\
			                     <div class="date">'+tempEntry[1]+'</div>\
			                     <div class="day">'+tempEntry[3].toUpperCase()+'</div>\
			                  </div>\
			               </div>';
			        
			        tempMovieDateList.push(movieDates);
				}			
			}
		
			for(var counter=0;counter < 1; counter++){
				tempEntry = tempMovieDateList[counter];
				searchDateValue =tempEntry[1]+"-"+tempEntry[2]+"-"+tempEntry[3];			
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

				$('.dboxelement').removeClass('active');
				$(this).find('.dboxelement').addClass('active');
				$('.list-main-action a').attr('attr-current-page',1);
				$('.js-loadCinamaListing').empty();
				var movieDateFilter = $(this).attr('attr-movie-date');
				searchDateValue = movieDateFilter;
				
				if (currentPageName == 'movie detail'){
					initMovieListing(searchMovieName);
				}else if (currentPageName == 'showtime tile'){				
					for(counter=0; counter < movieListingTempArray.length; counter++ ){				
						initMovieListing(movieListingTempArray[counter]);
					}
				}else if (currentPageName == 'showtime grid'){			
					initMovieSessions(searchDateValue);				
				}
				
				filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'now');
				moviePagination(1, 'now');
			});	
		}else{
			$('.movies-list--1').fadeOut('fast');
		}	
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

	if(searchMovieType == 'coming'){


		$.getJSON('ComingSoon.json', function (data) {
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
					movieExperienceTemp = "";
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
	}else{
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
		}if(currentPageName == 'home'){
			initCinemaExperienceByMovie("all", "all");
			initMovieGrid("all");
			initComingMovieGrid();
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
  	 	

  	for(counter=0; counter< tempCinemaListing.length; counter++){				
  		tempValue1 = tempCinemaListing[counter];
  		for(innercounter=0; innercounter < experienceMovieListing.length; innercounter++){
  			loadMovieListing(argMovieName, tempCinemaListing[counter], searchDateValue, experienceMovieListing[innercounter]);
  		}
	}

	setTimeout(function() {			
		refreshAOS('refresh');
		moviePagination(1, 'coming');
	}, 1000);
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
	
		movieExperience = movieExperience.toLowerCase().trim();
		argMovieExprience = argMovieExprience.toLowerCase().trim();
		movieNameValue = movieNameValue.toLowerCase().trim();
		argMovieName = argMovieName.toLowerCase().trim();

		movieExperience = findAndReplace(movieExperience, " ", "-");
		argMovieExprience = findAndReplace(argMovieExprience, " ", "-");
		movieNameValue = findAndReplace(movieNameValue, " ", "-");
		argMovieName = findAndReplace(argMovieName, " ", "-");	

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

		argMovieName = findAndReplace(argMovieName," ", "-");

		movieExperienceClass = movieExperienceClass.replace("dine", "dine-in");
		movieExperienceClass = movieExperienceClass.replace("family-dine-in", "dine-in");

		itemClass = "";
		showtimeClass = unique(showtimeClass);
		for(counter=0; counter < showtimeClass.length; counter++){
			itemClass += " "+argMovieName+'-'+movieCinemaClass+'-'+movieExperienceClass+"-"+showtimeClass[counter]+"-"+showtimeClass[counter];
		}

		showtimeClass = [];

		result = '<div class="tileview-movies-list'+itemClass+' '+hideMovieClass+'">\
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

    if(winWidth < 768){
    	$('.js-play-movies-listing').slick('unslick');
    }
	
	var movieItems = [], tempArray = [], tempMovieArrayList = [], playMoviesListing;	
	var movieStatus=0, cinemaStatus=0, experienceStatus=0, genereStatus=0, showtimeStatus=0;

	if(currentPageName == 'showtime tile' || currentPageName == 'movie detail' ){			
		tempMovieArrayList = movieTilesListingArray;
		playMoviesListing = $('.js-loadCinamaListing');			
	}else if(argSourceObj == 'now'){			
		tempMovieArrayList = movieListingArray;
		playMoviesListing = $('.js-play-movies-listing');		
	}else if(argSourceObj == 'coming'){				
		tempMovieArrayList = comingMovieListingArray;
		playMoviesListing = $('.js-coming-movies-listing');		
	}

	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 

	tempArray = [];
	if( argMoviesIDs.length == 0 
		&& argCinemaIDs.length == 0 
		&& argExperienceIDs.length == 0 
		&& argGenreIDs.length == 0 
		&& argShowTimeIDs.length == 0 ){

		for(innerCounter=0; innerCounter < tempMovieArrayList.length; innerCounter++){		
			tempArray.push(tempMovieArrayList[innerCounter]);			
		}
		movieItems = tempArray;

	}else{	

		movieItems = tempMovieArrayList;

		if( argExperienceIDs.length > 0 
			&& argCinemaIDs.length > 0 
			&& argMoviesIDs.length > 0 
			&& argShowTimeIDs.length > 0){	

			tempArray = [];		
			for(var movieCounter=0; movieCounter < movieItems.length; movieCounter++){
				for(experienceCounter=0; experienceCounter < argExperienceIDs.length; experienceCounter++){	
					for(cinemaCounter=0; cinemaCounter < argCinemaIDs.length; cinemaCounter++){
						for(movieInnerCounter=0; movieInnerCounter < argMoviesIDs.length; movieInnerCounter++){
							for(showtimeCounter=0; showtimeCounter < argShowTimeIDs.length; showtimeCounter++){
								var findItem = argMoviesIDs[movieInnerCounter]+"-"+argCinemaIDs[cinemaCounter]+"-"+argExperienceIDs[experienceCounter]+"-"+argShowTimeIDs[showtimeCounter];
								if(movieItems[movieCounter].indexOf(findItem) > -1  ){
									tempArray.push(movieItems[movieCounter]);						
								}								
							}
						}						
					}
				}		
			}
			movieItems = tempArray;			
		}else if(argExperienceIDs.length > 0 && argCinemaIDs.length > 0 && argMoviesIDs.length > 0){	
			tempArray = [];		
			for(var movieCounter=0; movieCounter < movieItems.length; movieCounter++){
				for(experienceCounter=0; experienceCounter < argExperienceIDs.length; experienceCounter++){	
					for(cinemaCounter=0; cinemaCounter < argCinemaIDs.length; cinemaCounter++){
						for(movieInnerCounter=0; movieInnerCounter < argMoviesIDs.length; movieInnerCounter++){
							var findItem = argMoviesIDs[movieInnerCounter]+"-"+argCinemaIDs[cinemaCounter]+"-"+argExperienceIDs[experienceCounter];
							if(movieItems[movieCounter].indexOf(findItem) > -1  ){
								tempArray.push(movieItems[movieCounter]);						
							}
							// console.log(findItem, movieItems[movieCounter].indexOf(findItem));
						}						
					}
				}		
			}
			movieItems = tempArray;			
		}else if(argExperienceIDs.length > 0 && argCinemaIDs.length > 0){	
			tempArray = [];		
			for(var movieCounter=0; movieCounter < movieItems.length; movieCounter++){
				for(experienceCounter=0; experienceCounter < argExperienceIDs.length; experienceCounter++){	
					for(cinemaCounter=0; cinemaCounter < argCinemaIDs.length; cinemaCounter++){
						var findItem = argCinemaIDs[cinemaCounter]+"-"+argExperienceIDs[experienceCounter];		
						if(movieItems[movieCounter].indexOf(findItem) > -1  ){
							tempArray.push(movieItems[movieCounter]);						
						}						
					}
				}		
			}
			movieItems = tempArray;
			if(argMoviesIDs.length > 0 ){	
				tempArray = [];					
				for(counter=0; counter < argMoviesIDs.length; counter++){				
					for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
						var findItem = argMoviesIDs[counter];						
						if(movieItems[innerCounter].indexOf(findItem) > -1  ){
							tempArray.push(movieItems[innerCounter]);
						}	
					}
				}
				movieItems = tempArray;
			}
		}else{

			if(argExperienceIDs.length > 0 ){	
				tempArray = [];		
				for(counter=0; counter < argExperienceIDs.length; counter++){				
					for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
						var findItem = argExperienceIDs[counter];						
						if(movieItems[innerCounter].indexOf(findItem) > -1  ){
							tempArray.push(movieItems[innerCounter]);						
						}	
					}
				}
				movieItems = tempArray;
			}	
			
			if(argCinemaIDs.length > 0 ){
				tempArray = [];	
				for(counter=0; counter < argCinemaIDs.length; counter++){				
					for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
						var findItem = argCinemaIDs[counter];
						if(movieItems[innerCounter].indexOf(findItem) > -1  ){
							tempArray.push(movieItems[innerCounter]);						
						}	
					}
				}
				movieItems = tempArray;
			}

			if(argMoviesIDs.length > 0 ){	
				tempArray = [];					
				for(counter=0; counter < argMoviesIDs.length; counter++){				
					for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
						var findItem = argMoviesIDs[counter];						
						if(movieItems[innerCounter].indexOf(findItem) > -1  ){
							tempArray.push(movieItems[innerCounter]);
						}	
					}
				}
				movieItems = tempArray;
			}
		}

		if(argGenreIDs.length > 0 ){	
			tempArray = [];				
			for(counter=0; counter < argGenreIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argGenreIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray.push(movieItems[innerCounter]);
					}	
				}
			}
			movieItems = tempArray;
		}

		if(argShowTimeIDs.length > 0 ){	
			tempArray = [];				
			for(counter=0; counter < argShowTimeIDs.length; counter++){				
				for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
					var findItem = argShowTimeIDs[counter];						
					if(movieItems[innerCounter].indexOf(findItem) > -1  ){
						tempArray.push(movieItems[innerCounter]);
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

	playMoviesListing.removeClass('is--loading');
	playMoviesListing.removeClass('empty--record');
	if(movieItems.length == 0){
		playMoviesListing.addClass('empty--record');
		playMoviesListing.html("<p>"+noRecordMessage+"</p>"); 
	}else{
		if(winWidth < 768){
			createMovieListMobileSlider();
	    }else{
	    	movieListSetHTML();
			movieList();
	    }
	}

	movieItems = [];
	tempArray = [];
	moviePagination(1, 'now');
	moviePagination(1, 'coming');
}

function moviePagination(argCurrentPageNumber, argSourceObj){	

	var pageNumber = parseInt(argCurrentPageNumber), targetObj, nextItem, showItems;
	targetObj = $('.js-load-play-movies-listing');

	nextItem = (pageNumber*3);
	showItems = parseInt(pageNumber*3);//6

	// $('.js-play-movies-listing .list-wrap-page').hide();
	if(pageNumber === 1){
		$('.js-play-movies-listing .list-wrap-page').hide();
		$('.js-play-movies-listing .list-wrap-page').slice(0,3).show();
		$('.tileview-movies-list').hide();
		$('.tileview-movies-list').slice(0,3).show();
		$('.js-coming-movies-listing .list-wrap-page').hide();
		$('.js-coming-movies-listing .list-wrap-page').slice(0,3).show();
	}
		
	if(currentPageName == 'home'){
	
		if(argSourceObj == 'now'){
						
			$('.js-play-movies-listing .list-wrap-page').slice(0,showItems).show();			
			if($('.js-play-movies-listing .list-wrap-page').eq(nextItem).length == 0){
		 		$(targetObj).hide();
		 	}else{
		 		$(targetObj).show();
		 	}
		}else if(argSourceObj == 'coming'){
			targetObj = $('.js-load-coming-movies-listing');
			$('.js-coming-movies-listing .list-wrap-page').slice(0,showItems).show();
			if($('.js-coming-movies-listing .list-wrap-page').eq(nextItem).length == 0){
		 		$(targetObj).hide();
		 	}else{
		 		$(targetObj).show();
		 	}
		}
	}else if(currentPageName == 'showtime grid' ){	
			
		$('.c-movies-list .list-wrap-page').slice(0,showItems).show();
		if($('.c-movies-list .list-wrap').eq(nextItem).length == 0){
	 		$(targetObj).hide();
	 	}else{
	 		$(targetObj).show();
	 	}	

	}else if(currentPageName == 'showtime tile' || currentPageName == 'movie detail' ){		
		
		targetObj = $('.js-load-movie-listing');
		$('.tileview-movies-list').slice(0,showItems).show();
		if($('.tileview-movies-list').eq(nextItem).length == 0){
	 		$(targetObj).hide();
	 	}else{
	 		$(targetObj).show();
	 	}
	}

	// console.log(nextItem);
 	pageNumber++;
 	$(targetObj).attr('attr-current-page',pageNumber);
}


function find_duplicate_in_array(argSourceObj) {

    var object = {};
    var result = [];

    argSourceObj.forEach(function (item) {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    });

    for (var prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }

    return result;
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

$('.js-experienceItem').click(function () {
	var self = this;
	setTimeout(function () {

		var experienceNames = $(self).val();
		if($(self).prop('checked') == true){
			experienceFilter[experienceFilter.length] = experienceNames;
		}else{				
			experienceFilter.splice($.inArray(experienceNames, experienceFilter),1);
		}
		experienceFilter = startFromZero(experienceFilter);
		filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");

		experienceNames = "";
	}, 100);
});

$('.js-genreItem').click(function () {
	var self = this;
	setTimeout(function () {
		var genreNames = $(self).val();
		if($(self).prop('checked') == true){
			genreFilter[genreFilter.length] = genreNames;
		}else{				
			genreFilter.splice($.inArray(genreNames, genreFilter),1);
		}

		genreFilter = startFromZero(genreFilter);
		filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
	}, 100);
});	

$('.js-genreItem-coming').click(function () {
	var self = this;
	setTimeout(function () {
		var genreNames = $(self).val();
		if($(self).prop('checked') == true){
			comingGenreFilter[comingGenreFilter.length] = genreNames;
		}else{				
			comingGenreFilter.splice($.inArray(genreNames, comingGenreFilter),1);
		}	

		comingGenreFilter = startFromZero(comingGenreFilter);	
		filterMovies(comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, "coming");
	}, 100);
});	

$('.js-showTime').click(function () {
	var self = this;
	setTimeout(function () {
		var genreNames = $(self).val();
		if($(self).prop('checked') == true){
			showTimeFilter[showTimeFilter.length] = genreNames;
		}else{				
			showTimeFilter.splice($.inArray(genreNames, showTimeFilter),1);
		}

		showTimeFilter = startFromZero(showTimeFilter);
		filterMovies(movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, "now");
	}, 100);
});

$('#select-all-genere').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "genreFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'now');
});

$('#select-all-genere-coming').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "genreFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'coming');
});

$('#select-all-exp').click(function () {	
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "experienceFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'now');
});

$('#select-all-exp-coming').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "experienceFilter", comingMovieFilter, comingCinemaFilter, comingExperienceFilter, comingGenreFilter, showTimeFilter, 'coming');
});

$('#select-all-showtime').click(function () {
	var obj =$(this).parent().parent().find(".scroll-area .item");
	dropdownSelectAll(obj, "showtimeFilter", movieFilter, cinemaFilter, experienceFilter, genreFilter, showTimeFilter, 'now');
});
	