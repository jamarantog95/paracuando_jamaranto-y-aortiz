'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Cities extends Model {
        static associate(models) {
            Cities.belongsTo(models.States, { as: 'states', foreignKey: 'state_id' })

            Cities.hasMany(models.Publications, { as: 'publications', foreignKey: 'city_id' })
        }
    }

    Cities.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        state_id: DataTypes.INTEGER,
        name: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Cities',
        tableName: 'cities',
        underscored: true,
        timestamps: true,
        scopes: {
            view_public: { attributes: ['id', 'name'] },
            view_me: { attributes: ['id', 'name'] },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return Cities
}