$(function () {
  function player_list() {
    $(document.body).append($("<div></div>").addClass("container"));

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
                    $(".container").remove();
                    player_detail(dat.id);
                  }),
              ),
          )
          .prepend($("<img>").attr("src", dat.images[0]).addClass("card-img")),
      );
    }
  }

  function player_detail(id) {
    const player = data.find((dat) => dat.id == id);
    $(document.body).append($("<div></div>").addClass("player_detail"));
    $(".player_detail").append(
      $("<button></button>")
        .text("go back")
        .css({
          padding: "5px 10px",
        })
        .click(function () {
          $(".player_detail").remove();
          player_list();
        }),
    );
    if (!player) {
      $(".player_detail").append(
        $("<h1></h1>").text("Player Data Not Found!!!").css({
          fontSize: "2rem",
          fontWeight: 1000,
          textAlign: "center",
        }),
      );
      return;
    }

    function clearTabContent() {
      $(".tab_content").empty();
    }

    function club_history() {
      clearTabContent();
      for (const club of player.club_history) {
        $(".tab_content").append(
          $("<div> </div>").append(
            $("<h1> </h1>").text(club.name),
            $("<p> </p>").text(`${club.from}-${club.to}`),
          ),
        );
      }
    }

    function trophies() {
      clearTabContent();
      for (const trophy of player.trophies) {
        $(".tab_content").append(
          $("<div> </div>").append(
            $("<h1></h1>").text(trophy.event),
            $("<p></p>").text(`Count : ${trophy.date.length}`),
          ),
        );
      }
    }

    $(".player_detail")
      .append(
        $("<div> </div>")
          .addClass("player_container")
          .append(
            $("<div> </div>"),
            $("<div> </div>").append(
              $("<div> </div>").text(`Name : ${player.name}`),
              $("<div> </div>").text(`Height : ${player.height}`),
              $("<div> </div>").text(`Country : ${player.country}`),
              $("<div> </div>").text(
                `Current Club : ${player.club_history.find((club) => club.to.toLowerCase() == "present").name || "No Club"}`,
              ),
            ),
          ),
      )
      .append(
        $("<div> </div>")
          .addClass("tab_container")
          .append($("<ul></ul").addClass("tab"))
          .append($("<div></div>").addClass("tab_content")),
      );

    const tabData = [
      {
        display: "club history",
        func: club_history,
      },
      {
        display: "trophies",
        func: trophies,
      },
    ];

    for (const dat of tabData) {
      $(".tab").append(
        $("<li> </li>")
          .text(dat.display)
          .click(function () {
            $(this).addClass("active");
            console.log($(this).nextAll());
            $(this).nextAll().removeClass("active");
            $(this).prevAll().removeClass("active");

            dat.func();
          }),
      );
    }
    club_history();
    console.log($(".tab").children());
    $($(".tab").children()["0"]).addClass("active");
  }
  player_list();
});
