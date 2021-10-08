/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("I am here!")

  // The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
  // The form should not be cleared
  // The form should not submit
  // if (document.getElementsByClassName("counter").length <= 0) {
  //   alert("empty")
  // }


  /////////////Post request/////////////
  //on submit - prevents event from going to another page
  $("form").on("submit", function(event) {
    const tweettextBox = $("#tweet-text").val();

    if (tweettextBox == "") {
      alert("Add a Tweet!");
      return false;
    } else if (tweettextBox.length > 140) {
      alert("Tweet too long");
      return false;
    }

    event.preventDefault();

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
        $.ajax({
          dataType: "json",
          url: url,
          type: "GET",


        }) //added in renderTweets function to fix jquery error 
          //did length -1 to get the last item in array of object to show up
          .then((resultTweets) => {
            console.log("result", resultTweets)
            renderTweets([resultTweets[resultTweets.length - 1]]);

          })
          .catch((error) => {
            console.log(`error: ${(error)}`)
          });

      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`)
      });
  });




  ////////////// Get request///////////////////

  /// kick off ajax in background, hit the url and make request to server.  once we get data back, we are going to pass to our 
  const loadtweets = function() {


    //make a request to "/tweets" and receive the array of tweets as JSON
    let url = "/tweets";



    $.ajax({
      dataType: "json",
      url: url,
      type: "GET",


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
      $('#article-tweets-container').prepend($tweetData);
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



});