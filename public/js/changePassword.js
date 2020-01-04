const formChangePassword = $("#formChangePassword");
formChangePassword.submit(function() {
  if (validate()) return true;
  else return false;
});

function validate() {
  const newPassword = $("#newPassword")
    .val()
    .trim();
  const rePassword = $("#rePassword")
    .val()
    .trim();

  const msg = $("#msg");

  if (newPassword.length < 8 || newPassword.length > 16) {
    msg.html("New password must have 8 - 16 characters");
    msg.show();
    return false;
  }

  if (rePassword != newPassword) {
    msg.html("Re-password do not match");
    msg.show();
    return false;
  }

  msg.html("");
  return true;
}

const messages = $("#hiddenMessage").val();
console.log(messages);
if (messages === "wrong password") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Your current password is wrong"
  });
}