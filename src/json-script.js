var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://www.reelcinemas.ae/en/KeyArts/Tarilers/';	
var moviewFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var genreFilter = new Array();
var MovieListingArray = new Array();
var cienmasFilterListing = new Array();
var pageNumber = 1;

var moviewFilter1 = new Array();
var cinemaFilter1 = new Array();
var experienceFilter1 = new Array();
var genreFilter1 = new Array();
var MovieListingArray1 = new Array();
var cienmasFilterListing1 = new Array();
var pageNumber1 = 1;
var comingMovieListingArray = new Array();

var moviesPerPage = 3;

var playMoviesListing = $('.js-play-movies-listing');  	
var moreMoviesListing = $('.js-load-play-movies-listing');

$(document).ready(function () {
	loadCinemas();
	loadMovies();
	loadExperiences();

	loadCinemas1();
	loadMovies1();
	loadExperiences1();

	loadPlayMovies();
	loadComingMovies();

	scrollCustomSelect();
	refreshAOS('refresh');
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

$('.js-select-all-exp-1').click(function () {
	// var experienceNames = $(this).val();
	if($(this).prop('checked') == false){		
		experienceFilter1 = ['Standard','Dolby','Dine','Boutique','ScreenX','Platinum','MX4D'];
	}else{				
		experienceFilter1 = [];
	}

	console.log(experienceFilter1);
	experienceFilter1 = startFromZero(experienceFilter1);			
	filterExperienceMovies1(experienceFilter1);
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
			
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});


		$('.js-select-all-location').click(function () {

			if($(this).find('input').is(":checked")){
				cinemaFilter = [];
			}else{
				cinemaFilter = cienmasFilterListing;
			}

			cinemaFilter = startFromZero(cinemaFilter);
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
		});

		scrollCustomSelect();
		refreshAOS('refresh');

	  	console.log("Cinemas completed");

	}).fail(function( data ) {
	  	console.log("Cinemas failed");
	});
}

function loadCinemas1(){
	var cinemasListing = $('.js-cimemas-listing-1');
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

			cienmasFilterListing1.push(
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

		cinemasListing.append('<div class="item custom-action js-select-all js-select-all-location-1"><input type="checkbox" id="select-all-locations-1"><label for="select-all-locations-1"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		cinemasListing.append('<div class="scroll-area"></div>');
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			cinemasListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-cinemaItem-1" id="'+tempEntry[1]+'-1'+'"><label for="'+tempEntry[1]+'-1'+'">'+tempEntry[0]+'</label></div>');
		}
		cinemasListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');

		$('.js-cinemaItem-1').click(function () {
			var cinemaNames = $(this).val();
			if($(this).prop('checked') == true){
				cinemaFilter1[cinemaFilter1.length] = cinemaNames;
			}else{				
				cinemaFilter1.splice($.inArray(cinemaNames, cinemaFilter1),1);
			}

			cinemaFilter1 = startFromZero(cinemaFilter1);			
			
			filterMoviesListing1(moviewFilter1, cinemaFilter1, experienceFilter1, genreFilter1);
		});


		$('.js-select-all-location-1').click(function () {

			if($(this).find('input').is(":checked")){
				cinemaFilter1 = [];
			}else{
				cinemaFilter1 = cienmasFilterListing1;
			}

			cinemaFilter1 = startFromZero(cinemaFilter1);
			filterMoviesListing1(moviewFilter1, cinemaFilter1, experienceFilter1, genreFilter1);
		});

		scrollCustomSelect();
		refreshAOS('refresh');

	  	console.log("Coming Cinemas completed");

	}).fail(function( data ) {
	  	console.log("Coming Cinemas failed");
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
	filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
});

$('.js-experienceItem-1').click(function () {

	var experienceNames = $(this).val();
	if($(this).prop('checked') == true){
		experienceFilter1[experienceFilter1.length] = experienceNames;
	}else{				
		experienceFilter1.splice($.inArray(experienceNames, experienceFilter1),1);
	}

	experienceFilter1 = startFromZero(experienceFilter1);			
	filterMoviesListing1(moviewFilter1, cinemaFilter1, experienceFilter1, genreFilter1);
});	


$('.js-genreItem').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		genreFilter[genreFilter.length] = genreNames;
	}else{				
		genreFilter.splice($.inArray(genreNames, genreFilter),1);
	}	

	genreFilter = startFromZero(genreFilter);			
	filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
});	

$('.js-genreItem-1').click(function () {
	var genreNames = $(this).val();
	if($(this).prop('checked') == true){
		genreFilter1[genreFilter1.length] = genreNames;
	}else{				
		genreFilter1.splice($.inArray(genreNames, genreFilter1),1);
	}	

	genreFilter1 = startFromZero(genreFilter1);			
	filterMoviesListing1(moviewFilter1, cinemaFilter1, experienceFilter1, genreFilter1);
});	

$('.js-load-play-movies-listing').click(function () {	
	resetPagination(pageNumber)
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
	    playMoviesListing.removeClass('is--loading');

	  	console.log("Movies completed");

	}).fail(function( data ) {
	  	console.log("Movies failed");
	});

}

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


