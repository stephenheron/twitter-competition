var twittercompApp = angular.module('twittercompApp', []);

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

twittercompApp.controller('TwitterUserCtrl', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {

  $scope.users = [
    {
      'name': 'David Manners',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/285282358/david_400x400.jpg',
    },
    {
      'name': 'Bri',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/489160108774260736/PSv_GCo5_400x400.jpeg',
    },
    {
      'name': 'Ali King',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/439185473571803136/-Gmvwc7w_400x400.jpeg',
    },
    {
      'name': 'Thomas Dutrion',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/491894858810798081/EOS8PjU7_400x400.jpeg',
    },
    {
      'name': 'Greg Dickson',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/429703437874262016/FsmslRN4_400x400.jpeg',
    },
    {
      'name': 'Al Bennett',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/85281511/wallpaper3-1280x1024_400x400.jpg',
    },
    {
      'name': 'Jordi Febrer',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/3658478259/c5543d8c8da9aef45d28eaa84d421bad_400x400.jpeg',
    },
    {
      'name': 'James',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/213732946/twitter_400x400.jpg',
    },
    {
      'name': 'Nev Stokes',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/1737771103/406696_10150481506191761_542356760_9044662_119149663_n_400x400.jpeg',
    },
  ];

  $scope.winner = false;

  var started = false;

  $scope.start = function() {
    if(started == false) {

      started = true;

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

  $scope.stop = function() {
    if(angular.isDefined($scope.interval)) {

      started = false;

      var timeout = randomIntFromInterval(400, 700);
      $timeout(function() {
        $interval.cancel($scope.interval);
    
        _.each($scope.users, function(user) {
          if(user.highlighted == true) {
            user.removed = true;
          }
        });

        $scope.start();

      }, timeout); 
    }


    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    } 
  };

}]);
