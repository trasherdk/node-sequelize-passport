/* eslint-disable no-console */
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	console.log("router.about:", req.route);
	res.render('about', {
		request: {
			path: req.route.path
		},
		User: req.user,
		message: null
	});
	return next();
});

module.exports = router;
