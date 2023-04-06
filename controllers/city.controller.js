const { request, response } = require("express")
const CitiesService = require("../services/cities.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const citiesService = new CitiesService()


const getCities = async (request, response, next) => {

    let query = request.query
    let errors = [];
    let cities = await citiesService.findAndCount(query);

    try {
        try {
            response.status(200).json({
                cities,
                results: 'Cities found',
            });
        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next(error);
    }
}


const getCity = async (request, response, next) => {

    let { id } = request.params
    let errors = [];
    let city = await citiesService.getCity(id);

    try {
        try {
            response.status(200).json({
                city,
                results: 'City found',
            });
        } catch (error) {
            errors.push();
        }
    } catch (error) {
        next(error);
    }
}


const updateCity = async (request, response, next) => {
    let { id } = request.params;
    let { name, state_id } = request.body;

    let errors = [];
    let city = await citiesService.getCity(id);

    try {
        try {
            const citiesUpdated = await city.update({
                name,
                state_id
            })

            response.status(200).json({
                citiesUpdated,
                results: 'City updated succesfully'
            })

        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next();
    }

}

module.exports = {
    getCities,
    getCity,
    updateCity
}

