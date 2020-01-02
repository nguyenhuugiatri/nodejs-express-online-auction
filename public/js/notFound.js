const message = $("#message").val();
if (message === "non permission") {
  let timerInterval;
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "You have not permission",
    html: "Back to Home <b></b> milliseconds.",
    timer: 3500,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("b").textContent = Swal.getTimerLeft();
      }, 100);
    },
    onClose: () => {
      clearInterval(timerInterval);
    }
  }).then(result => {
    window.location.replace("/");
  });
}
