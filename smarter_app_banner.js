// The MIT License (MIT) - Copyright (c) 2013 Dan Hsiao/Soldsie

(function() {
  var iPad = navigator.userAgent.match(/iPad/i) != null;
  var iPhone = navigator.userAgent.match(/iPhone/i) != null;
  var iOS_chrome = navigator.userAgent.match('CriOS') == 'CriOS';
  var safari = navigator.userAgent.match(/Safari/i) != null;
  var htmlMarginTop = parseInt($('html').css('margin-top'));

  var appID = $('meta[name=apple-itunes-app]').attr("content"); //Check if using smart app banners
  paramHandler();

  // Event Listeners
  $('body').on('click', '#smart-banner a.close', function() {
    closeSmartBanner(htmlMarginTop);
  });
  $('body').on('click', '#desktop-banner a.close', closeDesktopBanner);

  if (appID != null) {
    appID = appID.split(',')[0]
    appID = appID.replace('app-id=','').split(',')[0]
    $.getJSON('https://itunes.apple.com/lookup?id=' + appID + '&callback=?', function(json) {
      if (json != null) {
        var results = json.results[0];
        var appIcon = results.artworkUrl100;
        var appIconLarge = results.artworkUrl512;
        var appName = results.trackCensoredName;
        var developedBy = results.artistName;
        var appURL = results.artistViewUrl;
        var webURL = results.trackViewUrl;

        var stars = results.averageUserRating;
        var reviewCount = results.userRatingCount;
        // For current version stars and review count, use these:
        // var stars = results.averageUserRatingForCurrentVersion;
        // var ratingCount = results.userRatingCountForCurrentVersion;

        var price = results.formattedPrice;
        var showReviewCount = '';
        if (false) { // make true if you want to show review count
          showReviewCount = ' <div class="review-count">(' + reviewCount + ')</div>'
        }

        if (window.devicePixelRatio == 2) appIcon = appIconLarge;

        // if (true) { // for non-mobile debugging
        if ((iPad || iPhone) && (iOS_chrome || !safari) && (readCookie('smart_banner_closed') == null)) {
          var smartBanner = ' \
            <div id="smart-banner"> \
              <a href="javascript:void(0)" class="close"></a> \
              <img src="' + appIcon + '" alt="" class="app-icon" /> \
              <a href="' + appURL + '" class="banner-action">View</a> \
              <div class="info-table"> \
                <div class="info-cell"> \
                  <div class="app-name">' + appName + '</div> \
                  <div class="artist-name">' + developedBy + '</div> \
                  <div class="rating stars' + (stars*10) + '"></div>'
                  + showReviewCount +
                  '<div class="price"><span class="price-value">' + price + '</span> &mdash; On the App Store</div> \
                </div> \
              </div> \
            </div>';

          $('html').css('marginTop','84px');
          $('body').prepend(smartBanner);

        } else if (!(iPad || iPhone) && (readCookie('desktop_banner_closed') == null)) {
          var desktopBanner = ' \
            <div id="desktop-banner"> \
              <a href="javascript:void(0)" class="close">&times;</a> \
              <div class="text"> \
                <div class="prompt">Have an iPhone or iPad? </div> \
                <a href="' + webURL + '" class="get-app" target="_blank">Get the Soldsie app!</a> \
              </div> \
              <a href="' + webURL + '" class="get-app app-badge" target="_blank"></a> \
            </div>';

          $('body').append(desktopBanner);
        }
      }
    })
  }


  // for debugging and testing
  function paramHandler() {
    if (getURLParameter('device') == 'ipad') {
      iPad = true;
      safari = false;
    }
    if (getURLParameter('device') == 'iphone') {
      iPhone = true;
      safari = false;
    }
    if (getURLParameter('cookies') == 'clear') {
      clearCookie('smart_banner_closed');
      clearCookie('desktop_banner_closed');
    }
    if (getURLParameter('debug') == 'on') {
      var standalone = navigator.standalone;
      var device;
      if (iPad) device = 'iPad'
      if (iPhone) device = 'iPhone'

      isChrome = function() { return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); }
      $('body').prepend(' \
        <div id="debug-info" \
          <tt> \
            device: ' + device + '\
            <br/>standalone: ' + standalone + ' \
            <br/>' + 'safari: ' + safari + ' \
            <br/>' + 'ios chrome: ' + iOS_chrome + ' \
            <br/>' + 'chrome: ' + isChrome() + ' \
            <br/>' + 'mobile cookie: ' + readCookie('smart_banner_closed') + ' \
            <br/>' + 'desktop cookie: ' + readCookie('desktop_banner_closed') + ' \
          </tt> \
        </div>');
      if (!(iPad || iPhone)) $('#debug-info').addClass('desktop-banner');
    }
  }

  function closeSmartBanner(htmlMarginTop) {
    $('#smart-banner').css('margin-top', '-84px');
    $('html').css('margin-top', htmlMarginTop);
    createCookie('smart_banner_closed','closed',30);
  }

  function closeDesktopBanner() {
    $('#desktop-banner').hide();
    createCookie('desktop_banner_closed','closed',60);
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  }

  /* Cookie code */
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function clearCookie(name) {
    createCookie(name,"",-1);
  }

})();
