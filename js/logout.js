
if(localStorage.getItem("name") === null){
    window.location.href="login.html";
}

document.querySelector('#logout').addEventListener('click',function () {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.removeItem("name");
        localStorage.removeItem("picture");
        localStorage.removeItem("userId");

        window.location.href="index.html";

    }).catch(function(error) {
        alert("Some error occured")
    });
})
