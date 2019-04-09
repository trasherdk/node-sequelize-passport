var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	console.log("router.index:", req.route);
	res.render('home', {
	    request: {
	      path: req.route.path
	    },
		User: req.user,
		message: null 
	});
});

module.exports = router;
