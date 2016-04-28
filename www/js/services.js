angular.module('ionJakarta.services', [])

.factory('metaDataServices', function($q, $http) {

  var deferred = $q.defer(),
  url = "http://finance.yahoo.com/webservice/v1/symbols/" + "YHOO" + "/quote?format=json&view=detail";

  var getMetaData = function(ticker) {
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
      console.log("metaDataServices error: " + error);
      deferred.reject();
    });
    return deferred.promise;
  };

  return {
    getMetaData: getMetaData
  }
});
