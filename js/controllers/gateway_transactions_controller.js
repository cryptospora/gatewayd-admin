rippleGatewayApp.controller('GatewayTransactionsCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transactions = [];

    $api.getGatewayTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.gateway_transactions;
      }
    });

    $scope.deleteGatewayTransaction = function(index) {
      var transaction = $scope.transactions[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteGatewayTransaction(transaction.id, function(err, res) {
          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };

    $scope.updateGatewayTransaction = function(index) {
      $state.go('database.gateway_transactions.update', {id: $scope.transactions[index].id});
    };
}]);
