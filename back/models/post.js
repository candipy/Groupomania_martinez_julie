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

      // Un post ne peut avoir qu'un utilisateur
      models.Post.belongsTo(models.User, {
        onDelete: "CASCADE",
      });

      // Un post peut avoir plusieurs Like
      models.Post.hasMany(models.Like, {
        onDelete: "CASCADE",
      });
 
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      message: DataTypes.STRING,
      // likes: DataTypes.INTEGER,
      // dislikes: DataTypes.INTEGER,
      // usersLiked: DataTypes.STRING,
      // usersDisliked: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
