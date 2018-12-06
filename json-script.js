var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://reelcinemas.ae/en/movies/ShowTrailer.aspx?param1=';	
var moviewFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var genreFilter = new Array();
var MovieListingArray = [];

$(document).ready(function () {
  loadCinemas();
  loadMovies();
  loadExperiences();
  loadPlayMovies();
  // loadComingMovies();
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

		  tempArray.push(
		    [	itemValue, 
		    	itemClass			    	
		    ]
		);

		count++;
		  
		});
	}).done(function( data ) {   

		cinemasListing.append('<div class="item custom-action js-select-all"><input type="checkbox" id="select-all-movies"><label for="select-all-movies"><span class="not-selected">Select All</span><span class="selected">Clear All</span></label></div>');

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
			
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
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
	filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
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
			filterMoviesListing(moviewFilter, cinemaFilter, experienceFilter, genreFilter);
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

  	var playMoviesListing = $('.js-play-mivies-listing');  	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExprerience, movieExprerienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema, movieGenreClass, bookNowClass, movieCounter;

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

			strLen = movieSynopsis.length;
		  	strposition = movieSynopsis.indexOf('Synopsis: ');
		  	movieSynopsis = movieSynopsis.substring(strposition+10,strLen);
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

			MovieListingArray[movieCounter] = '<div class="movie-item '+movieNameClass + ' '+movieGenreClass+' '+movieExprerienceClass+' '+movieCinemaClass+'"><div class="bot-img" style="background-image: url('+movieImage+');"></div><div class="item-wrap"><div class="img"><div class="stamp">'+moviePG+'</div>'+bookNowClass+'<img src="'+movieImage+'" alt="'+movieName+'"></div><div class="info"><div class="name">'+movieName+'</div><div class="duration-language"><div><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div><i class="icon"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div></div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="#" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"> <a href="#" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a> <div class="text"> <div class="title-wrap"> <h1 class="title">'+movieName+'</h1> <div class="stamp">'+moviePG+'</div></div><div class="info genere"><span>'+movieGenreDetail+'</span></div><div class="info duration"><i class="icon"><img src="assets/img/icons/duration.svg" alt="FB" class="svg"></i><span>'+movieDuration+'</span></div><div class="info language"><i class="icon medim"><img src="assets/img/icons/language.svg" alt="FB" class="svg"></i><span>'+movieLanguage+'</span></div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong> '+movieSynopsis+'</div><div class="action"><a href="#" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="#" class="c-btn-white btn--play-1"><i class="icon"></i><span>Play Trailer</span></a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section> </div>';
			playMoviesListing.append(MovieListingArray[movieCounter]);
			movieCounter++;
		});
	  
	}).done(function( data ) {
	    movieListSetHTML();
	    movieList();
	    console.log("Play movies completed");
	}).fail(function( data ) {
	    console.log("Play movies failed");
	});
}

// Check movie filter functionality for combine with Movie Cinema and Experience
function filterMoviesListing(movieIDs, cinemaIDs, experienceIDs, genreIDs){

	$('js-play-mivies-listing').addClass('c-loader');

	var movieItems = [];
	var movieCounter=0;	
		
	if(movieIDs.length == 0 && cinemaIDs.length == 0 && experienceIDs.length == 0 && genreIDs.length == 0  ){
		for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){		
			movieItems[movieCounter] = MovieListingArray[innerCounter];
			movieCounter++;			
		}
	}else{
		
		if(cinemaIDs.length > 0 ){
			for(counter=0; counter < cinemaIDs.length; counter++){				
				for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){
					var findItem = cinemaIDs[counter];
					if(MovieListingArray[innerCounter].indexOf(findItem) > -1  ){
						movieItems[movieCounter] = MovieListingArray[innerCounter];
						movieCounter++;
					}	
				}
			}
		}
		if(experienceIDs.length > 0 ){
			for(counter=0; counter < experienceIDs.length; counter++){				
				for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){
					var findItem = experienceIDs[counter];
					if(MovieListingArray[innerCounter].indexOf(findItem) > -1  ){
						movieItems[movieCounter] = MovieListingArray[innerCounter];
						movieCounter++;
					}	
				}
			}			
		}
		if(genreIDs.length > 0 ){
			for(counter=0; counter < genreIDs.length; counter++){				
				for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){
					var findItem = genreIDs[counter];
					if(MovieListingArray[innerCounter].indexOf(findItem) > -1  ){
						movieItems[movieCounter] = MovieListingArray[innerCounter];
						movieCounter++;
					}	
				}
			}			
		}
		if(movieIDs.length > 0 ){
			for(counter=0; counter < movieIDs.length; counter++){				
				for(innerCounter=0; innerCounter < MovieListingArray.length; innerCounter++){
					var findItem = movieIDs[counter];
					if(MovieListingArray[innerCounter].indexOf(findItem) > -1  ){
						movieItems[movieCounter] = MovieListingArray[innerCounter];
						movieCounter++;
					}	
				}
			}
		}
		
	}

	movieItems = unique(movieItems);
	var playMoviesListing = $('.js-play-mivies-listing');
	playMoviesListing.empty();

	for(counter=0; counter < movieItems.length; counter++){
		playMoviesListing.append(movieItems[counter]);	
	}

	movieListSetHTML();
	movieList();
	$('js-play-mivies-listing').removeClass('c-loader');
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}


