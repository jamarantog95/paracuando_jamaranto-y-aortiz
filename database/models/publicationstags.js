'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class PublicationsTags extends Model {
        static associate(models) {
            PublicationsTags.belongsTo(models.Tags, { as: 'tags', foreignKey: 'tag_id' })
            PublicationsTags.belongsTo(models.Publications, { as: 'publications', foreignKey: 'publication_id' })
        }
    }

    PublicationsTags.init({
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        publication_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'PublicationsTags',
        tableName: 'publicationstags',
        underscored: true,
        timestamps: true,
        scopes: {
            // view_public: { attributes: ['tag_id', 'publication_id'] },
            // view_me: { attributes: ['tag_id', 'publication_id'] },
            no_timestamps: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            },
        },
    })
    return PublicationsTags
}