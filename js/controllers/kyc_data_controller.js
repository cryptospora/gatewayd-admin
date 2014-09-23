rippleGatewayApp.controller('KycDataCtrl', [
  '$scope', 'UserService', '$state', 'ApiService', '$window',
  function($scope, $user, $state, $api, $window) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.data = [];

    $api.getKycData(function(err, res) {
      if (!err) {
        $scope.data = res.kyc_data;
      }
    });

    $scope.deleteKycDatum = function(index) {
      var datum = $scope.data[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteKycDatum(datum.id, function(err, res) {
          if (!err) {
            $scope.data.splice(index, 1);
          }
        });
      }
    };

    $scope.updateKycDatum = function(index) {
      $state.go('database.kyc_data.update', {id: $scope.data[index].id});
    };
}]);
