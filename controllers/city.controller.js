const { request, response } = require("express")
const CitiesService = require("../services/cities.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const citiesService = new CitiesService()


const getCities = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let cities = await citiesService.findAndCount(query)

        const results = getPagingData(cities, page, limit)
        return response.status(200).json({
            cities,
            results,
            // results: 'Cities found',
        });
    } catch (error) {
        next(error)
    }

}


module.exports = {
    getCities
}

