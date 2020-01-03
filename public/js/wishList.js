function addWistList(id) {
  var heart = $(`#${id}-heart`);
  console.log(heart.css("color"));
  if (heart.css("color") === "rgb(221, 221, 221)") heart.css("color", "#D10024");
  else heart.css("color", "#ddd");
  var idUser = document.getElementById("userID");
  var urlSend =
    "/account/addWishList?userid=" + idUser.value + "&idproduct=" + id;
  $.ajax({
    url: urlSend,
    type: "GET"
  }).done(function(result) {
    console.log(result);
  });
}
