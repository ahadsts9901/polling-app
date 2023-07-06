// var firebaseConfig = {
//     apiKey: "AIzaSyA93YcqOxOMeHDcoCQslObQ1FtCmRNnufY",
//     authDomain: "polling-f42f3.firebaseapp.com",
//     projectId: "polling-f42f3",
//     storageBucket: "polling-f42f3.appspot.com",
//     messagingSenderId: "29956748026",
//     appId: "1:29956748026:web:f0502c192a36adc5e44f43",
//     measurementId: "G-C56MRZG7DG"
// };

const firebaseConfig = {
    apiKey: "AIzaSyA93YcqOxOMeHDcoCQslObQ1FtCmRNnufY",
    authDomain: "polling-f42f3.firebaseapp.com",
    projectId: "polling-f42f3",
    storageBucket: "polling-f42f3.appspot.com",
    messagingSenderId: "29956748026",
    appId: "1:29956748026:web:f0502c192a36adc5e44f43",
    measurementId: "G-C56MRZG7DG",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

function signUp(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = "../polling-app/polling/index.html";
        })
        .catch((error) => {
            console.log(error);
        });
}