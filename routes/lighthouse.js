var express = require('express');
const lighthouse_controllers = require('../controllers/lighthouse');
var router = express.Router();

/* GET lighthouses page. */
router.get('/', lighthouse_controllers.lighthouse_view_all_Page);

/* GET detail lighthouse page */
router.get('/detail', lighthouse_controllers.lighthouse_view_one_Page);

module.exports = router;

