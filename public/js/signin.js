$(document).ready(function() {
  const err_message = $("#err_message").val();
  if (err_message) {
    console.log(err_message);
    var err_obj = JSON.parse(err_message);
    Swal.fire(err_obj);
  }
});
