firebaseConfig = {
    apiKey: "AIzaSyA93YcqOxOMeHDcoCQslObQ1FtCmRNnufY",
    authDomain: "polling-f42f3.firebaseapp.com",
    projectId: "polling-f42f3",
    storageBucket: "polling-f42f3.appspot.com",
    messagingSenderId: "29956748026",
    appId: "1:29956748026:web:f0502c192a36adc5e44f43",
    measurementId: "G-C56MRZG7DG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// function login(event) {
//     event.preventDefault()

//     let email = document.getElementById("email").value
//     let password = document.getElementById("password").value

// }

function createPoll(event) {
    event.preventDefault()
    let question = document.getElementById('poll-question').value

    let voteCont = document.createElement("div")
    voteCont.className += " column border"

    let voteHead = document.createElement("h3")
    voteHead.innerText = question
    voteCont.appendChild(voteHead)

    let body = event.target.parentNode
    body.appendChild(voteCont)

    db.collection("polls").add({
            question: question
                // options: document.getElementById("vote-container")
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}