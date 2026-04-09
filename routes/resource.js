var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var lighthouse_controller = require('../controllers/lighthouse');

/// API ROUTE ///

// GET base API resource (lists supported resources)
router.get('/', api_controller.api);

/// LIGHTHOUSE ROUTES ///

// POST request for creating a Lighthouse
router.post('/lighthouses', lighthouse_controller.lighthouse_create_post);

// DELETE request to delete a Lighthouse
router.delete('/lighthouses/:id', lighthouse_controller.lighthouse_delete);

// PUT request to update a Lighthouse
router.put('/lighthouses/:id', lighthouse_controller.lighthouse_update_put);

// GET request for one Lighthouse
router.get('/lighthouses/:id', lighthouse_controller.lighthouse_detail);

// GET request for list of all Lighthouse items
router.get('/lighthouses', lighthouse_controller.lighthouse_list);

module.exports = router;