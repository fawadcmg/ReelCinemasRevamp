var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://reelcinemas.ae/en/movies/ShowTrailer.aspx?param1=';	
var cinemaFilter = new Array();
var experienceFilter = new Array();
var showTimeFilter = new Array();
var MovieListingArray = new Array();
var cienmasFilterListing = new Array();
var movieCinamaListing = new Array();
var pageNumber = 1;
var baseURL = window.location.protocol + "//" + window.location.host + "/";
var searchMovieName = window.location.search.split('?param1=')[1];
var moviesPerPage = 3;
var movieTilesListing = new Array();
var movieShowTime = new Array();
var movieSearchDate;
var searchDateValue;
var movieImageURL= [];
var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function () {	
	loadMovies();
	loadCinemas();	
	loadExperiences();
	
	loadMovieDetail();
	loadMovieDates();
	setTimeout(function() {
	    $(".slick-current > div > .js-movieDateFilter").trigger('click');
	    $(".slick-current > div > .js-movieDateFilter > dboxelement").addClass('active');
	}, 1000);
});

function loadMovies(){
	var moviesListing = $('.js-movies-listing');
	var moreMoviesListing = $('.js-load-play-movies-listing');
	var itemValue, itemClass;
	var tempArray = [];
	var tempEntry = [];	
	var count=0;
	var movieCounter = 0;

	moviesListing.empty();

	$.getJSON('MoviesSession.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = itemClass.toLowerCase();
			MovieListingArray.push(itemValue);			
			var n=0;
        
		    for(counter=0; counter < itemValue.length; counter++){
		    	n += parseInt(itemValue.charCodeAt(counter));
		    }

		    movieImageURL[n] = moviePostURL+item.MovieImage;
			
			tempArray.push(
			    [	itemValue, 
			    	itemClass			    	
			    ]
			);
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
		moviesListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');


		$('.js-movieItem').click(function () {
			var movieNames = $(this).val();
			if($(this).prop('checked') == true){
				moviewFilter[moviewFilter.length] = movieNames;
			}else{				
				moviewFilter.splice($.inArray(movieNames, moviewFilter),1);
			}

			moviewFilter = startFromZero(moviewFilter);			
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

		$('.js-select-all').click(function () {
			if($(this).find('input').is(":checked")){
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
			}else{
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );			
			}
		});

		scrollCustomSelect();
		refreshAOS('refresh');

		$('.list-wrap-page').fadeOut('fast');
	    $('.js-load-play-movies-listing').fadeOut('fast');
	  
	    $('.list-wrap-page--1').fadeIn('slow');
	    $('.list-wrap-page--2').fadeIn('slow');
	    $('.list-wrap-page--3').fadeIn('slow');  
	    if(movieCounter/6 > 3 ){
			$('.js-load-play-movies-listing').fadeIn('fast');
		}
	    // resetPagination(1);
	    

	  	console.log("Movies completed");

	}).fail(function( data ) {
	  	console.log("Movies failed");
	});

}

$('.js-select-all-exp').click(function () {
	// var experienceNames = $(this).val();
	if($(this).prop('checked') == false){		
		experienceFilter = ['Standard','Dolby','Dine','Boutique','ScreenX','Platinum','MX4D'];
	}else{				
		experienceFilter = [];
	}

	console.log(experienceFilter);
	experienceFilter = startFromZero(experienceFilter);			
	filterExperienceMovies(experienceFilter);
});

