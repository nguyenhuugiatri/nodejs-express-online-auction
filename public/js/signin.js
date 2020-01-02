const message = $("#message").val();
if (message === "notfound") {
  Swal.fire({
    icon: "info",
    title: "Not Found",
    text: "Invalid username or password",
    footer: `<a href='/account/signup'>Do not have an account ?</a>`
  });
}

if (message === "fail") {
  Swal.fire({
    icon: "error",
    title: "Login fail",
    footer: `<a href='#'>Forgot password ?</a>`
  });
}
