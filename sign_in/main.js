const firebaseConfig = {
    apiKey: "AIzaSyA93YcqOxOMeHDcoCQslObQ1FtCmRNnufY",
    authDomain: "polling-f42f3.firebaseapp.com",
    projectId: "polling-f42f3",
    storageBucket: "polling-f42f3.appspot.com",
    messagingSenderId: "29956748026",
    appId: "1:29956748026:web:f0502c192a36adc5e44f43",
    measurementId: "G-C56MRZG7DG",
};

firebase.initializeApp(firebaseConfig);

function logIn(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful");
            window.location.href = "../polling/index.html";
        })
        .catch((error) => {
            console.log("Login error:", error);
            alert("Invalid email or password. Please enter correct credentials.");
        });
}