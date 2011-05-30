
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

			self.selectedIndex = -1;

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

			moveSelected: function(v) {

				var n = this.selectedIndex + v
				, it = $('#ls li');

				n = (n >= it.length) ? 0 : (n < 0) ? it.length - 1 : n;

				this.selectedIndex = n;

				if(n == 0){
					ls.scrollTop(0);
				} else if(n == it.length - 1){
					ls.scrollTop(ls.height());
				}

				it.removeClass('selected');

				var selected = $(it[n]).addClass('selected');

				if(v*selected.position().top > v*120){
					ls.scrollTop(ls.scrollTop() + it.first().height() * v);
				}

			},

		}

		var names = JSONSelect.match('.nome', data);

	}

);