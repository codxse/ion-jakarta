angular.module('ionJakarta', ['ionic', 'ionJakarta.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/topik.html',
    controller: 'AppCtrl'
  })

  .state('app.menuEko', {
    url: '/menu-eko',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu-eko.html',
        controller: 'MenuEkoCtrl'
      }
    }
  })

  .state('app.menuKed', {
    url: '/menu-ked',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu-ked.html',
        controller: 'MenuKedCtrl'
      }
    }
  })

  .state('app.tentang', {
    url: '/tentang',
    views: {
      'menuContent': {
        templateUrl: 'templates/tentang.html',
        controller: 'TentangCtrl'
      }
    }
  })

  .state('app.page', {
    url: '/:pageTicker',
    views: {
      'menuContent': {
        templateUrl: 'templates/page.html',
        controller: 'PageCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tentang');
});
