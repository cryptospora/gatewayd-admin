rippleGatewayApp.controller('ExternalAccountsFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.account = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getExternalAccount($routeParams.id, function(err, res) {
        if (!err) {
          $scope.account = res.external_account;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateExternalAccount = function() {
      $api.updateExternalAccount($routeParams.id, $scope.account, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External account updated.';

          $timeout(function() {
            $state.go('database.external_accounts');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createExternalAccount = function() {
      $api.createExternalAccount($scope.account, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External account created.';

          $timeout(function() {
            $state.go('database.external_accounts');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
