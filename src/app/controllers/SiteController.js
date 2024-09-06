const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        //res.render('home');
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
