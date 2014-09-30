rippleGatewayApp.factory('ExternalAccountModel', ['Restangular', function(Restangular) {
  Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var dataConversion = {
      getList: data.external_accounts,
      get: data.external_account,
      post: data.externalAccount,
      put: data.externalAccount,
      remove: data
    };

    return dataConversion[operation];
  });

  var model = {};

  var externalAccounts = Restangular.all('v1/external_accounts');
  var accounts = externalAccounts.getList().$object;

  model.get = function() {
    return accounts;
  };

  model.fetch = function() {
    return externalAccounts.getList().$object;
  };

  model.create = function(newAccount) {
    return externalAccounts.post(newAccount);
  };

  model.update = function(newAccount) {
    return newAccount.put();
  };

  model.delete = function(targetAccount) {
    return targetAccount.remove();
  };

  return model;
}]);
