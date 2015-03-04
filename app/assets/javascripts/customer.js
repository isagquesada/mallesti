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

 app.controller('CustomerController', ['$http', function($http){
  var scope = this;
  scope.customers = [];

  $http.get('/customers.json')
    .success(function(data){
      scope.customers = data.customers;
    })
 }]);

 

})();