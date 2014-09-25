var rippleGatewayApp = angular.module('rippleGatewayApp', ['ui.router', 'restangular']);

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
      .state('database', {
        url: '/database',
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('database.external_accounts', {
        url: '/external_accounts',
        controller: 'ExternalAccountsCtrl',
        templateUrl: '/views/database/externalAccounts.html'
      })
      .state('database.external_accounts.new', {
        data: {
          type: 'create'
        },
        views: {
          "account-form": {
            controller: 'ExternalAccountsCtrl',
            templateUrl: '/views/database/externalAccountsForm.html' }
        }
      })
      .state('database.external_accounts.update', {
        data: {
          type: 'update'
        },
        views: {
          "account-form": {
            controller: 'ExternalAccountsCtrl',
            templateUrl: '/views/database/externalAccountsForm.html' }
        }
      })
      .state('database.external_transactions', {
        url: '/external_transactions',
        controller: 'ExternalTransactionsCtrl',
        templateUrl: '/views/database/externalTransactions.html'
      })
      .state('database.external_transactions.new', {
        url: '/new',
        controller: 'ExternalTransactionsFormCtrl',
        templateUrl: '/views/database/externalTransactionsForm.html'
      })
      .state('database.external_transactions.update', {
        url: '/:id/update',
        controller: 'ExternalTransactionsFormCtrl',
        templateUrl: '/views/database/externalTransactionsForm.html'
      })
      .state('database.gateway_transactions', {
        url: '/gateway_transactions',
        controller: 'GatewayTransactionsCtrl',
        templateUrl: '/views/database/gatewayTransactions.html'
      })
      .state('database.gateway_transactions.new', {
        url: '/new',
        controller: 'GatewayTransactionsFormCtrl',
        templateUrl: '/views/database/gatewayTransactionsForm.html'
      })
      .state('database.gateway_transactions.update', {
        url: '/:id/update',
        controller: 'GatewayTransactionsFormCtrl',
        templateUrl: '/views/database/gatewayTransactionsForm.html'
      })
      .state('database.kyc_data', {
        url: '/kyc_data',
        controller: 'KycDataCtrl',
        templateUrl: '/views/database/kycData.html'
      })
      .state('database.kyc_data.new', {
        url: '/new',
        controller: 'KycDataFormCtrl',
        templateUrl: '/views/database/kycDataForm.html'
      })
      .state('database.kyc_data.update', {
        url: '/:id/update',
        controller: 'KycDataFormCtrl',
        templateUrl: '/views/database/kycDataForm.html'
      })
      .state('database.policies', {
        url: '/database/policies',
        controller: 'PoliciesCtrl',
        templateUrl: '/views/database/policies.html'
      })
      .state('database.policies.new', {
        url: '/new',
        controller: 'PoliciesFormCtrl',
        templateUrl: '/views/database/policiesForm.html'
      })
      .state('database.policies.update', {
        url: '/:id/update',
        controller: 'PoliciesFormCtrl',
        templateUrl: '/views/database/policiesForm.html'
      })
      .state('database.ripple_addresses', {
        url: '/ripple_addresses',
        controller: 'RippleAddressesCtrl',
        templateUrl: '/views/database/rippleAddresses.html'
      })
      .state('database.ripple_addresses.new', {
        url: '/new',
        controller: 'RippleAddressesFormCtrl',
        templateUrl: '/views/database/rippleAddressesForm.html'
      })
      .state('database.ripple_addresses.update', {
        url: '/:id/update',
        controller: 'RippleAddressesFormCtrl',
        templateUrl: '/views/database/rippleAddressesForm.html'
      })
      .state('database.ripple_transactions', {
        url: '/ripple_transactions',
        controller: 'RippleTransactionsCtrl',
        templateUrl: '/views/database/rippleTransactions.html'
      })
      .state('database.ripple_transactions.new', {
        url: '/new',
        controller: 'RippleTransactionsFormCtrl',
        templateUrl: '/views/database/rippleTransactionsForm.html'
      })
      .state('database.ripple_transactions.update', {
        url: '/:id/update',
        controller: 'RippleTransactionsFormCtrl',
        templateUrl: '/views/database/rippleTransactionsForm.html'
      })
      .state('database.users', {
        url: '/users',
        controller: 'UsersCtrl',
        templateUrl: '/views/database/users.html'
      })
      .state('database.users.new', {
        url: '/new',
        controller: 'UsersFormCtrl',
        templateUrl: '/views/database/usersForm.html'
      })
      .state('database.users.update', {
        url: '/:id/update',
        controller: 'UsersFormCtrl',
        templateUrl: '/views/database/usersForm.html'
      });
  }
]);
