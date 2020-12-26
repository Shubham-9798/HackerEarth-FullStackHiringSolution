let testController = require('../controller/test-controller')

module.exports = function(app) {
    // code here
    app.get('/test', 
           testController.test
           )
    app.post('/testAdd', 
    testController.testAdd
    )
	
}