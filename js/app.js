// Variables
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');

let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // When user add a new tweet
    form.addEventListener('submit',addTweet);

    // When the document is ready
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        createHTML();
    });
}

// Functions
function addTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet)

    // Validation
    if(tweet === ''){
        showError('No has escrito ningún tweet :(');
        return; // Prevent more lines of code from running
    }
    // console.log('Agregando tweet'); Test

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Add to tweets array
    tweets = [...tweets, tweetObj];
    // console.log(tweets); Test

    createHTML();
    // Restart the form
    form.reset();

}

// Show message error
function showError(error) {
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    // Insert in the content
    const container = document.querySelector('#contenido');
    container.appendChild(messageError);

    // Clear the alert after 3 seconds
    setTimeout(()=>{
        messageError.remove();
    },3000);
}

// Show a list of tweets
function createHTML() {

    cleanHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            // Add delete button 
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerText = 'X';

            // Add delete function
            btnDelete.onclick = () =>{
                deleteTweet(tweet.id);
            }

            // Create HTML
            const li = document.createElement('li');

            // Add text
            li.innerHTML = tweet.tweet;

            // Assign the button
            li.appendChild(btnDelete);

            // Insert in HTML
            listTweets.appendChild(li);
        } )
    }
    syncStorage();
}

// Add current tweets to localStorage
function syncStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

// Delete tweet
function deleteTweet(id) {
    // console.log('Borrando...', id); Test
    tweets = tweets.filter( tweet => tweet.id !== id);
    // console.log(tweets); Test
    createHTML();
}

// Clean HTML
function cleanHTML(){
    while(listTweets.firstChild){
        listTweets.removeChild(listTweets.firstChild);
    }
}
