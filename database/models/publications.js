'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Publications extends Model {
        static associate(models) {
            Publications.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
            Publications.belongsTo(models.PublicationsTypes, { as: 'publication_type', foreignKey: 'publication_type_id' })
            Publications.belongsTo(models.Cities, { as: 'cities', foreignKey: 'city_id' })

            // Publications.belongsToMany(models.Users, { as: 'users', foreignKey: 'user_id', through: 'votes' })
            Publications.belongsToMany(models.Users, { as: 'same_vote', foreignKey: 'publication_id', through: models.Votes })
            // Publications.belongsToMany(models.Users, { as: 'votes', foreignKey: 'publication_id', through: models.Votes })
            Publications.belongsToMany(models.Tags, { as: 'filtered_tags', foreignKey: 'publication_id', through: models.PublicationsTags })
            Publications.belongsToMany(models.Tags, { as: 'tags', foreignKey: 'tag_id', through: 'publicationstags' })
        }
    }
    Publications.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        user_id: DataTypes.UUID,
        publication_type_id: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        reference_link: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Publications',
        tableName: 'publications',
        underscored: true,
        timestamps: true,
        // scopes: {
        //     view_public: { attributes: ['id', 'user_id', 'publication_type_id', 'city_id', 'publicationtype_id', 'title', 'description', 'content', 'reference_link'] },
        //     view_same_user: { attributes: ['id', 'user_id', 'publication_type_id', 'city_id', 'publicationtype_id', 'title', 'description', 'content', 'reference_link'] },
        //     auth_flow: { attributes: ['id', 'title', 'description', 'content', 'reference_link'] },
        //     view_me: { attributes: ['id', 'title', 'description', 'content', 'reference_link'] }
        // },
        // no_timestamps: {
        //     attributes: { exclude: ['created_at', 'updated_at'] }
        // },
    });
    return Publications;
};