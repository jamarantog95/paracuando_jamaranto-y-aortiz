const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')

class CitiesService {

    constructor() {
    }

    async findAndCount(query) {
        const options = {
            where: {},
        }

        const { limit, offset } = query
        if (limit && offset) {
            options.limit = limit
            options.offset = offset
        }

        const { id } = query
        if (id) {
            options.where.id = id
        }

        const { name } = query
        if (name) {
            options.where.name = { [Op.iLike]: `%${name}%` }
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true

        const cities = await models.Cities.findAndCountAll(options)
        return cities
    }

    //Return Instance if we do not converted to json (or raw:true)
    async getCityOr404(id) {
        let city = await models.Cities.findByPk(id, { raw: true })
        if (!city) throw new CustomError('Not found Cities', 404, 'Not Found')
        return city
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getCity(id) {
        let city = await models.Cities.scope('view_public').findByPk(id)
        if (!city) throw new CustomError('Not found Cities', 404, 'Not Found')
        return city
    }


}

module.exports = CitiesService