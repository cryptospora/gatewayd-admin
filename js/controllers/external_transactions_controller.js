rippleGatewayApp.controller('ExternalTransactionsCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.transactions = [];

    $api.getExternalTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.external_transactions;
      }
    });

    $scope.deleteExternalTransaction = function(index) {
      var transaction = $scope.transactions[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteExternalTransaction(transaction.id, function(err, res) {

          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };

    $scope.updateExternalTransaction = function(index) {
      $state.go('database.external_transactions.update', {id: $scope.transactions[index].id});
    };
}]);
