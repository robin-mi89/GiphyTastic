var topics = ["cinemagraphs", "birds with arms", "mildly interesting", "michael bay", "star wars"];
var apiKey = "dc6zaTOxFJmzC";
//make code that loops through topic and creates buttons for each. 
//on click on a button, use giphy api to get 10 images relating to that button's value, append them to the page.

function searchGiphy()
{
    var numImages = 10;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ $(this).text() +"&limit="+ numImages +"&api_key="+apiKey;
    //console.log(queryURL);
    $("#image-holder0").empty();
    $("#image-holder1").empty();
     $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      //console.log(response);
      for (i = 0; i < response.data.length; i++)
      {
        var stillURL = response.data[i].images.original_still.url;
        var animatedURL = response.data[i].images.original.url;

        var tempDiv = $("<div>");
        var tempImg = $("<img>");
        var tempRating = $("<p> Rating: " + response.data[i].rating + "</p>");
        tempImg.attr({
          "src": stillURL,
          "data-still": stillURL,
          "data-animate": animatedURL,
          "data-state": "still",
          "class": "gif"
        });
        tempRating.appendTo(tempDiv);
        tempImg.appendTo(tempDiv);
        tempDiv.prependTo($("#image-holder"+(i%2)))
        
      }
    });
};

function renderButtons()
{
    $("#buttons").empty();

    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) 
    {
    var a = $("<button>");
    a.addClass("topic btn btn-outline-warning");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons").append(a);
    }
};

$("#add-topic").on("click", function(event) 
{
        event.preventDefault();
        
        if ($("#topic-input").val().length > 0)
        {
          var topic = $("#topic-input").val().trim();
          topics.push(topic);
          renderButtons();
        }
        $("#topic-input").val("");
});

function playPause()
{
  var state = $(this).attr("data-state");
  if (state === "still")
      {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
  else 
      {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}

$(document).ready(function() 
{
  renderButtons();

  $("body").on("click", ".topic", searchGiphy);
  $("body").on("click", ".gif", playPause);
});
//also get gif's rating and place it under the image. 
//clicks on an image, animate. click again, stop.
