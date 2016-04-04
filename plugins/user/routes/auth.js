'use strict';
const defaultCtrl = require('./default.js');

exports.getLogin =
exports.postLogin = {
	handler: defaultCtrl.any.handler,
	auth: 'basic'
};

exports.postSignup = {
	handler: defaultCtrl.any.handler
};

exports.postGoogle = {
	handler: defaultCtrl.any.handler
};

exports.postFacebook = {
	handler: defaultCtrl.any.handler
};

exports.postTwitter= {
	handler: defaultCtrl.any.handler
};