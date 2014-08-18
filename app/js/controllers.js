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

  $scope.users = [
    {
      'name': 'David Manners',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/285282358/david_400x400.jpg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Bri',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/489160108774260736/PSv_GCo5_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Ali King',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/439185473571803136/-Gmvwc7w_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Thomas Dutrion',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/491894858810798081/EOS8PjU7_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Greg Dickson',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/429703437874262016/FsmslRN4_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Al Bennett',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/85281511/wallpaper3-1280x1024_400x400.jpg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Jordi Febrer',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/3658478259/c5543d8c8da9aef45d28eaa84d421bad_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'James',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/213732946/twitter_400x400.jpg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
    {
      'name': 'Nev Stokes',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/1737771103/406696_10150481506191761_542356760_9044662_119149663_n_400x400.jpeg',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue lorem, fermentum ut lorem eu'
    },
  ];

  $scope.winner = false;

  var started = false;
  var firstRun = false

  function firstRunFunction() {
    alert($scope.hashtag);
  }

  $scope.start = function() {
    if(started == false) {

      started = true;
      if(firstRun === false) {
        firstRun = true;
        firstRunFunction();
      }

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

          $scope.start();

        }, timeout); 
      }
    }


    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    } 
  };

}]);
