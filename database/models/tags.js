'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tags extends Model {
        // static associate(models) {
        //     Tags.hasMany(models.Profiles, { as: 'tags', foreignKey: 'role_id' })
        // }
    }
    Tags.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
    }, {
        sequelize,
        modelName: 'Tags',
        tableName: 'tags',
        underscored: true,
        timestamps: true,
        scopes: {
            no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
        }
    });
    return Tags;
};