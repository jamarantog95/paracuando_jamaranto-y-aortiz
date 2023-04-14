const { request, response } = require("express")
const RolesService = require("../services/roles.service")

const { getPagination, getPagingData } = require("../utils/helpers")



const rolesService = new RolesService()


const getRoles = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let roles = await rolesService.findAndCount(query)

        const results = getPagingData(roles, page, limit)
        return response.status(200).json({
            roles,
            results,
            // results: 'Roles found',
        });
    } catch (error) {
        next(error)
    }

}


module.exports = {
    getRoles
}