function startFromZero(arr) {
    var newArr = [];
    var count = 0;

    for (var i in arr) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

function loadCinemas(){
	var cinemasListing = $('.js-cimemas-listing');
	var itemValue, itemClass;
	var tempArray = [];
	var tempEntry = [];	
	var count=0;

	cinemasListing.empty();

	$.getJSON('Cinemas.json', function (data) {
		$.each( data, function( i, item ) {        
			itemValue = item.CinemaName;
			itemID = item.CinemaID;
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.toLowerCase();

			cienmasFilterListing.push(
			    [ itemClass ]
			);
			movieCinamaListing.push(itemValue);

		  	tempArray.push(
			    [	itemValue, 
			    	itemClass			    	
			    ]
			);

		count++;
		  
		});
	}).done(function( data ) {   

		cinemasListing.append('<div class="item custom-action js-select-all js-select-all-location"><input type="checkbox" id="select-all-locations"><label for="select-all-locations"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		cinemasListing.append('<div class="scroll-area"></div>');
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			cinemasListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}
		cinemasListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');

		$('.js-cinemaItem').click(function () {
			var cinemaNames = $(this).val();
			if($(this).prop('checked') == true){
				cinemaFilter[cinemaFilter.length] = cinemaNames;
			}else{				
				cinemaFilter.splice($.inArray(cinemaNames, cinemaFilter),1);
			}

			cinemaFilter = startFromZero(cinemaFilter);			
			movieDateFilter = movieSearchDate;
			filterMoviesListing(cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});


		$('.js-select-all-location').click(function () {

			if($(this).find('input').is(":checked")){
				cinemaFilter = [];
			}else{
				cinemaFilter = cienmasFilterListing;
			}

			cinemaFilter = startFromZero(cinemaFilter);
			movieDateFilter = movieSearchDate;
			filterMoviesListing(cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});

		var currentDate = new Date();
		searchDateValue = currentDate.getDate()+"-"+monthName[currentDate.getMonth()]+"-"+weekName[currentDate.getDay()];

		for(counter=0; counter < MovieListingArray.length; counter++ ){
			loadCinamaListing(MovieListingArray[counter]);
		}
		
	  	console.log("Cinemas completed");

	}).fail(function( data ) {
	  	console.log("Cinemas failed");
	});
}

$('.js-experienceItem').click(function () {

	var experienceNames = $(this).val();
	if($(this).prop('checked') == true){
		experienceFilter[experienceFilter.length] = experienceNames;
	}else{				
		experienceFilter.splice($.inArray(experienceNames, experienceFilter),1);
	}

	experienceFilter = startFromZero(experienceFilter);	
	movieDateFilter = movieSearchDate;		
	filterMoviesListing(cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
});

$('.js-showTime').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		showTimeFilter[showTimeFilter.length] = genreNames;
	}else{				
		showTimeFilter.splice($.inArray(genreNames, showTimeFilter),1);
	}

	showTimeFilter = startFromZero(showTimeFilter);	
	movieDateFilter = movieSearchDate;
	filterMoviesListing(cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
});

function findAndReplace(string, target, replacement) {
	var i = 0, length = string.length;
 	for (i; i < length; i++) { 
		string = string.replace(target, replacement);
 	}
 	return string; 
}
$('.list-main-action').fadeOut('false');
function loadMovieDetail(){
	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage, movieSubtitle;  	
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass;
  	
	$.getJSON('MoviesSession.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;			
			
				movieImage = moviePostURL+item.MovieImage;
				movieGenre = item.Genre;
				movieTrailer = moviePostURL+item.MovieTrailer;
				movieDuration = item.Duration;
				moviePG = item.Rating; // PG <br> 13			
				movieLanguage = item.MovieLanguage;		
				movieExprerienceTemp = item.Experience;
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
			  			movieSubtitle =  '<i class="icon medium"><img src="assets/img/icons/subtitles.svg" alt="FB" class="svg"></i><span>'+tempSubtile+'</span>'			  			
		            }
			 	}
			
				movieExprerience = "";
				movieExprerienceTemp = movieExprerienceTemp.toLowerCase();		

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
						
		});
	  
	}).done(function( data ) {	    
		console.log("Movies detail completed");
	}).fail(function( data ) {
	    console.log("Movies detail failed");
	});
}

function loadMovieDates(){
	
  	var movieName, movieDate, movieDateValue, targetItem, movieDates, counter, itemClass;  	
  	movieDates = "";
  	targetItem = $('.js-date-time');
  	
  	var tempMovieDateList = [];  	
	targetItem = $('.js-date-time').removeClass('slick-initialized');
	targetItem = $('.js-date-time').removeClass('slick-slider');

  	targetItem.empty();
  	counter=0;

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;	
			movieDate = item.SessionDate;	

			// if(movieName == tempMovieName){

				itemClass = "";
				var currentDate = new Date();
				var tempMovieDate = new Date(movieDate);		
				var movieDateValue = new Date(movieDate);
				var movieMonthValue = new Date(movieDate);
				var movieDayValue = new Date(movieDate);

				movieDateValue = movieDateValue.getDate();
				movieMonthValue = monthName[movieMonthValue.getMonth()];
				movieDayValue = weekName[movieDayValue.getDay()];

				itemClass = movieDateValue+"-"+movieMonthValue+"-"+movieDayValue;

				if(counter==0){
					movieSearchDate = itemClass;
				}

				movieDates = '<div class="d-box js-movieDateFilter" attr-movie-date="'+itemClass+'">\
		                  <div class="dboxelement" >\
		                     <div class="month">'+movieMonthValue+'</div>\
		                     <div class="date">'+movieDateValue+'</div>\
		                     <div class="day">'+movieDayValue+'</div>\
		                  </div>\
		               </div>';
		        
		        tempMovieDateList[counter] = movieDates;
		        counter++;
			// }			
		});
	  
	}).done(function( data ) {	 

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
			var movieDateFilter = $(this).attr('attr-movie-date');
			searchDateValue = movieDateFilter;

			for(counter=0; counter < MovieListingArray.length; counter++ ){
				loadCinamaListing(MovieListingArray[counter]);
			}	
			$('.dboxelement').removeClass('active');
			$(this).find('.dboxelement').addClass('active');
			// console.log(MovieListingArray);		
			// filterMoviesListing(cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});
		console.log("Movies dates completed");
	}).fail(function( data ) {
	    console.log("Movies dates failed");
	});
}

