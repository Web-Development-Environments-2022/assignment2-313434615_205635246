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
            $('#useronlyname').html(username);//here
            menu_button_clicked(5);
        }
        else{
            $('#userpasscheck').show();
            $('#userpasscheck').html("Wrong user name or password");
        }
    });
/*****************add from here ******************/
    //RIGHT KEY
    $('#rightdisplay').html('right arrow');//here
    $("#rightkey").keyup(function () {
        validRightKey();
    });
    function validRightKey(){
        let val = $("#rightkey").val().toUpperCase();
        $('#rightdisplay').html(val);//here
        var i = val.charCodeAt(0);
        setKeyRight(i);
    }
    //LEFT KEY
    $('#leftdisplay').html('left arrow');//here
    $("#leftkey").keyup(function () {
        validLeftKey();
    });
    function validLeftKey(){
        let val = $("#leftkey").val().toUpperCase();
        $('#leftdisplay').html(val);//here
        var i = val.charCodeAt(0);
        setKeyLeft(i);
    }
    //UP KEY
    $('#updisplay').html('up arrow');//here
    $("#upkey").keyup(function () {
        validUpKey();
    });
    function validUpKey(){
        let val = $("#upkey").val().toUpperCase();
        $('#updisplay').html(val); //here
        var i = val.charCodeAt(0);
        setKeyUp(i);
    }
    //DOWN KEY
    $('#downdisplay').html('down arrow');//here
    $("#downkey").keyup(function () {
        validDownKey();
    });
    function validDownKey(){
        let val = $("#downkey").val().toUpperCase();
        $('#downdisplay').html(val); //here
        var i = val.charCodeAt(0);
        setKeyDown(i);
    }

    //NUMBER OF BALLS IN GAME
    $('#ballsdisplay').html('50');//here
    $('#ballsnumbercheck').hide();
    let ballerror = true;
    $("#ballsnumber").keyup(function () {
        validBallsNumber();
    });
    function validBallsNumber(){
        let num = $("#ballsnumber").val();
        if (num >= 50 && num <= 90){
            $('#ballsnumbercheck').hide();
            ballerror = false;
            $('#ballsdisplay').html(num);//here
            setBallsNumber(num);
            return true;
        }
        $('#ballsnumbercheck').show();
        $('#ballsnumbercheck').html("Insert number in range [50 - 90]");
        ballerror = true;
        return false;
    }
    //BALLS COLORS          need to complete.//////////////
    $('#color1display').html('red (problem)');//here
    $("#ball60").keyup(function () {
        color1func();
    });
    function color1func(){
        let color = $("#ball60").val().toString(16);
        $('#color1display').html(color);//here////////////
        setBall60(color);
        return true;
    }

    $('#color2display').html('green (problem)');//here//////////
    $("#ball30").keyup(function () {
        color2func();
    });
    function color2func(){
        let color = $("#ball30").val().toString(16);
        $('#color2display').html(color);//here
        setBall30(color);
        return true; 
    }
    $('#color3display').html('blue (problem)');//here
    $("#ball10").keyup(function () {
        color3func();
    });
    function color3func(){
        let color = $("#ball10").val();
        $('#color3display').html(color);//here
        setBall10(color);
        return true;
    }

    //GAME TIMER
    $('#timeofgame').html('60');//here
    $('#timercheck').hide();    
    let timererror = true;
    $("#gametimer").keyup(function () {
        validTimer();
    });
    function validTimer(){
        let time = $("#gametimer").val();
        if (time >= 60 && time <= 600){
            $('#timeofgame').html(time);//here
            $('#timercheck').hide();   
            timererror = false;
            setTimeGame(time);
            return true;
        }
        $('#timercheck').show();
        $('#timercheck').html("Insert number (seconds) in range [60 - 600]");
        timererror = true;
        return false;
    }

    //MONSTERS
    $('#monsterslbl').html('1');//here
    $('#monstercheck').hide(); 
    let mosterserror = true;
    $("#monsters").keyup(function () {
        validMonsters();
    });
    function validMonsters(){
        let num = $("#monsters").val();
        if (num >= 1 && num <= 4){
            $('#monsterslbl').html(num);//here
            $('#monstercheck').hide();
            mosterserror = false;
            setMonsters(num);
            return true;
    }
        $('#monstercheck').show();
        $('#monstercheck').html("Insert number in range [1 - 4]");
        mosterserror = true;
        return false;
    }

    // random settings button
    $('#randomvaluesbtn').click(function (){
        setRandomSettingValues();
    });

    function setRandomSettingValues(){
        let x = Math.floor(Math.random() * 41) + 50;
        setBallsNumber(x);
        $("#ballsnumber").val(x);
        validBallsNumber();
        let t = Math.floor(Math.random() * 541) + 60;
        setTimeGame(t);
        $("#gametimer").val(t);
        validTimer();
        let m = Math.floor(Math.random() * 4) + 1;
        setMonsters(m);
        $("#monsters").val(m);
        validMonsters();
        let c = Math.floor(Math.random()*16777215).toString(16);
        $("#ball60").val('#'+c);
        color1func();
        c = Math.floor(Math.random()*16777215).toString(16);
        $("#ball30").val('#'+c);
        color2func();
        c = Math.floor(Math.random()*16777215).toString(16);
        $("#ball10").val('#'+c);
        color3func();
    }
    // settings button
    $('#startgamebtn').click(function (){
        if ( validBallsNumber() && color1func() && color2func() && color3func() && validTimer() && validMonsters()){
            menu_button_clicked(4);
        }
    });

});