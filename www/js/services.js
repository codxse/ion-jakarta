angular.module('ionJakarta.services', [])

.factory('metaDataServices', function($q, $http) {

  var getDetailsData = function(ticker) {

    var deferred = $q.defer(),
    url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22" + "YHOO" + "%22)&format=json&env=http://datatables.org/alltables.env";

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
