module.exports = function (express, app) {

	var router = express.Router();

	console.log("The route is working.");

	app.use('/api', router);

    app.use('/api/user', require('./user-route'));
    app.use('/api/todo', require('./todo-route'));

}

