var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      facName: req.body.facName,
      facAddress: req.body.facAddress,
      facPhone: req.body.facPhone,
      facID: req.body.facID,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        facName: req.user.facName,
        facAddress: req.user.facAddress,
        facPhone: req.user.facPhone,
        facID: req.user.facID
      });
    }
  });
    app.get("api/products", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id;
        }
        db.Product.findAll({
            where: query
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    app.get("api/posts/:id", function (req, res) {
        db.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbProduct) {
            console.log(dbProduct);
            res.json(dbProduct);
        });
    });

    app.post("/api/products", function (req, res) {
        db.Product.create(req.body).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    //do we need DELETE route?

    app.put("/api/products", function (req, res) {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbProduct) {
                res.json(dbProduct);
            });
    });

};