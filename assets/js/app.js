let apiKey =  "6a1d59ab48bf4b02954a7a00b708601f";
let searchTerm = "";
let numOfResults = 5;
let start = "";
let end = "";

$("#btn-search").on('click', function(){
	searchTerm = $('#search').val();
	numOfRecords = $('#count').val();
	start = $("#start").val();
	end = $("#end").val();

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  	apiKey + "&q=" + searchTerm + "&begin_date=" + start + "&end_date=" + end;

	console.log("queryURL", queryURL);

$.ajax({
  url: queryURL,
  method: 'GET',
}).done(function(NYTresponse) {
  console.log(NYTresponse);

  for(let index = 0; index < numOfResults; index++){

  	  var divSection = $("<div>");
      divSection.addClass("article");
      divSection.attr("id", "article-num-" + index);
      // $(".result-body").append(divSection);


      let eachArticle = 

      "<h2>" + NYTresponse.response.docs[index].headline.main + "</h2>" +
      "<p>" + NYTresponse.response.docs[index].byline.original + "</p>" +
      "<p>" + NYTresponse.response.docs[index].pub_date + "</p>" +
      "<p><a href='" + NYTresponse.response.docs[index].web_url + "'>" + NYTresponse.response.docs[index].web_url + "</a></p>" ;	
  		divSection.append(eachArticle)

	    $(".result-body").html(divSection);

  }
}).fail(function(err) {
  throw err;
});

});