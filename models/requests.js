module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        recID: DataTypes.INTEGER,
        vendorID: DataTypes.INTEGER,
    });
    return Request;
};