$(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  player_detail(urlParams.get("id"));

  function player_detail(id) {
    $.get("http://localhost:8080/data/data.json", function (data, status) {
      if(status=="success") {
        console.log("Player Data Successfully loaded");
        console.log(data)
      }else {
        console.log("Something went wrong while trying to load the data");
      }
      const player = data.find((dat) => dat.id == id);
      console.log("Player Data");
      console.log(player);
      $(document.body).append(
        $("<div></div>").addClass("player_detail").css({
          background: "url('../images/profile_bg_2.drawio.svg')",
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
        console.log("\n\nClub History");
        clearTabContent();
        console.log("Loading club history data");
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
              $("<div> </div>").css({
                "display":"flex",
                "alignItems" : "center",
                "fontWeight" : 1000
              }).append(
                $("<div></div>").append(
                      $("<p></p>").text(">")
                ),
                $("<div></div>").css({
                  "marginLeft" : "10px"
                }).append(
                $("<h3> </h3>").css({
                  color : "#69698c"
                }).text(club.name),
                $("<p> </p>").css({
                  "color" : "rgba(0,0,0,0.6)",
                  "fontSize" : "0.9rem"
                }).text(`${club.from} - ${club.to}`),
              ),
              ),
            );
        }
        console.log("Club History data appended");
      }

      function trophies() {
        clearTabContent();
        console.log("\n\nTrophies")
        console.log("appending Trophies Data");
        $(".tab_content").append(
          $("<div></div>").addClass("trophies").css({
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }),
        );
        for (let i =0;i< player.trophies.length;i++) {
          $(".trophies").append(
            $("<div> </div>").css("textAlign","left").append(
              $("<h3></h3>")
              .css({
                cursor :"pointer",
                transition : ".3s",
                color : "#69698c"
              }).hover(function(){
                  $(this).css({
                    "color" : "#ACABE3"
                  })
              },function() {
                $(this).css({
                  "color" : "#69698c"
                })
              }).append(
                $("<span></span>").text((player.trophies)[i].event),
                $("<span></span>")
                  .css({
                    fontSize: "1rem",
                    color: "rgba(0,0,0,0.7)",
                    
                  })
                  ,
              ).click(function() {
                  $(`.trophy-${i}`).toggle(300);
                  console.log("single trophy clicked")
              }),
              $("<div> </div>").css({
                "display":"none",
                  boxShadow : "0px 2px 2px gray",
                  borderBottomLeftRadius : "5px",
                  borderBottomRightRadius: "5px",
                  padding: "5px"
              }).addClass(`trophy-${i}`).append(
                $("<p></p>").append(
                  $("<span></span>").css({
                    fontSize:".9rem",
                    fontWeight:800,
                    color:"#69698c"
                  }).text(`Count`),
                  $("<span></span>").text(` : `),
                  $("<span></span>").css("fontSize",".8rem").text(` ${(player.trophies)[i].date.length}`),


                ),
                $("<span> </span>").css({
                  fontSize:".9rem",
                  fontWeight:800,
                  color : "#69698c"
                }).text("Date ")
                ,
                $("<span></span>").text(" : ")
                ,
                ...(player.trophies)[i].date.map((d,j)=>{
                  if(j!=(player.trophies)[i].date.length-1) d+=","
                  return $("<span> </span>").css("fontSize",".8rem").text(` ${d} `)
                })
              )
            ),
          );
        }
        console.log("Trophies Data appended");

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
          func: ()=>{
            console.log("Clicked club history");
            club_history();
          },
        },
        {
          display: "trophies",
          func: ()=> {
              console.log("Clicked trophies");
              trophies();
          },
        },
      ];

      for (const dat of tabData) {
        $(".tab").append(
          $("<li> </li>")
            .text(dat.display)
            .click(function () {
              $(this).addClass("active");
              $(this).nextAll().removeClass("active");
              $(this).prevAll().removeClass("active");

              dat.func();
            }),
        );
      }
      club_history();
      $($(".tab").children()["0"]).addClass("active");
    });
  }
});
