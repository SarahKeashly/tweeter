/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#new-tweet-error-placement").hide();


  /////////////Post request/////////////

  //sets up event request on submit button, sets up error catch 
  //sends form data to the server
  //ajax request that posts data to "/tweets"
  //resets text in form
  //resets counter

  $("form").on("submit", function(event) {
    const tweettextBox = $("#tweet-text").val();
    event.preventDefault();


    if (tweettextBox == "") {

      $("#new-tweet-error-placement").slideDown().text("Please enter a tweet");
      return;

    } if (tweettextBox.length > 140) {
      $("#new-tweet-error-placement").slideDown().text("Please adjust your tweet length to less than 140 characters.");
      return;
    }

    let url = "/tweets";
    let serializeData = $(this).serialize();


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


        })

          .catch((error) => {
            console.log(`error: ${(error)}`)
          });


        $("#tweet-text").val("");

        $("#submit-tweet").find(".counter").val(140);
        loadtweets();

      })

  });


  ////////////// Get request///////////////////

  //makes a get requestes with ajax and sends a callback to renderTweets function so that it loops through the tweet information in json package 
  const loadtweets = function() {

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


  };
  loadtweets();


  //takes in a tweet and returns articleDOM variable with tweet information, user, and date of tweet

  const createTweetElement = function(tweet) {

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };


    const $articleDom = $(`<article class="article-tweet-container">
    <header class="article-tweet-header">
      <div class="article-name">
      <p> <img class="newton-avatar" src=" ${escape(tweet["user"]["avatars"])}"/>
      ${escape(tweet["user"]["name"])}
        </p>
      </div>
      <div class="article-username">
        <p>${escape(tweet["user"]["handle"])}</p>
      </div>
    </header>
    <div class="article-tweet-body">
      <p>${escape(tweet["content"]["text"])}</p>
    </div>
    <hr>
    <footer class="article-tweet-footer">
      <p>${timeago.format(escape(tweet["created_at"]))}</p>
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


  //loops through tweet, and for each tweet, takes return value and appends it to the tweets container

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const $tweetData = createTweetElement(tweet);

      $('#article-tweets-container').prepend($tweetData);
    }
  }


  //takes in time as a number for when tweet was created and returns when it was submitted

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