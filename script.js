let KEY = "XpGz1O3Xb2hF5jl4r0lAOQr1tO0g0Fjc"

let themes = ["dog", "cat"];

$(document).ready(function() {
    
    themes.forEach(element => $("#animal-buttons").append(`<button class = "animal"> ${element} </button>`));

    // Start your code from here
    $("#add-animal").on("click", function(e){
        e.preventDefault();
        let animal = $("#animal-input").val();
        $("#animal-buttons").append(`<button class = "animal"> ${animal} </button>`)
    })

    $(document).on("click", ".animal",function(e){
        e.preventDefault();
        $("#animals").empty();
        console.log($(this).text());
        for (var i = 0; i < 10; i++){
            getGifs($(this).text(), i);
        }
    })

    $(document).on('click', '.gif', function(e){
        e.preventDefault();
        var src = $(this).attr("src");
        if($(this).hasClass('playing')){
            //stop
            $(this).attr('src', src.replace(".gif", "_s.gif"))
            $(this).removeClass('playing');
        } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace("_s.gif", ".gif"))
        }
    });
});


function getGifs(animal, offset)  {
    //Ajax request
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=${KEY}&limit=1&offset=${offset}`,
        method: 'get',
        success: function(res) {
            console.log("success", res.data[0].images.fixed_height_still.url);
            $("#animals").append(`
            <div>
                <p>Rating: ${res.data[0].rating}</p>
                <img class= gif src= ${res.data[0].images.fixed_height_still.url} alt= "gif" />
            </div>
            `);
        } ,
        error: function() {
            console.log("error");
        }
    });
    
};
