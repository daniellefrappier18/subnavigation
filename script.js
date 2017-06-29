$(document).ready(function() {
  //move nav element position according to window width
  moveNavigation();
  $(window).on("resize", function() {
    !window.requestAnimationFrame
      ? setTimeout(moveNavigation, 300)
      : window.requestAnimationFrame(moveNavigation);
  });

  //mobile version - open/close navigation
  $(".nav-trigger").on("click", function(event) {
    event.preventDefault();
    if ($("header").hasClass("nav-is-visible"))
      $(".moves-out").removeClass("moves-out");

    if ($("header").hasClass("nav-is-visible"))
      $(".moves-out").removeClass("moves-out");
    $("header").toggleClass("nav-is-visible");
    $(".main-nav").toggleClass("nav-is-visible");
    $(".main-content").toggleClass("nav-is-visible");
    toggleSearch("close");
  });

  //mobile version - go back to main navigation
  $(".go-back").on("click", function(event) {
    event.preventDefault();
    $(".main-nav").removeClass("moves-out");
    toggleSearch("close");
  });

  //open sub-navigation
  $(".subnav-trigger").on("click", function(event) {
    event.preventDefault();
    $(".main-nav").toggleClass("moves-out");
    toggleSearch("close");
  });

  function moveNavigation() {
    var navigation = $(".main-nav-wrapper");
    var screenSize = checkWindowWidth();
    if (screenSize) {
      //desktop screen - insert navigation inside header element
      navigation.detach();
      navigation.insertBefore(".nav-trigger");
    } else {
      //mobile screen - insert navigation after .main-content element
      navigation.detach();
      navigation.insertAfter(".main-content");
    }
  }

  function checkWindowWidth() {
    var mq = window
      .getComputedStyle(document.querySelector("header"), "::before")
      .getPropertyValue("content")
      .replace(/"/g, "")
      .replace(/'/g, "");
    return mq == "mobile" ? false : true;
  }

  //open search form
  $(".search-trigger").on("click", function(event) {
    event.preventDefault();
    toggleSearch();
    closeNav();
  });

  function toggleSearch(type) {
    if (type == "close") {
      //close serach
      $(".search").removeClass("is-visible");
      $(".search-trigger").removeClass("search-is-visible");
      $(".overlay").removeClass("search-is-visible");
    } else {
      //toggle search visibility
      $(".search").toggleClass("is-visible");
      $(".search-trigger").toggleClass("search-is-visible");
      $(".overlay").toggleClass("search-is-visible");
      if ($(window).width() > MqL && $(".search").hasClass("is-visible"))
        $(".search").find('input[type="search"]').focus();
      $(".search").hasClass("is-visible")
        ? $(".overlay").addClass("is-visible")
        : $(".overlay").removeClass("is-visible");
    }
  }
});
