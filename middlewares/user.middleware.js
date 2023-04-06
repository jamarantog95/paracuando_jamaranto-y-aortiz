const models = require('../database/models');
const { CustomError } = require('../utils/helpers');
const ProfilesService = require('../services/profiles.service');
const profilesService = new ProfilesService();

const isAdmin = async (request, response, next) => {
  try {
    let userId = request.user.id;
    await profilesService.isAdmin(userId);
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

module.exports = { isAdmin, isAccountOwner, protectPublication };
