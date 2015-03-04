(function(){
  var app = angular.module('mallesti', ['templates', 'mallesti-customer']);

 app.controller('CustomerController', ['$http', function($http){
  var scope = this;
  scope.customers = [];

  $http.get('/customers.json')
    .success(function(data){
      scope.customers = data.customers;
    })
 }]);
})();