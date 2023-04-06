'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class PublicationsTypes extends Model {
        static associate(models) {
            PublicationsTypes.hasMany(models.Publications, { as: 'publications', foreignKey: 'publication_type_id' })
        }
    }

    PublicationsTypes.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'PublicationsTypes',
        tableName: 'publicationstypes',
        underscored: true,
        timestamps: true,
        scopes: {
            view_public: { attributes: ['id', 'name', 'description'] },
            view_me: { attributes: ['id', 'name', 'description'] },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return PublicationsTypes
}