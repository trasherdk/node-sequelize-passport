/* eslint-disable no-console */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	console.log("router.home:", req.route);
	res.render('home', {
		request: {
			path: req.route.path
		},
		User: req.user,
		message: null
	});
});

module.exports = router;
