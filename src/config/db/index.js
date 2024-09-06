const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/F8_Education_dev');
        console.log('Connect sss');
    } catch (error) {
        console.log('Fail');
    }
}

module.exports = { connect };
