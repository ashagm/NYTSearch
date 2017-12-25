$(document).ready(function(){

let apiKey =  "6a1d59ab48bf4b02954a7a00b708601f";
var queryURL = "" ;
let searchTerm = "";
let numOfRecords = 5;
let startDate = ""; 
let endDate = ""; 

$("#btn-search").on('click', function(event){
  event.preventDefault();

  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    apiKey; 

	searchTerm = $('#search').val().trim();
  queryURL += "&q=" + searchTerm;

	numOfRecords = $('#count').val() ? $('#count').val().trim() : numOfRecords;

	startDate = $("#start").val().trim();
	endDate =  $("#end").val().trim();

  if(startDate != "" && startDate != undefined && startDate != null ){
    queryURL += "&begin_date=" + startDate + "0101";
  }

  if(endDate != "" && endDate != undefined && endDate != null ){
    queryURL += "&end_date=" + endDate + "0101";
  }

  doQuerySearch(queryURL);

});

$('#btn-clear').on('click', function(){
  $(".result-body").empty();
});


function doQuerySearch(queryURL){

	console.log("queryURL", queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
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

  for(let index = 0; index < numOfRecords; index++){

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