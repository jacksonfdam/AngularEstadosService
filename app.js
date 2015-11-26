var app = angular.module("listaEstados", []);

app.controller("estadoController", function($scope, Estado){
  $scope.novoEstado = null; 
  $scope.estados = []; 

  $scope.addEstado = function(estado){
    $scope.estados.push(new Estado(estado));
    $scope.novoEstado = null;
  }

  $scope.removeEstado = function(estado){
    $scope.estados.splice($scope.estados.indexOf(estado), 1);
  }
});

app.factory("Estado",function($http){
  var Estado = function(estado){
    this.initialize = function () {
      var url = 'https://gist.githubusercontent.com/jacksonfdam/68dd8e61b0316d029ea8/raw/1a211e3c19fca94a2c7c6058ee948b861ac5ed24/bandeiras.json?callback=JSON_CALLBACK';
      var estadoData = $http.jsonp(url);
      var self = this;
      estadoData.then(function(response){
        angular.extend(self, response.data);
      });
    }

    this.titulo = function(){
      return "Estado do " + this.titulo;
    }

    this.image_src = function(){
      return this.imagem;
    } 

    this.image_elm = function(){
      return "<img src=\""+this.imagem+"\">";
    }

    this.initialize();
  }
  return (Estado);
});
