/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("I am here!")




  /////////////Post request/////////////
  //on submit - prevents event from going to another page
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("Serialize", $(this).serialize());

    //sends form data to the server
    let url = "/tweets";
    let serializeData = $(this).serialize();

    //ajax request that posts data to "/tweets"
    $.ajax({
      url: url,
      type: "POST",
      data: serializeData

    })
      .then((result) => {
        console.log(`result: ${result}`)
        renderTweets(result.data);
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`)
      });
  });




  ////////////// Get request///////////////////

  /// kick off ajax in background, hit the url and make request to server.  once we get data back, we are going to pass to our 
  const loadtweets = function() {

    // const $button = $('tweet-text');
    // $button.on('submit', function() {
    //   console.log('Button clicked, performing ajax call...')

    //make a request to "/tweets" and receive the array of tweets as JSON
    let url = "/tweets";
    // success = renderTweets();


    $.ajax({
      dataType: "json",
      url: url,
      type: "GET",
      // success: success

    })
      .then((resultTweets) => {
        console.log("result", resultTweets)
        renderTweets(resultTweets);

      })
      .catch((error) => {
        console.log(`error: ${(error)}`)
      });

    // });

  };
  loadtweets();


  const createTweetElement = function(tweet) {


    const $articleDom = $(`<article class="article-tweet-container">
    <header class="article-tweet-header">
      <div class="article-name">
      <p> <img class="newton-avatar" src=" ${tweet["user"]["avatars"]}"/>
      ${tweet["user"]["name"]}
        </p>
      </div>
      <div class="article-username">
        <p>${tweet["user"]["handle"]}</p>
      </div>
    </header>
    <div class="article-tweet-body">
      <p>${tweet["content"]["text"]}</p>
    </div>
    <hr>
    <footer class="article-tweet-footer">
      <p>${timeago.format(tweet["created_at"])}</p>
      <div class="article-small-images">
        <div class="flag"><i class="fas fa-flag"></i></div>
        <div class="retweet"><i class="fas fa-retweet"></i></div>
        <div class="heart"><i class="fas fa-heart"></i></div>
      </div>
      </div>
    </footer>
        </article>`)

    return $articleDom;
  };


  //loop through tweet, and for each tweet, I am going to run create tweet element
  const renderTweets = function(tweets) {
    // loops through tweets

    for (const tweet of tweets) {
      const $tweetData = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $('#article-tweets-container').append($tweetData);
    }
  }


  let locale = function(number, index, totalSec) {
    // number: the time ago / time in number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['just now', 'right now'],
      ['%s seconds ago', 'in %s seconds'],
      ['1 minute ago', 'in 1 minute'],
      ['%s minutes ago', 'in %s minutes'],
      ['1 hour ago', 'in 1 hour'],
      ['%s hours ago', 'in %s hours'],
      ['1 day ago', 'in 1 day'],
      ['%s days ago', 'in %s days'],
      ['1 week ago', 'in 1 week'],
      ['%s weeks ago', 'in %s weeks'],
      ['1 month ago', 'in 1 month'],
      ['%s months ago', 'in %s months'],
      ['1 year ago', 'in 1 year'],
      ['%s years ago', 'in %s years']
    ][index];
  };
  timeago.register('pt_BR', locale);


  // then you can use it
  // timeago.format(1473245023718, 'pt_BR');


  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },




  // const $tweet = createTweetElement();
  // const $tweet = renderTweets(data);
  // const $tweet = loadtweets(dat);
  // Test / driver code (temporary)
  // console.log("tweet", $tweet); // to see what it looks like
  // $('#article-tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});