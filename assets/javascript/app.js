$(document).ready(function() {
var topics = ["Tiger Woods", "Rickie Fowler", "Phil Mickelson", "Rory Mcilry", "Brooks Koepka", "Jordan Speith",
     "Jason Day", "Justin Thomas", "Bubba Watson", "Matt Kuchar", "Adam Scott", "Henrik Stenson"
 ];

function alertGifName() {
    console.log("Gif Name: ", $(this).attr("data-name"));
}
function renderButtons() {
    
    $("#buttons").empty();
   
    for (let i=0; i<topics.length; i++) {
        var button = $("<button>");
        button.addClass("topic");
        button.attr("data-name", topics[i])
        button.text(topics[i]);
      $("#buttons").append(button);
    }
}
$("#add-golfer").on("click", function(event) {

    event.preventDefault();
    var newGolfer = $("#golf-input").val().trim();
    topics.push(newGolfer);
  renderButtons();
});

//$(document).on("click",".topic", alertGifName)
$(document).on("click",".topic",function(){
    var difGif = $(this).attr("data-name");
    console.log(difGif)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + difGif + "&api_key=sCER0NrjS9WlM1txvOrMByVQ1zY7NUu8&limit=10";
    //console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response)
        var results = response.data;

        for (var n=0; n< results.length;n++){
            var gifDiv = $("<div>");
            var rating = results[n].rating;
            var p = $("<p>").text("Rating: " + rating);
        var personImage = $("<img class='result'>");
        personImage.attr("src", results[n].images.fixed_height.url);
            personImage.attr("data-state", "still");
        personImage.attr("data-still", results[n].images.fixed_height_still.url);
            personImage.attr("data-animate", results[n].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifshere").prepend(gifDiv);
        }
    }) 
//console.log(queryURL)

});

renderButtons();
$(document).on("click",".result", function() {
   var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate")
    }
    else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
    }
});

})
//Could not change the gifs along with the buttons