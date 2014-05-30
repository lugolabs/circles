describe('Circles', function() {
	it('is defined', function() {
		expect(typeof Circles).toEqual('function');
	});

	var element, circle;

	function getText()
	{
		return element.firstChild.children[1];
	}

	function getSVG()
	{
		return element.firstChild.getElementsByTagName('svg')[0];
	}

	beforeEach(function() {
		element = document.createElement('div');
		element.id = 'circles-1';
		document.body.appendChild(element);
	});

	afterEach(function() {
		element.parentNode.removeChild(element);
	});

	describe('Creation', function() {

		it('returns a Circles instance', function() {
			var circles = Circles.create({});
			expect(circles instanceof Circles).toBeTruthy();
		});

		it('returns an instance with 0 as value', function() {
			var circles = Circles.create({id: element.id});
			expect(circles.getValue()).toEqual(0);
		});

		it('returns an instance with 100 as max value', function() {
			var circles = Circles.create({id: element.id});
			expect(circles.getMaxValue()).toEqual(100);
		});

		describe('Generated content', function() {

			beforeEach(function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					duration: null
				});
			});

			it('contains a wrapper with default class', function() {

				Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					duration: null,
					wrpClass: 'wrapContainer'
				});

				expect(element.firstChild.className).toEqual('wrapContainer');
			});

			it('contains a wrapper with provided class', function() {
				expect(element.firstChild.className).toEqual('circles-wrp');
			});

			it('contains a SVG tag', function() {
				expect(getSVG() instanceof SVGSVGElement).toBeTruthy();
			});

			it('contains two PATH tags into the SVG', function() {
				expect(getSVG().getElementsByTagName('path').length).toEqual(2);
			});

			it('contains the SVG without animation', function() {
				var dValue = getSVG().getElementsByTagName('path')[1].getAttribute('d');
				expect(dValue).toEqual('M 59.988797973796764 5.000001140776334 A 55 55 0 0 1 92.39390946942136 104.44811165040565 ');
			});

			it("contains the SVG with animation", function() {
				circle	=	Circles.create({
					id: element.id,
					value: 40,
					radius: 60
				});

				var dValue = element.firstChild.getElementsByTagName('svg')[0].getElementsByTagName('path')[1].getAttribute('d');
				expect(dValue).toEqual('M 59.988797973796764 5.000001140776334 A 55 55 0 0 1 63.39663517303477 5.104983199735706 ');
			});

		});

		describe('Text', function() {

			it('has a container', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					duration: null
				});
				expect(getText() instanceof HTMLDivElement).toBeTruthy();
			});

			it('has a container with default class', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					duration: null
				});

				expect(getText().className).toEqual('circles-text');
			});

			it('has a container with provided class', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					duration: null,
					textClass: 'textContainer'
				});

				expect(getText().className).toEqual('textContainer');
			});

			it('contains the supplied text', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					text: '%',
					duration: null
				});

				expect(getText().innerHTML).toEqual('%');
			});

			it('can be managed by a function', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					text: function(value)
					{
						return value + '%';
					},
					duration: null
				});

				expect(getText().innerHTML).toEqual('40%');
			});

			it('can be empty', function() {
				circle = Circles.create({
					id: element.id,
					value: 40,
					radius: 60,
					text: null,
					duration: null
				});

				expect(getText().innerHTML).toBeFalsy();
			});

		});
	});

	describe('API', function() {

		beforeEach(function() {
			circle = Circles.create({
				id: element.id,
				value: 40,
				radius: 60,
				duration: null
			});
		});

		it('can update radius', function() {
			circle.updateRadius(30);

			expect(getSVG().getAttribute('width') == 60).toBeTruthy();
		});

		it('can update stroke width', function() {
			circle.updateWidth(20);

			expect(getSVG().getElementsByTagName('path')[1].getAttribute('stroke-width') == 20).toBeTruthy();
		});

		it('can update colors', function() {
			circle.updateColors(['#000', '#fff']);

			var paths = getSVG().getElementsByTagName('path');

			expect(paths[0].getAttribute('stroke') === '#000' && paths[1].getAttribute('stroke') === '#fff').toBeTruthy();
		});

		it('can get correct percentage', function() {
			expect(circle.getPercent()).toEqual(40);
		});

		it('can update value', function() {
			circle.update(50);
			expect(circle.getPercent()).toEqual(50);
		});

		it('can get correct value from percentage', function() {

			circle = Circles.create({
				id: element.id,
				maxValue: 1000,
				duration: null
			});

			expect(circle.getValueFromPercent(25)).toEqual(250);
		});

		it('can return HTML representation of a number', function() {
			expect(circle.htmlifyNumber(12.43, 'int', 'float')).toEqual('<span class="int">12</span>.<span class="float">43</span>');
		});
	});

});
