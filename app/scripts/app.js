var doThings = angular.module('doThings', ['ui.router', 'firebase']);

doThings.controller('doController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/tasks");

    $scope.tasks = $firebaseArray(fireRef);

  $scope.addtask = function() {
    $scope.tasks.$add( {
        'timein': $scope.timein,
        'name': $scope.name,
        'value': $scope.value,
        'done': $scope.done,

    });  

  };

});

// Firebase.ServerValue.TIMESTAMP
// To get the actual server time from Firebase for a write of some kind, 
// you would first write to Firebase 
// (i.e. ref.child('updated_at').set(Firebase.ServerValue.TIMESTAMP); 
// and have listeners for that data 
// (ref.on('value', function(snapshot) { // snapshot.val().updated_at });). 
// There is no way to get the server time synchronously from Firebase, 
// but the local time + server offset time (provided immediately whenever 
// you write to Firebase using the ServerValue) is a good approximation.
