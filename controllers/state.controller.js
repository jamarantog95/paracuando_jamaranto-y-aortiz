const { request, response } = require("express")
const StatesService = require("../services/states.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const statesService = new StatesService()


const getStates = async (request, response, next) => {

    let query = request.query
    let errors = [];
    let states = await statesService.findAndCount(query);

    try {
        try {
            response.status(200).json({
                states,
                results: 'States found',
            });
        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next(error);
    }
}


const getState = async (request, response, next) => {

    let { id } = request.params
    let errors = [];
    let state = await statesService.getState(id);

    try {
        try {
            response.status(200).json({
                state,
                results: 'State found',
            });
        } catch (error) {
            errors.push();
        }
    } catch (error) {
        next(error);
    }
}


const updateState = async (request, response, next) => {
    let { id } = request.params;
    let { name, country_id } = request.body;

    let errors = [];
    let state = await statesService.getState(id);

    try {
        try {
            const statesUpdated = await state.update({
                name,
                country_id
            })

            response.status(200).json({
                statesUpdated,
                results: 'State updated succesfully'
            })

        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next();
    }

}

module.exports = {
    getStates,
    getState,
    updateState
}

