rippleGatewayApp.factory('ExternalAccountModel', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
  Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var dataConversion = {
      getList: data.external_accounts,
      get: data.external_account,
      post: data.externalAccount,
      remove: data
    };

    return dataConversion[operation];
  });

  var model = {};

  var externalAccounts = Restangular.all('v1/external_accounts');
  var accounts = externalAccounts.getList().$object;

  var handleRefresh = function() {
    $rootScope.$emit('refresh', accounts);
  };

  model.get = function() {
    return accounts;
  };

  model.fetch = function() {
    return externalAccounts.getList().$object;;
  };

  model.create = function(newAccount) {
    return externalAccounts.post(newAccount).then(handleRefresh);
  };

  model.update = function(newAccount) {
    return newAccount.put().then(handleRefresh);
  };

  model.delete = function(targetAccount) {
    return targetAccount.remove().then(handleRefresh);
  };

  return model;
}]);
