// const { verify } = require("jsonwebtoken");
const fs = require('fs'); 

exports.randomNumber = function (length) {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};

exports.currentDate = function(sep1 = '-', sep2=':') {
	
var today = new Date();
var date = today.getFullYear()+sep1+(today.getMonth()+1)+sep1+today.getDate();
var time = today.getHours() + sep2 + today.getMinutes() + sep2 + today.getSeconds();
var dateTime = date+' '+time;

return dateTime
}

exports.tokenObject = (obj) => {
	
	// return  new Promise((resolve, reject)=>{
	// 	resolve({username:obj.username, password: obj.password, role: obj.role, _id: obj._id})
	// })
	return {username:obj.username, password: obj.password, role: obj.role, _id: obj._id}
}

exports.deleteFile =  (path) => {

	let promise = new Promise((resolve, reject) => {
		if(fs.unlink(path))
		  resolve(`successfully deleted ${path}`)
		else
		  reject('there was an error:', error.message)
	})

	promise
	.then(data => data)
	.catch(err =>err)
}
