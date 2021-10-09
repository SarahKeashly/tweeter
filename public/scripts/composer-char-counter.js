

$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready");


});

//to access variable #tweet-text to change the value of the counter

$("#tweet-text").on("input", function(event) {

  const val = $(this); //root parent
  const value = $(this).val(); //value of root parent
  const secondSibling = val.next();
  const secSibSecChildren = secondSibling.children(); //second sibling's second child
  const secSibSecChildkey = secSibSecChildren[1];


  //calculate count
  const count = 140 - value.length;

  if (count <= 0) {
    secSibSecChildren.addClass('red');
  } else if (count > 0) {
    secSibSecChildren.removeClass('red')
  }


  $(secSibSecChildkey).html(count);


});