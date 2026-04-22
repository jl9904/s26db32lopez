var express = require('express');
const lighthouse_controllers = require('../controllers/lighthouse');
var router = express.Router();

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
        return next();
    }
    res.redirect("/login");
}

/* GET lighthouses page. */
router.get('/', lighthouse_controllers.lighthouse_view_all_Page);

/* GET detail lighthouse page */
router.get('/detail', lighthouse_controllers.lighthouse_view_one_Page);

/* GET create lighthouse page */
router.get('/create', secured, lighthouse_controllers.lighthouse_create_Page);

/* GET update lighthouse page */
router.get('/update', secured, lighthouse_controllers.lighthouse_update_Page);

/* GET delete lighthouse page */
router.get('/delete', secured, lighthouse_controllers.lighthouse_delete_Page);

module.exports = router;

