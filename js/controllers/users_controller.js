rippleGatewayApp.controller('UsersCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.users = [];

    $api.getUsers(function(err, res) {
      if (!err && res.success) {
        $scope.users = res.users;
      }
    });

    $scope.deleteUser = function(index) {
      var user = $scope.users[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteUser(user.id, function(err, res) {
          if (!err) {
            $scope.users.splice(index, 1);
          }
        });
      }
    };

    $scope.updateUser = function(index) {
      $state.go('database.users.update', {id: $scope.users[index].id});
    };
}]);