function loadMovies1(){
	var moviesListing = $('.js-movies-listing-1');
	var itemValue, itemClass;
	var tempArray = [];
	var tempEntry = [];	
	var count=0;

	moviesListing.empty();

	$.getJSON('ComingSoon.json', function (data) {
	
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

		moviesListing.append('<div class="item custom-action js-select-all-1"><input type="checkbox" id="select-all-movies-1"><label for="select-all-movies-1"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		moviesListing.append('<div class="scroll-area"></div>');
		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			moviesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-movieItem-1" id="'+tempEntry[1]+"-1"+'"><label for="'+tempEntry[1]+"-1"+'">'+tempEntry[0]+'</label></div>');
		}
		moviesListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');


		$('.js-movieItem-1').click(function () {
			var movieNames = $(this).val();
			if($(this).prop('checked') == true){
				moviewFilter1[moviewFilter1.length] = movieNames;
			}else{				
				moviewFilter1.splice($.inArray(movieNames, moviewFilter1),1);
			}

			moviewFilter1 = startFromZero(moviewFilter1);			
			filterMoviesListing1(moviewFilter1, cinemaFilter1, experienceFilter1, genreFilter1);
		});

		$('.js-select-all-1').click(function () {
			if($(this).find('input').is(":checked")){
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", false );
			}else{
				$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop( "checked", true );			
			}
		});	  

		scrollCustomSelect();
		refreshAOS('refresh');	

	  	console.log("Coming Movies completed");

	}).fail(function( data ) {
	  	console.log("Coming Movies failed");
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
		experiencesListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');

		scrollCustomSelect();
		refreshAOS('refresh');

	    console.log("Experiences completed");

	}).fail(function( data ) {
	    console.log("Experiences failed");
	});
}


function loadExperiences1(){

  	var experiencesListing = $('.js-experiences-listing-1');
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
		experiencesListing.append('<div class="item custom-action js-select-all-1"><input type="checkbox" id="select-all-exp-1"><label for="select-all-exp-1"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');
		experiencesListing.append('<div class="scroll-area"></div>');
		tempArray.sort(function(a, b){
		    if(a[0] < b[0]) { return -1; }
		    if(a[0] > b[0]) { return 1; }
		    return 0;
		});
		for (arrayIndex = 0; arrayIndex < tempArray.length; arrayIndex++) {
			tempEntry = tempArray[arrayIndex];				
			experiencesListing.find('.scroll-area').append('<div class="item"><input type="checkbox" value="'+tempEntry[1]+'" class="js-experienceItem-1" id="'+tempEntry[0]+'"><label for="'+tempEntry[0]+'">'+tempEntry[0]+'</label></div>');
		}
		experiencesListing.append('<div class="item item--close"><a href="#" class="js-close-custom-select">Close</a></div>');

		scrollCustomSelect();
		refreshAOS('refresh');

	    console.log("Coming Experiences completed");

	}).fail(function( data ) {
	    console.log("Coming Experiences failed");
	});
}

