var doThings = angular.module('doThings', ['ui.router', 'firebase']);

doThings.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
$locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '',
    controller:'doController',
    templateUrl: 'templates/home.html'
  })
  .state('old', {
    url: '/oldtask',
    controller:'oldController',
    templateUrl: 'templates/oldtask.html',
   })
  .state('otherwise', {
    url: '*path',
    controller:'doController',
    templateUrl: 'templates/home.html'
  });

}]);

doThings.controller('doController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");
  var fireTime = Firebase.ServerValue.TIMESTAMP;
  
  $scope.tasks = $firebaseArray(fireRef);

  $scope.thing = { name: "" };

  // document.addEventListener( 
  //   'touchstart', 
  //    function( event ){
  //     console.log('target', event.target);
  //     console.log( event );
  //   }
  // );

  $scope.addtask = function() {
    $scope.tasks.$add( {
        'timein': fireTime,
        'name': $scope.thing.name,
        'priority': $scope.priority,
        'done': "active",  //'done' defaults to 'active' here
    });

    $scope.thing.name = "";
  };

  $scope.hidetask = function(taskTime, taskDone) {
    var oneWeekAgo = new Date().getTime()-1000*60*60*24*7, 
        oneDayAgo = new Date().getTime()-1000*60*60*24, //for testing
        oneHourAgo = new Date().getTime()-1000*60*60; //for testing

    if ((oneDayAgo > taskTime) || (taskDone == 'complete'))
      return true
   };

});

doThings.controller('oldController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");
  var fireTime = Firebase.ServerValue.TIMESTAMP;
  
  $scope.tasks = $firebaseArray(fireRef);

  $scope.hidetask = function(taskTime, taskDone) {
    var oneWeekAgo = new Date().getTime()-1000*60*60*24*7; 
    var oneDayAgo = new Date().getTime()-1000*60*60*24; //for testing
    var oneHourAgo = new Date().getTime()-1000*60*60; //for testing

    if ((oneDayAgo > taskTime) || (taskDone == 'complete'))
      return true
   };

});
    