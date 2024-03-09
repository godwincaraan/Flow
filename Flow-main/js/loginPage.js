var emailDetail = document.getElementById("username").value;

function login() {
    var emailDetail = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;

    if (emailDetail.trim() !== "") {
        if (passwordInput == "user123") {
            //sessionStorage to store username Information during the session
            sessionStorage.setItem("username", emailDetail);
            window.location.assign("index.html");
        } else {
            alert("Password does not match!");
        }
    } else {
        alert("Email does not match!");
    }
}

//event listener on enter

document.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("loginBtn").click();
    }
});