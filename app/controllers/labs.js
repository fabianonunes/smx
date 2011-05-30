
exports.index = function(req, res){

	res.render('showcase', {
		messages: {}
	});
	
}

exports.magicbox = function(req, res){

	res.render('index', {
		messages: {}
	});
	
}