app.controller("clientesController", function ($scope, $http) {
    $scope.clientes = [];
    $scope.novoCliente = {};
    $scope.editingCliente = null;

    // Obter todos os clientes
    $scope.getClientes = function () {
        $http.get("/api/clientes")
            .then(function (response) {
                $scope.clientes = response.data;
            })
            .catch(function (error) {
                console.error("Erro ao buscar clientes:", error);
            });
    };

    // Adicionar cliente
    $scope.adicionarCliente = function () {
        $http.post("/api/clientes", $scope.novoCliente)
            .then(function (response) {
                $scope.clientes.push(response.data); // Atualiza a lista
                $scope.novoCliente = {}; // Limpa o formulário
            })
            .catch(function (error) {
                console.error("Erro ao adicionar cliente:", error);
                alert("Erro ao adicionar cliente.");
            });
    };

    // Iniciar edição do cliente
    $scope.editarCliente = function (cliente) {
        $scope.editingCliente = angular.copy(cliente); // Cópia para edição
    };

    // Salvar edição do cliente
    $scope.salvarCliente = function () {
        const cliente = $scope.editingCliente;
        $http.put(`/api/clientes/${cliente._id}`, cliente)
            .then(function (response) {
                const index = $scope.clientes.findIndex(c => c._id === cliente._id);
                $scope.clientes[index] = response.data; // Atualiza a lista
                $scope.editingCliente = null; // Cancela edição
            })
            .catch(function (error) {
                console.error("Erro ao editar cliente:", error);
                alert("Erro ao salvar alterações.");
            });
    };

    // Cancelar edição
    $scope.cancelarEdicao = function () {
        $scope.editingCliente = null; // Cancela o estado de edição
    };

    // Deletar cliente
    $scope.removerCliente = function (id) {
        if (confirm("Tem certeza que deseja deletar este cliente?")) {
            $http.delete(`/api/clientes/${id}`)
                .then(function () {
                    $scope.clientes = $scope.clientes.filter(c => c._id !== id); // Remove da lista
                })
                .catch(function (error) {
                    console.error("Erro ao deletar cliente:", error);
                    alert("Erro ao deletar cliente.");
                });
        }
    };

    // Inicializa a lista de clientes
    $scope.getClientes();
});
