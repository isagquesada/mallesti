(function(){
  var app = angular.module('mallesti', ['templates', 'mallesti-customer', 'ui.router']);

  app.config(function($urlRouterProvider, $stateProvider){
  // Para las urls que no se encuentren, redirigimos a la raíz.
  $urlRouterProvider.otherwise("/customers");

  // Aquí establecemos los estados de nuestra applicación.
  $stateProvider
    .state("customers", {
      url: "/customers",
      templateUrl: "customer-list.html",
      controller: "CustomerController",
      controllerAs: "customerCtrl"
    })

    $stateProvider
    .state("customer", {
      url: "/customers/:id",
      templateUrl: "customer-id.html",
      controller: "CustomerIdController",
      controllerAs: "customeridCtrl"
    })

});

})();