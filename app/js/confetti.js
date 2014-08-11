angular.module('twittercompApp')
  .directive('ngConfetti', function() {
    var NUM_CONFETTI = 350;
    var COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]];
    var PI_2 = 2*Math.PI;

    var w = 0;
    var h = 0;
        
    var xpos = 0.5;

    var context;
        
    var range = function(a, b) {
      return (b - a) * Math.random() + a;
    }
        
    var drawCircle = function(x, y, r, style) {
      context.beginPath();
      context.arc(x, y, r, 0, PI_2, false);
      context.fillStyle = style;
      return context.fill();
    };


    Confetti = (function() {
      function Confetti() {
        this.style = COLORS[~~range(0, 5)];
        this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
      }

      Confetti.prototype.replace = function() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        return this.vy = 0.7 * this.r + range(-1, 1);
      };

      Confetti.prototype.draw = function() {
        var _ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace();
        }
        if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
          this.x = (this.x + this.xmax) % this.xmax;
        }
        return drawCircle(~~this.x, ~~this.y, this.r, "" + this.rgb + "," + this.opacity + ")");
      };

      return Confetti;

    })();
        
    var confetti = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 1; 1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI; i = 1 <= NUM_CONFETTI ? ++_i : --_i) {
        _results.push(new Confetti);
      }
      return _results;
    })();


    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(attrs.ngConfetti, function(value) {
          if(value) {
          
            element.css('z-index', 10001);

            var canvas = element[0];
            context = canvas.getContext("2d");

            w = window.innerWidth;
            h = window.innerHeight;

            canvas.width = w;
            canvas.height = h;

            var step = function() {
              var c, _i, _len, _results;
              requestAnimationFrame(step);
              context.clearRect(0, 0, w, h);
              _results = [];
              for (_i = 0, _len = confetti.length; _i < _len; _i++) {
                c = confetti[_i];
                _results.push(c.draw());
              }
              return _results;
            };

            step();
          }
        });
      }
    }  
  });