function loadComingMovies(){
  	var playMoviesListing = $('.js-coming-mivies-listing');  	
  	var movieName, movieImage, movieGenre, movieTrailer, movieDuration, moviePG, movieLanguage;
  	var movieExPlatinum, movieExPremier, movieExStandard, movieExDineIn, movieExBoutique;
  	var movieExMX4D, movieExJunior, movieExDobly, movieExprerience, movieExprerienceTemp;
  	var movieSynopsis, strLen, strposition, movieNameClass, movieExprerienceClass;
  	var movieCinemaClass, movieCinema;

	playMoviesListing.empty();

	$.getJSON('ComingSoon.json', function (data) {
		$.each( data, function( i, item ) {

			movieName = item.MovieName;
			movieImage = moviePostURL+item.MovieImage;
			movieGenre = item.Genre;
			movieTrailer = moviePostURL+item.MovieTrailer;
			movieDuration = item.Duration;
			moviePG = item.Rating; // PG <br> 13
			moviePG = moviePG.replace(/PG/g, "PG <br>");
			moviePG = moviePG.replace(/-/g, "<br>");
			movieGenreDetail = movieGenre.replace(/,/g, " | ");
			movieLanguage = item.MovieLanguage;			
			movieLanguage = movieLanguage.replace(/Language /g, "");
			movieLanguage = movieLanguage.replace(/Language: /g, "");
			movieLanguage = movieLanguage.replace(/Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language:/g, "");
			movieLanguage = movieLanguage.replace(/ Language: /g, "");
			movieLanguage = movieLanguage.replace(/ Language/g, "");
			movieLanguage = movieLanguage.replace(/Subtitle: /g, "</div><div class='info'><strong>Subtitle: </strong>");

			// movieExprerienceTemp = item.Experience;
			movieExprerienceTemp = "";
			movieExprerience = "";
			movieSynopsis = item.Synopsis;

			movieExprerienceTemp = movieExprerienceTemp.toLowerCase();

			strLen = movieSynopsis.length;
		  	strposition = movieSynopsis.indexOf('Synopsis: ');
		  	movieSynopsis = movieSynopsis.substring(strposition+10,strLen);

			if(movieExprerienceTemp.indexOf('dine') > -1  ){
				movieExprerience = '<li><picture><source srcset="assets/img/logos/logo-reel-dine-in--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-dine-in.png" alt="Reel Dine-In"></picture></li>';
			}
			
			if(movieExprerienceTemp.indexOf('boutique') > -1  ){
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-boutique--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-boutique.png" alt="Reel Boutique"></picture></li>';
			}

			if(movieExprerienceTemp.indexOf('dobly') > -1  ){
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
				movieExprerience += '<li><picture><source srcset="assets/img/logos/logo-reel-junior--white.png" media="(max-width: 767px)"><img src="assets/img/logos/logo-reel-junior.png" alt="Premier"></picture></li>';
			}

			// if(item.movieType == 'coming'){
				
					playMoviesListing.append('<div class="movie-item"><div class="item-wrap"><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div><div class="stamp">'+moviePG+'</div><div class="info"><div class="name">'+movieName+'</div><div class="detail"><div class="detail-inner-wrap">'+movieGenre+' | '+movieDuration+'</div></div></div><div class="action"><a href="javascript:void(0);" class="c-btn-glow btn--sm" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play btn--sm" tabindex="0">Trailer</a></div></div><section class="item-details"><a href="javascript:void(0);" class="btn-close js-close-movie-list-detail"><i></i><i></i><span class="txt">close</span></a><div class="text"><div class="title-wrap"><h1 class="title">'+movieName+'</h1><div class="stamp">'+moviePG+'</div></div><div class="info">'+movieGenreDetail+'</div><div class="info"><strong>Duration:</strong> '+movieDuration+'</div><div class="info"><strong>Language:</strong> '+movieLanguage+'</div><div class="info has-lsit"><strong>Experiences:</strong><ul class="exp-list">'+movieExprerience+'</ul></div><div class="info"><strong>Storyline:</strong>'+movieSynopsis+'</div><div class="action"><a href="javascript:void(0);" class="c-btn-glow" tabindex="0"><span>Book Now</span></a><a href="javascript:void(0);" class="c-btn-white btn--txt-black btn--play" tabindex="0">Watch Trailer</a></div></div><div class="img"><img src="'+movieImage+'" alt="'+movieName+'"></div></section></div>');

			// }
		});
	  
	}).done(function( data ) {
	    movieListSetHTML();
	    movieList();
	    console.log("Coming soon movies completed");
	}).fail(function( data ) {
	    console.log("Coming soon movies failed");
	});
}