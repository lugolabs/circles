// circles
// copyright Artan Sinani
// https://github.com/lugolabs/circles

/*
  Lightwheight JavaScript library that generates circular graphs in SVG.

  Call Circles.create(options) with the following options:

    id         - the DOM element that will hold the graph
    percentage - the percentage dictating the smaller circle
    radius     - the radius of the circles
    width      - the width of the ring (optional, has value 10, if not specified)
    number     - the number to display at the centre of the graph (optional, the percentage will show if not specified)
    text       - the text to display after the number (optional, nothing will show if not specified)
    colors     - an array of colors, with the first item coloring the full circle 
                 (optional, it will be `['#EEE', '#F00']` if not specified)
    duration   - value in ms of animation duration; (optional, defaults to 500); 
                 if `null` is passed, the animation will not run

  API:
    updateRadius(radius) - regenerates the circle with the given radius (see spec/responsive.html for an example hot to create a responsive circle)
    update(value) - update value of circle. If value is set to true, force the update of displaying

*/

(function() {
  
  var requestAnimFrame = function(circle)
  {
	  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function (callback) {
			  setTimeout(callback, circle._interval);
		  }
  },

  Circles = window.Circles = function(options) {
    var elId = options.id;
    this._el = document.getElementById(elId);

    if (this._el === null) return;


    this._radius         = options.radius;

	this._value          = 0;
  	this._maxValue       = options.maxValue || 100;

  	//this._percentage     = options.percentage;
    this._text           = options.text === undefined ? function(value){return value;} : options.text;
    //this._number         = options.number || this._percentage;
    this._strokeWidth    = options.width  || 10;
    this._colors         = options.colors || ['#EEE', '#F00'];
    this._interval       = 16;
	this._svg            = null;
	this._wrapContainer  = null;
    this._textContainer  = null;
    //this._textClass      = 'circles-text';
    //this._numberClass    = 'circles-number';

    //this._confirmAnimation(options.duration);

    var endAngleRad      = Math.PI / 180 * 270;
    this._start          = -Math.PI / 180 * 90;
    this._startPrecise   = this._precise(this._start);
    this._circ           = endAngleRad - this._start;

    this.generate().update(options.value || 0);

    //if (this._canAnimate) this._animate();
  };

  Circles.prototype = {
    VERSION: '0.0.5',

    generate: function() {

      this._svgSize        = this._radius * 2;
      this._radiusAdjusted = this._radius - (this._strokeWidth / 2);

	  this._generateSvg()._generateText()._generateWrapper();

	  this._el.innerHTML = '';
      this._el.appendChild(this._wrapContainer);

	  return this;
    },

	updateRadius: function(radius)
	{
		this._radius = radius;

		return this.generate().update(true);
	},

    /*_confirmAnimation: function(duration) {
      if (duration === null) {
        this._canAnimate = false;
        return;
      }

      duration = duration || 500;

      var step     = duration / this._interval,
		percent = this.getPercent(),
        pathFactor = percentage / step,
        numberFactor = this._value / step;

      if (percent <= (1 + pathFactor)) {
        this._canAnimate = false;
      } else {
        this._canAnimate   = true;
        this._pathFactor   = pathFactor;
        this._numberFactor = numberFactor;
      }
    },*/

	getPercent: function()
	{
		return (this._value * 100) / this._maxValue;
	},

	getValueFromPercent: function(percentage)
	{
		return (this._maxValue * percentage) / 100;
	},
	
	update: function(value)
	{
		if(value === true) //Force update with current value
		{
			var percent	=	this.getPercent();
			this._el.getElementsByTagName('path')[1].setAttribute('d', this._calculatePath(percent, true));
			this._textContainer.innerHTML	=	this._getText(this._value);
			return this;
		}

		//Else update with new value
		if(this._value == value || isNaN(value))
			return this;

		var self			=	this,
			path    		=	self._el.getElementsByTagName('path')[1],
			oldPercentage	=	self.getPercent(),
			newPercentage, isGreater;

		this._value	=	Math.min(this._maxValue, Math.max(0, value));

		newPercentage	=	self.getPercent();
		isGreater		=	newPercentage > oldPercentage;

		function animate() {
			if(isGreater)
				oldPercentage++;
			else
				oldPercentage--;

			if ((isGreater && oldPercentage > newPercentage) || ( ! isGreater && oldPercentage < newPercentage))
				return;

			path.setAttribute('d', self._calculatePath(oldPercentage, true));
			self._textContainer.innerHTML	=	self._getText(self.getValueFromPercent(oldPercentage));

			requestAnimFrame(self)(animate);
		}

		requestAnimFrame(self)(animate);

		return this;
	},

    /*_animate: function() {
      var i      = 1,
        self     = this,
        path     = this._el.getElementsByTagName('path')[1],
        numberEl = this._textContainer,
		percent  = self.getPercent(),

        isInt    = this._value % 1 === 0,

        animate = function() {
          var percentage   = self._pathFactor * i,
            nextPercentage = self._pathFactor * (i + 1),
            number         = self._numberFactor * i,
            canContinue    = true;

          if (isInt) {
            number = Math.round(number);
          }
          if (nextPercentage > percent) {
            percentage  = percent;
            number      = self._value;
            canContinue = false;
          }
          if (percentage > percent) return;
          path.setAttribute('d', self._calculatePath(percentage, true));
          numberEl.innerHTML = self._getText(number);
          i++;
          if (canContinue) requestAnimFrame(self)(animate);
        };

      requestAnimFrame(self)(animate);
    },*/

    _generateWrapper: function() {
      	this._wrapContainer	=	document.createElement('div');
		this._wrapContainer.style.position	=	'relative';
		this._wrapContainer.style.display	=	'inline-block';

		this._wrapContainer.appendChild(this._svg);
		this._wrapContainer.appendChild(this._textContainer);

		return this;
    },

    _generateText: function() {

		this._textContainer = document.createElement('div');

		var style	=	{
			position: 'absolute',
			top: 0,
			left: 0,
			textAlign: 'center',
			width: '100%',
			fontSize: (this._radius * .7) + 'px',
			height: this._svgSize + 'px',
			lineHeight: this._svgSize + 'px'
		};

		for(var prop in style)
			this._textContainer.style[prop]	=	style[prop];

		this._textContainer.innerHTML	=	this._getText(0);

		return this;
    },

	_getText: function(value)
	{
		if(value === undefined)
			value = this._value;

		value = parseFloat(value.toFixed(2));

		return typeof this._text === 'function' ? this._text.call(this, value) : this._text;
	},

    _generateSvg: function() {

	  this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  this._svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	  this._svg.setAttribute('width', this._svgSize);
	  this._svg.setAttribute('height', this._svgSize);

	  this._svg.innerHTML = this._generatePath(100, false, this._colors[0]) +
		                    this._generatePath(1, true, this._colors[1]);

	  return this;
    },

    _generatePath: function(percentage, open, color) {
      return '<path fill="transparent" stroke="' + color + '" stroke-width="' + this._strokeWidth + '" d="' + this._calculatePath(percentage, open) + '"/>';
    },

    _calculatePath: function(percentage, open) {
      var end      = this._start + ((percentage / 100) * this._circ),
        endPrecise = this._precise(end);
      return this._arc(endPrecise, open);
    },

    _arc: function(end, open) {
      var endAdjusted = end - 0.001,
        longArc       = end - this._startPrecise < Math.PI ? 0 : 1;

      return [
        'M',
        this._radius + this._radiusAdjusted * Math.cos(this._startPrecise),
        this._radius + this._radiusAdjusted * Math.sin(this._startPrecise),
        'A', // arcTo
        this._radiusAdjusted, // x radius
        this._radiusAdjusted, // y radius
        0, // slanting
        longArc, // long or short arc
        1, // clockwise
        this._radius + this._radiusAdjusted * Math.cos(endAdjusted),
        this._radius + this._radiusAdjusted * Math.sin(endAdjusted),
        open ? '' : 'Z' // close
      ].join(' ');
    },

    _precise: function(value) {
      return Math.round(value * 1000) / 1000;
    }
  };

  Circles.create = function(options) {
    return new Circles(options);
  };
})();