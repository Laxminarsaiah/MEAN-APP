var EmpApp = angular.module('EmpApp', []);

EmpApp.service('EmpService', ['$http', function ($http) {

  // get all employee
  this.getAll = function (callback) {
    $http.get('/api/emp').success(function (response) {
      callback(response);
    });
  };

  // create a new Employee
  this.createEmployee = function (empObj, callback) {
    $http.post('/api/emp', empObj).success(function (response) {
      callback(response);
    });
  };

  //  update an Employee
  this.updateEmployee = function (id, empObj, callback) {
    $http.put('/api/emp/' + id, empObj).success(function (response) {
      callback(response);
    });
  };
  //  DELETE an employee
  this.deleteEmployee = function (id, callback) {
    $http.delete('/api/emp/' + id).success(function (response) {
      callback(response);
    });
  }
}]);

EmpApp.controller('EmpController', ['$scope', 'EmpService', function ($scope, EmpService) {

  $scope.tagline = 'Create,View, and Edit employee/employee details.';

  $scope.getAllEmployees = function () {
    EmpService.getAll(function (response) {
      $scope.employeeList = response;
    });
  }

  $scope.deleteEmployee = function (empId, index) {
    EmpService.deleteEmployee(empId, function (response) {
      $scope.employeeList.splice(index, 1);
      $scope.success=response.message;
    });
  }

  $scope.editEmployee = function (id, empObj, callback) {
    console.log(id+" "+JSON.stringify(empObj));
    EmpService.updateEmployee(id, empObj,function (response) {
      $scope.success=response.message;
      $scope.getAllEmployees();
    });
  }

  $scope.addEmployee = function (employeeObj) {
    EmpService.createEmployee(employeeObj, function (response) {
      $scope.success=response.message;
      $scope.getAllEmployees();
    });
  }
  $scope.getAllEmployees();

}]);
