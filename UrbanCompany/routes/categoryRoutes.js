const express = require('express');
const {
    addCategory,
    listCategories,
    updateCategory,
    getCategory,
    deleteCategory
} = require('../controllers/categoryController');
const adminAuth = require('../middlewares/adminAuth');
const userAuth = require('../middlewares/userAuth');
const router = new express.Router();

router.route('/api/category/add-category').post(adminAuth, addCategory);
router.route('/api/category/list-categories').get(userAuth, listCategories);
router.route('/api/category/update/:id').put(adminAuth, updateCategory);
router.route('/api/category/get-category/:id').get(userAuth, getCategory);
router.route('/api/category/delete-category/:id').delete(adminAuth, deleteCategory);

module.exports = router;
