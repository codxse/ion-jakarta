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
        sref: 1,
        name: 'Iktisar Statistik',
        tag: 'Ketenaga Kerjaan',
        chart: ''
      },
      {
        sref: 2,
        name: 'UMP',
        tag: 'Ketenaga Kerjaan',
        chart: ''
      },
      {
        sref: 3,
        name: 'Pertumbuhan Ekonomi',
        tag: 'Perekonomian',
        chart: ''
      },
      {
        sref: 4,
        name: 'Inflasi Tahunan',
        tag: 'Perekonomian',
        chart: ''
      },
      {
        sref: 5,
        name: 'Inflasi Bulanan',
        tag: 'Perekonomian',
        chart: ''
      },
      {
        sref: 6,
        name: 'Komponen Inflasi',
        tag: 'Perekonomian',
        chart: ''
      },
      {
        sref: 7,
        name: 'Pendapatan Perkapita',
        tag: 'Perekonomian',
        chart: ''
      },
      {
        sref: 8,
        name: 'Struktur Ekonomi',
        tag: 'Perekonomian',
        chart: ''
      }
    ];
  }
])

.controller('MenuKedCtrl', ['$scope',
  function($scope) {
    $scope.menus = [
      {
        sref: 9,
        name: 'APBD 2015',
        tag: 'APBD',
        chart: ''
      },
      {
        sref: 10,
        name: 'Nilai Ekspor-Impor',
        tag: 'Ekspor-Impor',
        chart: ''
      },
      {
        sref: 11,
        name: 'Volume dan Nilai Ekspor',
        tag: 'Ekspor-Impor',
        chart: ''
      },
      {
        sref: 12,
        name: 'Nilai Impor Menurut Golongan',
        tag: 'Ekspor-Impor',
        chart: ''
      },
      {
        sref: 13,
        name: 'Harga Pangan',
        tag: 'Komoditas',
        chart: ''
      },
      {
        sref: 14,
        name: 'Harga Grosir',
        tag: 'Komoditas',
        chart: ''
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

.controller('PageChartLineCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    $scope.ticker = {
      tag: $stateParams.tagTicker,
      name: $stateParams.nameTicker,
      sref: $stateParams.srefTicker
    };

    console.log($scope.ticker);
  }
]);
