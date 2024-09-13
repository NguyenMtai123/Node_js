const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    //me/stored/courses
    storedCourse(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([
            courseQuery,
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([course, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    course: mutipleMongooseToObject(course),
                }),
            )
            .catch(next);

        // Course.countDocumentsWithDeleted({deleted: true})
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(()=>{})

        // Course.find({})
        //     .then((course) =>
        //         res.render('me/stored-courses', {
        //             course: mutipleMongooseToObject(course),
        //         }),
        //     )
        //     .catch(next);
    }
    //me/trash/courses
    trashCourse(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((course) =>
                res.render('me/trash-courses', {
                    course: mutipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
