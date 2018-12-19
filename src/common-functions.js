var moviePostURL = 'https://www.reelcinemas.ae/en/KeyArts/Vertical/';
var movieURL = 'http://www.reelcinemas.ae/en/KeyArts/Tarilers/';
var moviewFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var genreFilter = new Array();
var cinemaFilter = new Array();
var experienceFilter = new Array();
var tempExperienceFilter = new Array();
var genreFilter = new Array();
var showTimeFilter = new Array();
var MovieListingArray = new Array();
var cienmasFilterListing = new Array();
var movieCinamaListing = new Array();
var pageNumber = 1;
var movieCount=1;
var baseURL = window.location.protocol + "//" + window.location.host + "/";
var searchMovieName = window.location.search.split('?param1=')[1];
var moviesPerPage = 4;
var movieTilesListing = new Array();
var movieShowTime = new Array();
var movieSearchDate;
var searchDateValue;
var weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
experienceFilter = ['standard','dolby','dine','boutique','screenx','platinum','premier','mx4d'];

function startFromZero(arr) {
    var newArr = [];
    var count = 0;

    for (var i in arr) {
        newArr[count++] = arr[i];
    }
    return newArr;
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


function resetShowTimePagination(currentPageNumber){
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

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}