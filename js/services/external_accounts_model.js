rippleGatewayApp.factory('ExternalAccountModel', ['Restangular', function(Restangular) {
  Restangular.addResponseInterceptor(function(data, operation) {
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
  var mainRoute = Restangular.all('v1/external_accounts');
  var collection = mainRoute.getList().$object;

  model.get = function() {
    return collection;
  };

  model.fetch = function() {
    return mainRoute.getList().then(function(masterCollection) {
      collection = masterCollection;
    });
  };

  model.create = function(newModel) {
    return mainRoute.post(newModel).then(function(restangularizedModel) {
      collection.push(restangularizedModel);
    });
  };

  model.update = function(updatedModel) {
    return updatedModel.put().then(function() {
      collection[collection.indexOf(updatedModel)] = updatedModel;
    });
  };

  model.delete = function(targetModel) {
    return targetModel.remove().then(function() {
      collection.splice(collection.indexOf(targetModel), 1);
    });
  };

  return model;
}]);
