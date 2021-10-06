

$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready");


});


$("#tweet-text").on("input", function(event) {

  ///use this DOM tree to access variable #tweet-text- to change the value of the counter

  const val = $(this); //root parent
  const value = $(this).val(); //value of root parent
  const secondSibling = val.next();
  // console.log("this", val); //1st sibling
  // console.log("val.next", val.next()); //2nd sibling
  //2nd sibling's second child
  const secSibSecChildren = secondSibling.children(); //second sibling's second child
  // console.log("secSibChild", secSibSecChildren);

  const secSibSecChildkey = secSibSecChildren[1];

  //calculate count
  const count = 140 - value.length;

  if (count < 0) {
    secSibSecChildren.addClass('red');
  }

  $(secSibSecChildkey).html(count);






  // Set a condition like when textCount < 0 you want to addClass('red'). Then, go into your css file and add .red { color: red}

});