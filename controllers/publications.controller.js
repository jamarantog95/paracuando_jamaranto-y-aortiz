const PublicationsServices = require('../services/publications.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const models = require('../database/models');

const publicationsServices = new PublicationsServices();



const getPublications = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let publications = await publicationsServices.findAndCountPublication(query);

        const results = getPagingData(publications, page, limit);

        return response.status(200).json({
            publications,
            results,
        });

    } catch (error) {
        next(error);
    }
};

const createPublication = async (request, response, next) => {
    try {
        let { body } = request;
        // let errors = [];
        let publication = await publicationsServices.createPublication(
            body,
            request
        );

        return response.status(201).json({
            // publication,
            results: publication,
            // results: 'Success',
            // errors,
        });

    } catch (error) {
        next(error);
    }
};

const getPublication = async (request, response, next) => {
    // let { id } = request.params;
    // let errors = [];
    // let user = await publicationsServices.getPublication(id);

    // try {
    //     try {
    //         response.status(200).json({
    //             user,
    //             results: 'Publication found',
    //         });
    //     } catch (error) {
    //         errors.push();
    //     }
    // } catch (error) {
    //     next(error);
    // }




    try {
        let { id } = request.params;

        let publication = await publicationsServices.getPublicationOr404(id);

        return response.status(200).json({
            results: publication,
            // results: 'Publication found',
        });

    } catch (error) {
        next(error);
    }
};


// const updatePublication = async (request, response, next) => {
//     let { id } = request.params;
//     let { publication_type_id, city_id, title, description, reference_link } =
//         request.body;

//     let errors = [];
//     let publication = await publicationsServices.getPublication(id);

//     try {
//         try {
//             const publicationUpdated = await publication.update({
//                 publication_type_id,
//                 city_id,
//                 title,
//                 description,
//                 reference_link,
//             });

//             response.status(200).json({
//                 publicationUpdated,
//                 results: 'Publication updated succesfully',
//             });
//         } catch (error) {
//             errors.push();
//         }
//     } catch (error) {
//         next();
//     }
// };

const deletePublication = async (request, response, next) => {
    // let { id } = request.params;
    // // let errors = [];
    // let publication = await publicationsServices.removepublication(id);

    // try {
    //     try {
    //         response.status(201).json({
    //             results: publication,
    //             // results: 'Publication Deleted',
    //         });
    //     } catch (error) {
    //         errors.push();
    //     }
    // } catch (error) {
    //     next(error);
    // }

    try {
        let { id } = request.params;
        let publication = await publicationsServices.removepublication(id);
        return response.status(200).json({
            results: publication,
            // message: "removed",
            // results: 'Publication Deleted',
        });
    } catch (error) {
        next(error);
    }

};

const votes = async (request, response, next) => {
    try {
        let userId = request.user.id;
        let publicationId = request.params.uuid;

        let votes = await models.Votes.create({
            publication_id: publicationId,
            user_id: userId,
        });

        response.status(200).json({
            status: 'Success',
            message: 'Vote add',
            votes,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublications,
    createPublication,
    getPublication,
    deletePublication,
    votes,
};
