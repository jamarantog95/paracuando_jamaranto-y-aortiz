'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class States extends Model {
        static associate(models) {
            States.belongsTo(models.Countries, { as: 'countries', foreignKey: 'country_id' })
        }
    }

    States.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        country_id: DataTypes.INTEGER,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'States',
        tableName: 'states',
        underscored: true,
        timestamps: true,
        scopes: {
            view_public: { attributes: ['id', 'name'] },
            view_me: { attributes: ['id', 'country_id', 'name'] },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return States
}