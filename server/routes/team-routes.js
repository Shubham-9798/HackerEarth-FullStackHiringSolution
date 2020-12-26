let teamController = require('../controller/team-controller')

module.exports = function(app) {
    // code here
    app.get('/getScoreCard', teamController.getTeam)
    app.post('/addTeam', teamController.addTeam)
    app.post('/matchWinner', teamController.matchWinner)

	
}