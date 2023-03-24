'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class PublicationsTypes extends Model {
        // static associate(models) {
        //     PublicationsTypes.hasMany(models.Users,
        //         {
        //             as: 'users',
        //             foreignKey: 'publicationtype_id'
        //         })
        //     // PublicationsTypes.hasMany(models.States, { as: 'states', foreignKey: 'country_id' })
        // }
    }

    PublicationsTypes.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'PublicationsTypes',
        tableName: 'publicationstypes',
        underscored: true,
        timestamps: true,
        scopes: {
            view_public: {
                attributes: ['id', 'name']
            },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return PublicationsTypes
}