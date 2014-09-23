rippleGatewayApp.controller('GatewayTransactionsFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transaction = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getGatewayTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.gateway_transaction;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateGatewayTransaction = function() {
      $api.updateGatewayTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Gateway transaction updated.';

          $timeout(function() {
            $state.go('database.gateway_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createGatewayTransaction = function() {
      $api.createGatewayTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Gateway transaction updated.';

          $timeout(function() {
            $state.go('database.gateway_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
