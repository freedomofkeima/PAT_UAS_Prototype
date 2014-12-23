'use strict';

/* Controllers */

function CallExternalAPI($scope, $http) {
  $http.get('/api/getTicket').
      success(function(data, status, headers, config) {
        $scope.messages = data.messages;
        $scope.fresh = data.fresh;
      });
}

function BuyTicketAPI($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/getTicket/' + $routeParams.id).
    success(function(data, status, headers, config) {
      $scope._id = $routeParams.id;
      $scope.ticket = data.ticket;
    });

  $scope.buyTicket = function () {
    $http.post('/api/buyTicket/' + $routeParams.id, $scope.form).
      success(function(data) {
        alert('Pembelian tiket berhasil!');
        $location.url('/');
      });
  };
}

/*
function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}
*/
