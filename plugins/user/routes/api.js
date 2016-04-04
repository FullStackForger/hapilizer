'use strict';
const defaultCtrl = require('./default.js');

exports.getMe = {
	handler: defaultCtrl.any.handler,
	auth: 'token'
};

exports.putMe = {
	handler: defaultCtrl.any.handler,
	auth: 'token'
};