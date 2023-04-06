const { request, response } = require("express")
const PublicationTypesService = require("../services/publicationstypes.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const publicationstypesService = new PublicationTypesService()


const getPublicationsTypes = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let publicationstypes = await publicationstypesService.findAndCount(query)

        const results = getPagingData(publicationstypes, page, limit)
        return response.status(200).json({
            publicationstypes,
            results,
            results: 'Publications Types found',
        });
    } catch (error) {
        next(error)
    }
}


const getPublicationType = async (request, response, next) => {

    try {
        let { id } = request.params
        let publicationtype = await publicationstypesService.getPublicationType(id);

        return response.status(200).json({
            publicationtype,
            results: 'Publication Type found',
        });

    } catch (error) {
        next(error);
    }
}


const updatePublicationType = async (request, response, next) => {

    try {
        let { id } = request.params;
        let { name, description } = request.body;
        let publicationtypeUpdated = await publicationstypesService.updatePublicationType(id, {
            name,
            description
        })

        return response.status(200).json({
            publicationtypeUpdated,
            results: 'Publication Type updated succesfully'
        })

    } catch (error) {
        next(error);
    }

}

module.exports = {
    getPublicationsTypes,
    getPublicationType,
    updatePublicationType
}

