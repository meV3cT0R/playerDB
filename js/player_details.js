$(function () {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  player_detail(urlParams.get("id"));

  function player_detail(id) {
    $.get("http://localhost:8000/data/data.json", function (data, status) {
      const player = data.find((dat) => dat.id == id);
      $(document.body).append(
        $("<div></div>").addClass("player_detail").css({
          background: "url('../images/profile_bg.drawio.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
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
          $(".tab_content")
            .css({
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
              padding: "0px 90px",
              textAlign: "left",
              margin: "30px 0",
            })
            .append(
              $("<div> </div>").append(
                $("<h3> </h3>").text(club.name),
                $("<p> </p>").text(`${club.from} - ${club.to}`),
              ),
            );
        }
      }

      function trophies() {
        clearTabContent();
        $(".tab_content").append(
          $("<div></div>").addClass("trophies").css({
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }),
        );
        for (const trophy of player.trophies) {
          $(".trophies").append(
            $("<div> </div>").append(
              $("<h3></h3>").append(
                $("<span></span>").text(trophy.event),
                $("<span></span>")
                  .css({
                    fontSize: "1rem",
                    color: "rgba(0,0,0,0.7)",
                  })
                  .text(` (${trophy.date.length})`),
              ),
            ),
          );
        }
      }

      $(".player_detail")
        .append(
          $("<div> </div>")
            .addClass("player_container")
            .append(
              $("<div> </div>")
                .css({
                  marginTop: "115px",
                })
                .append(
                  $("<img>").attr("src", player.images[0]).css({
                    borderRadius: "50%",
                    width: "125px",
                    height: "125px",
                    objectFit: "cover",
                    margin: "0 auto",
                    display: "block",
                  }),
                ),
              $("<div> </div>")
                .css({
                  textAlign: "center",
                })
                .append(
                  $("<div></div>")
                    .css({
                      display: "inline-block",
                      marginTop: "20px",
                    })
                    .append(
                      $("<div> </div>")
                        .css({
                          fontSize: "1.2rem",
                          fontWeight: "800",
                        })
                        .text(`${player.name}`),
                      $("<div> </div>")
                        .css({
                          fontSize: "1.1rem",
                          color: "rgba(0, 0, 0, 0.6)",
                        })
                        .text(`${player.position}`),
                    ),
                  $("<div></div>")
                    .css({
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    })
                    .addClass("other_details")
                    .append(
                      $("<div> </div>").append(
                        $("<h3></h3>").text("Country"),
                        $("<span></span>").text(" : "),
                        $("<span></span").text(player.country),
                      ),
                      $("<div> </div>").append(
                        $("<h3></h3>").text("Club"),
                        $("<span></span>").text(" : "),
                        $("<span></span").text(
                          `${player.club_history.find((club) => club.to.toLowerCase() == "present").name || "No Club"}`,
                        ),
                      ),
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
    });
  }
});
