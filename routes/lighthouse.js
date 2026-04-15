var express = require('express');
const lighthouse_controllers = require('../controllers/lighthouse');
var router = express.Router();

/* GET lighthouses page. */
router.get('/', lighthouse_controllers.lighthouse_view_all_Page);

/* GET detail lighthouse page */
router.get('/detail', lighthouse_controllers.lighthouse_view_one_Page);

/* GET create lighthouse page */
router.get('/create', lighthouse_controllers.lighthouse_create_Page);

/* GET update lighthouse page */
router.get('/update', lighthouse_controllers.lighthouse_update_Page);

module.exports = router;

