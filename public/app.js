var app = angular.module("listaEstados", []);
app.controller("estadoController", function($scope, estadosService) {
    $scope.estados = [];
    $scope.estado = {
        titulo: "",
        imagem: ""
    };
    loadRemoteData();
    $scope.addEstado = function() {
        $scope.estados.push($scope.estado);
        //estadosService.addEstado($scope.estado).then(loadRemoteData,function(errorMessage) {console.warn(errorMessage);});
        $scope.estado.titulo = "";
        $scope.estado.imagem = "";
    };
    $scope.removeEstado = function(index) {
        if (index > -1) {
            $scope.estados.splice(index, 1);
        }
        //estadosService.removeEstado(estado.id).then(loadRemoteData);
    };

    function applyRemoteData(newEstados) {
        $scope.estados = newEstados;
    }

    function loadRemoteData() {
        estadosService.getEstados().then(function(estados) {
                applyRemoteData(estados);
            }
        );
    }
});
app.service(
    "estadosService",
    function($http, $q) {
        return ({
            addEstado: addEstado,
            getEstados: getEstados,
            removeEstado: removeEstado
        });

        function addEstado(titulo) {
            var request = $http({
                method: "post",
                url: "https://gist.githubusercontent.com/jacksonfdam/68dd8e61b0316d029ea8/raw/1a211e3c19fca94a2c7c6058ee948b861ac5ed24/bandeiras.json?callback=JSON_CALLBACK",
                params: {
                    action: "add"
                },
                data: {
                    titulo: titulo
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function getEstados() {
            var request = $http({
                method: "get",
                url: "https://gist.githubusercontent.com/jacksonfdam/68dd8e61b0316d029ea8/raw/1a211e3c19fca94a2c7c6058ee948b861ac5ed24/bandeiras.json?callback=JSON_CALLBACK",
                params: {
                    action: "get"
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function removeEstado(id) {
            var request = $http({
                method: "delete",
                url: "https://gist.githubusercontent.com/jacksonfdam/68dd8e61b0316d029ea8/raw/1a211e3c19fca94a2c7c6058ee948b861ac5ed24/bandeiras.json?callback=JSON_CALLBACK",
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function handleError(response) {
            if (!angular.isObject(response.data) ||
                !response.data.message
            ) {
                return ($q.reject("An unknown error occurred."));
            }
            return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
            return (response.data);
        }
    }
);

