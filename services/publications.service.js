const { Op } = require('sequelize');
const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class PublicationsServices {
    constructor() { }

    async findAndCountPublication(query) {
        const options = {
            where: {},
        };

        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const { id } = query;
        if (id) {
            options.where.id = { [Op.iLike]: `%${id}%` };
        }

        const { publication_type_id } = query;
        if (publication_type_id) {
            options.where.publication_type_id = {
                [Op.iLike]: `%${publication_type_id}%`,
            };
        }

        const { title } = query;
        if (title) {
            options.where.title = {
                [Op.iLike]: `%${title}%`,
            };
        }

        const { description } = query;
        if (description) {
            options.where.description = {
                [Op.iLike]: `%${description}%`,
            };
        }

        const { reference_link } = query;
        if (reference_link) {
            options.where.reference_link = {
                [Op.iLike]: `%${reference_link}%`,
            };
        }

        const { tags } = query;
        if (tags) {
            options.where.tags = {
                [Op.iLike]: `%${tags}%`,
            };
        }

        const { created_at } = query;
        if (created_at) {
            options.where.created_at = { [Op.iLike]: `%${created_at}%` };
        }

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
    async getPublicationOr404(id) {
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