function loadCinamaListing(movieName){
	
  	var movieDate, movieDateValue, targetItem, movieResult, counter, itemClass, movieCinema, movieExprerienceTemp;
  	var tempMovieName = movieName;  	
  	// tempMovieName = findAndReplace(tempMovieName, "%20", " ");
  	movieResult = "";
  	targetItem = $('.js-loadCinamaListing');
  	var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  	var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  	var tempMovieDateList = []; 
  	var tempCinemaListing = [];
  	var movieExprerience, movieImage, movieTime, movieAvailability, showTime;

  	targetItem.empty();
  	tempCounter = 0;

  	tempCinemaListing = movieCinamaListing;

  	for(counter=0; counter< tempCinemaListing.length; counter++){	
  		movieExprerience = "";				
  		showTime = "";
  		tempValue1 = tempCinemaListing[counter];
  		var selectedDate = searchDateValue;
  		movieTiles(tempMovieName,tempValue1,selectedDate);		
	}	
}

function movieTiles(movieName, cinemaName, movieDate){

	var movieDate, movieDateValue, targetItem, movieResult, counter, itemClass, movieCinema, movieExprerienceTemp;
  	var tempMovieName = movieName;  	
  	// tempMovieName = findAndReplace(tempMovieName, "%20", " ");
  	movieResult = "";
  	targetItem = $('.js-loadCinamaListing');
  	var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  	var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  	var tempMovieDateList = []; 
  	var tempCinemaListing = [];
  	var movieExprerience, movieImage, movieTime, movieAvailability, showTime, movieExprerienceTemp;
  	var tempCinemaLabel = cinemaName;
  	var searchMovieDate = movieDate;
  	var movieExprerienceClass, movieCinemaClass, tempDateClass; 	

  	counter = 0;
  	movieExprerience = "";
 	showTime = ""; 
 	var speratorLabel = "";
 	movieImage = "";

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;	
			movieDate = item.SessionDate;	
			movieCinema = item.CinemaName;
			var tempMovieDate = new Date(movieDate);		
			var movieDateValue = new Date(movieDate);
			var movieMonthValue = new Date(movieDate);
			var movieDayValue = new Date(movieDate);
			movieDateValue = movieDateValue.getDate();
			movieMonthValue = monthName[movieMonthValue.getMonth()];
			movieDayValue = weekName[movieDayValue.getDay()];
			itemClass = movieDateValue+"-"+movieMonthValue+"-"+movieDayValue;
			movieExprerienceClass = item.Experience;			
			movieExprerienceClass = movieExprerienceClass.toLowerCase();	
			movieExprerienceClass = movieExprerienceClass.replace(/,/g, " ");

			if(movieName == tempMovieName 
				&& movieCinema == tempCinemaLabel 
				&& searchMovieDate == itemClass){	

				var currentDate = new Date();				
				var tempBaseURL;
				
				movieExprerienceTemp = item.Experience;				
				// movieImage = moviePostURL+item.MovieImage;
				
				movieTime = item.SessionTime;
				movieAvailability = item.Availability;
				
				speratorLabel = ",";
				if(counter ==0){
					speratorLabel = "";
				}

				var n=0;
        
			    for(counter=0; counter < movieName.length; counter++){
			    	n += parseInt(movieName.charCodeAt(counter));
			    }

			    movieImage = movieImageURL[n];

				movieExprerienceTemp = movieExprerienceTemp.toLowerCase();
				if(movieExprerienceTemp.indexOf('dine') > -1  ){
					movieExprerience = 'logo-reel-dine-in.png';
				}
				
				if(movieExprerienceTemp.indexOf('boutique') > -1  ){
					movieExprerience = 'logo-reel-boutique.png';
				}

				if(movieExprerienceTemp.indexOf('dolby') > -1  ){
					movieExprerience = 'logo-reel-dolby-cinema.png';
				}

				if(movieExprerienceTemp.indexOf('mx4d') > -1  ){
					movieExprerience = 'logo-reel-mx4d.png';
				}

				if(movieExprerienceTemp.indexOf('platinum') > -1  ){
					movieExprerience = 'logo-reel-platinum-suties.png';
				}

				if(movieExprerienceTemp.indexOf('premier') > -1  ){
					movieExprerience = 'logo-reel-premier.png';
				}

				if(movieExprerienceTemp.indexOf('standard') > -1  ){
					movieExprerience = 'logo-reel-junior.png'; // +=
				}

				showTime += speratorLabel+item.SessionTime;
				counter++;			
			}			
		});
	  
	}).done(function( data ) {

		if(movieExprerience){			

			if(movieExprerience.indexOf(',') > -1 ){
				var movieExprerienceValue = [];				
				movieExprerienceValue = movieExprerience.split(',');
			}else{
				var movieExprerienceValue = [movieExprerience];					
			}

			if(showTime.indexOf(',') > -1 ){				
				var showTimeValue = [];
				showTimeValue = showTime.split(',');				
			}else{				
				var showTimeValue = [showTime];	
			}
			
			showTimeResult = "";
			for(counter=0; counter < showTimeValue.length; counter++){
				itemClass = getShowTime(showTimeValue[counter]);
				showTimeResult += '<li class='+itemClass+'><div class="showtime">'+showTimeValue[counter]+'</div></li>';
			}			
			
			var tempMovieImage = $('.js-movieImage').attr('src');

			movieCinemaClass = cinemaName;			
			movieCinemaClass = movieCinemaClass.replace(/\s+/g, "-");
			movieCinemaClass = movieCinemaClass.replace(/,/g, " ");
			movieCinemaClass = movieCinemaClass.toLowerCase();			

			result = '<div class="tileview-movies-list '+movieExprerienceClass+' '+movieCinemaClass+'">\
		                     <div class="item">\
		                        <div class="movielocation">\
		                           '+cinemaName+'\
		                        </div>\
		                     </div>\
		                     <div class="item">\
			                     <div class="img">\
			                        <img src="'+movieImage+'" alt="'+tempMovieName+'">\
			                     </div>\
			                     <div class="moviename">'+tempMovieName+'</div>\
			                     <div class="locationmobile">'+cinemaName+'</div>\
			                  </div>\
		                     <div class="item">\
		                        <div class="logoimg">\
		                           <img src="assets/img/logos/'+movieExprerience+'" alt="'+tempMovieName+'">\
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

		    // console.log(result);

		    movieTilesListing.push(result);

		    $('.js-loadCinamaListing').append(result);
		}
		console.log("Movies cinema listing completed for " + cinemaName);
	}).fail(function( data ) {
	    console.log("Movies cinema listing failed for " + cinemaName);
	});
}

