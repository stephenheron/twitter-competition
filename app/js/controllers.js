var twittercompApp = angular.module('twittercompApp', ['ngAnimate']);

twittercompApp.directive('ngSpace', function() {
    return function (scope, element, attrs) {
      element.bind("keydown", function (event) {
        if(event.which === 32) {
          scope.$apply(function (){
            scope.$eval(attrs.ngSpace);
          });

          event.preventDefault();
        }
      });
    }
});

twittercompApp.controller('TwitterUserCtrl', ['$scope', '$timeout', '$interval', '$http', function ($scope, $timeout, $interval, $http) {

  $scope.users = false;
  $scope.winner = false;
  $scope.tweetsLoading = false;

  var started = false;
  var firstRun = false

  $scope.start = function() {
    $scope.tweetsLoading = true;
    if($scope.hashtag) {
      var request = $http({
        method: "get",
        url: "/entries.json",
        params: {
          hashtag: $scope.hashtag
        }
      });

      request.then(handleSuccess, handleFailure);
    } else {
      alert("Please enter a hashtag!");
    }

    function handleSuccess(response) {
      if(response.data.length > 1) {
        $scope.tweetsLoading = false;
        $scope.users = response.data;
        startGame();  
      } else {
        alert("Not enough tweets with that hashtag :(");
      }
    }

    function handleFailure(response) {
      alert("Something went wrong! Check the console!");
      console.log(response);
    }
  }

  function startGame() {
    if(started == false) {

      $scope.interval = $interval(function() {

        var nonRemovedAndHighlightedUsers = _.filter($scope.users, function(user) {
          if(!user.removed && !user.highlighted) {
            return user;
          }
        });
        
        var nonRemovedUsers = _.filter($scope.users, function(user) {
          if(!user.removed) {
            return user;
          }
        });
        
        _.each($scope.users, function(user) {
          user.highlighted = false;
        });

        if(nonRemovedUsers.length == 1) {
          $interval.cancel($scope.interval);
          $scope.winner = nonRemovedUsers[0];

          return;
        }

        var user = nonRemovedAndHighlightedUsers[Math.floor(Math.random() * nonRemovedAndHighlightedUsers.length)];
        
        user.highlighted = true;

      }, 100);
    }
  };

  var stopping = false;
  $scope.stop = function() {
    if(angular.isDefined($scope.interval)) {
      if(stopping === false) {
        started = false;
        stopping = true;

        var timeout = randomIntFromInterval(400, 700);
        $timeout(function() {
          $interval.cancel($scope.interval);
      
          _.each($scope.users, function(user) {
            if(user.highlighted == true) {
              user.removed = true;
            }
          
            stopping = false;
          });

          startGame(); 

        }, timeout); 
      }
    }


    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    } 
  };

}]);
