module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
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
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Request.associate = function (models) {
        Request.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Request;
};