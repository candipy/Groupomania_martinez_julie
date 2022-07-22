"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un utilisateur peut avoir plusieurs Post et Like
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Like);
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      // urlAvatar: DataTypes.STRING,
      // description: DataTypes.STRING,
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
 
  return User;
 
};
