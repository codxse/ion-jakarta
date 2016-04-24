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

.controller('MenuEkoCtrl', function($scope) {
  $scope.path = 'menu-eko';
  $scope.menus = [
    { name: 'Iktisar Statistik', sref: 1 },
    { name: 'UMP', sref: 2 },
    { name: 'Pertumbuhan Ekonomi', sref: 3 },
    { name: 'Inflasi Tahunan', sref: 4 },
    { name: 'Inflasi Bulanan', sref: 5 },
    { name: 'Komponen Inflasi', sref: 6 },
    { name: 'Pendapatan Perkapita', sref: 7},
    { name: 'Struktur Ekonomi', sref: 8}
  ];
})

.controller('MenuKedCtrl', function($scope) {
  $scope.path = 'menu-ked';
  $scope.menus = [
    { name: 'APBD 2015', sref: 9 },
    { name: 'Nilai Ekspor-Impor', sref: 10 },
    { name: 'Volume dan Nilai Ekspor', sref: 11 },
    { name: 'Nilai Impor Menurut Golongan', sref: 12 },
    { name: 'Harga Pangan', sref: 12 },
    { name: 'Harga Grosir', sref: 14 }
  ];
})

.controller('PageCtrl', function($scope, $stateParams) {
  console.log($stateParams);
});
