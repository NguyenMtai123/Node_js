const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    show(req, res, next) {
        // Course.findOne({ slug:req.params.slug })
        //     .then(course => {
        //         res.render('courses/show', {course: mongooseToObject(course)})
        //     })
        //     .catch(next);
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => res.render('courses/show', { course }))
            .catch(next);
    }
    //POST course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.file}/sddefault.jpg`;
        const course = new Course(formData);

        course
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => next(err)); // Thêm xử lý lỗi với next()
    }

    // GET/ courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render('courses/edit', { course }))
            .catch(next);
    }
    // [PUT]/ courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //DELETE /course/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
