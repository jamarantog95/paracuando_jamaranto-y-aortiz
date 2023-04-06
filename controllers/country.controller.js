const { request, response } = require("express")
const CountriesService = require("../services/countries.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const countriesService = new CountriesService()


const getCountries = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let countries = await countriesService.findAndCount(query)

        const results = getPagingData(countries, page, limit)
        return response.status(200).json({
            countries,
            results,
            results: 'Countries found',
        });
    } catch (error) {
        next(error)
    }

}


module.exports = {
    getCountries
}

