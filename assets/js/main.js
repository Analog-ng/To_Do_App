// variables
const tweetBtn = document.querySelector('.tweetBtn'),
      tweetInput = document.querySelector('.tweetInput'),
      tweetOutput = document.querySelector('.tweetOutput'),
      clearAllBtn = document.querySelector('#clear-all');

      





// Event listeners

loadEventListeners();

function loadEventListeners() {
    
    // tweet submission
    tweetBtn.addEventListener('click', createTweet);

    // remove tweet
    tweetOutput.addEventListener('click', removeTweet);

    // clear all tweet
    clearAllBtn.addEventListener('click', clearAll);

    // reading from local storage
    document.addEventListener('DOMContentLoaded', localStorageOnload);


};



// functions

function createTweet(e) {
    e.preventDefault();

    if(tweetInput.value.trim() === "") {
        return;
    }

    const tweet = tweetInput.value;

    // creations of list item
    const liCreation = document.createElement('li');
        liCreation.textContent = tweet;

    // creation of delete icon
    const deleteBtn = document.createElement('i');
        deleteBtn.classList = 'bi bi-trash remove';
        deleteBtn.id = 'remove-tweet';
        // deleteBtn.classList.add = '';
        

    // merge the tweet and button
    liCreation.appendChild(deleteBtn);
    

    // print the tweet onScreen
    tweetOutput.appendChild(liCreation);

    addTweetToLocalStorage(tweet); 

    this.reset(createTweet);
    
    
    

}

// clear singular tweets
function removeTweet(e) {

    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
    }

    // remove from storage 
    removeTweetFromLocalStorage(e.target.parentElement.textContent);
}

// clear all tweet
function clearAll() {
    
    while (tweetOutput.firstChild) {
        tweetOutput.removeChild(tweetOutput.firstChild);
    };


    clearAllFromLocalStorage();

}

// clear all from localStorage

function clearAllFromLocalStorage(){

    localStorage.clear();

}

// add tweets to local storage
function addTweetToLocalStorage(tweet){
    let tweets = getTweetFromLocalStorage();

    // pushing of tweet
    tweets.push(tweet);

    // conversion of pushed tweet from arr to str
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// get tweets from local storage
function getTweetFromLocalStorage(){
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');

    if (tweetsLS === null) {
        tweets = [];
    }else{
        tweets = JSON.parse(tweetsLS);
    }

    return tweets;
    

}

// load tweets from local storage
function localStorageOnload(){
    let tweets = getTweetFromLocalStorage();


    // looping thru local storage 
    tweets.forEach(function(tweet) {

        // creations of list item
    const liCreation = document.createElement('li');
    liCreation.textContent = tweet;

    // creation of delete icon
    const deleteBtn = document.createElement('i');
        deleteBtn.classList = 'bi bi-trash remove';
        deleteBtn.id = 'remove-tweet';
        // deleteBtn.classList.add = '';
        

    // merge the tweet and button
    liCreation.appendChild(deleteBtn);


    // print the tweet onScreen
    tweetOutput.appendChild(liCreation);
        
    });



}

function removeTweetFromLocalStorage(tweet) {
    let tweets = getTweetFromLocalStorage();

    // remove x from tweet
    const tweetDelete = tweet;

    // loop through the tweets to remove clicked ones
    tweets.forEach(function (tweetLS, index) {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    // save and update local storage
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
    
}



