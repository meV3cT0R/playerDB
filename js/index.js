$(function () {
  function player_list() {
    $(".app").append(
      $("<div></div>")
        .addClass("container")
        .append($("<h1> </h1>").text("Loading...")),
    );

    $.get("http://localhost:8080/data/data.json", function (data, status) {
      if (status == "success") $(".container").empty();
      console.log("data.length : " + data.length);
      for (const dat of data) {
        console.log(dat);
        $(".container").append(
          $("<div></div>")
            .addClass("card")
            .append(
              $("<div> </div>")
                .addClass("card-body")
                .append(
                  $("<div> </div>")
                    .append($("<h1></h1>").text(dat.name))
                    .append($("<p></p>").text(dat.country)),
                )
                .append(
                  $("<button></button>")
                    .text("details")
                    .addClass("more_detail")
                    .click(function () {
                      window.open(
                        `http://localhost:8080/player_details.html?id=${dat.id}`,
                        "_self",
                      );
                    }),
                ),
            )
            .prepend(
              $("<img>").attr("src", dat.images[0]).addClass("card-img"),
            ),
        );
      }
    });
  }

  player_list();
});
