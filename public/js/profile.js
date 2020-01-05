var urlCurrent = window.location.href;
if (urlCurrent.indexOf("/search") !== -1)
{
    $('html, body').animate({
        scrollTop: $('#nameproduct').offset().top
    }, 'slow');
}


function likeByWinner(id){
    $.ajax({
        url: "/account/sendReviewByWinner?idProduct="+id+"&point=1&content=Good Seller",
        type: "GET"
    }).done(function(result){
        console.log(result);
    })
}

function dislikeByWinner(id){
    $.ajax({
        url: "/account/sendReviewByWinner?idProduct="+id+"&point=0&content=Bad Seller",
        type: "GET"
    }).done(function(result){
        console.log(result);
    })
}

function likeBySeller(id){
    $.ajax({
        url: "/account/sendReviewBySeller?idProduct="+id+"&point=1&content=Winner Paid",
        type: "GET"
    }).done(function(result){
        console.log(result);
    })
}

function dislikeBySeller(id){
    $.ajax({
        url: "/account/sendReviewBySeller?idProduct="+id+"&point=0&content=Winner Rann",
        type: "GET"
    }).done(function(result){
        console.log(result);
    })
}