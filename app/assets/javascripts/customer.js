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

  app.directive('formCustomer', function(){
  return {
    restrict: 'E',
    templateUrl: 'form-customer.html',
    scope:{
      ctrldatos: "=", cabecera: "=",
    }
  };
});

 app.controller('CustomerController', ['$http', function($http){
  var scope = this;
  scope.customers = [];
  scope.save = {};
  scope.errors = {};

  scope.mostrar = false;

  $http.get('/customers.json')
    .success(function(data){
      scope.customers = data.customers;
    })

    scope.on = function(){
      scope.mostrar = !scope.mostrar;
    }

  
    scope.save = function(){
      
    $http.post(
      "/customers.json/",
      {customer: scope.model}
    )
    .success(function(data){
      scope.customers.push(data.customer);
      scope.model={};
      scope.errors = {};
    })
    .error(function(data){
      scope.errors = data.errors;
    })
  };
  
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
  scope.customer = {};
  scope.mostrar = false;
  scope.model = {};
  scope.errors = {};

  scope.on = function(){
      scope.mostrar = !scope.mostrar;
    }

  $http.get("/customers/" + $state.params.id + ".json") //este id es el que ponermos en el state que en la url (customers/:id) 
    .success(function(data){
      scope.customer = data.customer;
      angular.copy(data.customer, scope.model);
    });

  scope.save = function(){
      
    $http.put(
      "/customers/" + scope.customer.id + ".json", 
      {customer: scope.model}
    )
   .success(function() {
      angular.copy(scope.model, scope.customer);
      scope.mostrar = false;
      scope.errors = {};
    })
    .error(function(data){
      scope.errors = data.errors;
    })
  };

  }]);



})();




