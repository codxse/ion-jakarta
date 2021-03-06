angular.module('ionJakarta.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

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

  $scope.goHome = function() {
    $state.go('main');
  };

  // Custom Vars and States
  $scope.menuTitle = 'Menu';
  $scope.topiks = [
    { name: 'Beranda', sref: 'main', icon: 'ion-ios-home' },
    { name: 'Topik Makro Ekonomi', sref: 'app.menuMakro', icon: 'ion-ios-world' },
    { name: 'Topik Mikro Ekonomi', sref: 'app.menuMikro', icon: 'ion-pizza' },
    { name: 'Tentang', sref: 'app.tentang', icon: 'ion-document-text' },
    { name: 'Perkenalan', sref: 'intro', icon: 'ion-heart'}
  ];

})

.controller('IntroCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate',
function($scope, $state, $ionicSlideBoxDelegate) {

  // called to navigate to the main page
  console.log('on IntroCtrl');
  $scope.startApp = function() {
    $state.go('main');
  };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // each time slide change, will be called
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

}])

.controller('MainCtrl', ['$scope', '$state',
function($scope, $state) {

  console.log('on MainCtrl');
  $scope.toIntro = function() {
    $state.go('intro');
  };

  $scope.toMenuMakro = function() {
    $state.go('app.menuMakro');
  };

  $scope.toMenuMikro = function() {
    $state.go('app.menuMikro');
  };

}])

.controller('MenuMakroCtrl', ['$scope',
function($scope) {
  $scope.menus = [
    { data: 1, name: 'Ikhtisar Statistik', category: 'Ketenaga Kerjaan', chart: ['line', 'pie'] },
    { data: 2, name: 'Upah Minimum Provinsi', category: 'Ketenaga Kerjaan', chart: 'line' },
    { data: 3, name: 'Pertumbuhan Ekonomi', category: 'Perekonomian', chart: 'line' },
    { data: 4, name: 'Tingkat Inflasi', category: 'Perekonomian', chart: 'line' },
    { data: 5, name: 'Komponen Inflasi', category: 'Perekonomian', chart: 'line' },
    { data: 9, name: 'Struktur Ekonomi', category: 'Perekonomian', chart: 'line' },
    { data: 13, name: 'Pendapatan Perkapita', category: 'Pendapatan Perkapita', chart: 'line' }
  ];
}
])

.controller('MenuMikroCtrl', ['$scope',
function($scope) {
  $scope.menus = [
    { data: 6, name: 'Ekspor & Impor Jakarta', category: 'Ekspor & Impor', chart: 'line' },
    { data: 7, name: 'Volume dan Nilai Ekspor', category: 'Ekspor & Impor', chart: 'line' },
    { data: 8, name: 'Nilai Impor Menurut Golongan', category: 'Ekspor & Impor', chart: 'line' },
    { data: 10, name: 'Harga Pangan', category: 'Komoditas', chart: 'line' },
    { data: 11, name: 'Harga Grosir', category: 'Komoditas', chart: 'line' },
    { data: 12, name: 'Anggaran Belanja Daerah', category: 'APBD', chart: 'line' }
  ];
}
])

.controller('TentangCtrl', function($scope) {
  console.log('On TentangCtrl');
  $scope.tentang =
  {
    title: 'ionJakarta',
    desc: 'ionJakarta adalah aplikasi yang menyajikan visualisasi data terbuka Pemerintah Provinsi DKI Jakarta.'
  };
})

