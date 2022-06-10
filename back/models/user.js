const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      firstName: { type: DataTypes.STRING(255), allowNull: false },
      lastName: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), unique: true },
      password: { type: DataTypes.STRING(500), allowNull: false },
      url_avatar: DataTypes.STRING(500),
      description: DataTypes.STRING(2000),
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
