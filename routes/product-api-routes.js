var db = require("../models");

module.exports = function (app) {
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