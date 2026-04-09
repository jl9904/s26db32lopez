var Lighthouse = require('../models/lighthouse');

// List of all Lighthouses
exports.lighthouse_list = async function(req, res) {
    try {
        // query the database to find all lighthouses
        const theLighthouses = await Lighthouse.find();
        res.send(theLighthouses);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a specific Lighthouse detail request
exports.lighthouse_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse detail: ' + req.params.id);
};

// Handle Lighthouse create on POST
exports.lighthouse_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse create POST');
};

// Handle Lighthouse delete on DELETE
exports.lighthouse_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse delete DELETE ' + req.params.id);
};

// Handle Lighthouse update on PUT
exports.lighthouse_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse update PUT ' + req.params.id);
};