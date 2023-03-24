const { request, response } = require("express")
const UsersService = require("../services/users.service")
const { getPagination, getPagingData } = require("../utils/helpers")

const usersService = new UsersService()


const getUsers = async (request, response, next) => {

    let query = request.query
    let errors = [];
    let users = await usersService.findAndCount(query);

    try {
        try {
            response.status(200).json({
                users,
                results: 'Users found',
            });
        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next(error);
    }
}

const getUser = async (request, response, next) => {

    let { id } = request.params
    let errors = [];
    let user = await usersService.getUser(id);

    try {
        try {
            response.status(200).json({
                user,
                results: 'User found',
            });
        } catch (error) {
            errors.push();
        }
    } catch (error) {
        next(error);
    }
}


const updateUser = async (request, response, next) => {
    let { id } = request.params;
    let { first_name, last_name, email, username, country_id, code_phone, phone } = request.body;

    let errors = [];
    let user = await usersService.getUser(id);

    try {
        try {
            const userUpdated = await user.update({
                first_name,
                last_name,
                email,
                username,
                country_id,
                code_phone,
                phone
            })

            response.status(200).json({
                userUpdated,
                results: 'User updated succesfully'
            })

        } catch (error) {
            errors.push()
        }
    } catch (error) {
        next();
    }

}



module.exports = {
    getUsers,
    getUser,
    updateUser
}
