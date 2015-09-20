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
