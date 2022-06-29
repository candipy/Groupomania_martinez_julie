"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, {
        // foreignKey: {
        //   allowNull: false
        // }, 
        onDelete: 'CASCADE'
      })
      // models.Post.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      urlImage: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
