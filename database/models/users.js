'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Users extends Model {
      static associate(models) {
         Users.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })

         Users.hasMany(models.Profiles, { as: 'profiles', foreignKey: 'user_id' })
         Users.hasMany(models.Publications, { as: 'publications02', foreignKey: 'user_id' })

         Users.belongsToMany(models.Publications, { as: 'publications', foreignKey: 'user_id', through: 'votes' })
         Users.belongsToMany(models.Tags, { as: 'tags', foreignKey: 'tag_id', through: 'usertags' })
      }
   }
   Users.init({
      id: {
         type: DataTypes.UUID,
         primaryKey: true
      },
      first_name: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: true
         }
      },
      last_name: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: true
         }
      },
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: true
         }
      },
      username: {
         type: DataTypes.STRING
      },
      password: {
         type: DataTypes.STRING
      },
      email_verified: {
         type: DataTypes.DATE
      },
      token: {
         type: DataTypes.TEXT
      },
      code_phone: {
         type: DataTypes.STRING,
      },
      phone: {
         type: DataTypes.STRING
      },
      country_id: DataTypes.INTEGER,
      image_url: {
         type: DataTypes.STRING
      },
   }, {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      underscored: true,
      timestamps: true,
      scopes: {
         view_public: { attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'email_verified', 'country_id', 'code_phone', 'phone', 'image_url', 'interests'] },
         view_same_user: { attributes: ['id', 'first_name', 'last_name', 'email', 'username'] },
         auth_flow: { attributes: ['id', 'first_name', 'last_name', 'email', 'username'] },
         view_me: { attributes: ['id', 'first_name', 'last_name', 'email', 'username',] },
         no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
      },
      hooks: {
         beforeCreate: (user, options) => {
            if (user.email) {
               let emailLowercase = String(user.email).toLocaleLowerCase()
               user.email = emailLowercase
               user.username = emailLowercase
            }
         }
      }
   });
   return Users;
};