const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://UN_admin_elearning1:PW_admin_elearning1@elearning.emrrd.mongodb.net/elearningDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return mongoose;
}