function getShowTime(movieTimeValue){	
	var hourValue, result;	

	hourValue = parseInt(movieTimeValue.split(":"));
	
	if(hourValue > 6 && hourValue < 12){
		result = "movie-show-morning";
	}else if(hourValue > 12 && hourValue < 18){
		result = "movie-show-afternoon";
	}else{
		result = "movie-show-evening";
	}

	return result;    
}
function loadExperiences(){

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

				tempArray.push(
				    [	itemValue, 
				    	itemClass			    	
				    ]
				);
			}			

		});
	  
	}).done(function( data ) {
		experiencesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-exp"><label for="select-all-exp"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		
		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});

		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			experiencesListing.append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-experienceItem" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}

	    console.log("Experiences completed");
	}).fail(function( data ) {
	    console.log("Experiences failed");
	});
}

function resetPagination(currentPageNumber){
    var currentPage = currentPageNumber;
	var nextPage = (currentPage+1);
	
	for(var counter= currentPage*moviesPerPage; counter <= nextPage*moviesPerPage ; counter++){
		if($('.list-wrap-page--'+counter).length == 0 ){
			$('.js-load-play-movies-listing').fadeOut('fast');
		}else{
			$('.list-wrap-page--'+counter).fadeIn('slow');	
		}
	}
	pageNumber++;	
	if($('.list-wrap-page--'+counter).length == 0 ){
		$('.js-load-play-movies-listing').fadeOut('fast');
	}
}

// Check movie filter functionality for combine with Movie Cinema and Experience
function filterMoviesListing(cinemaIDs, experienceIDs, genreIDs, movieDates){

	
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}