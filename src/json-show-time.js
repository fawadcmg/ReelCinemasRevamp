var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://reelcinemas.ae/en/movies/ShowTrailer.aspx?param1=';	
var moviewFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var showTimeFilter = new Array();
var MovieListingArray = new Array();
var cienmasFilterListing = new Array();
var movieSearchDate;
var pageNumber = 1;

var moviesPerPage = 3;

$(document).ready(function () {
	loadCinemas();
	loadMovies();
	loadExperiences();
	
	loadPlayMovies();

});

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

		  	tempArray.push(
			    [	itemValue, 
			    	itemClass			    	
			    ]
			);

		count++;
		  
		});
	}).done(function( data ) {   

		cinemasListing.append('<div class="item custom-action js-select-all js-select-all-location"><input type="checkbox" id="select-all-locations"><label for="select-all-locations"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');

		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			cinemasListing.append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}

		$('.js-cinemaItem').click(function () {
			var cinemaNames = $(this).val();
			if($(this).prop('checked') == true){
				cinemaFilter[cinemaFilter.length] = cinemaNames;
			}else{				
				cinemaFilter.splice($.inArray(cinemaNames, cinemaFilter),1);
			}

			cinemaFilter = startFromZero(cinemaFilter);			
			movieDateFilter = movieSearchDate;
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});


		$('.js-select-all-location').click(function () {

			if($(this).find('input').is(":checked")){
				cinemaFilter = [];
			}else{
				cinemaFilter = cienmasFilterListing;
			}

			cinemaFilter = startFromZero(cinemaFilter);
			movieDateFilter = movieSearchDate;
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});
		
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
	filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
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
	filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
});	

$('.js-load-play-movies-listing').click(function () {	
	resetPagination(pageNumber)
});	

function loadMovies(){
	var moviesListing = $('.js-movies-listing');
	var itemValue, itemClass;
	var tempArray = [];
	var tempEntry = [];	
	var count=0;

	moviesListing.empty();

	$.getJSON('MoviesSession.json', function (data) {
	
		$.each( data, function( i, item ) {  

			itemValue = item.MovieName;	
			itemClass = itemValue;
			itemClass = itemClass.replace(/\s+/g, "-");
			itemClass = itemClass.replace(".", "-");
			itemClass = itemClass.toLowerCase();
			
			tempArray.push(
			    [	itemValue, 
			    	itemClass			    	
			    ]
			);

			count++;		  
		});
	}).done(function( data ) {  

		moviesListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies"><label for="select-all-movies"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');

		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});

		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			moviesListing.append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem" id="'+tempEntry[1]+'"><label for="'+tempEntry[1]+'">'+tempEntry[0]+'</label></div>');
		}


		$('.js-movieItem').click(function () {
			var movieNames = $(this).val();
			if($(this).prop('checked') == true){
				moviewFilter[moviewFilter.length] = movieNames;
			}else{				
				moviewFilter.splice($.inArray(movieNames, moviewFilter),1);
			}

			moviewFilter = startFromZero(moviewFilter);	
			movieDateFilter = movieSearchDate;		
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});

		$('.js-select-all').click(function () {
			if($(this).find('input').is(":checked")){
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
			}else{
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );			
			}
		});	  	
	  	console.log("Movies completed");
	}).fail(function( data ) {
	  	console.log("Movies failed");
	});

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

function loadPlayMovies(){
	
  	var playMoviesListing = $('.js-play-movies-listing');  	
  	var moreMoviesListing = $('.js-load-play-movies-listing');  	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExprerience, movieExprerienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass, movieCounter, movieURL;

  	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty();

	movieCounter =0;

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
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");
		
			movieExprerience = "";
			movieExprerienceTemp = movieExprerienceTemp.toLowerCase();		

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
	  		  		
			if(movieExprerienceTemp.indexOf('dine') > -1  ){
				movieExprerience = '<li><picture><source srcset="assets/img/logos/logo-reel-dine-in--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dine-in.png" alt="Reel Dine-In"></picture></li>';
			}
			
			if(movieExprerienceTemp.indexOf('boutique') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-boutique--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-boutique.png" alt="Reel Boutique"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('dolby') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-dolby--white-cinema" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dolby-cinema.png" alt="Dolby Cinema"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('mx4d') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-mx4d--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-mx4d.png" alt="MX4D"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('platinum') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-platinum-suties--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-platinum-suties.png" alt="Platinum"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('premier') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-premier--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-premier.png" alt="Premier"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('standard') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-junior--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-junior.png" alt="standard"></picture></li>';
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

			MovieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="#" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="#" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#video-1" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(MovieListingArray[movieCounter]);
			movieCounter++;
		});
	  
	}).done(function( data ) {
	    movieListSetHTML();
	    movieList();

	    $('.list-wrap-page').fadeOut('fast');
	    moreMoviesListing.fadeOut('fast');	
	  
	    $('.list-wrap-page--1').fadeIn('slow');
	    $('.list-wrap-page--2').fadeIn('slow');
	    $('.list-wrap-page--3').fadeIn('slow');  
	    if(movieCounter/6 > 3 ){
			moreMoviesListing.fadeIn('fast');			
		}
	    // resetPagination(1);
	    playMoviesListing.removeClass('is--loading');
	    console.log("Play movies completed");

	    
	    // $('.c-movies-list .list-wrap').attr('data-aos', 'fade-up');
		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});

		loadMovieDates();
		loadMovieDateFilter();

	}).fail(function( data ) {
	    console.log("Play movies failed");
	});
}

