/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("I am here!")
  // Test / driver code(temporary).Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  //   const renderTweets = function(tweets) {
  //     // loops through tweets
  //     for (const property in tweets) {
  //       // calls createTweetElement for each tweet
  //       createTweetElement(tweets[property]);

  // }
  //     // takes return value and appends it to the tweets container
  //   }


  var locale = function(number, index, totalSec) {
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





  const createTweetElement = function() {


    const $articleDom = $(`<article class="article-tweet-container">
    <header class="article-tweet-header">
      <div class="article-name">
      <p> <img class="newton-avatar" src="${tweetData.user.avatars}"/>
      ${tweetData.user.name}
        </p>
      </div>
      <div class="article-username">
        <p>${tweetData.user.handle}</p>
      </div>
    </header>
    <div class="article-tweet-body">
      <p>${tweetData.content.text}</p>
    </div>
    <hr>
    <footer class="article-tweet-footer">
      <p>${timeago.format(tweetData.created_at)}</p>
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

  const $tweet = createTweetElement();



  // Test / driver code (temporary)
  console.log(tweetData.user.name); // to see what it looks like
  $('#article-tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});