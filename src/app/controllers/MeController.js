const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    ///stored/courses
    storedCourse(req, res, next) {
        Course.find({ deletedAt: null })
            .then((course) =>
                res.render('me/stored-courses', {
                    course: mutipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
