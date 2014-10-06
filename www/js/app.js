// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'monospaced.qrcode'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://test.bitpay.com/**'
  ]);
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'TabsCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.store', {
      url: '/store',
      views: {
        'tab-store': {
          templateUrl: 'templates/tab-store.html',
          controller: 'StoreCtrl'
        }
      }
    })
    .state('tab.store-detail', {
      url: '/store/:productId',
      views: {
        'tab-store': {
          templateUrl: 'templates/store-detail.html',
          controller: 'StoreDetailCtrl'
        }
      }
    })

    .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('tab.cart-checkout', {
      url: '/cart/checkout/:invoiceId',
      views: {
        'tab-cart': {
          templateUrl: 'templates/cart-checkout.html',
          controller: 'CheckoutCtrl'
        }
      }
    })
    .state('tab.cart-web', {
      url: '/cart/webcheckout/:invoiceId',
      views: {
        'tab-cart': {
          templateUrl: 'templates/cart-web.html',
          controller: 'WebCheckoutCtrl'
        }
      }
    })

    .state('tab.invoice', {
      url: '/invoice',
      views: {
        'tab-invoice': {
          templateUrl: 'templates/tab-invoice.html',
          controller: 'InvoiceCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/store');

});

