const TagsService = require('../services/tags.service');
const tagsService = new TagsService();

const getTags = async (request, response, next) => {
  let query = request.query;
  let errors = [];
  let tags = await tagsService.findAndCount(query);

  try {
    try {
      response.status(200).json({
        tags,
        results: 'Tags found',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next(error);
  }
};

const createTag = async (request, response, next) => {
  try {
    let { body } = request;
    let tag = await tagsService.createTag(body, request);

    response.status(200).json({
      tag,
      results: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

const getTag = async (request, response, next) => {
  let { id } = request.params;
  let errors = [];
  let tag = await tagsService.getTag(id);

  try {
    try {
      response.status(200).json({
        tag,
        results: 'Tag found',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next(error);
  }
};

const updateTag = async (request, response, next) => {
  let { id } = request.params;
  let { name } = request.body;

  let errors = [];
  let tag = await tagsService.getTag(id);

  try {
    try {
      const tagUpdated = await tag.update({
        name,
      });

      response.status(200).json({
        tagUpdated,
        results: 'Tag updated succesfully',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next();
  }
};

module.exports = {
  getTags,
  createTag,
  getTag,
  updateTag,
};
