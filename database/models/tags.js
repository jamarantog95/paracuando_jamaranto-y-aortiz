'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.hasMany(models.PublicationsTags, {
        as: 'publicationstags',
        foreignKey: 'tag_id',
      });
      Tags.hasMany(models.UserTags, { as: 'userstags', foreignKey: 'user_id' });
    }
  }
  Tags.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Tags',
      tableName: 'tags',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ['id', 'name', 'description', 'image_url'] },
        no_timestamps: {
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      },
    }
  );
  return Tags;
};
