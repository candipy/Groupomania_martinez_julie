"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        onDelete: "CASCADE",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING(255), allowNull: false },
      lastName: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), unique: true },
      password: { type: DataTypes.STRING(500), allowNull: false },
      urlAvatar: DataTypes.STRING(500),
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
