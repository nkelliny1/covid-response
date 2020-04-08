var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        facName: DataTypes.STRING,
        facAddress: DataTypes.STRING,
        facPhone: DataTypes.INTEGER,
        facID: DataTypes.INTEGER,
    });

    User.associate = function (models) {
        User.hasMany(models.Product, {
            onDelete: "cascade"
        });
    };
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
    
};
