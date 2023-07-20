var controller = require('../controllers/todo-ctrl');
var express = require('express'),
    router = express.Router();

router.get('/all', function (req, res) {
    controller.all(req, res);
});

router.post('/new', function (req, res) {
    controller.new(req, res);
});

router.get('/update', function (req, res) {
    controller.update(req, res);
});

router.post('/delete', function (req, res) {
    controller.delete(req, res);
});

module.exports = router;






