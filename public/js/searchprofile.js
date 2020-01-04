var urlCurrent = window.location.href;
if (urlCurrent.indexOf("/search") !== -1)
{
    $('html, body').animate({
        scrollTop: $('#nameproduct').offset().top
    }, 'slow');
}
