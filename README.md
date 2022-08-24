# Smarter App Banner

## About

Apple's Smart App Banner is great for promoting your iOS app in web browsers, but it only works in mobile Safari.

Smarter App Banner adds support for iOS Chrome and also desktop web browsers.


## Usage

### Requirements
1. [jQuery](http://www.jquery.com).

2. This plugin leverages the meta data found when implementing Apple's Smart App Banner, so you'll need to include this line in the head of any page you want the banner to appear:
`<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">`

For more info, see: [Promoting Apps with Smart App Banners](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)

### Adding it to your page
Include smarter_app_banner.js and smarter_app_banner.css on the pages you want the banner to appear.

### Options
You can optionally include the number of reviews your app has and choose to only show ratings and number of reviews for the current version (defaulted to show all). See comments in code.

There are also optional URL parameters that can be helpful for testing, like seeing the mobile banner on desktop machines, and clearing cookies after you've closed a banner.
