alert('Currently, all the logging options are not working due to some disturbance, Request you to SignIn with Google SignIn or facebook SignIn.');
document.querySelector('#google').addEventListener('click',function () {

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (data) {
        window.localStorage.setItem("name",data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture",data.additionalUserInfo.profile.picture);
        window.localStorage.setItem("userId",firebase.auth().currentUser.uid);

        window.location.href='expenses.html';
    });


})


document.querySelector('#facebook').addEventListener('click',function () {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (data){
        console.log(data)
        window.localStorage.setItem("name",data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture",data.additionalUserInfo.profile.picture.data.url);
        window.localStorage.setItem("userId",firebase.auth().currentUser.uid);

        window.location.href='expenses.html';
    });

    })
