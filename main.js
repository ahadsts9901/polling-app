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
    event.preventDefault();

    let voteContainer = document.getElementById('vote-container');
    voteContainer.style.display = "block";

    let question = document.getElementById('poll-question').value;
    let options = document.querySelector(".opt-cont")

    // Get the current timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("polls").add({
        question: question,
        options: options.innerHTML,
        timestamp: timestamp  // Add the timestamp field to the document
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // console.log(document.getElementById("vote-container"));
            renderPolls();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function renderPolls() {
    // event.preventDefault(); 
    let container = document.getElementById('vote-container')
    db.collection("polls")
        .orderBy("timestamp", "desc")  // Sort by timestamp in descending order
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                container.innerText = "No Polls Found"
            } else {
                container.innerText = ""
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    let body = document.getElementById("vote-container")

                    let voteCont = document.createElement("div")
                    voteCont.className += " column border"

                    let voteHead = document.createElement("h3")
                    voteHead.innerText = data.question
                    voteCont.appendChild(voteHead)

                    let optCont = document.createElement('div')
                    optCont.className += " column opt-cont"
                    optCont.innerHTML = data.options
                    voteCont.appendChild(optCont)

                    body.appendChild(voteCont)
                })
            }
        })
        .catch((error) => {
            console.error("Error getting polls: ", error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    renderPolls();
    console.log("yes")
});