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
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      'name': 'Bri',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/489160108774260736/PSv_GCo5_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amett'
    },
    {
      'name': 'Ali King',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/439185473571803136/-Gmvwc7w_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'Thomas Dutrion',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/491894858810798081/EOS8PjU7_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'Greg Dickson',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/429703437874262016/FsmslRN4_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'Al Bennett',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/85281511/wallpaper3-1280x1024_400x400.jpg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'Jordi Febrer',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/3658478259/c5543d8c8da9aef45d28eaa84d421bad_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'James',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/213732946/twitter_400x400.jpg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      'name': 'Nev Stokes',
      'profile_image_url': 'https://pbs.twimg.com/profile_images/1737771103/406696_10150481506191761_542356760_9044662_119149663_n_400x400.jpeg',
      'tweet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ];

  $scope.start = function() {
    $scope.interval = $interval(function() {

      var nonRemovedUsers = _.filter($scope.users, function(user) {
        if(!user.removed && !user.highlighted) {
          return user;
        }
      });

      _.each($scope.users, function(user) {
        user.highlighted = false;
      });

      var user = nonRemovedUsers[Math.floor(Math.random() * nonRemovedUsers.length)];
      
      user.highlighted = true;

    }, 100);
  };

  $scope.stop = function() {
    if(angular.isDefined($scope.interval)) {
      var timeout = randomIntFromInterval(100, 400);
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
