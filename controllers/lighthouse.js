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

// Handle Lighthouse create on POST.
exports.lighthouse_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Lighthouse();
    // We are looking for a body, since POST does not have query parameters.
    // We expect a JSON object like: {"name":"St. Augustine", "location":"Florida", "height":165}
    document.name = req.body.name;
    document.location = req.body.location;
    document.height = req.body.height;
    
    try {
        let result = await document.save();
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Lighthouse delete on DELETE
exports.lighthouse_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse delete DELETE ' + req.params.id);
};

// Handle Lighthouse update on PUT
exports.lighthouse_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Lighthouse update PUT ' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.lighthouse_view_all_Page = async function(req, res) {
    try {
        const theLighthouses = await Lighthouse.find();
        res.render('lighthouse', { title: 'Lighthouse Search Results', results: theLighthouses });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};