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
  
  var done = "active";
  
  $scope.tasks = $firebaseArray(fireRef);

  $scope.addtask = function() {
    $scope.tasks.$add( {
        'timein': 3,   // '3' is placeholder. Generate 'timein' timestamp
        'name': $scope.name,
        'priority': $scope.priority,
        'done': "active",  // done defaults to 'active' here

    });  

  };

});

// variables:
// timein = firebase generated TIMESTAMP
// name = task name (string)
// priority = priority (h/m/l)
// done = task complete toggle (active/expired/complete)
// -active will be default value at entry
// -user toggling the "done" button will set value to complete
// -systen will do a check at undetermined interval to see if 
//   task timestamp has age of 7 days. then will mark "expired" if "active"


// Firebase.ServerValue.TIMESTAMP
// To get the actual server time from Firebase for a write of some kind, 
// you would first write to Firebase 
// (i.e. ref.child('updated_at').set(Firebase.ServerValue.TIMESTAMP); 
// and have listeners for that data 
// (ref.on('value', function(snapshot) { // snapshot.val().updated_at });). 
// There is no way to get the server time synchronously from Firebase, 
// but the local time + server offset time (provided immediately whenever 
// you write to Firebase using the ServerValue) is a good approximation.
