var app = angular.module('todoApp', []);

app.controller('ToDoController', ['$http', function($http) {
  var vm = this;
  vm.task = "";
  vm.tasks = null;
  vm.deleteId = 0;

  vm.get = function() {
    $http.get('/tasks').then(function(response) {
      vm.tasks = response.data;
    });
  }

  vm.create = function() {
    $("#addModal").modal('hide');
    var task = {
      task: vm.task
    }
    $http.post('/tasks', task).then(vm.get);
    vm.task = "";
  };

  vm.complete = function(id) {
    $http.post('/tasks/' + id).then(vm.get());
  }

  vm.delete = function(id) {
    $("#deleteModal").modal('hide');
    $http.delete('/tasks/' + id).then(vm.get());
  }

  vm.confirm = function(id) {
    $("#deleteModal").modal('show');
    vm.deleteId = id;
  }

  vm.showForm = function() {
    $("#addModal").modal('show');
  }

  vm.get();
}]);
