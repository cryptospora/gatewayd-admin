rippleGatewayApp.controller('KycDataFormCtrl', [
  '$scope', 'UserService', '$timeout', '$state', '$routeParams', 'ApiService',
  function($scope, $user, $timeout, $state, $routeParams, $api) {
    if (!$user.isAdmin) {
      $state.go('login');
    }

    $scope.datum = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getKycDatum($routeParams.id, function(err, res) {
        if (!err) {
          $scope.datum = res.data;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateKycDatum = function() {
      $api.updateKycDatum($routeParams.id, $scope.datum, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'KYC Data updated.';

          $timeout(function() {
            $state.go('database.kyc_data');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createKycDatum = function() {
      $api.createKycDatum($scope.datum, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'KYC Data updated.';

          $timeout(function() {
            $state.go('database.kyc_data');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
