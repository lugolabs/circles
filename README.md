# Circles

![Circles](http://lugolabs.com/static/circles.png)

Lightwheight JavaScript library that generates circular graphs in SVG. Now with animation.

### Get Started

1. Get the library
2. Install all the dependencies, run `npm install`
3. Once you have the dependencies installed, run `grunt` from the project directory. This will run the default grunt task which will minify `circles.js` to `circles.min.js`


### Usage

Include the `circles.js` or `circles.min.js` file in your HTML file. There are no dependencies.

Create a placeholder div in your HTML:

```html
<div class="circle" id="circles-1"></div>
```

Create a graph by calling, the id should match id of the placeholder <div>:

```js
var myCircle = Circles.create({
	id:         'circles-1',
	radius:     60,
	value:      43,
	maxValue:   100,
	width:      10,
	text:       function(value){return value + '%';},
	colors:     ['#D3B6C6', '#4B253A'],
	duration: 	400,
	wrpClass:	'circles-wrp',
	textClass:	'circles-text'
})
```

where

* `id` 			- the DOM element that will hold the graph
* `radius` 		- the radius of the circles
* `value` 		- init value of the circle (optional, defaults to 0)
* `maxValue` 	- maximum value of the circle (optional, defaults to 100)
* `width` 		- the width of the ring (optional, has value 10, if not specified)
* `number`		- the number to display at the center of the graph (optional, the percentage will show if not specified)
* `text` 		- the text to display at the center of the graph (optional, the current "htmlified" value will be shown if not specified)
                	if `null` or an empty string, no text will be displayed
                    can also be a function: the returned value will be the displayed text
```js
//Ex. 1
function(currentValue) {
return '$'+currentValue;
}
//Ex. 2
function() {
return this.getPercent() + '%';
}
```
* `colors` 		- an array of colors, with the first item coloring the full circle (optional, it will be `['#EEE', '#F00']` if not specified)
* `duration` 	- value in ms of animation's duration; defaults to 500; if 0 or `null` is passed, the animation will not run.
* `wrpClass` 	- class name to apply on the generated element wrapping the whole circle.
* `textClass` 	- class name to apply on the generated element wrapping the text content.

### API

```js
myCircle.updateRadius(Number radius)
```

Regenerates the circle with the given `radius` (see `spec/responsive.html` for an example on how to create a responsive circle).

```js
myCircle.updateWidth(Number width)
```

Regenerates the circle with the given `width`

```js
myCircle.updateColors(Array colors)
```

Change `colors` used to draw the circle.

```js
myCircle.update(Number value [, Number duration])
```

Set the value of the circle to `value`.
Animation will take `duration` ms to execute. If no `duration` is given, default duration set in constructor will be used.
If you don't want animation, set `duration` to 0.

```js
myCircle.update(Boolean force)
```

Force the redrawing of the circle if `force` is set to **true**. Do nothing otherwise.

```js
myCircle.getPercent()
```

Returns the percentage value of the circle, based on its current value and its max value.

```js
myCircle.getValue()
```

Returns the value of the circle.

```js
myCircle.getMaxValue()
```

Returns the max value of the circle.

```js
myCircle.getValueFromPercent(Number percentage)
```

Returns the corresponding value of the circle based on its max value and given `percentage`.

```js
myCircle.htmlifyNumber(Number number[, integerPartClass, decimalPartClass])
```

Returned HTML representation of given `number` with given classes names applied on tags.
Default value of `integerPartClass` is **circles-integer**.
Default value of `decimalPartClass` is **circles-decimals**.

### Styles

The styles have been specified inline to avoid external dependencies. But they can be overriden via CSS easily, being simply HTML elements.

To help with this, a few CSS classes have been exposed:

* `circles-wrp` 	- the element wrapping the whole circle
* `circles-text` 	- the element wrapping text content

You can overwritte these classes by sending properties `wrpClass` and/or `textClass` to the constructor.

### Compatibility

Browsers that support SVG.

**Desktop**
* Firefox 3+
* Chrome 4+
* Safari 3.2+
* Opera 9+
* IE9 +

**Mobile**
* iOS Safari 3.2+
* Android Browser 3+
* Opera Mobile 10+
* Chrome for Android 18+
* Firefox for Android 15+

### Contributors

* Artan Sinani
* [Adrien Guéret](https://github.com/adrien-gueret)
* [radoslawhryciow](https://github.com/radoslawhryciow)
* [Roman Salnikov](https://github.com/RSalo)
* [webal](https://github.com/webal)


### Inspirations

Code and ideas borrowed by:

* [Highcharts](http://highcharts.com)
* Wout Fierens's [svg.js](http://svgjs.com)


### Licence

Circles is licensed under the terms of the MIT License.

### Changelog

* 0.0.5    Rethink a bit the way the library is working + add some public methods.
* 0.0.4    Exposes `generate(radius)` to regenerate the circle, opening it to responsiveness.
* 0.0.3    Allow adding extra text to the graph (issue 3).
           Round integers during animation.
* 0.0.2    Add animation.
* 0.0.1    First release.