function loadMovieDateFilter(){
	
  	var movieName, movieDate, movieDateValue, targetItem, movieDates, counter, itemClass;
  	var tempMovieName = movieName;  	
  	// tempMovieName = findAndReplace(tempMovieName, "%20", " ");
  	movieDates = "";
  	targetItem = $('.js-date-time');
  	var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  	var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  	var tempMovieDateList = [];  	
	targetItem = $('.js-date-time').removeClass('slick-initialized');
	targetItem = $('.js-date-time').removeClass('slick-slider');

  	targetItem.empty();
  	counter=0;

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {
			
			movieDate = item.SessionDate;	
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

			movieDates = '<div class="d-box js-movieDateFilter" attr-movie-date="js-'+itemClass+'">\
	                  <div class="dboxelement" >\
	                     <div class="month">'+movieMonthValue+'</div>\
	                     <div class="date">'+movieDateValue+'</div>\
	                     <div class="day">'+movieDayValue+'</div>\
	                  </div>\
	               </div>';
	        
	        tempMovieDateList[counter] = movieDates;
	        counter++;
						
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
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, showTimeFilter, movieDateFilter);
		});

		console.log("Movies dates completed");
	}).fail(function( data ) {
	    console.log("Movies dates failed");
	});
}


function findAndReplace(string, target, replacement) {
	var i = 0, length = string.length;
 	for (i; i < length; i++) { 
		string = string.replace(target, replacement);
 	}
 	return string; 
}

function loadMovieDates(){	

	var movieDate, movieNameClass, movieName, itemClass, movieTime;

	var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  	var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	$.getJSON('Sessions.json', function (data) {
		$.each( data, function( i, item ) {  

			movieDate = item.SessionDate;
			movieName = item.MovieName;
			movieTime = item.SessionTime;

			var tempMovieDate = new Date(movieDate);		
			var movieDateValue = new Date(movieDate);
			var movieMonthValue = new Date(movieDate);
			var movieDayValue = new Date(movieDate);
			var tempItemClass = "";

			movieTime = getShowTime(movieTime);

			movieDateValue = movieDateValue.getDate();
			movieMonthValue = monthName[movieMonthValue.getMonth()];
			movieDayValue = weekName[movieDayValue.getDay()];			
			itemClass = movieDateValue+"-"+movieMonthValue+"-"+movieDayValue;

			movieNameClass = movieName.replace(/\s+/g, "-");
			movieNameClass = movieNameClass.replace(" ", "-");
			movieNameClass = movieNameClass.replace(".", "-");
			movieNameClass = movieNameClass.toLowerCase();

			$('.'+movieNameClass).addClass(itemClass);
			tempItemClass = "js-"+itemClass+" "+movieTime;

			for(counter=0; counter < MovieListingArray.length; counter++){
				if(MovieListingArray[counter].indexOf(movieNameClass) > -1){
					MovieListingArray[counter] = MovieListingArray[counter].replace("movie-item", "movie-item "+tempItemClass);
				}
			}
		  
		});
	}).done(function( data ) {	
	  	// console.log("Cinemas completed");
	}).fail(function( data ) {
	  	// console.log("Cinemas failed");
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
function filterMoviesListing(movieIDs, cinemaIDs, experienceIDs, genreIDs, movieDates){

	var movieItems = [];
	var tempArray = [];
	var movieCounter=0;	
	var playMoviesListing = $('.js-play-movies-listing');
	var moreMoviesListing = $('.js-load-play-movies-listing');
	moreMoviesListing.fadeOut('fast');
	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 
	pageNumber = 1;

	movieItems = MovieListingArray;

	for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){
		var findItem = movieDates;
		if(movieItems[innerCounter].indexOf(findItem) > -1  ){
			tempArray[movieCounter] = movieItems[innerCounter];
			movieCounter++;
		}	
	}

	movieItems = tempArray;

	tempArray = [];	
	movieCounter = 0;		
	if(movieIDs.length == 0 && cinemaIDs.length == 0 && experienceIDs.length == 0 && genreIDs.length == 0  ){
		for(innerCounter=0; innerCounter < movieItems.length; innerCounter++){		
			tempArray[movieCounter] = movieItems[innerCounter];
			movieCounter++;			
		}
		movieItems = tempArray;

	}else{		
		
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

	$('.list-wrap-page').fadeOut('fast');
	
    for(var counter=pageNumber; counter <= moviesPerPage; counter++){
    	$('.list-wrap-page--'+counter).fadeIn('slow');
    }    
    moreMoviesListing.fadeOut('fast');
    if($('.js-play-movies-listing > .list-wrap').length > 3 ){
		moreMoviesListing.fadeIn('slow');
	}

	playMoviesListing.removeClass('is--loading');
	playMoviesListing.removeClass('empty--record');
	if(movieItems.length == 0){
		playMoviesListing.addClass('empty--record');
	}
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

