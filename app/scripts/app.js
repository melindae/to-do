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

doThings.controller('doController', function($scope, $firebaseArray, $firebaseObject) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/chris/tasks");
  var fireCol = new Firebase("https://blinding-fire-8984.firebaseio.com/chris/colors");
  var fireCss = new Firebase("https://blinding-fire-8984.firebaseio.com/chris/colors/css");
  var fireTime = Firebase.ServerValue.TIMESTAMP;
  $scope.tasks = $firebaseArray(fireRef);
  $scope.colors = $firebaseObject(fireCol);
  var cssNow = $firebaseObject(fireCss);


  //  retrieve and apply CSS preference
  cssNow.$bindTo($scope, "data").then(function() {
    currentCss = $scope.data.$value
    console.log($scope.data.$value); 
    console.log(currentCss);

    var oldlink = document.getElementsByTagName("link").item(0);
    var newlink = document.createElement("link");

    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", currentCss);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
  });

  //  change and save CSS preference
  $scope.changeCSS = function(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
    var newlink = document.createElement("link");

    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);


    $scope.colors.css = cssFile
    $scope.colors.$save().then(function(ref) {
      ref.key() === $scope.colors.$id; // true
    }, function(error) {
      console.log("Error:", error);
    });

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
  }



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

    if ((oneWeekAgo < taskTime) 
      && (taskDone !== 'Yes!') 
      && ((taskType == $scope.taskSee) || ($scope.taskSee == 'All')))
      return true
  };
});

doThings.controller('oldController', function($scope, $firebaseArray) {
  var fireRef = new Firebase("https://blinding-fire-8984.firebaseio.com/chris/tasks");
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

    if (((oneWeekAgo > taskTime) || (taskDone == 'Yes!'))
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