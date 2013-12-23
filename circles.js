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
    text       - the text to display at the centre of the graph (optional, the percentage will show if not specified)
    colors     - an array of colors, with the first item coloring the full circle 
                 (optional, it will be `['#EEE', '#F00']` if not specified)

*/

(function() {
  var Circles = window.Circles = function(options) {
    var elId = options.id;
    this._el = document.getElementById(elId);
    
    if (this._el === null) return;
    
    var endAngleRad = Math.PI / 180 * 270;

    this._radius         = options.radius;
    this._percentage     = options.percentage;
    this._text           = options.text   || this._percentage;
    this._strokeWidth    = options.width  || 10;
    this._colors         = options.colors || ['#EEE', '#F00'];

    this._svgSize        = this._radius * 2;
    this._radiusAdjusted = this._radius - (this._strokeWidth / 2);
    this._start          = -Math.PI / 180 * 90;
    this._startPrecise   = this._precise(this._start);
    this._circ           = endAngleRad - this._start;

    this._el.innerHTML   = this._wrap(this._generateSvg() + this._generateText());
  };

  Circles.prototype = {
    _wrap: function(content) {
      return '<div class="circles-wrp" style="position:relative; display:inline-block;">' + content + '</div>';
    },

    _generateText: function() {
      var parts = (this._text + '').split('.'),
        html = '<div class="circles-text" style="position:absolute; top:0; left:0; text-align:center; width:100%;' +
          ' font-size:' + this._radius * .7 + 'px; height:' + this._svgSize + 'px; line-height:' + this._svgSize + 'px;">' + parts[0];
        if (parts.length > 1) {
          html += '.<span style="font-size:.4em">' + parts[1].substring(0, 2) + '</span>';
        }
        html += '</div>';
      return html;
    },

    _generateSvg: function() {
      return '<svg width="' + this._svgSize + '" height="' + this._svgSize + '">' + 
        this._generatePath(100, false, this._colors[0]) + 
        this._generatePath(this._percentage, true, this._colors[1]) + 
      '</svg>';
    },

    _generatePath: function(percentage, open, color) {
      var end      = this._start + ((percentage / 100) * this._circ);
        endPrecise = this._precise(end),
        d          = this._arc(endPrecise, open);

      return '<path fill="transparent" stroke="' + color + '" stroke-width="' + this._strokeWidth + '" d="' + d + '"/>';
    },

    _precise: function(value) {
      return Math.round(value * 1000) / 1000;
    },

    _arc: function(end, open) {
      var endAdjusted = end - 0.001
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
    }
  };

  Circles.create = function(options) {
    return new Circles(options);
  };
})();