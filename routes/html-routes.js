// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/category", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/category.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
  
  //Handlebars routes
  app.get("/administrative", function(req, res) {
    res.render("admin");
  });
  
  app.get("/administrative/products", function(req, res) {
    res.render("products");
  });
  
  app.get("/administrative/categories", function(req, res) {
    res.render("category");
  });

};

