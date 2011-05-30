
head.js(
	"/javascript/vendor/underscore-min.js",
	"/javascript/vendor/jquery.min.js",
	"/javascript/vendor/jsonselect.min.js",
	"/javascript/vendor/liquidmetal.js",
	"/javascript/vendor/icanhaz.min.js",
	"/javascript/data.js",

	function(){

		var fragment = document.createDocumentFragment()
			, qs = $('#qs')
			, ls = $('#ls')
			, lastVal;


		qs.keyup(function(evt){

			var val = qs.val();

			if (val == lastVal) return;

			lastVal = val;

			var cache = {}
				, r = _.sortBy(data, function(v){

				if(!cache[v.nome])
					cache[v.nome] = LiquidMetal.score(v.nome, val); 

				return -cache[v.nome] + ~(v.type == '/categoria');

			});

			r = _.select(r, function(v){
				return cache[v.nome];
			})

			_.forEach(r, function(v){
				
				fragment.appendChild(ich.user(v)[0]);

			});

			ls.empty().append(fragment);

		}).keydown(function(event) {

			switch (event.keyCode) {

				case 9:  // tab
					//self.pickSelected();
					//self.hide();
					break;
				case 33: // pgup
					event.preventDefault();
					//self.markFirst();
					break;
				case 34: // pgedown
					event.preventDefault();
					//self.markLast();
					break;
				case 38: // up
					event.preventDefault();
					event.stopPropagation();
					self.moveSelected(-1);
					break;
				case 40: // down
					event.preventDefault();
					event.stopPropagation();
					self.moveSelected(1);
					break;
				case 13: // return
				case 27: // esc
					event.preventDefault();
					event.stopPropagation();
				break;
			}

		});;

		var self = {

			selectedIndex: -1,

			markSelected: function(n) {

				var it = $('#ls li');

				n = (n >= it.length) ? 0 : (n < 0) ? it.length - 1 : n;

				this.selectedIndex = n;

				it.removeClass('selected');

				$(it[n]).addClass('selected');

			},

			moveSelected: function(n) {
				this.markSelected(this.selectedIndex+n);
			}

		}

		var names = JSONSelect.match('.nome', data);

	}

);