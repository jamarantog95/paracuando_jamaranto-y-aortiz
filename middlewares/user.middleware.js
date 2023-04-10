const models = require('../database/models');
const ProfilesService = require('../services/profiles.service');
const { CustomError } = require('../utils/helpers');

const profilesService = new ProfilesService();

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


const protectPublication = async (request, response, next) => {
    const accountId = models.Users.id;
    const user_id = models.Publcations.user_id;

    if (accountId !== user_id) {
        return next();
    }
    throw CustomError(
        'You dont have permission to do this action',
        403,
        'Without permission'
    );
};



module.exports = { isAdmin, isAccountOwner, protectPublication }