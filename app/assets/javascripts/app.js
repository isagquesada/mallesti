(function(){
  var app = angular.module('mallesti', ['ui.router', 'templates', 'mallesti-customer', 'mallesti-auth', 'mallesti-permission', 'mallesti-cabecera']);

  // Esto pasa el token y el email en cada petición que hagamos a la API
  app.factory("httpInterceptor", ['AuthService', function(AuthService) {
  return {
    request: function(config) {
      config.headers['X-User-Email'] = AuthService.currentUserEmail();
      config.headers['X-User-Token'] = AuthService.currentUserToken();
      return config;
    }
  };
  }]);

  app.config(function($urlRouterProvider, $stateProvider, $httpProvider){
    // Configuramos todas las peticiones para pasar el token de usuario
  $httpProvider.interceptors.push("httpInterceptor");
  // Para las urls que no se encuentren, redirigimos a la raíz.
  $urlRouterProvider.otherwise("/login");

  // Aquí establecemos los estados de nuestra applicación.
  $stateProvider

  .state("home", {
    url: "/",
    templateUrl: "home.html",
    data:{
      permissions: {
          only: ['member'],
          redirectTo: "login"
      }
    }
    })

  .state("login", {
    url: "/login",
    templateUrl: "login.html",
    controller: "LoginController",
    controllerAs: "loginCtrl"

    })
 
    .state("home.customers", {
      url: "customers",
      templateUrl: "customer-list.html",
      controller: "CustomerController",
      controllerAs: "customerCtrl"
    })
 
    .state("home.customer", {
      url: "customers/:id",
      templateUrl: "customer-id.html",
      controller: "CustomerIdController",
      controllerAs: "customeridCtrl"
    })

});

})();