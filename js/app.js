var rippleGatewayApp = angular.module('rippleGatewayApp', [
  'ngRoute'
]);

rippleGatewayApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('setup', {
        url: '/setup',
        controller: 'SetupCtrl',
        templateUrl: 'views/setup.html'
      })
      .state('register', {
        url: '/register',
        controller: 'RegistrationCtrl',
        templateUrl: 'views/register.html'
      })
      .state('overview', {
        url: '/overview',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/overview.html'
      })
      .state('deposits', {
        url: '/deposits',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/deposits.html'
      })
      .state('withdrawals', {
        url: '/withdrawals',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/withdrawals.html'
      })
      .state('users', {
        url: '/users',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/users.html'
      })
      .state('users.user', {
        url: '/users/:id',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/user.html'
      })
      .state('account', {
        url: '/account',
        controller: 'UserCtrl',
        templateUrl: 'views/user/account.html'
      })
      .state('deposit', {
        url: '/deposit',
        controller: 'AccountCtrl',
        templateUrl: 'views/user/deposit.html'
      })
      .state('withdraw', {
        url: '/withdraw',
        controller: 'AccountCtrl',
        templateUrl: 'views/user/withdraw.html'
      })
      .state('database.external_accounts', {
        url: '/database/external_accounts',
        controller: 'ExternalAccountsCtrl',
        templateUrl: '/views/database/externalAccounts.html'
      })
      .state('database.external_accounts.new', {
        url: '/database/external_accounts/new',
        controller: 'NewExternalAccountsCtrl',
        templateUrl: '/views/database/newExternalAccounts.html'
      })
      .state('database.external_transactions', {
        url: '/database/external_transactions',
        controller: 'ExternalTransactionsCtrl',
        templateUrl: '/views/database/externalTransactions.html'
      })
      .state('database.external_transactions.new', {
        url: '/database/external_transactions/new',
        controller: 'NewExternalTransactionsCtrl',
        templateUrl: '/views/database/newExternalTransactions.html'
      })
      .state('database.gateway_transactions', {
        url: '/database/gateway_transactions',
        controller: 'GatewayTransactionsCtrl',
        templateUrl: '/views/database/gatewayTransactions.html'
      })
      .state('/database/gateway_transactions/new', {
        url: '/database/gateway_transactions/new',
        controller: 'NewGatewayTransactionsCtrl',
        templateUrl: '/views/database/newGatewayTransactions.html'
      })
      .state('database.kyc_data', {
        url: '/database/kyc_data',
        controller: 'KycDataCtrl',
        templateUrl: '/views/database/kycData.html'
      })
      .state('database.kyc_data/new', {
        url: '/database/kyc_data/new',
        controller: 'NewKycDataCtrl',
        templateUrl: '/views/database/newKycData.html'
      })
      .state('database.policies', {
        url: '/database/policies',
        controller: 'PoliciesCtrl',
        templateUrl: '/views/database/policies.html'
      })
      .state('database.policies.new', {
        url: '/database/policies/new',
        controller: 'NewPoliciesCtrl',
        templateUrl: '/views/database/newPolicies.html'
      })
      .state('database.ripple_addresses', {
        url: '/database/ripple_addresses',
        controller: 'RippleAddressesCtrl',
        templateUrl: '/views/database/rippleAddresses.html'
      })
      .state('database.ripple_addresses.new', {
        url: '/database/ripple_addresses/new',
        controller: 'RippleAddressesFormCtrl',
        templateUrl: '/views/database/rippleAddressesForm.html'
      })
      .state('database.ripple_addresses.update', {
        url: '/database/ripple_addresses/:id/update',
        controller: 'RippleAddressesFormCtrl',
        templateUrl: '/views/database/rippleAddressesForm.html'
      })
      .state('database.ripple_transactions', {
        url: '/database/ripple_transactions',
        controller: 'RippleTransactionsCtrl',
        templateUrl: '/views/database/rippleTransactions.html'
      })
      .state('database.ripple_transactions.new', {
        url: '/database/ripple_transactions/new',
        controller: 'RippleTransactionsFormCtrl',
        templateUrl: '/views/database/rippleTransactionsForm.html'
      })
      .state('database.ripple_transactions.update', {
        url: '/database/ripple_transactions/:id/update',
        controller: 'RippleTransactionsFormCtrl',
        templateUrl: '/views/database/rippleTransactionsForm.html'
      })
      .state('database.users', {
        url: '/database/users',
        controller: 'UsersCtrl',
        templateUrl: '/views/database/users.html'
      })
      .state('database.users.:id.update', {
        url: '/database/users/:id/update',
        controller: 'UsersFormCtrl',
        templateUrl: '/views/database/usersForm.html'
      })
      .state('database.users.new', {
        url: '/database/users/new',
        controller: 'NewUsersCtrl',
        templateUrl: '/views/database/newUsers.html'
      });
  }
]);
/*
rippleGatewayApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'views/login.html'
    }).
    when('/setup', {
      controller: 'SetupCtrl',
      templateUrl: 'views/setup.html'
    }).
    when('/register', {
      controller: 'RegistrationCtrl',
      templateUrl: 'views/register.html'
    }).
    when('/overview', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/overview.html'
    }).
    when('/deposits', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/deposits.html'
    }).
    when('/withdrawals', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/withdrawals.html'
    }).
    when('/users', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/users.html'
    }).
    when('/users/:id', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/user.html'
    }).
    when('/account', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/account.html'
    }).
    when('/deposit', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/deposit.html'
    }).
    when('/withdraw', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/withdraw.html'
    }).
    when('/account', {
      controller: 'UserCtrl',
      templateUrl: 'views/user/account.html'
    }).
    when('/database/external_accounts', {
      controller: 'ExternalAccountsCtrl',
      templateUrl: '/views/database/externalAccounts.html'
    }).
    when('/database/external_accounts/:id/update', {
      controller: 'ExternalAccountsFormCtrl',
      templateUrl: '/views/database/externalAccountsForm.html'
    }).
    when('/database/external_accounts/new', {
      controller: 'ExternalAccountsFormCtrl',
      templateUrl: '/views/database/externalAccountsForm.html'
    }).
    when('/database/external_transactions', {
      controller: 'ExternalTransactionsCtrl',
      templateUrl: '/views/database/externalTransactions.html'
    }).
    when('/database/external_transactions/:id/update', {
      controller: 'ExternalTransactionsFormCtrl',
      templateUrl: '/views/database/externalTransactionsForm.html'
    }).
    when('/database/external_transactions/new', {
      controller: 'ExternalTransactionsFormCtrl',
      templateUrl: '/views/database/externalTransactionsForm.html'
    }).
    when('/database/gateway_transactions', {
      controller: 'GatewayTransactionsCtrl',
      templateUrl: '/views/database/gatewayTransactions.html'
    }).
    when('/database/gateway_transactions/:id/update', {
      controller: 'GatewayTransactionsFormCtrl',
      templateUrl: '/views/database/gatewayTransactionsForm.html'
    }).
    when('/database/gateway_transactions/new', {
      controller: 'GatewayTransactionsFormCtrl',
      templateUrl: '/views/database/gatewayTransactionsForm.html'
    }).
    when('/database/kyc_data', {
      controller: 'KycDataCtrl',
      templateUrl: '/views/database/kycData.html'
    }).
    when('/database/kyc_data/:id/update', {
      controller: 'KycDataFormCtrl',
      templateUrl: '/views/database/kycDataForm.html'
    }).
    when('/database/kyc_data/new', {
      controller: 'KycDataFormCtrl',
      templateUrl: '/views/database/kycDataForm.html'
    }).
    when('/database/policies', {
      controller: 'PoliciesCtrl',
      templateUrl: '/views/database/policies.html'
    }).
    when('/database/policies/:id/update', {
      controller: 'PoliciesFormCtrl',
      templateUrl: '/views/database/policiesForm.html'
    }).
    when('/database/policies/new', {
      controller: 'PoliciesFormCtrl',
      templateUrl: '/views/database/policiesForm.html'
    }).
    when('/database/ripple_addresses', {
      controller: 'RippleAddressesCtrl',
      templateUrl: '/views/database/rippleAddresses.html'
    }).
    when('/database/ripple_addresses/:id/update', {
      controller: 'RippleAddressesFormCtrl',
      templateUrl: '/views/database/rippleAddressesForm.html'
    }).
    when('/database/ripple_addresses/new', {
      controller: 'RippleAddressesFormCtrl',
      templateUrl: '/views/database/rippleAddressesForm.html'
    }).
    when('/database/ripple_transactions', {
      controller: 'RippleTransactionsCtrl',
      templateUrl: '/views/database/rippleTransactions.html'
    }).
    when('/database/ripple_transactions/:id/update', {
      controller: 'RippleTransactionsFormCtrl',
      templateUrl: '/views/database/rippleTransactionsForm.html'
    }).

    when('/database/ripple_transactions/new', {
      controller: 'RippleTransactionsFormCtrl',
      templateUrl: '/views/database/rippleTransactionsForm.html'
    }).
    when('/database/users', {
      controller: 'UsersCtrl',
      templateUrl: '/views/database/users.html'
    }).
    when('/database/users/:id/update', {
      controller: 'UsersFormCtrl',
      templateUrl: '/views/database/usersForm.html'
    }).
    when('/database/users/new', {
      controller: 'UsersFormCtrl',
      templateUrl: '/views/database/usersForm.html'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }
]);
