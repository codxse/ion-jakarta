angular.module('ionJakarta.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Custom Vars and States
  $scope.menuTitle = 'Menu';
  $scope.topiks = [
    { name: 'Ekonomi', sref: 'app.menuEko' },
    { name: 'Keuangan Daerah', sref: 'app.menuKed' },
    { name: 'Tentang', sref: 'app.tentang' }
  ];

})

.controller('MenuEkoCtrl', ['$scope',
  function($scope) {
    $scope.menus = [
      {
        name: 'Iktisar Statistik',
        tag: 'Ketenaga Kerjaan',
        sref: 1
      },
      {
        name: 'UMP',
        tag: 'Ketenaga Kerjaan',
        sref: 2
      },
      {
        name: 'Pertumbuhan Ekonomi',
        tag: 'Perekonomian',
        sref: 3
      },
      {
        name: 'Inflasi Tahunan',
        tag: 'Perekonomian',
        sref: 4 },
      {
        name: 'Inflasi Bulanan',
        tag: 'Perekonomian',
        sref: 5
      },
      {
        name: 'Komponen Inflasi',
        tag: 'Perekonomian',
        sref: 6
      },
      {
        name: 'Pendapatan Perkapita',
        tag: 'Perekonomian',
        sref: 7
      },
      {
        name: 'Struktur Ekonomi',
        tag: 'Perekonomian',
        sref: 8
      }
    ];
  }
])

.controller('MenuKedCtrl', ['$scope',
  function($scope) {
    $scope.menus = [
      {
        name: 'APBD 2015',
        tag: 'APBD',
        sref: 9
      },
      {
        name: 'Nilai Ekspor-Impor',
        tag: 'Ekspor-Impor',
        sref: 10
      },
      {
        name: 'Volume dan Nilai Ekspor',
        tag: 'Ekspor-Impor',
        sref: 11
      },
      {
        name: 'Nilai Impor Menurut Golongan',
        tag: 'Ekspor-Impor',
        sref: 12
      },
      {
        name: 'Harga Pangan',
        tag: 'Komoditas',
        sref: 12
      },
      {
        name: 'Harga Grosir',
        tag: 'Komoditas',
        sref: 14
      }
    ];
  }
])

.controller('TentangCtrl', function($scope) {
  $scope.tentang =
    {
      title: 'Ion Jakarta',
      desc: 'Ion Jakarta adalah aplikasi yang menyajikan visualisasi data dari data terbuka Pemerintah Provinsi DKI Jakarta.'
    };
})

.controller('PageCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    $scope.ticker = {
      tag: $stateParams.tagTicker,
      name: $stateParams.nameTicker,
      sref: $stateParams.srefTicker
    };

    console.log($scope.ticker);
  }
]);
