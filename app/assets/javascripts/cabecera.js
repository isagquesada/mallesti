(function(){
var app = angular.module('mallesti-cabecera', ['ui.router', 'mallesti-auth']);

app.directive('cabeceraMallesti', function(){
  return {
    restrict: 'E',
    templateUrl: 'cabecera-mallesti.html',
    controller: 'CabeceraController',
    controllerAs: 'cabecera'
  };
});

app.controller(
    "CabeceraController",
    ['$http', '$state', 'AuthService', function($http, $state, AuthService){
      
      var scope = this;
      scope.email=AuthService.currentUserEmail();


      scope.logout = function() {
        AuthService.destroyUser();
        $state.go("login");
      };
    }]
  );

})();