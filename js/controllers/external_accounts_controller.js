rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout', 'Restangular', 'ExternalAccountModel',
  function($scope, $user, $api, $window, $state, $timeout, Restangular, ExternalAccountModel) {
    "use strict";

    var messages = {
        create: 'external account created.',
        update: 'external account updated.'
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
    $scope.messageState = '';

    //read
    ExternalAccountModel.fetchExternalAccounts().then(function(accounts) {
      $scope.accounts = accounts;
    });

    //create
    $scope.createExternalAccount = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      $api.createExternalAccount($scope.account, handleAccountMessage);
    }

    //update
    $scope.updateExternalAccount = function(index) {
      $scope.crudType = "update";

      ExternalAccountModel.getExternalAccount($scope.accounts[index].id).then(function(account) {
        $scope.account = account;
      });
    };

    $scope.submitUpdate = function(index) {
      $api.updateExternalAccount($scope.accounts[index].id, $scope.account, handleAccountMessage);
    }

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
