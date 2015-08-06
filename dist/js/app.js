(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var doThings = angular.module('doThings', ['ui.router', 'firebase']);

doThings.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '',
      controller: 'doController',
      templateUrl: 'templates/home.html'
    })
    .state('old', {
      url: '/oldtask',
      controller: 'oldController',
      templateUrl: 'templates/oldtask.html',
    })
    .state('otherwise', {
      url: '*path',
      controller: 'doController',
      templateUrl: 'templates/home.html'
    });

}]);

doThings.controller('doController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");
  var fireTime = Firebase.ServerValue.TIMESTAMP;

  $scope.tasks = $firebaseArray(fireRef);
  $scope.thing = {
    name: ""
  };
  $scope.taskSee = 'All';

  // document.addEventListener( 
  //   'touchstart', 
  //    function( event ){
  //     console.log('target', event.target);
  //     console.log( event );
  //   }
  // );

  $scope.addtask = function() {
    $scope.tasks.$add({
      'timein': fireTime,
      'name': $scope.thing.name,
      'type': $scope.type,
      'priority': $scope.priority,
      'done': "No", //'done' defaults to 'No' here
    });

    $scope.thing.name = "";
  };

  $scope.showtask = function(taskTime, taskDone, taskType) {
    var oneWeekAgo = new Date()
      .getTime() - 1000 * 60 * 60 * 24 * 7,
      oneDayAgo = new Date()
      .getTime() - 1000 * 60 * 60 * 24, //for testing
      oneHourAgo = new Date()
      .getTime() - 1000 * 60 * 60; //for testing

    if ((oneDayAgo < taskTime) 
      && (taskDone !== 'Yes!') 
      && ((taskType == $scope.taskSee) || ($scope.taskSee == 'All')))
      return true
  };
});

doThings.controller('oldController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");
  var fireTime = Firebase.ServerValue.TIMESTAMP;

  $scope.tasks = $firebaseArray(fireRef);
  $scope.taskSee = 'All';

  $scope.showtask = function(taskTime, taskDone, taskType) {
    var oneWeekAgo = new Date()
      .getTime() - 1000 * 60 * 60 * 24 * 7,
      oneDayAgo = new Date()
      .getTime() - 1000 * 60 * 60 * 24, //for testing
      oneHourAgo = new Date()
      .getTime() - 1000 * 60 * 60; //for testing

    if (((oneDayAgo > taskTime) || (taskDone == 'Yes!'))
      && ((taskType == $scope.taskSee) || ($scope.taskSee == 'All')))
      return true
  };
});

doThings.directive('taskComplete', function() {
  return {
    restrict: 'A',
    template: "<button class='tableDone fa fa-check-square-o' ng-click='taskDone(task)'></button>",

    link: function($scope, element, attrs) {
      $scope.taskDone = function(task) {
        var taskIndex = $scope.tasks.indexOf(task);
        $scope.tasks[taskIndex].done = "Yes!";
        $scope.tasks.$save(taskIndex)
          .then(function(fireRef) {
            fireRef.key() === $scope.tasks[taskIndex].$id;
          });
      }
    }
  }
});

doThings.directive('taskDelete', function() {
  return {
    restrict: 'A',
    template: "<button class='tableDone fa fa-minus-square-o' ng-click='taskDelete(task)'></button>",
    link: function($scope, element, attrs) {
      $scope.taskDelete = function(task) {
        var taskIndex = $scope.tasks.indexOf(task);
        $scope.tasks.$remove(taskIndex)
          .then(function(fireRef) {
            fireRef.key() === $scope.tasks[taskIndex].$id;
          });
      }
    }
  }
});




/*doThings.directive('showtask', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: 
    template: "<tr ng-repeat='task in tasks' ng-show='showtask(task.timein, task.done, task.type)'>",
    link :function($scope, elemant, attrs) {
      $scope.showtask = function(taskTime, taskDone, taskType) {
        var oneWeekAgo = new Date().getTime()-1000*60*60*24*7, 
            oneDayAgo = new Date().getTime()-1000*60*60*24, //for testing
            oneHourAgo = new Date().getTime()-1000*60*60; //for testing

        if (( oneDayAgo < taskTime) 
          && (taskDone !== 'Yes!')
          && ((taskType == $scope.taskSee) || ($scope.taskSee == 'All'))
        )
        return true
      };
    }
  }

})*/

},{}]},{},[1]);