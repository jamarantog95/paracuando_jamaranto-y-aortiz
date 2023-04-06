const { request, response } = require("express")
const StatesService = require("../services/states.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const statesService = new StatesService()


const getStates = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let states = await statesService.findAndCount(query)

        const results = getPagingData(states, page, limit)
        return response.status(200).json({
            states,
            results,
            results: 'States found',
        });
    } catch (error) {
        next(error)
    }

}



module.exports = {
    getStates
}