function loadPlayMovies(){
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
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");
		
			movieExprerience = "";
			movieExprerienceTemp = movieExprerienceTemp.toLowerCase();		

			var tempMovieSynopsis = movieSynopsis.split('\n');
		 	var tempVal = "";
		 	var tempSynopsis, tempDirector, tempCast;
		 	var movieTrailerURL;

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
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-dolby-cinema--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dolby-cinema.png" alt="Dolby Cinema"></picture></li>';
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

			movieTrailerURL = 'play-video-'+movieNameClass;

			MovieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="#" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="#" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#'+movieTrailerURL+'" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(MovieListingArray[movieCounter]);
			movieCounter++;
		});
	  
	}).done(function( data ) {

	    $('.list-wrap-page').fadeOut('fast');
	    moreMoviesListing.fadeOut('fast');	
	  
	    $('.list-wrap-page--1').fadeIn('slow');
	    $('.list-wrap-page--2').fadeIn('slow');
	    $('.list-wrap-page--3').fadeIn('slow');  
	    
	    // resetPagination(1);
	    playMoviesListing.removeClass('is--loading');
	    console.log("Play movies completed");

		scrollCustomSelect();
		refreshAOS('refresh');

	    movieListSetHTML();
	    movieList();

	    toSVG();
		movieListCarousel();
		filterSearch();

		if(winWidth > 1024 && isIE == false){
			$('.c-movies-list .list-wrap').each(function () {
				$(this).find('.movie-item').each(function (i) {
			    	$(this).attr('data-aos', 'fade-up');
			    	$(this).attr('data-aos-delay', (50*i));
				});
			});
		}
		refreshAOS('init');


		$('.list-wrap-page').fadeOut('fast');
	    $('.list-wrap-page--1').stop().fadeIn('slow');
	    $('.list-wrap-page--2').stop().fadeIn('slow');
	    $('.list-wrap-page--3').stop().fadeIn('slow');

		moreMoviesListing.fadeOut('fast');
	    if($('.js-play-movies-listing > .list-wrap').length > 3 ){
			moreMoviesListing.fadeIn('slow');
		}

	}).fail(function( data ) {
	    console.log("Play movies failed");
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
	console.log(counter, pageNumber, nextPage, currentPage, moviesPerPage);
	moreMoviesListing.fadeOut('fast');
	var listItems = $('#whats-on .movie-item').length;

    if($('.js-play-movies-listing > .list-wrap').length > 3 && listItems > nextPage*18 ){
		moreMoviesListing.fadeIn('slow');
	}

}

// Check movie filter functionality for combine with Movie Cinema and Experience
function filterMoviesListing(movieIDs, cinemaIDs, experienceIDs, genreIDs){
	movieListRemoveCarousel();

	var movieItems = [];
	var tempArray = [];
	var movieCounter=0;	
	var playMoviesListing = $('.js-play-movies-listing');
	moreMoviesListing.fadeOut('fast');
	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 
	pageNumber = 1;
		
	if(movieIDs.length == 0 && cinemaIDs.length == 0 && experienceIDs.length == 0 && genreIDs.length == 0  ){
		for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){		
			movieItems[movieCounter] = MovieListingArray[innerCounter];
			movieCounter++;			
		}
	}else{

		movieItems = MovieListingArray;
		
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
	
	if(winWidth > 1024 && isIE == false){
		$('.c-movies-list .list-wrap').each(function () {
			$(this).find('.movie-item').each(function (i) {
		    	$(this).attr('data-aos', 'fade-up');
		    	$(this).attr('data-aos-delay', (50*i));
			});
		});
	}
	
	toSVG();
	movieListStartCarousel();
	refreshAOS('init');
}



function filterMoviesListing1(movieIDs, cinemaIDs, experienceIDs, genreIDs){

	var movieItems = [];
	var tempArray = [];
	var movieCounter=0;	
	var playMoviesListing = $('.js-coming-movies-listing');
	var moreMoviesListing = $('.js-load-coming-movies-listing');
	moreMoviesListing.fadeOut('fast');
	playMoviesListing.addClass('is--loading');
	playMoviesListing.empty(); 
	pageNumber = 1;
		
	if(movieIDs.length == 0 && cinemaIDs.length == 0 && experienceIDs.length == 0 && genreIDs.length == 0  ){
		for(innerCounter=0; innerCounter < comingMovieListingArray.length; innerCounter++){		
			movieItems[movieCounter] = comingMovieListingArray[innerCounter];
			movieCounter++;			
		}
	}else{

		movieItems = comingMovieListingArray;
		
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
    if($('.js-coming-movies-listing > .list-wrap').length > 3 ){
		moreMoviesListing.fadeIn('slow');
	}

	playMoviesListing.removeClass('is--loading');
	playMoviesListing.removeClass('empty--record');
	if(movieItems.length == 0){
		playMoviesListing.addClass('empty--record');
	}
	
	$('.c-movies-list .list-wrap').each(function () {
		$(this).find('.movie-item').each(function (i) {
	    	$(this).attr('data-aos', 'fade-up');
	    	$(this).attr('data-aos-delay', (50*i));
		});
	});
	refreshAOS('init');
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}


function loadComingMovies(){

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
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");
			movieLanguage = movieLanguage.replace(/Subtitle /g, "</div><div class='info language'><i class='icon medium'><img src='assets/img/icons/subtitles.svg' alt='' class='svg'></i><span>");

			movieExprerience = "";
			// movieExprerienceTemp = movieExprerienceTemp.toLowerCase();		


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

			// strLen = movieSynopsis.length;
		 //  	strposition = movieSynopsis.indexOf('Synopsis: ');
		 //  	movieSynopsis = movieSynopsis.substring(strposition+10,strLen);
		  	movieCinemaClass = "";
		  	movieGenreClass = "";
	  		
	  		/*  		
			if(movieExprerienceTemp.indexOf('dine') > -1  ){
				movieExprerience = '<li><picture><source srcset="assets/img/logos/logo-reel-dine-in--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dine-in.png" alt="Reel Dine-In"></picture></li>';
			}
			
			if(movieExprerienceTemp.indexOf('boutique') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-boutique--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-boutique.png" alt="Reel Boutique"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('dolby') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-dolby-cinema--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dolby-cinema.png" alt="Dolby Cinema"></picture></li>';
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
			*/
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
				
			comingMovieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="#" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="#" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="'+movieURL+'" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#'+movieTrailerURL+'" class="c-btn-white btn--play-1 js-popup-link"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(comingMovieListingArray[movieCounter]);
			movieCounter++;
		});

		scrollCustomSelect();
	  
	}).done(function( data ) {	    
	    movieListSetHTML();
	    movieList();
	    $('.list-wrap-page').fadeOut('fast');
	    $('.js-load-coming-movies-listing').fadeIn('slow');	
	    for(var counter=pageNumber; counter <= moviesPerPage; counter++){
	    	$('.list-wrap-page--'+counter).fadeIn('slow');
	    }
	    moreMoviesListing.fadeOut('fast');
	    if($('.js-coming-movies-listing > .list-wrap').length > 3 ){
			moreMoviesListing.fadeIn('slow');
		}    
	    $('.js-coming-movies-listing').removeClass('is--loading');


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