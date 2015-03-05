(function(){
  var app = angular.module('mallesti-customer', ['ui.router']);

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
  
  scope.removeCustomer = function (customer){

  if(confirm("Estas seguro de borrar cliente" + customer.name + "?")){
   $http.delete("/customers/" + customer.id + ".json")
    .success(function(){
      //busco el indice del array que contiene el objeto customer
      var index = scope.customers.indexOf(customer);
      //borra la posicion index del array
      scope.customers.splice(index, 1);
    })
    }
  };
 }]);

 app.controller('CustomerIdController', ['$http', '$state', function($http, $state){
  var scope = this;
  scope.customer = [];

  $http.get("/customers/" + $state.params.id + ".json") //este id es el que ponermos en el state que en la url (customers/:id) 
    .success(function(data){
      scope.customer = data.customer;
    })
  }]);

})();