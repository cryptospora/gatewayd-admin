rippleGatewayApp.controller('RippleTransactionsFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transaction = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getRippleTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.ripple_transaction;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateRippleTransaction = function() {
      $api.updateRippleTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple transaction updated.';

          $timeout(function() {
            $state.go('database.ripple_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createRippleTransaction = function() {
      $api.createRippleTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple transaction updated.';

          $timeout(function() {
            $state.path('database.ripple_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
