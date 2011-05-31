
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
			, panel = $('#panel')
			, lastVal;

		ls.parent().height($('li', ls).outerHeight() * 9);

		qs.keyup(function(){

			var val = qs.val();

			if (val == lastVal) return;

			self.selectedIndex = -1;

			lastVal = val;

			var cache = {}
				, r = _.sortBy(data, function(v){

				if(!cache[v.nome])
					cache[v.nome] = LiquidMetal.score(v.nome, val);

				//TODO: normalizar texto ao pontuar para
				//permitir strings acentuadas

				return -cache[v.nome] + ~(v.type == '/categoria');

			});

			r = _.select(r, function(v){
				return cache[v.nome];
			})

			_.forEach(r, function(v){
				
				fragment.appendChild(ich.user(v)[0]);

			});

			ls.empty().append(fragment);

			self.moveSelected(1);

		}).keydown(function(event) {

			switch (event.keyCode) {

				case 9:  // tab
					event.preventDefault();
					self.goToSelected();
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

				if (it.length == 0) return;

				n = (n >= it.length) ? 0 : (n < 0) ? it.length - 1 : n;

				if(n == 0){
					ls.scrollTop(0);
				} else if(n == it.length - 1){
					ls.scrollTop(ls.prop('scrollHeight'));
				}

				it.removeClass('selected');

				var selected = $(it[n]).addClass('selected');

				if(v * selected.position().top > v/2 * (ls.height() - selected.outerHeight())){
					ls.scrollTop(ls.scrollTop() + selected.outerHeight() * v);
				}

				this.selectedIndex = n;

				this.renderSelected();

			},

			renderSelected: function(){
				
				var id = $('li.selected').attr('id');

				var obj = _.detect(data, function(v){
					return v.id == id;
				});

				panel.empty().append(ich.servidor(obj));

			},

			goToSelected: function(){
				
				ls.animate({
					textIndent: -ls.width()
				}, function(){
					$(this).css({
						textIndent: 0
					});
				});

			}

		}

		var names = JSONSelect.match('.nome', data);

	}

);