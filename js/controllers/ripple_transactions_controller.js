rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transactions = [];

    $api.getRippleTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.ripple_transactions;
      }
    });

    $scope.deleteRippleTransaction = function(index) {
      var transaction = $scope.transactions[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteRippleTransaction(transaction.id, function(err, res) {
          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };

    $scope.updateRippleTransaction = function(index) {
      $state.go('database.ripple_transactions.update', {id: $scope.transactions[index].id});
    };
}]);
