module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        vendorID: DataTypes.INTEGER,
        recID: DataTypes.INTEGER,
    });
    return Product;
};