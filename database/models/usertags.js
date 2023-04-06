'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class UserTags extends Model {
        static associate(models) {
            UserTags.belongsTo(models.Tags, { as: 'tags', foreignKey: 'tag_id' })
            UserTags.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
        }
    }

    UserTags.init({
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
    }, {
        sequelize,
        modelName: 'UserTags',
        tableName: 'usertags',
        underscored: true,
        timestamps: true,
        scopes: {
            view_public: { attributes: ['tag_id', 'user_id'] },
            view_me: { attributes: ['tag_id', 'user_id'] },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return UserTags
}