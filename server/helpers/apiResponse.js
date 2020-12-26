exports.successResponse = function (res, msg) {
	var data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.FoundResponse = function (res) {
	var data = {
		status: 1,
	};
	return res.status(200).json(data);
};

exports.FoundResponseWithData = function (res, data) {
	var data = {
		status: 1,
		data: data,
	};
	return res.status(200).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};

exports.noTokenWithMsg = function (res, msg) {
	var resData = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(resData);
};


exports.invalidToken = function (res, msg) {
	var resData = {
		status: 0,
		message: msg,
	};
	return res.status(403).json(resData);
};


exports.sendAccessToken = function (res, token) {
	var resData = {
		status: 1,
		accessToken: token,
	};
	return res.status(200).json(resData);
};


exports.sendToken = function (res, accessTokean, refreshToken, data) {
	var resData = {
		status: 1,
		accessToken: accessTokean,
		refreshToken: refreshToken,
		data: data
	};
	return res.status(200).json(resData);
};