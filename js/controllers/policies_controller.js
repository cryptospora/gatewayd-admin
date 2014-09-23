rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.policies = [];

    $api.getPolicies(function(err, res) {
      if (!err && res.success) {
        $scope.policies = res.policies;
      }
    });

    $scope.deletePolicy = function(index) {
      var policy = $scope.policies[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deletePolicy(policy.id, function(err, res) {
          if (!err) {
            $scope.policies.splice(index, 1);
          }
        });
      }
    };

    $scope.updatePolicy = function(index) {
      $state.go('database.policies.update', {id: $scope.policies[index].id});
    };
}]);
