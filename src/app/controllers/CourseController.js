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
        req.body.img = `https://img.youtube.com/vi/${req.body.file}/sddefault.jpg`;
        const course = new Course(req.body);

        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
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
    //DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //DELETE /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //PATCH/ courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleForm(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'edit':
                res.json(req.body);
                break;
            case 'restore':
                res.json(req.body);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CourseController();