.controller('IkhtisatStatistikCtrl', ['$scope', '$stateParams',
function($scope, $stateParams) {
  console.log('on IkhtisatStatistikCtrl');

  // ---- chart options start data-1 ---- //
  var options = [{
    chart: {
      type: 'lineChart',
      height: 400,
      margin: {
        top: 0,
        right: 15,
        bottom: 38,
        left: 45
      },
      showLegend: false,
      //legendPosition: "bottom",
      x: function(d) {
        return new Date(d.x);
      },
      xScale: d3.time.scale(),
      y: function(d){ return d.y; },
      useInteractiveGuideline: true,
      dispatch: {
        stateChange: function(e){ console.log("stateChange"); },
        changeState: function(e){ console.log("changeState"); },
        tooltipShow: function(e){ console.log("tooltipShow"); },
        tooltipHide: function(e){ console.log("tooltipHide"); }
      },
      xAxis: {
        axisLabel: 'Tahun',
        tickFormat: function(d) {
          return d3.time.format('%Y')(new Date(d));
        },
        showMaxMin: false,
        tickPadding: 5
      },
      yAxis: {
        axisLabel: 'Jiwa',
        axisLabelDistance: -13,
        tickFormat: function(d) {
          var prefix = d3.formatPrefix(d);
          return prefix.scale(d) + prefix.symbol;
        },
        showMaxMin: false,
        tickPadding: 5
      },
      callback: function(chart){
        console.log("!!! lineChart callback !!!");
      }
    }
  },
  {
    chart: {
      title: "Nilai",
      type: 'pieChart',
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      showLegend: false,
      height: 300,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      donut: false,
      labelThreshold: 0.01,
      labelType: "percent",
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 0,
          bottom: 5,
          left: 0
        }
      }
    }

  }];
  // ---- chart options end data-1 ---- //
  $scope.options1 = options[0];
  $scope.options2 = options[1];

  // ---- chart data start data-1 ---- //
  var data = [
    [
      {
        values: [
          { x: 1230768000000, y: 66445 },
          { x: 1262304000000, y: 143638 },
          { x: 1293840000000, y: 84962 },
          { x: 1325376000000, y: 93666 },
          { x: 1356998400000, y: 87438 }
        ],
        key: "Pencari kerja yang belum ditempatkan"
      },
      {
        values: [
          { x: 1230768000000, y: 41794 },
          { x: 1262304000000, y: 368726 },
          { x: 1293840000000, y: 358142 },
          { x: 1325376000000, y: 46429 },
          { x: 1356998400000, y: 82728 }
        ],
        key: "Pencari kerja yang terdaftar"
      },
      {
        values: [
          { x: 1230768000000, y: 12903 },
          { x: 1262304000000, y: 453084 },
          { x: 1293840000000, y: 156755 },
          { x: 1325376000000, y: 25341 },
          { x: 1356998400000, y: 16721 }
        ],
        key: "Pencari kerja yang ditempatkan"
      },
      {
        values: [
          { x: 1230768000000, y: 0 },
          { x: 1262304000000, y: 32738 },
          { x: 1293840000000, y: 166932 },
          { x: 1325376000000, y: 27114 },
          { x: 1356998400000, y: 23072 }
        ],
        key: "Pencari kerja yang dihapus"
      },
      {
        values: [
          { x: 1230768000000, y: 2875 },
          { x: 1262304000000, y: 706 },
          { x: 1293840000000, y: 531 },
          { x: 1325376000000, y: 4283 },
          { x: 1356998400000, y: 612 }
        ],
        key: "Lowongan yang belum dipenuhi"
      },
      {
        values: [
          { x: 1230768000000, y: 12903 },
          { x: 1262304000000, y: 454687 },
          { x: 1293840000000, y: 193136 },
          { x: 1325376000000, y: 38204 },
          { x: 1356998400000, y: 43551 }
        ],
        key: "Lowongan yang terdaftar"
      },
      {
        values: [
          { x: 1230768000000, y: 12903 },
          { x: 1262304000000, y: 453084 },
          { x: 1293840000000, y: 156755 },
          { x: 1325376000000, y: 25341 },
          { x: 1356998400000, y: 16721}
        ],
        key: "Lowongan yang dipenuhi"
      },
      {
        values: [
          { x: 1230768000000, y: 0 },
          { x: 1262304000000, y: 19304 },
          { x: 1293840000000, y: 36156 },
          { x: 1325376000000, y: 16534 },
          { x: 1356998400000, y: 24868 }
        ],
        key: "Lowongan yang dihapus"
      },
      {
        values: [
          { x: 1230768000000, y: 2875 },
          { x: 1262304000000, y: 510 },
          { x: 1293840000000, y: 756 },
          { x: 1325376000000, y: 612 },
          { x: 1356998400000, y: 0 }
        ],
        key: "Lowongan Gol I dan Gol II"
      }
    ],
    [
      {
        key: "Pencari kerja yang belum ditempatkan diawal tahun",
        y: 66445
      },
      {
        key: "Pencari kerja yang terdaftar",
        y: 41794
      },
      {
        key: "Pencari kerja yang ditempatkan",
        y: 12903
      },
      {
        key: "Pencari kerja yang dihapus",
        y: 0
      }
    ]];
    // ---- chart data end data-1 ---- //

    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('UpahMinimumProvinsiCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on UpahMinimumProvinsiCtrl');

    // ---- chart options start data-2 ---- //
    $scope.options = {
      chart: {
        type: 'linePlusBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 30
        },
        showLegend: true,
        bars: {
          forceY: [0]
        },
        legendLeftAxisHint: " (Kiri: Rp)",
        legendRightAxisHint: " (Kanan: %)",
        x: function(d,i) { return i },
        xAxis: {
          axisLabel: 'Tahun',
          tickFormat: function(d) {
            var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
            if (dx > 0) {
              return d3.time.format('%Y')(new Date(dx))
            }
            return null;
          },
          showMaxMin: false,
          tickPadding: 5
        },
        x2Axis: {
          tickFormat: function(d) {
            var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
            return d3.time.format('%Y')(new Date(dx))
          },
          showMaxMin: false,
          tickPadding: 5
        },
        y1Axis: {
          axisLabel: 'Rp',
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          },
          axisLabelDistance: -9,
          showMaxMin: false,
          tickPadding: 5
        },
        y2Axis: {
          axisLabel: '%',
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          },
          showMaxMin: false,
          tickPadding: 5,
          axisLabelDistance: 0,
        }
      }
    };
    // ---- chart options end data-2 ---- //

    // ---- chart data start data-2 ---- //
    $scope.data = [
      {
        "key" : "UMP",
        "bar" : true,
        "values" :
        [
          [852076800000, 172500],
          [883612800000, 198500],
          [915148800000, 231000],
          [946684800000, 344257],
          [978307200000, 426250],
          [1009843200000, 591266],
          [1041379200000, 631554],
          [1072915200000, 671550],
          [1104537600000, 819100],
          [1136073600000, 900560],
          [1167609600000, 972605],
          [1199145600000, 972605],
          [1230768000000, 1069865],
          [1262304000000, 1188010],
          [1293840000000, 1290000],
          [1325376000000, 1529150],
          [1356998400000, 2200000],
          [1388534400000, 2441000]
        ]
      },
      {
        "key" : "Inflasi",
        "bar" : false,
        "values" :
        [
          [852076800000, 11.07],
          [883612800000, 74.42],
          [915148800000, 1.77],
          [946684800000, 10.29],
          [978307200000, 11.62],
          [1009843200000, 9.08],
          [1041379200000, 5.78],
          [1072915200000, 5.87],
          [1104537600000, 16.06],
          [1136073600000, 6.03],
          [1167609600000, 6.04],
          [1199145600000, 11.11],
          [1230768000000, 2.34],
          [1262304000000, 5.95],
          [1293840000000, 3.97],
          [1325376000000, 4.52],
          [1356998400000, 5.67],
          [1388534400000, 6.15]
        ]
      },
      {
        "key" : "Kenaikan" ,
        "bar" : false,
        "values" :
        [
          [852076800000, 0],
          [883612800000, 15.07],
          [915148800000, 16.37],
          [946684800000, 49.03],
          [978307200000, 23.82],
          [1009843200000, 37.71],
          [1041379200000, 6.81],
          [1072915200000, 6.33],
          [1104537600000, 6],
          [1136073600000, 15.07],
          [1167609600000, 9.95],
          [1199145600000, 8],
          [1230768000000, 10],
          [1262304000000, 11.04],
          [1293840000000, 8.58],
          [1325376000000, 18.54],
          [1356998400000, 43.87],
          [1388534400000, 10.96]
        ]
      }
    ].map(function(series) {
      series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
      return series;
    });
    // ---- chart data start data-2 ---- //

  }])

  .controller('PertumbuhanEkonomiCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on PertumbuhanEkonomiCtrl');
    // ---- chart options start data-3 ---- //
    var options = [];
    options = [
      {
        chart: {
          type: 'lineChart',
          height: 450,
          margin : {
            top: 0,
            bottom: 40,
            right: 0,
            left: 40
          },
          //legendPosition: "bottom",
          showLegend: true,
          //forceY: [4,7],
          // forceX: [1104537600000, 1356998400000],
          x: function(d) {
            return new Date(d.x);
          },
          xScale: d3.time.scale(),
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          dispatch: {
            stateChange: function(e){ console.log("stateChange"); },
            changeState: function(e){ console.log("changeState"); },
            tooltipShow: function(e){ console.log("tooltipShow"); },
            tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
            axisLabel: 'Tahun',
            tickFormat: function(d) {
              return d3.time.format('%Y')(new Date(d));
            },
            tickPadding: 5,
            showMaxMin: false,
            axisLabelDistance: -5
          },
          yAxis: {
            axisLabel: 'Pertumbuhan (%)',
            axisLabelDistance: -20,
            tickFormat: function(d) {
              var prefix = d3.formatPrefix(d);
              return prefix.scale(d) + prefix.symbol;
            },
            tickPadding: 5,
            showMaxMin: false
          },
          callback: function(chart){
            console.log("!!! lineChart callback !!!");
          }
        }
      },
      {
        chart: {
          type: 'scatterChart',
          height: 450,
          margin: {
            top: 10,
            right: 15,
            bottom: 40,
            left: 50
          },
          showLegend: false,
          color: d3.scale.category10().range(),
          scatter: {
            onlyCircles: false
          },
          showDistX: true,
          showDistY: true,
          duration: 350,
          xAxis: {
            axisLabel: 'Pertumbuhan Jakarta (%)',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            axisLabelDistance: 0,
            showMaxMin: true
          },
          yAxis: {
            axisLabel: 'Pertumbuhan Nasional (%)',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            axisLabelDistance: -10,
            showMaxMin: false
          },
          zoom: {
            //NOTE: All attributes below are optional
            enabled: true,
            scaleExtent: [1, 10],
            useFixedDomain: true,
            useNiceScale: true,
            horizontalOff: true,
            verticalOff: false,
            unzoomEventType: 'dblclick.zoom'
          }
        }
      }
    ];
    // ---- chart options end data-3 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-3 ---- //
    var data = [];
    data = [
      [
        {
          values: [
            { x: 1136073600000, y: 5.95 },
            { x: 1167609600000, y: 6.44 },
            { x: 1199145600000, y: 6.23 },
            { x: 1230768000000, y: 5.02 },
            { x: 1262304000000, y: 6.5 },
            { x: 1293840000000, y: 6.73 },
            { x: 1325376000000, y: 6.53 }
          ],
          key: "Jakarta"
        },
        {
          values: [
            { x: 1136073600000, y: 5.5 },
            { x: 1167609600000, y: 6.35 },
            { x: 1199145600000, y: 6.01 },
            { x: 1230768000000, y: 4.63 },
            { x: 1262304000000, y: 6.2},
            { x: 1293840000000, y: 6.48 },
            { x: 1325376000000, y: 6.23 }
          ],
          key: "Nasional"
        }
      ],
      [
        {
          "intercept": -0.9794,
          "slope": 1.1119,
          "values": [
            { "series": 0, "shape": "circle", "size": 1, "x": 5.95, "y": 5.5 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.44, "y": 6.35 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.23, "y": 6.01 },
            { "series": 0, "shape": "circle", "size": 1, "x": 5.02, "y": 4.63 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.5, "y": 6.2 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.73, "y": 6.48 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.53, "y": 6.23 }
          ]
        }
      ]
    ]
    // ---- chart data end data-3 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('TingkatInflasiCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on TingkatInflasiCtrl');

    // ---- chart options start data-4 ---- //
    var options = [];
    options = [
      {
        chart: {
          type: 'lineChart',
          height: 450,
          margin : {
            top: 0,
            right: 15,
            bottom: 40,
            left: 40
          },
          showLegend: false,
          //legendPosition: "top",
          //forceY: [2,12],
          // forceX: [1104537600000, 1356998400000],
          x: function(d) {
            return new Date(d.x);
          },
          xScale: d3.time.scale(),
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          dispatch: {
            stateChange: function(e){ console.log("stateChange"); },
            changeState: function(e){ console.log("changeState"); },
            tooltipShow: function(e){ console.log("tooltipShow"); },
            tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
            axisLabel: 'Tahun',
            tickFormat: function(d) {
              return d3.time.format('%Y')(new Date(d));
            },
            axisLabelDistance: 0,
            tickPadding: 5
          },
          yAxis: {
            axisLabel: 'Pertumbuhan (%)',
            tickFormat: function(d) {
              var prefix = d3.formatPrefix(d);
              return prefix.scale(d) + prefix.symbol;
            },
            axisLabelDistance: -23,
            showMaxMin: false,
            tickPadding: 5
          },
          callback: function(chart){
            console.log("!!! lineChart callback !!!");
          }
        }
      },
      {
        chart: {
          type: 'scatterChart',
          height: 450,
          margin: {
            top: 10,
            right: 15,
            bottom: 50,
            left: 60
          },
          showLegend: false,
          // forceY: [0, 12],
          // forceX: [0, 12],
          color: d3.scale.category10().range(),
          scatter: {
            onlyCircles: false
          },
          showDistX: true,
          showDistY: true,
          duration: 350,
          xAxis: {
            axisLabel: 'Inflasi Jakarta (%)',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            tickPadding: 15,
            axisLabelDistance: 10
          },
          yAxis: {
            axisLabel: 'Inflasi Nasional (%)',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            axisLabelDistance: 0,
            tickPadding: 15,
            showMaxMin: false,
          },
          zoom: {
            //NOTE: All attributes below are optional
            enabled: true,
            scaleExtent: [1, 10],
            useFixedDomain: true,
            useNiceScale: true,
            horizontalOff: true,
            verticalOff: false,
            unzoomEventType: 'dblclick.zoom'
          }
        }
      }
    ];
    // ---- chart options end data-4 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-4 ---- //
    var data = [];
    data = [
      [
        {
          values: [
            { x: 1136073600000, y: 6.03 },
            { x: 1167609600000, y: 6.04 },
            { x: 1199145600000, y: 11.11 },
            { x: 1230768000000, y: 2.34 },
            { x: 1262304000000, y: 6.21 },
            { x: 1293840000000, y: 3.97 },
            { x: 1325376000000, y: 4.52 }
          ],
          key: "Jakarta"
        },
        {
          values: [
            { x: 1136073600000, y: 6.6 },
            { x: 1167609600000, y: 6.59 },
            { x: 1199145600000, y: 11.06 },
            { x: 1230768000000, y: 2.78 },
            { x: 1262304000000, y: 6.96},
            { x: 1293840000000, y: 3.79 },
            { x: 1325376000000, y: 4.3 }
          ],
          key: "Nasional"
        }
      ],
      [
        {
          "intercept": 0.3296,
          "slope": 0.9889,
          "values": [
            { "series": 0, "shape": "circle", "size": 1, "x": 6.03, "y": 6.6 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.04, "y": 6.59 },
            { "series": 0, "shape": "circle", "size": 1, "x": 11.11, "y": 11.06 },
            { "series": 0, "shape": "circle", "size": 1, "x": 2.34, "y": 2.78 },
            { "series": 0, "shape": "circle", "size": 1, "x": 6.21, "y": 6.96 },
            { "series": 0, "shape": "circle", "size": 1, "x": 3.97, "y": 3.79 },
            { "series": 0, "shape": "circle", "size": 1, "x": 4.52, "y": 4.3 }
          ]
        }
      ]
    ];
    // ---- chart data end data-4 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('KomponenInflasiCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on KomponenInflasiCtrl');

    // ---- chart options start data-5 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-5 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-5 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-5 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('EksporImporJakartaCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on EksporImporJakartaCtrl');

    // ---- chart options start data-6 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-6 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-6 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-6 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('VolumeDanNilaiEksporCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on VolumeDanNilaiEksporCtrl');

    // ---- chart options start data-7 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-7 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-7 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-7 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];
  }])

  .controller('NilaiImporMenurutGolonganCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on NilaiImporMenurutGolonganCtrl');

    // ---- chart options start data-8 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-8 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-8 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-8 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('StrukturEkonomiCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on StrukturEkonomiCtrl');

    // ---- chart options start data-9 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-9 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-9 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-9 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('HargaPanganCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on HargaPanganCtrl');

    // ---- chart options start data-10 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-10 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-10 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-10 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('HargaGrosirCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on HargaGrosirCtrl');

    // ---- chart options start data-11 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-11 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-11 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-11 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('ApbdCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on ApbdCtrl');

    // ---- chart options start data-12 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-12 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-12 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-12 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('PendapatanPerkapitaCtrl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log('on PendapatanPerkapitaCtrl');

    // ---- chart options start data-13 ---- //
    var options = [];
    options = [
      {

      }
    ];
    // ---- chart options end data-13 ---- //
    $scope.options1 = options[0];
    $scope.options2 = options[1];

    // ---- chart data start data-13 ---- //
    var data = [];
    data = [
      [

      ]
    ];
    // ---- chart data end data-13 ---- //
    $scope.data1 = data[0];
    $scope.data2 = data[1];

  }])

  .controller('PageChartLineCtrl', ['$scope', '$stateParams', 'metaDataService', 'dateService',
  function($scope, $stateParams, metaDataService, dateService) {
    $scope.ticker = {
      sref: $stateParams.srefTicker,
      name: $stateParams.nameTicker,
      tag: $stateParams.tagTicker,
      chart: $stateParams.chartTicker
    };
    $scope.chartView = 5;
    // console.log('in PageChartLineCtrl: ');
    console.log($scope.ticker);
    // Button on top of page
    $scope.chartViewFn = function(click) {
      $scope.chartView = click;
    };

    // When Ionic catching the event, function on $scope.on will be invoked
    $scope.$on("$ionicView.afterEnter", function() {
      getMetaData();
      getDetailsData();
    });

    function getMetaData() {
      var promise = metaDataService.getMetaData($scope.ticker);
      promise.then(function(jsonData) {
        // console.log('in PageChartLineCtrl: getMetaData()');
        // console.log(jsonData);

        $scope.metaData = jsonData;
      });
    }

    function getDetailsData() {
      var promise = metaDataService.getDetailsData($scope.ticker);
      promise.then(function(jsonData) {
        // console.log('in PageChartLineCtrl: getDetailsData');
        // console.log(jsonData);

        $scope.detailsData = jsonData;
      });
    }

    // ----- NVD3 Start ------ //
    $scope.options = {
      chart: {
        legend: false,
        type: 'cumulativeLineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 65
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]/100; },
        average: function(d) { return d.mean/100; },

        color: d3.scale.category10().range(),
        duration: 300,
        useInteractiveGuideline: true,
        clipVoronoi: false,

        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d) {
            return d3.time.format('%m/%d/%y')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: false
        },

        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){
            return d3.format(',.1%')(d);
          },
          axisLabelDistance: 20
        }
      }
    };

    $scope.data = [
      {
        key: "Lwongan 1",
        values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]]
        ,
        mean: 250
      },
      {
        key: "Lowongan 2",
        values: [ [ 1083297600000 , -0.77078283705125] , [ 1085976000000 , -1.8356366650335] , [ 1088568000000 , -5.3121322073127] , [ 1091246400000 , -4.9320975829662] , [ 1093924800000 , -3.9835408823225] , [ 1096516800000 , -6.8694685316805] , [ 1099195200000 , -8.4854877428545] , [ 1101790800000 , -15.933627197384] , [ 1104469200000 , -15.920980069544] , [ 1107147600000 , -12.478685045651] , [ 1109566800000 , -17.297761889305] , [ 1112245200000 , -15.247129891020] , [ 1114833600000 , -11.336459046839] , [ 1117512000000 , -13.298990907415] , [ 1120104000000 , -16.360027000056] , [ 1122782400000 , -18.527929522030] , [ 1125460800000 , -22.176516738685] , [ 1128052800000 , -23.309665368330] , [ 1130734800000 , -21.629973409748] , [ 1133326800000 , -24.186429093486] , [ 1136005200000 , -29.116707312531] , [ 1138683600000 , -37.188037874864] , [ 1141102800000 , -34.689264821198] , [ 1143781200000 , -39.505932105359] , [ 1146369600000 , -45.339572492759] , [ 1149048000000 , -43.849353192764] , [ 1151640000000 , -45.418353922571] , [ 1154318400000 , -44.579281059919] , [ 1156996800000 , -44.027098363370] , [ 1159588800000 , -41.261306759439] , [ 1162270800000 , -47.446018534027] , [ 1164862800000 , -53.413782948909] , [ 1167541200000 , -50.700723647419] , [ 1170219600000 , -56.374090913296] , [ 1172638800000 , -61.754245220322] , [ 1175313600000 , -66.246241587629] , [ 1177905600000 , -75.351650899999] , [ 1180584000000 , -81.699058262032] , [ 1183176000000 , -82.487023368081] , [ 1185854400000 , -86.230055113277] , [ 1188532800000 , -84.746914818507] , [ 1191124800000 , -100.77134971977] , [ 1193803200000 , -109.95435565947] , [ 1196398800000 , -99.605672965057] , [ 1199077200000 , -99.607249394382] , [ 1201755600000 , -94.874614950188] , [ 1204261200000 , -105.35899063105] , [ 1206936000000 , -106.01931193802] , [ 1209528000000 , -110.28883571771] , [ 1212206400000 , -119.60256203030] , [ 1214798400000 , -115.62201315802] , [ 1217476800000 , -106.63824185202] , [ 1220155200000 , -99.848746318951] , [ 1222747200000 , -85.631219602987] , [ 1225425600000 , -63.547909262067] , [ 1228021200000 , -59.753275364457] , [ 1230699600000 , -63.874977883542] , [ 1233378000000 , -56.865697387488] , [ 1235797200000 , -54.285579501988] , [ 1238472000000 , -56.474659581885] , [ 1241064000000 , -63.847137745644] , [ 1243742400000 , -68.754247867325] , [ 1246334400000 , -69.474257009155] , [ 1249012800000 , -75.084828197067] , [ 1251691200000 , -77.101028237237] , [ 1254283200000 , -80.454866854387] , [ 1256961600000 , -78.984349952220] , [ 1259557200000 , -83.041230807854] , [ 1262235600000 , -84.529748348935] , [ 1264914000000 , -83.837470195508] , [ 1267333200000 , -87.174487671969] , [ 1270008000000 , -90.342293007487] , [ 1272600000000 , -93.550928464991] , [ 1275278400000 , -85.833102140765] , [ 1277870400000 , -79.326501831592] , [ 1280548800000 , -87.986196903537] , [ 1283227200000 , -85.397862121771] , [ 1285819200000 , -94.738167050020] , [ 1288497600000 , -98.661952897151] , [ 1291093200000 , -99.609665952708] , [ 1293771600000 , -103.57099836183] , [ 1296450000000 , -104.04353411322] , [ 1298869200000 , -108.21382792587] , [ 1301544000000 , -108.74006900920] , [ 1304136000000 , -112.07766650960] , [ 1306814400000 , -109.63328199118] , [ 1309406400000 , -106.53578966772] , [ 1312084800000 , -103.16480871469] , [ 1314763200000 , -95.945078001828] , [ 1317355200000 , -81.226687340874] , [ 1320033600000 , -90.782206596168] , [ 1322629200000 , -89.484445370113] , [ 1325307600000 , -88.514723135326] , [ 1327986000000 , -93.381292724320] , [ 1330491600000 , -97.529705609172] , [ 1333166400000 , -99.520481439189] , [ 1335758400000 , -99.430184898669] , [ 1338436800000 , -93.349934521973] , [ 1341028800000 , -95.858475286491] , [ 1343707200000 , -95.522755836605] , [ 1346385600000 , -98.503848862036] , [ 1348977600000 , -101.49415251896] , [ 1351656000000 , -101.50099325672] , [ 1354251600000 , -99.487094927489]]
        ,
        mean: -60
      },
      {
        key: "Lapangan 1",
        mean: 125,
        values: [ [ 1083297600000 , -3.7454058855943] , [ 1085976000000 , -3.6096667436314] , [ 1088568000000 , -0.8440003934950] , [ 1091246400000 , 2.0921565171691] , [ 1093924800000 , 3.5874194844361] , [ 1096516800000 , 13.742776534056] , [ 1099195200000 , 13.212577494462] , [ 1101790800000 , 24.567562260634] , [ 1104469200000 , 34.543699343650] , [ 1107147600000 , 36.438736927704] , [ 1109566800000 , 46.453174659855] , [ 1112245200000 , 43.825369235440] , [ 1114833600000 , 32.036699833653] , [ 1117512000000 , 41.191928040141] , [ 1120104000000 , 40.301151852023] , [ 1122782400000 , 54.922174023466] , [ 1125460800000 , 49.538009616222] , [ 1128052800000 , 61.911998981277] , [ 1130734800000 , 56.139287982733] , [ 1133326800000 , 71.780099623014] , [ 1136005200000 , 78.474613851439] , [ 1138683600000 , 90.069363092366] , [ 1141102800000 , 87.449910167102] , [ 1143781200000 , 87.030640692381] , [ 1146369600000 , 87.053437436941] , [ 1149048000000 , 76.263029236276] , [ 1151640000000 , 72.995735254929] , [ 1154318400000 , 63.349908186291] , [ 1156996800000 , 66.253474132320] , [ 1159588800000 , 75.943546587481] , [ 1162270800000 , 93.889549035453] , [ 1164862800000 , 106.18074433002] , [ 1167541200000 , 116.39729488562] , [ 1170219600000 , 129.09440567885] , [ 1172638800000 , 123.07049577958] , [ 1175313600000 , 129.38531055124] , [ 1177905600000 , 132.05431954171] , [ 1180584000000 , 148.86060871993] , [ 1183176000000 , 157.06946698484] , [ 1185854400000 , 155.12909573880] , [ 1188532800000 , 155.14737474392] , [ 1191124800000 , 159.70646945738] , [ 1193803200000 , 166.44021916278] , [ 1196398800000 , 159.05963386166] , [ 1199077200000 , 151.38121182455] , [ 1201755600000 , 132.02441123108] , [ 1204261200000 , 121.93110210702] , [ 1206936000000 , 112.64545460548] , [ 1209528000000 , 122.17722331147] , [ 1212206400000 , 133.65410878087] , [ 1214798400000 , 120.20304048123] , [ 1217476800000 , 123.06288589052] , [ 1220155200000 , 125.33598074057] , [ 1222747200000 , 103.50539786253] , [ 1225425600000 , 85.917420810943] , [ 1228021200000 , 71.250132356683] , [ 1230699600000 , 71.308439405118] , [ 1233378000000 , 52.287271484242] , [ 1235797200000 , 30.329193047772] , [ 1238472000000 , 44.133440571375] , [ 1241064000000 , 77.654211210456] , [ 1243742400000 , 73.749802969425] , [ 1246334400000 , 70.337666717565] , [ 1249012800000 , 102.69722724876] , [ 1251691200000 , 117.63589109350] , [ 1254283200000 , 128.55351774786] , [ 1256961600000 , 119.21420882198] , [ 1259557200000 , 139.32979337027] , [ 1262235600000 , 149.71606246357] , [ 1264914000000 , 144.42340669795] , [ 1267333200000 , 161.64446359053] , [ 1270008000000 , 180.23071774437] , [ 1272600000000 , 199.09511476051] , [ 1275278400000 , 180.10778306442] , [ 1277870400000 , 158.50237284410] , [ 1280548800000 , 177.57353623850] , [ 1283227200000 , 162.91091118751] , [ 1285819200000 , 183.41053361910] , [ 1288497600000 , 194.03065670573] , [ 1291093200000 , 201.23297214328] , [ 1293771600000 , 222.60154078445] , [ 1296450000000 , 233.35556801977] , [ 1298869200000 , 231.22452435045] , [ 1301544000000 , 237.84432503045] , [ 1304136000000 , 235.55799131184] , [ 1306814400000 , 232.11873570751] , [ 1309406400000 , 226.62381538123] , [ 1312084800000 , 219.34811113539] , [ 1314763200000 , 198.69242285581] , [ 1317355200000 , 168.90235629066] , [ 1320033600000 , 202.64725756733] , [ 1322629200000 , 203.05389378105] , [ 1325307600000 , 204.85986680865] , [ 1327986000000 , 229.77085616585] , [ 1330491600000 , 239.65202435959] , [ 1333166400000 , 242.33012622734] , [ 1335758400000 , 234.11773262149] , [ 1338436800000 , 221.47846307887] , [ 1341028800000 , 216.98308827912] , [ 1343707200000 , 218.37781386755] , [ 1346385600000 , 229.39368622736] , [ 1348977600000 , 230.54656412916] , [ 1351656000000 , 243.06087025523] , [ 1354251600000 , 244.24733578385]]
      },
      {
        key: "Lapangan 2",
        values: [ [ 1083297600000 , -1.7798428181819] , [ 1085976000000 , -0.36883324836999] , [ 1088568000000 , 1.7312581046040] , [ 1091246400000 , -1.8356125950460] , [ 1093924800000 , -1.5396564170877] , [ 1096516800000 , -0.16867791409247] , [ 1099195200000 , 1.3754263993413] , [ 1101790800000 , 5.8171640898041] , [ 1104469200000 , 9.4350145241608] , [ 1107147600000 , 6.7649081510160] , [ 1109566800000 , 9.1568499314776] , [ 1112245200000 , 7.2485090994419] , [ 1114833600000 , 4.8762222306595] , [ 1117512000000 , 8.5992339354652] , [ 1120104000000 , 9.0896517982086] , [ 1122782400000 , 13.394644048577] , [ 1125460800000 , 12.311842010760] , [ 1128052800000 , 13.221003650717] , [ 1130734800000 , 11.218481009206] , [ 1133326800000 , 15.565352598445] , [ 1136005200000 , 15.623703865926] , [ 1138683600000 , 19.275255326383] , [ 1141102800000 , 19.432433717836] , [ 1143781200000 , 21.232881244655] , [ 1146369600000 , 22.798299192958] , [ 1149048000000 , 19.006125095476] , [ 1151640000000 , 19.151889158536] , [ 1154318400000 , 19.340022855452] , [ 1156996800000 , 22.027934841859] , [ 1159588800000 , 24.903300681329] , [ 1162270800000 , 29.146492833877] , [ 1164862800000 , 31.781626082589] , [ 1167541200000 , 33.358770738428] , [ 1170219600000 , 35.622684613497] , [ 1172638800000 , 33.332821711366] , [ 1175313600000 , 34.878748635832] , [ 1177905600000 , 40.582332613844] , [ 1180584000000 , 45.719535502920] , [ 1183176000000 , 43.239344722386] , [ 1185854400000 , 38.550955100342] , [ 1188532800000 , 40.585368816283] , [ 1191124800000 , 45.601374057981] , [ 1193803200000 , 48.051404337892] , [ 1196398800000 , 41.582581696032] , [ 1199077200000 , 40.650580792748] , [ 1201755600000 , 32.252222066493] , [ 1204261200000 , 28.106390258553] , [ 1206936000000 , 27.532698196687] , [ 1209528000000 , 33.986390463852] , [ 1212206400000 , 36.302660526438] , [ 1214798400000 , 25.015574480172] , [ 1217476800000 , 23.989494069029] , [ 1220155200000 , 25.934351445531] , [ 1222747200000 , 14.627592011699] , [ 1225425600000 , -5.2249403809749] , [ 1228021200000 , -12.330933408050] , [ 1230699600000 , -11.000291508188] , [ 1233378000000 , -18.563864948088] , [ 1235797200000 , -27.213097001687] , [ 1238472000000 , -20.834133840523] , [ 1241064000000 , -12.717886701719] , [ 1243742400000 , -8.1644613083526] , [ 1246334400000 , -7.9108408918201] , [ 1249012800000 , -0.77002391591209] , [ 1251691200000 , 2.8243816569672] , [ 1254283200000 , 6.8761411421070] , [ 1256961600000 , 4.5060912230294] , [ 1259557200000 , 10.487179794349] , [ 1262235600000 , 13.251375597594] , [ 1264914000000 , 9.2207594803415] , [ 1267333200000 , 12.836276936538] , [ 1270008000000 , 19.816793904978] , [ 1272600000000 , 22.156787167211] , [ 1275278400000 , 12.518039090576] , [ 1277870400000 , 6.4253587440854] , [ 1280548800000 , 13.847372028409] , [ 1283227200000 , 8.5454736090364] , [ 1285819200000 , 18.542801953304] , [ 1288497600000 , 23.037064683183] , [ 1291093200000 , 23.517422401888] , [ 1293771600000 , 31.804723416068] , [ 1296450000000 , 34.778247386072] , [ 1298869200000 , 39.584883855230] , [ 1301544000000 , 40.080647664875] , [ 1304136000000 , 44.180050667889] , [ 1306814400000 , 42.533535927221] , [ 1309406400000 , 40.105374449011] , [ 1312084800000 , 37.014659267156] , [ 1314763200000 , 29.263745084262] , [ 1317355200000 , 19.637463417584] , [ 1320033600000 , 33.157645345770] , [ 1322629200000 , 32.895053150988] , [ 1325307600000 , 34.111544824647] , [ 1327986000000 , 40.453985817473] , [ 1330491600000 , 46.435700783313] , [ 1333166400000 , 51.062385488671] , [ 1335758400000 , 50.130448220658] , [ 1338436800000 , 41.035476682018] , [ 1341028800000 , 46.591932296457] , [ 1343707200000 , 48.349391180634] , [ 1346385600000 , 51.913011286919] , [ 1348977600000 , 55.747238313752] , [ 1351656000000 , 52.991824077209] , [ 1354251600000 , 49.556311883284]]
      }
    ];
    // ------ NVD3 End ------ //

  }
]);
