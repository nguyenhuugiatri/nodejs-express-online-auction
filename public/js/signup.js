const formSignUp = $("#formSignUp");
formSignUp.submit(function() {
  if (validate()) return true;
  else return false;
});

function validate() {
  const nameFirst = $("#firstName")
    .val()
    .trim();
  const nameLast = $("#lastName")
    .val()
    .trim();
  const userName = $("#username")
    .val()
    .trim();
  const email = $("#email")
    .val()
    .trim();
  const pass = $("#password")
    .val()
    .trim();
  const repass = $("#repassword")
    .val()
    .trim();
  const gender = $("#gender").val();

  const msg = $("#msg");

  if (nameFirst == null || nameFirst == "") {
    msg.show();
    msg.html("First name is required");
    return false;
  }
  if (nameLast == null || nameLast == "") {
    msg.html("Last name is required");
    msg.show();
    return false;
  }
  if (userName == null || userName == "") {
    msg.html("Username is required");
    msg.show();
    return false;
  }
  if (pass == null || pass == "") {
    msg.html("Password is required");
    msg.show();
    return false;
  }
  if (repass == null || repass == "") {
    msg.html("Password is not match");
    msg.show();
    return false;
  }
  if (email == null || email == "") {
    msg.html("Email is required");
    msg.show();
    return false;
  }
  if (gender == null || gender == "") {
    msg.html("Gender is required");
    msg.show();
    return false;
  }
  if (!validEmail(email)) {
    msg.html("Invalid email");
    msg.show();
    return false;
  }
  if (pass.length < 8 || pass.length > 16) {
    msg.html("Password must have 8 - 16 characters");
    msg.show();
    return false;
  }
  if (repass !== pass) {
    msg.html("Password is not match");
    msg.show();
    return false;
  }

  msg.html("");
  return true;
}

function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const message = $("#message").val();
if (message === "success") {
  Swal.fire({
    position: "mid-mid",
    icon: "success",
    title: "Sign up success",
    showConfirmButton: false,
    timer: 1500
  }).then(result => {
    window.location.replace("/account/signin");
  });
}

if (message === "account exist") {
  Swal.fire({
    icon: "info",
    title: "Account exist",
    text: "Your username or email have been used by others",
    footer: `<a href='#'>Forgot password ?</a>`
  });
}
