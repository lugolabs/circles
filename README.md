# Circles

Lightwheight JavaScript library that generates circular graphs in SVG.

## Usage

Include the `circles.js` file in your HTML file. There are no dependencies.

Create a graph by calling:

```js
Circles.create({
	id:         'circles-1',
	percentage: 43,
	radius:     60,
	width:      10,
	text:       7.13,
	colors:     ['#D3B6C6', '#4B253A']
})
```

where

* `id` - the DOM element that will hold the graph
* `percentage` - the percentage dictating the smaller circle
* `radius` - the radius of the circles
* `width` - the width of the ring (optional, has value 10, if not specified)
* `text` - the text to display at the centre of the graph (optional, the percentage will show if not specified)
* `colors` - an array of colors, with the first item coloring the full circle (optional, it will be `['#EEE', '#F00']` if not specified)

## Styles

The styles have been specified inline to avoid external dependencies. But they can be overriden via CSS easily, being simply HTML elements.

To help with this, a few CSS classes have been exposed:

* `circles-wrp` - the element containing the graph
* `circles-text` - the element containing the text

## Compatibility

Browsers that support SVG.

### Desktop
- Firefox 3+
- Chrome 4+
- Safari 3.2+
- Opera 9+
- IE9 +

### Mobile
- iOS Safari 3.2+
- Android Browser 3+
- Opera Mobile 10+
- Chrome for Android 18+
- Firefox for Android 15+


###Inspirations

[Highcharts](http://highcharts.com)
Wout Fierens's [svg.js](http://svgjs.com)


###Licence

Circles is licensed under the terms of the MIT License.
