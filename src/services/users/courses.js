const CoursesModel = require('../../models/courses');

module.exports.getCoursesWithPages = async (currentPage, limitPage, keywords, tutor, category) => {
    const skip = (currentPage - 1) * limitPage;
    const query = CoursesModel.find({
        $and: [{
            course_title: {
                $regex: keywords,
                $options: 'exp'
            }
        }]
    });

    if (tutor.length > 0) {
        query.find({
            tutor_id: {
                $in: tutor
            }
        });
    };
    if (category.length > 0) {
        query.find({
            cat_id: {
                $in: category
            }
        });
    };

    const docs = await query.skip(skip).limit(limitPage).sort({
            _id: -1
        })
        .populate({
            path: 'users',
            select: 'full_name'
        })
        .populate({
            path: 'categories',
            select: 'cat_name'
        });

    const courses = await query.countDocuments();

    return {
        docs: docs,
        currentPage: currentPage,
        totalItems: courses,
        limitPage: limitPage
    };
};

module.exports.getCourses = async () => {
    const courses = await CoursesModel.find();
    return courses;
};

module.exports.addCourse = async (courseData) => {
    try {
        const newCourse = new CoursesModel(courseData);
        return newCourse.save();
    } catch (err) {
        throw err;
    };
};

module.exports.detailsCourse = (id) => {
    try {
        return CoursesModel.findById(id);
    } catch (err) {
        throw err;
    };
};

module.exports.updateCourse = async (id, dataUpdate) => {
    try {
        return CoursesModel.updateOne({
            _id: id
        }, dataUpdate);
    } catch (err) {
        throw err;
    };
};

module.exports.deleteCourse = (id) => {
    try {
        return CoursesModel.deleteOne({
            _id: id
        });
    } catch (err) {
        throw err;
    };
};

module.exports.findCourseByTitle = (courseTitle) => {
    try {
        return CoursesModel.findOne({
            course_title: courseTitle
        });
    } catch (err) {
        throw err;
    };
};