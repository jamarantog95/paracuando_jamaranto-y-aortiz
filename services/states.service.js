const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')

class StatesService {

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

      const states = await models.States.findAndCountAll(options)
      return states
   }

   //Return Instance if we do not converted to json (or raw:true)
   async getStateOr404(id) {
      let state = await models.States.findByPk(id, { raw: true })
      if (!state) throw new CustomError('Not found States', 404, 'Not Found')
      return state
   }

   //Return not an Instance raw:true | we also can converted to Json instead
   async getState(id) {
      let state = await models.States.scope('view_public').findByPk(id)
      if (!state) throw new CustomError('Not found State', 404, 'Not Found')
      return state
   }

}

module.exports = StatesService