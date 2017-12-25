$(document).ready(function(){

let apiKey =  "6a1d59ab48bf4b02954a7a00b708601f";
let searchTerm = "";
let numOfResults = 5;
let startDate = "00000000"; //Format: YYYYMMDD
let endDate = "00000000"; //Format: YYYYMMDD

$("#btn-search").on('click', function(event){
  event.preventDefault();

	searchTerm = $('#search').val().trim();
	numOfRecords = $('#count').val() ? $('#count').val().trim() : numOfResults;
	startDate = $("#start").val().trim() + "19900101";
	endDate = $("#end").val().trim() + "20160101";

  doQuerySearch(searchTerm, numOfResults, startDate, endDate);

});

$('#btn-clear').on('click', function(){
  $(".result-body").empty();
});


function doQuerySearch(searchTerm, numOfResults, startDate, endDate){

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  	apiKey + "&q=" + searchTerm 
    + "&begin_date=" + startDate + "&end_date=" + endDate;

	console.log("queryURL", queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done(function(NYTresponse) {
    
    console.log(NYTresponse);

    displayResults(NYTresponse);

  }).fail(function(err) {
    throw err;
    });

}


function displayResults(NYTresponse){
   $(".result-body").empty();

  let resultsDiv = "";

  for(let index = 0; index < numOfResults; index++){

  	  var divSection = $("<div>");
      divSection.addClass("article");
      divSection.attr("id", "article-num-" + index);
      divSection.css({
        "background-color" : "#D0D0D0",
        "color" : "#fff",
        "padding" : "10px",
        "margin" : "10px",
        "border" : "2px solid #000",
        "border-radius" : "5px"
        });

      let eachArticle = 

      "<h2>" + NYTresponse.response.docs[index].headline.main + "</h2>" +
      "<p>" + NYTresponse.response.docs[index].byline.original + "</p>" +
      "<p>" + NYTresponse.response.docs[index].pub_date + "</p>" +
      "<p><a href='" + NYTresponse.response.docs[index].web_url + "'>" + 
      NYTresponse.response.docs[index].web_url + "</a></p>" ;	
  		
      console.log(divSection);
      divSection.html(eachArticle);

      $(".result-body").append(divSection);

  }

}

});