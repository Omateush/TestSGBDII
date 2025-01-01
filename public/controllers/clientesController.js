app.controller("clientesController", function ($scope, $http) {
    $scope.novoCliente = {};
    $scope.clientes = [];

    // Função para adicionar cliente
    $scope.adicionarCliente = function () {
        console.log("Dados enviados para o backend:", $scope.novoCliente); // Verificar o que está sendo enviado

        $http.post("/api/clientes", $scope.novoCliente)
            .then(function (response) {
                console.log("Cliente adicionado com sucesso:", response.data);
                $scope.clientes.push(response.data); // Atualiza a lista de clientes na página
                $scope.novoCliente = {}; // Limpa o formulário
            })
            .catch(function (error) {
                console.error("Erro ao adicionar cliente:", error);
                alert("Erro ao adicionar cliente. Verifique os dados e tente novamente.");
            });
    };

    // Obter lista de clientes
    $scope.getClientes = function () {
        $http.get("/api/clientes")
            .then(function (response) {
                $scope.clientes = response.data;
            })
            .catch(function (error) {
                console.error("Erro ao buscar clientes:", error);
            });
    };

    // Inicializa a lista de clientes
    $scope.getClientes();
});
