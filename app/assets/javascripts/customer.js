(function(){
  var app = angular.module('mallesti-customer', []);

  app.directive('customerList', function(){
  return {
    restrict: 'E',
    templateUrl: 'customer-list.html',
    controller: 'CustomerController',
    controllerAs: 'customerCtrl'
  };
});

})();