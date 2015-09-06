(function() {
  'use strict';
  var closeButton;
  var flashClose = document.getElementsByClassName('js-flashClose');

  var closeFlash = function(event) {
    this.removeEventListener('click', closeFlash);
    // Removing flash
    this.parentElement.remove();
  };

  for (var i = 0; i < flashClose.length; i++) {
    closeButton = flashClose[i].getElementsByClassName('flash-close');
    if (closeButton.length) {
      // 0 - only the first `x` button will have the click event
      closeButton[0].addEventListener('click', closeFlash, false);
    }
  }
})();
