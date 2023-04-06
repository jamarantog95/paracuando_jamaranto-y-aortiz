const PublicationTypesService = require('../services/publicationstypes.service');
const publicationstypesService = new PublicationTypesService();

const getPublicationsTypes = async (request, response, next) => {
  let query = request.query;
  let errors = [];
  let publicationstypes = await publicationstypesService.findAndCount(query);

  try {
    try {
      response.status(200).json({
        publicationstypes,
        results: 'Publications Types found',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next(error);
  }
};

const getPublicationType = async (request, response, next) => {
  let { id } = request.params;
  let errors = [];
  let publicationtype = await publicationstypesService.getPublicationType(id);

  try {
    try {
      response.status(200).json({
        publicationtype,
        results: 'Publication Type found',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next(error);
  }
};

const updatePublicationType = async (request, response, next) => {
  let { id } = request.params;
  let { name } = request.body;

  let errors = [];
  let publicationtype = await publicationstypesService.getPublicationType(id);

  try {
    try {
      const publicationtypeUpdated = await publicationtype.update({
        name,
      });

      response.status(200).json({
        publicationtypeUpdated,
        results: 'Publication Type updated succesfully',
      });
    } catch (error) {
      errors.push();
    }
  } catch (error) {
    next();
  }
};

module.exports = {
  getPublicationsTypes,
  getPublicationType,
  updatePublicationType,
};
