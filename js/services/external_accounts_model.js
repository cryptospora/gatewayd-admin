rippleGatewayApp.factory('ExternalAccountModel', ['Restangular', function(Restangular) {
  Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var dataOf = {
      getList: data.external_accounts,
      get: data.external_account
    };

    console.log(arguments);
    console.log("data", data);
    return dataOf[operation];
  });

  var model = {};

  model.fetchExternalAccounts = function() {
    return Restangular.all('v1/external_accounts').getList();
  };

  model.getExternalAccount = function(id) {
    // figure out some way to not query the database and get a single record
    return Restangular.all('v1/external_accounts').get(id);
  };

  return model;
}]);
