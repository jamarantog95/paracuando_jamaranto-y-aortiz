const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')

class PublicationTypesService {

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

      const publicationstypes = await models.PublicationsTypes.findAndCountAll(options)
      return publicationstypes
   }

   //Return Instance if we do not converted to json (or raw:true)
   async getPublicationTypeOr404(id) {
      let publicationtype = await models.PublicationsTypes.findByPk(id, { raw: true })
      if (!publicationtype) throw new CustomError('Not found Publication Type', 404, 'Not Found')
      return publicationtype
   }

   //Return not an Instance raw:true | we also can converted to Json instead
   async getPublicationType(id) {
      let publicationtype = await models.PublicationsTypes.findByPk(id)
      if (!publicationtype)
         throw new CustomError('Not found Publication Type', 404, 'Not Found')
      return publicationtype
   }

   async updatePublicationType(id, obj) {
      const transaction = await models.sequelize.transaction()
      try {
         let publicationtype = await models.PublicationsTypes.findByPk(id)

         if (!publicationtype) throw new CustomError('Not found Publication Type', 404, 'Not Found')

         let updatedPublicationType = await publicationtype.update(obj, { transaction })

         await transaction.commit()

         return updatedPublicationType
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   }


}

module.exports = PublicationTypesService