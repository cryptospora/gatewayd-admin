rippleGatewayApp.controller('ExternalTransactionsFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transaction = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getExternalTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.external_transaction;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateExternalTransaction = function() {
      $api.updateExternalTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External transaction updated.';

          $timeout(function() {
            $state.go('database.external_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createExternalTransaction = function() {
      $api.createExternalTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External transaction updated.';

          $timeout(function() {
            $state.go('database.external_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
