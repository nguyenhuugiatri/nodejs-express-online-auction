var urlCurrent = window.location.href;
if (urlCurrent.indexOf("/search") !== -1) {
  $("html, body").animate(
    {
      scrollTop: $("#nameproduct").offset().top
    },
    "slow"
  );
}

///////////////////// wowwwwwwwwwwwwww look at thissss
function likeByWinner(id) {
  Swal.fire({
    width: 450,
    title: "Sweet!!!",
    text:
      "Please write something to describe your satisfaction about this auction :)",
    imageUrl:
      "https://www.shareicon.net/data/512x512/2016/10/25/847515_happy_512x512.png",
    imageAlt: "Custom image",
    input: "text"
  }).then(result => {
    const content = result.value;
    $.ajax({
      url: `/account/sendReviewByWinner?idProduct=${id}&point=1&content=${content}`,
      type: "GET"
    }).done(function(result) {
      Swal.fire({
        icon: "success",
        title: result,
        showConfirmButton: false,
        timer: 3500
      });
    });
  });
}

function dislikeByWinner(id) {
  Swal.fire({
    width: 450,
    title: "Hmmm... Sorry for this bad experience.",
    text:
      "Please write something to describe your discomfort about this auction :(",
    imageUrl: "http://getdrawings.com/vectors/sad-vector-1.png",
    imageAlt: "Custom image",
    input: "text"
  }).then(result => {
    const content = result.value;
    $.ajax({
      url: `/account/sendReviewByWinner?idProduct=${id}&point=0&content=${content}`,
      type: "GET"
    }).done(function(result) {
      Swal.fire({
        icon: "success",
        title: result,
        showConfirmButton: false,
        timer: 3500
      });
    });
  });
}

function likeBySeller(id) {
  Swal.fire({
    width: 450,
    title: "Sweet!!!",
    text:
      "Please write something to describe your satisfaction about this auction :)",
    imageUrl:
      "https://www.shareicon.net/data/512x512/2016/10/25/847515_happy_512x512.png",
    imageAlt: "Custom image",
    input: "text"
  }).then(result => {
    const content = result.value;
    $.ajax({
      url: `/account/sendReviewBySeller?idProduct=${id}&point=1&content=${content}`,
      type: "GET"
    }).done(function(result) {
      Swal.fire({
        icon: "success",
        title: result,
        showConfirmButton: false,
        timer: 3500
      });
    });
  });
}

function dislikeBySeller(id) {
  Swal.fire({
    width: 450,
    title: "Hmmm... Sorry for this bad experience.",
    text:
      "Please write something to describe your discomfort about this auction :(",
    imageUrl: "http://getdrawings.com/vectors/sad-vector-1.png",
    imageAlt: "Custom image",
    input: "text"
  }).then(result => {
    const content = result.value;
    $.ajax({
      url: `/account/sendReviewBySeller?idProduct=${id}&point=0&content=${content}`,
      type: "GET"
    }).done(function(result) {
      Swal.fire({
        icon: "success",
        title: result,
        showConfirmButton: false,
        timer: 3500
      });
    });
  });
}
