const express = require('express')
let path = require("path");

require('dotenv').config()
const app = express()
const port = process.env.PORT;
const   bodyParser = require('body-parser');

let apiResponse = require("./helpers/apiResponse");
let cors = require("cors");
// let MongoClient = require('mongodb').MongoClient;
let MONGODB_URL = process.env.MONGODB_URL
let mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true}).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
.catch(err => {
	console.error("App starting error:", err.message);
	process.exit(1);
});
let db = mongoose.connection;

db.on('open', function(){
  console.log("connected")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));


//To allow cross-origin requests
app.use(cors());


app.get("/", function(req, res) {
	res.send(" working")
});

const directoryPath = path.join(__dirname, 'routes/index.js');
	require(directoryPath)(app)


// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});


// module.exports = app;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
