var doThings = angular.module('doThings', ['ui.router', 'firebase']);

doThings.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  $stateProvider.state('home', {
    url: '',
    controller:'doController',
    templateUrl: '/templates/home.html'
  });

  // $stateProvider.state('new', {
  //   url: '/newtask',
  //   //controller:'doController',
  //   templateUrl: '/templates/newtask.html'
  // });

  $stateProvider.state('old', {
    url: '/oldtask',
    controller:'doController',
    templateUrl: '/templates/oldtask.html',
   });

}]);

doThings.controller('doController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");
  var fireTime = Firebase.ServerValue.TIMESTAMP;
  
  $scope.tasks = $firebaseArray(fireRef);

  $scope.addtask = function() {
    $scope.tasks.$add( {
        'timein': fireTime,
        'name': $scope.name,
        'priority': $scope.priority,
        'done': "active",  //'done' defaults to 'active' here
    });  
  };

  $scope.hidetask = function(taskTime) {

    var oneWeekAgo = new Date().getTime()-1000*60*60*24*7; 
    var oneDayAgo = new Date().getTime()-1000*60*60*24; //for testing
    var oneHourAgo = new Date().getTime()-1000*60*60; //for testing

    if (oneDayAgo > taskTime)
      return true
   };

});


// variables:
// timein = firebase generated TIMESTAMP
// name = task name (string)
// priority = priority (h/m/l)
// done = active/complete
// -active will be default value at entry
// -user toggling the "done" button will set value to complete