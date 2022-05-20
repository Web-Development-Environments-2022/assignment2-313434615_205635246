// Document is ready

$(document).ready(function () { 
    // Validate Username
    $('#usercheck').hide();    
    let usernameError = true;
    $('#usernames').keyup(function () {
        validateUsername();
    });
    function validateUsername() {
        let usernameValue = $('#usernames').val();
        if (usernameValue.length == 0) {
            $('#usercheck').show();
            $('#usercheck').html("User name must be filled");
            usernameError = true;
            return false;
        } 
        else {
            usernameError = false;
            $('#usercheck').hide();
            return true;
        }
    }

    // Validate Password
    $('#passcheck').hide();
    let passwordError = true;
    $('#password').keyup(function () {
        validatePassword();
    });
    function validatePassword() {
        let passwordValue = $('#password').val();
        if ((passwordValue.length >= 6)){
            let regex1 = /\d/;
            let regex2 =/[a-zA-Z]/;
            if(regex1.test(passwordValue) && regex2.test(passwordValue)){
                $('#passcheck').hide();
                passwordError = false;
                return true;
            }
        }
        $('#passcheck').html("Invalid password");
        $('#passcheck').show();
        passwordError = true;
        return false;
    }

    // Validate Fullname
    $('#fullnamecheck').hide();    
    let fullnameError = true;
    $('#fullnames').keyup(function () {
        validateFullname();
    });
    function validateFullname() {
        let fullnameValue = $('#fullnames').val();
        if (fullnameValue.length == 0) {
            $('#fullnamecheck').show();
            $('#fullnamecheck').html("Name must be filled");
            fullnameError = true;
            return false;
        }
        let regex =/\d/;//////
        if(regex.test(fullnameValue)){
            $('#fullnamecheck').show();
            $('#fullnamecheck').html("Name without numbers!");
            fullnameError = true;
            return false;
        }
        $('#fullnamecheck').hide();
        fullnameError = false;
        return true;
    }

    // Validate Email
    $('#emailcheck').hide();
    let emailError = true;
    $('#email').keyup(function () {
        validateEmail1();
    });
    function validateEmail1() {
        let emailValue = $('#email').val();
            let regex =/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
            if(regex.test(emailValue)){
                $('#emailcheck').hide();
                emailError = false;
                return true;
            }
        $('#emailcheck').html("Invalid email");
        $('#emailcheck').show();
        emailError = true;
        return false;
    }

    // Validate Date
    $('#datecheck').hide();
    let dateError = true;
    $('#date').keyup(function () {           
        validateDate();
    });
    
    function validateDate() {
        return true;
            let dateValue = $('#date').val();
            let dateValue1 = $('#date').val();

            //var d = $('#date').datepicker('getDate');
            //var d1 = $('#date').datepicker('getDate');
            if  (dateValue.getDate() === dateValue1.getDate()){
                $('#datecheck').hide();
                dateError = false;
                return true;
            } else {
                $('#datecheck').html("Invalid date");
                $('#datecheck').show();
                dateError = true;
                return false;
            }


            //let regex =/^\d+$/;
            let regex2 = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;
            if(/*regex.test(dateValue) && */regex2.test(dateValue)){
                $('#datecheck').hide();
                dateError = false;
                return true;
            }
            else{
                $('#datecheck').html("Invalid date");
                $('#datecheck').show();
                dateError = true;
                return false;
            }
        }
          
        var user_dict = {
            "k": "k",
            "a": "a",
            "b": "b"
          };

    // Submit button
        $('#submitbtn').click(function () {
            if (validateUsername() && validatePassword()  && validateEmail1() && validateFullname() && validateDate()){
                let passwordValue = $('#password').val();
                let usernameValue = $('#usernames').val();
                user_dict[usernameValue] = passwordValue;
                menu_button_clicked(2);
            }
        });
      
    // Login button
        $('#loginbtn').click(function () {
            let username = $('#loginuser').val();
            let password = $('#loginpassword').val();

            if (user_dict[username]==password){
                $('#userpasscheck').hide();
                $('#loginuser').val("");
                $('#loginpassword').val("");
                $('#userpasscheck').val("");
                menu_button_clicked(4);
            }
            else{
                $('#userpasscheck').show();
                $('#userpasscheck').html("Wrong user name or password");
            }
        });

    });