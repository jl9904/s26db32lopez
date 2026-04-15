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

// for a specific Lighthouse.
exports.lighthouse_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        let result = await Lighthouse.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
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

// Handle Lighthouse delete on DELETE.
exports.lighthouse_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Lighthouse.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle Lighthouse update form on PUT.
exports.lighthouse_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Lighthouse.findById(req.params.id)
        
        // Do updates of properties
        if(req.body.name) toUpdate.name = req.body.name;
        if(req.body.location) toUpdate.location = req.body.location;
        if(req.body.height) toUpdate.height = req.body.height;

        let result = await toUpdate.save();
        console.log("Success " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
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

// Handle a show one view with id specified by query
exports.lighthouse_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Lighthouse.findById(req.query.id)
        res.render('lighthousedetail', 
            { title: 'Lighthouse Detail', toShow: result });
    }
    catch(err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a lighthouse.
exports.lighthouse_create_Page = function(req, res) {
    console.log("create view");
    try {
        res.render('lighthousecreate', { title: 'Lighthouse Create' });
    }
    catch(err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};