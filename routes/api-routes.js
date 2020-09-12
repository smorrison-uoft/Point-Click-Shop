// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/category/", function(req, res) {
    console.log(db.Category);
    db.Category.findAll({})
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/category/:category", function(req, res) {
    db.Category.findAll({
      where: {
        category_name: req.params.category
      }
    })
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/category/:id", function(req, res) {
    console.log(db.Category);
    db.Category.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });

  // POST route for saving a new post
  app.post("/api/category", function(req, res) {
    console.log(db.Category);
    db.Category.create({
      category_name: req.body.category_name,
      //body: req.body.body,
      category_desc: req.body.category_desc,
    })
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/category/:id", function(req, res) {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });

  // PUT route for updating posts
  app.put("/api/category", function(req, res) {
    db.Category.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbCategory) {
        res.json(dbCategory);
      });
  });
};
