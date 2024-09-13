const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, require: true, maxLength: 255 },
        des: { type: String, maxLength: 855 },
        img: { type: String },
        file: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        // createAt: { type: Date, default: Date.now },
        // updateAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
