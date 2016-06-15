angular.module('ionJakarta', [
  'ionic',
  'nvd3',
  'ionJakarta.controllers',
  'ionJakarta.services',
  'ionJakarta.filters',
  'ionJakarta.directives',
  'angular.filter'
])

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

  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })

  .state('app.menuMakro', {
    url: '/menu-makro',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu-makro.html',
        controller: 'MenuMakroCtrl'
      }
    }
  })

  .state('app.menuMikro', {
    url: '/menu-mikro',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu-mikro.html',
        controller: 'MenuMikroCtrl'
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

  .state('app.pageChartLine', {
    url: '/:tagTicker/:nameTicker/:srefTicker/:chartTicker',
    views: {
      'menuContent': {
        templateUrl: 'templates/page-chart-line.html',
        controller: 'PageChartLineCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
