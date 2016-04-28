angular.module('ionJakarta.services', [])

.factory('encodeURIService', function() {
  return {
    encode: function(string) {
      console.log('in encodeURIService: ' + string);
      return encodeURIComponent(string)
        .replace(/\"/g, "%22")
        .replace(/\ /g, "%20")
        .replace(/[!'()]/g, escape);
    }
  }
})

.factory('dateService', function($filter) {
  var currentDate = function() {
    var d = new Date();
    var date = $filter('date')(d, 'yyyy-MM-dd');
    return date;
  };
  var oneYearAgoDate = function() {
    var d = new Date(new Date().setDate(new Date().getDate() - 365));
    var date = $filter('date')(d, 'yyyy-MM-dd');
    return date;
  };
  return {
    currentDate: currentDate,
    oneYearAgoDate: oneYearAgoDate
  }
})

.factory('metaDataService', function($q, $http, encodeURIService) {

  var getDetailsData = function(ticker) {

    var deferred = $q.defer(),
      query = 'select * from yahoo.finance.quotes where symbol IN ("' + 'YHOO' + '")',
      url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';

    console.log("in metaDataService: url: " + url);

    $http.get(url)
    .success(function(jsonData) {
      console.log('in getDetailsData: ');
      console.log(ticker);
      console.log('in getDetailsData: Full jsonData');
      console.log(jsonData);
      console.log('in getDetailsData: jsonData.query.results.quote');
      var jsonData = jsonData.query.results.quote;
      console.log(jsonData);
      deferred.resolve(jsonData);
    })
    .error(function(error) {
      console.log("getDetailsData error: " + error);
      deferred.reject();
    });
    return deferred.promise;
  };

  var getMetaData = function(ticker) {

    var deferred = $q.defer(),
    url = "http://finance.yahoo.com/webservice/v1/symbols/" + "YHOO" + "/quote?format=json&view=detail";

    $http.get(url)
    .success(function(jsonData) {
      console.log('in getMetaData: ');
      console.log(ticker);
      console.log('in getMetaData: Full jsonData');
      console.log(jsonData);
      console.log('in getMetaData: jsonData.list.resources[0].resource.fields');
      var jsonData = jsonData.list.resources[0].resource.fields;
      console.log(jsonData);
      deferred.resolve(jsonData);
    })
    .error(function(error) {
      console.log("getMetaData error: " + error);
      deferred.reject();
    });
    return deferred.promise;
  };

  return {
    getMetaData: getMetaData,
    getDetailsData: getDetailsData
  }
});
