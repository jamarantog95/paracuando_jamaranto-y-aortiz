const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

const isAdmin = async (request, response, next) => {
    try {
        let { id } = request.user;
        await profilesService.isAdmin(id);
        return next();
    } catch (error) {
        next(error);
    }
};


const isAccountOwner = async (request, response, next) => {
    const accountId = request.params;
    const userId = models.Users.id;

    if (accountId !== userId) {
        return next();
    }
    throw CustomError(
        'You dont have permission to do this action',
        403,
        'Without permission'
    );
};


module.exports = { isAdmin, isAccountOwner }