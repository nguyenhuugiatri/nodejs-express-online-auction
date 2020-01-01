const formSignUp=$('#formSignUp');
formSignUp.submit(function(){
    if (validate())
        return true;
      else
        return false;
});

function validate() {
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const nameFirst = $('#firstName').val().trim();
    const nameLast = $('#lastName').val().trim();
    const userName = $('#username').val().trim();
    const email = $('#email').val().trim();
    const pass = $('#password').val().trim();
    const repass = $('#repassword').val().trim();
    const gender = $('#gender').val();

    const msg = $('#msg')

    if (nameFirst == null || nameFirst == '') {
        msg.html('Tên không được để trống');
        return false;
    }
    if (nameLast == null || nameLast == '') {
        msg.html('Tên không được để trống');
        return false;
    }
    if (userName == null || userName == '') {
        msg.html('UserName không được để trống');
        return false;
    }
    if (pass == null || pass == '') {
        msg.html('Mật khẩu không được để trống');
        return false;
    }
    if (repass == null || repass == '') {
        msg.html('Vui lòng xác nhận lại mật khẩu');
        return false;
    }
    if (email == null || email == '') {
        msg.html('Email không được để trống');
        return false;
    }
    if (gender == null || gender == '') {
        msg.html('Vui lòng chọn giới tính');
        return false;
    }
    if (!validEmail(email)) {
        msg.html('Email không hợp lệ');
        return false;
    }
    if (pass.length < 8 || pass.length > 16) {
        msg.html('Mật khẩu phải có độ dài từ 8-16 ký tự');
        return false;
    }
    if (repass !== pass) {
        msg.html('Mật khẩu nhập lại không trùng khớp');
        return false;
    }

    
    msg.html('');
    return true;
}

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
