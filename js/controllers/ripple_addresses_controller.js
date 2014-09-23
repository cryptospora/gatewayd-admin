rippleGatewayApp.controller('RippleAddressesCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.addresses = [];

    $api.getRippleAddresses(function(err, res) {
      if (!err) {
        $scope.addresses = res.ripple_addresses;
      }
    });

    $scope.deleteRippleAddress = function(index) {
      var address = $scope.addresses[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteRippleAddress(address.id, function(err, res) {
          if (!err) {
            $scope.addresses.splice(index, 1);
          }
        });
      }
    };

    $scope.updateRippleAddress = function(index) {
      $state.go('database.ripple_addresses.update', {id: $scope.addresses[index].id});
    };
}]);
