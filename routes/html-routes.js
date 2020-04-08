var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    app.get("/dashboard", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
      });
      app.get("/inventory", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/inventory.html"));
      });
      app.get("/requests", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/requests.html"));
      });
};