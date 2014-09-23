rippleGatewayApp.controller('RippleAddressesFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.address = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getRippleAddress($routeParams.id, function(err, res) {
        if (!err) {
          $scope.address = res.ripple_address;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateRippleAddress = function() {
      $api.updateRippleAddress($routeParams.id, $scope.address, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple address updated.';

          $timeout(function() {
            $state.go('database.ripple_addresses');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createRippleAddress = function() {
      $api.createRippleAddress($scope.address, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple address updated.';

          $timeout(function() {
            $state.go('database.ripple_addresses');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
