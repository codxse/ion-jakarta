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
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  // .state('app.main', {
  //   url: '/main',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/main.html',
  //       controller: 'MainCtrl'
  //     }
  //   }
  // })

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

  .state('app.data-1', {
    url: '/data-1',
    views: {
      'menuContent': {
        templateUrl: 'templates/ikhtisar-statistik.html',
        controller: 'IkhtisatStatistikCtrl'
      }
    }
  })

  .state('app.data-2', {
    url: '/data-2',
    views: {
      'menuContent': {
        templateUrl: 'templates/upah-minimum-provinsi.html',
        controller: 'UpahMinimumProvinsiCtrl'
      }
    }
  })

  .state('app.data-3', {
    url: '/data-3',
    views: {
      'menuContent': {
        templateUrl: 'templates/pertumbuhan-ekonomi.html',
        controller: 'PertumbuhanEkonomiCtrl'
      }
    }
  })

  .state('app.data-4', {
    url: '/data-4',
    views: {
      'menuContent': {
        templateUrl: 'templates/tingkat-inflasi.html',
        controller: 'TingkatInflasiCtrl'
      }
    }
  })

  .state('app.data-5', {
    url: '/data-5',
    views: {
      'menuContent': {
        templateUrl: 'templates/komponen-inflasi.html',
        controller: 'KomponenInflasiCtrl'
      }
    }
  })

  .state('app.data-6', {
    url: '/data-6',
    views: {
      'menuContent': {
        templateUrl: 'templates/ekspor-impor-jakarta.html',
        controller: 'EksporImporJakartaCtrl'
      }
    }
  })

  .state('app.data-7', {
    url: '/data-7',
    views: {
      'menuContent': {
        templateUrl: 'templates/volume-dan-nilai-ekspor.html',
        controller: 'VolumeDanNilaiEksporCtrl'
      }
    }
  })

  .state('app.data-8', {
    url: '/data-8',
    views: {
      'menuContent': {
        templateUrl: 'templates/nilai-impor-menurut-golongan.html',
        controller: 'NilaiImporMenurutGolonganCtrl'
      }
    }
  })

  .state('app.data-9', {
    url: '/data-9',
    views: {
      'menuContent': {
        templateUrl: 'templates/struktur-ekonomi.html',
        controller: 'StrukturEkonomiCtrl'
      }
    }
  })

  .state('app.data-10', {
    url: '/data-10',
    views: {
      'menuContent': {
        templateUrl: 'templates/harga-pangan.html',
        controller: 'HargaPanganCtrl'
      }
    }
  })

  .state('app.data-11', {
    url: '/data-11',
    views: {
      'menuContent': {
        templateUrl: 'templates/harga-grosir.html',
        controller: 'HargaGrosirCtrl'
      }
    }
  })

  .state('app.data-12', {
    url: '/data-12',
    views: {
      'menuContent': {
        templateUrl: 'templates/apbd-2015.html',
        controller: 'ApbdCtrl'
      }
    }
  })

  .state('app.data-13', {
    url: '/data-13',
    views: {
      'menuContent': {
        templateUrl: 'templates/pendapatan-perkapita.html',
        controller: 'PendapatanPerkapitaCtrl'
      }
    }
  })

  .state('app.pageChartLine', {
    url: '/example',
    views: {
      'menuContent': {
        templateUrl: 'templates/page-chart-line.html',
        controller: 'PageChartLineCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro');
});
