(function() {
  'use strict';
  var closeButton;
  var flashClose = document.getElementsByClassName('flash js-close');

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

(function() {
  'use strict';

  var toggleElem = document.getElementsByClassName('js-navigate');
  var navigateClose = document.getElementsByClassName('navigation-close js-close');
  var navigation = document.getElementsByClassName('navigation')[0];

  var displayNavigation = function(e) {
    e.preventDefault();
    e.stopPropagation();
    // Still sucks because you can only use one navigation on a page
    navigation.className = navigation.className + ' ' + 'is-active';
  };

  var closeNavigation = function(e) {
    e.preventDefault();
    // This RegExp must use throughout the code base when doing class remove
    navigation.className = navigation.className.replace(
        new RegExp('(^|\\s+)' + 'is-active' + '(\\s+|$)'), ' '
    );
  };

  for (var i = 0; i < toggleElem.length; i++) {
    toggleElem[i].addEventListener('click', displayNavigation, false);
  }

  if (navigateClose.length) {
    navigateClose[0].addEventListener('click', closeNavigation, false);
  }
})();
