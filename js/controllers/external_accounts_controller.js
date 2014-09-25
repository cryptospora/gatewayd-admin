rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout', 'Restangular',
  function($scope, $user, $api, $window, $state, $timeout, Restangular) {
    "use strict";

    var account = Restangular.all('v1/external_accounts');
    var allaccounts = account.getList();

    console.log("rest", account);
    var messages = {
        create: 'external account created.',
        update: 'external account updated.'
    };

    var handleAccountMessage = function(err, res) {
      if (!err) {
        $scope.messageState = 'success';
        $scope.successMessage = messages[$scope.crudtype];

        $timeout(function() {
          $state.go('database.external_accounts');
        }, 1000);
      } else {
        $scope.messageState = 'error';
        $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
      }
    };

    if (!$user.isAdmin) {
      $state.go('login');
    }

    //set scope attributes
    $scope.accounts = [];
    $scope.account = {};

    //todo: check for data
    $scope.formtype = "";

    if (typeof $state.current.data !== "undefined") {
      $scope.formtype = $state.current.data.type;
    }
    $scope.messageState = '';

    //create
    $scope.createExternalAccount = function() {
      $scope.crudtype = "create";

      console.log("state", $state);

      $api.createExternalAccount($scope.account, handleAccountMessage);
    };

    //read
    //$api.getExternalAccounts(function(err, res) {
      //if (!err) {
        //$scope.accounts = res.external_accounts;
      //}
       //console.log("res", res);
    //});

    //update
    $scope.updateExternalAccount = function($index) {
      $scope.crudtype = "update";
      console.log('update', arguments);

      $api.updateExternalAccount($scope.accounts[$index].id, $scope.account, handleAccountMessage);
    };

    //delete
    $scope.deleteExternalAccount = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        $api.deleteExternalAccount(account.id, function(err, res) {
          if (!err) {
            $scope.accounts.splice(index, 1);
          }
        });
      }
    };
}]);
