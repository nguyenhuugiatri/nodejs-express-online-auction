const formEditProfile = $("#formEditProfile");
formEditProfile.submit(function() {
  if (validate()) return true;
  else return false;
});

function validate() {
  const fullName = $("#fullName")
    .val()
    .trim();

  const email = $("#email")
    .val()
    .trim();
  const phone = $("#phone")
    .val()
    .trim();
//   const pass = $("#password")
//     .val()
//     .trim();
//   const newpass = $("#newPassword")
//     .val()
//     .trim();
//   const repass = $("#rePassword")
//     .val()
//     .trim();


  const msg = $("#msg");

  if (fullName == null || fullName == "") {
    msg.show();
    msg.html("Full name is required");
    return false;
  }

//   if (pass != "") {
//     ///////////////////////////////////////////////////////////////// nếu mật khẩu khác null thì mới validate new pass
//     ////////// if kiểm tra pass

//     if (newpass == null || newpass == "") {
//       msg.html("Input new password to change");
//       msg.show();
//       return false;
//     }
//     if (newpass.length < 8 || newpass.length > 16) {
//       msg.html("New Password must have 8 - 16 characters");
//       msg.show();
//       return false;
//     }
//     if (repass == null || repass == "") {
//       msg.html("Re-Password is required");
//       msg.show();
//       return false;
//     }

//     if (repass !== newpass) {
//       msg.html("Re-Password is not matched");
//       msg.show();
//       return false;
//     }
//   }

  if (email == null || email == "") {
    msg.html("Email is required");
    msg.show();
    return false;
  }
  if (phone == null || phone == "") {
    msg.html("Phone is required");
    msg.show();
    return false;
  }

  if (!validEmail(email)) {
    msg.html("Invalid email");
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
