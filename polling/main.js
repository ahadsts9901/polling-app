const firebaseConfig = {
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

function createPoll(event) {
    event.preventDefault();

    let voteContainer = document.getElementById('vote-container');
    voteContainer.style.display = "block";

    let question = document.getElementById('poll-question').value;

    let optionContainer = document.getElementById('option-container');
    let optionInputs = optionContainer.getElementsByTagName('input');
    let options = [];

    for (let i = 0; i < optionInputs.length; i++) {
        let optionValue = optionInputs[i].value.trim();
        if (optionValue !== '') {
            options.push({
                text: optionValue,
                votes: 0
            });
        }
    }

    // Get the current timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("polls").add({
            question: question,
            options: options,
            timestamp: timestamp
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            renderPolls();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    // Clear the form inputs after creating the poll
    document.getElementById('poll-question').value = '';
    for (let i = 0; i < optionInputs.length; i++) {
        optionInputs[i].value = '';
    }
}

function renderPolls() {
    let container = document.getElementById('vote-container');
    container.innerHTML = ""; // Clear the container before rendering new polls

    db.collection("polls")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                container.innerText = "No Polls Found";
            } else {
                querySnapshot.forEach(function(doc) {
                    var data = doc.data();
                    let voteCont = document.createElement("div");
                    voteCont.className = "column border";
                    voteCont.dataset.pollId = doc.id; // Set the poll ID in the dataset

                    let voteHead = document.createElement("h3");
                    voteHead.innerText = data.question;
                    voteCont.appendChild(voteHead);

                    let optCont = document.createElement('div');
                    optCont.className = "column opt-cont";

                    if (data.options && data.options.length > 0) {
                        let totalVotes = 0;

                        // Calculate the total number of votes
                        data.options.forEach(function(option) {
                            totalVotes += option.votes;
                        });

                        data.options.forEach(function(option, index) {
                            let optionElement = document.createElement('div');
                            optionElement.className += " row"
                            let percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                            optionElement.innerHTML = `${option.text} (${percentage.toFixed(2)}%)`;
                            optionElement.style.width = `${ percentage.toFixed(2)}%`
                            if (optionElement.style.width !== '0%') {
                                optionElement.style.width = `${ percentage.toFixed(2)}%`
                                optionElement.style.background = " red"
                            } else {
                                optionElement.style.background = " white"
                            }
                            optionElement.style.padding = "0.5em"
                            optionElement.style.wordSpacing = "0.5em"
                            optionElement.dataset.index = index; // Set custom data attribute for referencing the option
                            optionElement.addEventListener('click', voteOnOption);
                            optCont.appendChild(optionElement);
                        });
                    } else {
                        let noOptions = document.createElement('p');
                        noOptions.innerText = "No options available";
                        optCont.appendChild(noOptions);
                    }

                    voteCont.appendChild(optCont);

                    container.appendChild(voteCont);
                });
            }
        })
        .catch((error) => {
            console.error("Error getting polls: ", error);
        });
}

function voteOnOption(event) {
    let optionIndex = event.target.dataset.index;
    let pollId = event.target.closest('.border').dataset.pollId;

    // Check if the user has already voted using a browser cookie
    //if (hasVoted()) {
    //console.log("You have already voted.");
    //return;
    //}

    // Increment the vote count for the selected option
    db.collection("polls").doc(pollId).get().then((doc) => {
        if (doc.exists) {
            let pollData = doc.data();
            let options = pollData.options;
            options[optionIndex].votes++;
            return db.collection("polls").doc(pollId).update({
                options: options
            });
        }
    }).then(() => {
        console.log("Vote recorded");
        // Set a browser cookie to track that the user has voted
        setVotedCookie();
        renderPolls();
    }).catch((error) => {
        console.error("Error voting on option: ", error);
    });
}

function addOption() {
    let optionContainer = document.getElementById('option-container');
    let optionCount = optionContainer.childElementCount;

    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Option ' + (optionCount + 1);
    input.required = true;

    optionContainer.appendChild(input);
}

// Check if the user has already voted by checking a browser cookie
function hasVoted() {
    return document.cookie.includes("voted=true");
}

// Set a browser cookie to track that the user has voted
function setVotedCookie() {
    document.cookie = "voted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

document.addEventListener("DOMContentLoaded", function() {
    renderPolls();
});

// logout function

function logOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Sign out successful');
            // Redirect to the sign-in page or any other desired destination
            window.location.href = "../sign_in/index.html";
        })
        .catch((error) => {
            console.log('Sign out error:', error);
        });
}