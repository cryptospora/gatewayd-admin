rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
  function($scope, $user, $api, $window, $state, $timeout) {
    "use strict";

    console.log("state", $state);
    var messages = {
        create: 'External account created.',
        update: 'External account updated.'
    };

    var handleAccountMessage = function(err, res) {
      if (!err) {
        $scope.messageState = 'success';
        $scope.successMessage = messages[$scope.crudType];

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
    $scope.formType = "";

    if (typeof $state.current.data !== "undefined") {
      $scope.formType = $state.current.data.type;
    }
    $scope.messageState = '';

    //create
    $scope.createExternalAccount = function() {
      $scope.crudType = "create";

      console.log("state", $state);

      $api.createExternalAccount($scope.account, handleAccountMessage);
    };

    //read
    $api.getExternalAccounts(function(err, res) {
      if (!err) {
        $scope.accounts = res.external_accounts;
      }
    });

    //update
    $scope.updateExternalAccount = function($index) {
      $scope.crudType = "update";
      console.log('update', arguments);

      $api.updateExternalAccount($scope.accounts[$index].id, $scope.account, handleAccountMessage);
    };

    //delete
    $scope.deleteExternalAccount = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteExternalAccount(account.id, function(err, res) {
          if (!err) {
            $scope.accounts.splice(index, 1);
          }
        });
      }
    };
}]);
