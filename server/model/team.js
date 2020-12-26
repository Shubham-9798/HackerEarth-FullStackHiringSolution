// Define schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema,  ObjectId = Schema.ObjectId;;

var SomeModelSchema = new Schema({
  team_name:{type: String},
  wins:{type: Number},
  losses:{type: Number},
  ties:{type: Number},
  score:{type: Number},



  isDeleted: {type: Boolean, default: false},
  updatedDate: { type: Date, default: Date.now },
  createdDate: { type: Date,  required: true}
});

// Compile model from schema
var teamScoreCard = mongoose.model('team-score-card', SomeModelSchema );
module.exports = teamScoreCard;