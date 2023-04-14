const { request, response } = require("express")
const UsersService = require("../services/users.service")
const { getPagination, getPagingData } = require("../utils/helpers")

const usersService = new UsersService()


const getUsers = async (request, response, next) => {

    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let users = await usersService.findAndCount(query);

        const results = getPagingData(users, page, limit)
        return response.status(200).json({
            users,
            results,
            // results: 'Tags found',
        });

    } catch (error) {
        next(error)
    }


    // try {
    //     try {
    //         response.status(200).json({
    //             users,
    //             results,
    //             // results: 'Users found',
    //         });
    //     } catch (error) {
    //         errors.push()
    //     }
    // } catch (error) {
    //     next(error);
    // }
}

const getUser = async (request, response, next) => {

    // let { id } = request.params
    // let errors = [];
    // let user = await usersService.getUser(id);

    // try {
    //     try {
    //         response.status(200).json({
    //             user,
    //             results: 'User found',
    //         });
    //     } catch (error) {
    //         errors.push();
    //     }
    // } catch (error) {
    //     next(error);
    // }
    try {
        let { id } = request.params
        let tag = await usersService.getUser(id);

        return response.status(200).json({
            results: tag,
            // results: 'Tag found',
        });

    } catch (error) {
        next(error);
    }
}


const updateUser = async (request, response, next) => {
    let { id } = request.params;
    let { first_name, last_name, country_id, code_phone, phone } = request.body;

    let errors = [];
    let user = await usersService.getUser(id);

    try {
        try {
            const userUpdated = await user.update({
                first_name,
                last_name,
                country_id,
                code_phone,
                phone
            })

            response.status(200).json({
                results: userUpdated,
                message: "Succes Update"
                // results: 'User updated succesfully'

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
