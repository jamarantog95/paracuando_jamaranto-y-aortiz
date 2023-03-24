const { request, response } = require("express")
const CountriesService = require("../services/countries.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const countriesService = new CountriesService()


const getCountries = async (request, response, next) => {

    let query = request.query
    let errors = [];
    let countries = await countriesService.findAndCount(query);

    try {
        try {
            response.status(200).json({
                countries,
                results: 'Countries found',
            });
        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next(error);
    }
}


const getCountry = async (request, response, next) => {

    let { id } = request.params
    let errors = [];
    let country = await countriesService.getCountry(id);

    try {
        try {
            response.status(200).json({
                country,
                results: 'Country found',
            });
        } catch (error) {
            errors.push();
        }
    } catch (error) {
        next(error);
    }
}


const updateCountry = async (request, response, next) => {
    let { id } = request.params;
    let { name } = request.body;

    let errors = [];
    let country = await countriesService.getCountry(id);

    try {
        try {
            const countriesUpdated = await country.update({
                name,
            })

            response.status(200).json({
                countriesUpdated,
                results: 'Country updated succesfully'
            })

        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next();
    }

}

module.exports = {
    getCountries,
    getCountry,
    updateCountry
}

