const { Op } = require('sequelize');
const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class PublicationsServices {
    constructor() { }

    async findAndCount(query, user_id) {
        const options = {
            attributes: {
                include: [
                    [
                        cast(
                            literal(
                                `(SELECT COUNT(*) FROM "votes" 
                                WHERE "votes"."publication_id" = "Publications"."id")`
                            ),
                            "integer"
                        ),
                        "votes_count",
                    ],
                ],
            },
            include: [
                {
                    model: models.Users,
                    as: 'user',
                    attributes: ['first_name', 'last_name', 'image_url']
                },
                {
                    model: models.PublicationTypes,
                    as: 'publication_type',
                },
                {
                    model: models.PublicationsImages,
                    as: 'images'
                },
                {
                    model: models.Tags,
                    as: 'tags',
                    through: { attributes: [] },
                },
            ],
            where: {},
        };

        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        if (user_id) {
            options.include.push({
                model: models.Users,
                as: 'same_vote',
                where: { id: user_id },
                attributes: ['id', 'first_name', 'last_name'],
                required: false,
                through: {
                    where: { user_id },
                    attributes: []
                }
            })
        }

        // const { id } = query;
        // if (id) {
        //     options.where.id = { [Op.iLike]: `%${id}%` };
        // }


        if (user_id) {
            options.include.push({
                model: models.Users,
                as: 'same_vote',
                where: { id: user_id },
                attributes: ['id', 'first_name', 'last_name'],
                required: false,
                through: {
                    where: { user_id },
                    attributes: []
                }
            })
        }

        const { title } = query
        if (title) {
            options.where.title = { [Op.iLike]: `%${title}%` }
        }

        const { description } = query
        if (description) {
            options.where.description = { [Op.iLike]: `%${description}%` }
        }

        const { content } = query
        if (content) {
            options.where.content = { [Op.iLike]: `%${content}%` }
        }

        const { reference_link } = query
        if (reference_link) {
            options.where.reference_link = { [Op.iLike]: `%${reference_link}%` }
        }

        const { created_at } = query
        if (created_at) {
            options.where.created_at = { [Op.lte]: new Date(created_at) }
        }

        const { publication_type_id } = query;
        if (publication_type_id) {
            options.where.publication_type_id = { [Op.iLike]: `%${publication_type_id}%`, };
        }

        const { tags } = query;
        if (tags) {
            let tagsIDs = tags.split(',')
            options.include.push({
                model: models.Tags,
                as: 'filtered_tags',
                required: true,
                where: { id: tagsIDs },
                attributes: { exclude: ['created_at', 'updated_at', 'description'] },
                through: {
                    attributes: []
                }
            })
        }

        // const { description } = query;
        // if (description) {
        //     options.where.description = {
        //         [Op.iLike]: `%${description}%`,
        //     };
        // }

        // const { reference_link } = query;
        // if (reference_link) {
        //     options.where.reference_link = {
        //         [Op.iLike]: `%${reference_link}%`,
        //     };
        // }


        // const { publication_type_id } = query;
        // if (publication_type_id) {
        //     options.where.publication_type_id = {
        //         [Op.iLike]: `%${publication_type_id}%`,
        //     };
        // }

        // const { tags } = query;
        // if (tags) {
        //     options.where.tags = {
        //         [Op.iLike]: `%${tags}%`,
        //     };
        // }

        // const { created_at } = query;
        // if (created_at) {
        //     options.where.created_at = { [Op.iLike]: `%${created_at}%` };
        // }

        options.distinct = true;

        const publications = await models.Publications.findAndCountAll(options);
        return publications;
    }

    // async getPublication(id) {
    //     let publications = await models.Publications.findByPk(id);
    //     if (!publications)
    //         throw new CustomError('Not found publication', 404, 'Not found');
    //     return publications;
    // }

    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id, user_id) {
        let options = {
            attributes: {
                include: [
                    [cast(literal(
                        `(SELECT COUNT(*) FROM "votes" 
                              WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'),
                        'votes_count']
                ]
            },
            include: [
                {
                    model: models.Users,
                    as: 'user',
                    attributes: ['first_name', 'last_name', 'image_url']
                },
                {
                    model: models.PublicationTypes,
                    as: 'publication_type',
                },
                {
                    model: models.PublicationsImages,
                    as: 'images'
                },
                {
                    model: models.Tags,
                    as: 'tags',
                    through: { attributes: [] },
                },
            ],
        }


        if (user_id) {
            options.include.push({
                model: models.Users,
                as: 'same_vote',
                where: { id: user_id },
                attributes: ['id', 'first_name', 'last_name'],
                required: false,
                through: {
                    where: { user_id },
                    attributes: []
                }
            })
        }

        let publication = await models.Publications.findByPk(id, { raw: true })
        if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
        return publication
    }

    async createPublication(obj, request) {
        let userId = request.user.id;
        const transaction = await models.sequelize.transaction();
        try {
            obj.id = uuid4();
            obj.user_id = userId;
            let newPublication = await models.Publications.create(obj, {
                transaction,
                fields: [
                    'id',
                    'user_id',
                    'publication_type_id',
                    'city_id',
                    'title',
                    'description',
                    'content',
                    'reference_link',
                ],
            });

            await transaction.commit();
            return newPublication;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // async updatePublication(id, obj) {
    //     const transaction = await models.sequelize.transaction();
    //     try {
    //         let publication = await models.Publications.findByPk(id);
    //         if (!publication)
    //             throw new CustomError('Not found publication', 404, 'Not Found');
    //         let updatedPublication = await publication.update(obj, { transaction });
    //         await transaction.commit();
    //         return updatedPublication;
    //     } catch (error) {
    //         await transaction.rollback();
    //         throw error;
    //     }
    // }

    async removepublication(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let publication = await models.Publications.findByPk(id)

            if (!publication)
                throw new CustomError('Not found publication', 404, 'Not Found')

            await publication.destroy({ transaction })

            await transaction.commit();

            return publication
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
}

module.exports = PublicationsServices;
