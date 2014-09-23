rippleGatewayApp.controller('ExternalAccountsCtrl', [
    '$scope', 'UserService', 'ApiService', '$window', '$state',
    function($scope, $user, $api, $window, $state) {

    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.accounts = [];
    $api.getExternalAccounts(function(err, res) {
      if (!err) {
        $scope.accounts = res.external_accounts;
      }
    });

    $scope.deleteExternalAccount = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteExternalAccount(account.id, function(err, res) {
          if (!err) {
            $scope.accounts.splice(index, 1);
          }
        });
      }
    };

    $scope.updateExternalAccount = function(index) {
      $state.go('database.external_accounts.update', {id: $scope.accounts[index].id});
    };
}]);
