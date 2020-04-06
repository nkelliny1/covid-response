module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Product.associate = function (models) {
        Product.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Product;
};