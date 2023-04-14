const { request, response } = require("express")
const TagsService = require("../services/tags.service")

const { getPagination, getPagingData } = require("../utils/helpers")

const tagsService = new TagsService()


const getTags = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let tags = await tagsService.findAndCount(query)

        const results = getPagingData(tags, page, limit)
        return response.status(200).json({
            tags,
            results,
            // results: 'Tags found',
        });
    } catch (error) {
        next(error)
    }

}


const getTag = async (request, response, next) => {

    try {
        let { id } = request.params
        let tag = await tagsService.getTagOr404(id);

        return response.status(200).json({
            results: tag,
            // results: 'Tag found',
        });

    } catch (error) {
        next(error);
    }
}


const createTag = async (request, response, next) => {

    try {
        let { body } = request
        let tag = await tagsService.createTag(body);
        return response.status(201).json({
            results: tag,
            // results: 'ok'
        })

    } catch (error) {
        next(error)
    }

}


const updateTag = async (request, response, next) => {

    try {
        let { id } = request.params;
        let { name, description } = request.body;
        let tagUpdated = await tagsService.updateTag(id, {
            name,
            description
        })

        return response.status(200).json({
            results: tagUpdated,
            // results: 'Tag updated succesfully'
        })

    } catch (error) {
        next(error);
    }

}


const deleteTag = async (request, response, next) => {

    try {
        let { id } = request.params
        let tagDeleted = await tagsService.removeTag(id)

        return response.status(200).json({
            results: tagDeleted,
            message: "removed",
            // results: 'Tag deleted succesfully'
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag
}

