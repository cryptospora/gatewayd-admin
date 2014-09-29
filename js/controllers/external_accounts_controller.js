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

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    //set scope attributes
    $scope.accounts = [];
    $scope.account = {};
    $scope.messageState = '';

    //read
    $scope.accounts = ExternalAccountModel.get();

    $scope.$on('refresh', function(event, accounts) {
      $scope.accounts = Restangular.copy(accounts);
    });

    //create
    $scope.createExternalAccount = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      ExternalAccountModel.create($scope.account).then(function(accounts) {
        $state.go('database.external_accounts');
      })
    }

    //update
    $scope.updateExternalAccount = function(index) {
      $scope.crudType = "update";
      $scope.account = $scope.accounts[index];
    };

    $scope.submitUpdate = function() {
      ExternalAccountModel.update($scope.account).then(function() {
        $state.go('database.external_accounts');
      });
    }

    //delete
    $scope.deleteExternalAccount = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        ExternalAccountModel.delete(account);
      }
    };
}]);
