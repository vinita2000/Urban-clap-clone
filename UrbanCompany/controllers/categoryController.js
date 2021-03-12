const Category = require('../models/category');
const Service = require('../models/service'); // for deleting services of a deleted parent category

exports.addCategory = async (req, res) => { // only allowed for 'admin'
    try {
        const name = req.body.name;
        const isAlreadyPresent = await Category.findOne({name});
        if (isAlreadyPresent) {
            throw new Error();
        }
        const category = await Category.create(req.body);
        res.status(200).json({message: 'Category Added', data: category});

    } catch (e) {
        res.status(501).json({message: e.message});
    }
};

exports.listCategories = async (req, res) => { // public API
    try {
        const category = await Category.find({});
        res.status(200).json({data: category});

    } catch (e) {
        res.status(501).json({message: e.message});
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const category = await Category.findByIdAndUpdate(_id, req.body);;
        if (! category) {
            throw new Error();
        }
        res.status(200).json({message: 'Category Updated', data: category});
    } catch (e) {
        res.status(501).json({message: e.message});
    }
};

exports.getCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const category = await Category.findById(_id);;
        if (! category) {
            throw new Error();
        }
        res.status(200).json({message: 'Category data', data: category});
    } catch (e) {
        res.status(501).json({message: e.message});
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const categoryID = _id;
        const category = await Category.findByIdAndDelete(_id);
        // delete all child services as well 
        const services = await Service.deleteMany({categoryID});
        res.status(200).json({message: 'Category Deleted', data: services});
    } catch (e) {
        res.status(501).json({message: e.message});
    }
};
