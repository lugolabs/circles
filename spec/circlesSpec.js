describe('Circles', function() {
	it("is defined", function() {
		expect(typeof Circles).toEqual('function');
	});

	describe('#create', function() {
		var element;

		beforeEach(function() {
			element = document.createElement('div');
			element.id = 'circles-1';
			document.querySelector('body').appendChild(element);
		});

		afterEach(function() {
			element.parentNode.removeChild(element);
		});

		it("returns a Circles instance", function() {
			var circles = Circles.create({});
			expect(circles instanceof Circles).toBeTruthy();
		});

		it("generates the SVG without animation", function() {
			Circles.create({
				id: element.id,
				percentage: 40,
				radius: 60,
				duration: null
			});
			var expected = '<div class="circles-wrp" style="position:relative; display:inline-block;"><svg width="120" height="120"><path fill="transparent" stroke="#EEE" stroke-width="10" d="M 59.988797973796764 5.000001140776291 A 55 55 0 1 1 59.923606103406065 5.000053054820469 Z"></path><path fill="transparent" stroke="#F00" stroke-width="10" d="M 59.988797973796764 5.000001140776291 A 55 55 0 0 1 92.3939094694214 104.44811165040569 "></path></svg><div class="circles-text-wrp" style="position:absolute; top:0; left:0; text-align:center; width:100%; font-size:42px; height:120px; line-height:120px;"><span class="circles-number">40</span></div></div>';
			expect(element.innerHTML).toEqual(expected);
		});

		it("generates the SVG with animation", function() {
			Circles.create({
				id: element.id,
				percentage: 40,
				radius: 60
			});
			var expected = '<div class="circles-wrp" style="position:relative; display:inline-block;"><svg width="120" height="120"><path fill="transparent" stroke="#EEE" stroke-width="10" d="M 59.988797973796764 5.000001140776291 A 55 55 0 1 1 59.923606103406065 5.000053054820469 Z"></path><path fill="transparent" stroke="#F00" stroke-width="10" d="M 59.988797973796764 5.000001140776291 A 55 55 0 0 1 63.396635173034774 5.1049831997356705 "></path></svg><div class="circles-text-wrp" style="position:absolute; top:0; left:0; text-align:center; width:100%; font-size:42px; height:120px; line-height:120px;"><span class="circles-number">0</span></div></div>';
			expect(element.innerHTML).toEqual(expected);
		});

		it("adds the supplied text", function() {
			Circles.create({
				id: element.id,
				percentage: 40,
				radius: 60,
				text: '%'
			});
			expect(element.innerHTML.indexOf('<span class="circles-text">%</span>') > 0).toBeTruthy();
		});
	});

});