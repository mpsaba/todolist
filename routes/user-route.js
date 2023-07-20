var controller = require('../controllers/user-ctrl');
var express = require('express'),
    router = express.Router();

router.get('/all', function (req, res) {
    controller.all(req, res);
});

router.post('/login', function (req, res) {
    controller.login(req, res);
});

module.exports = router;






