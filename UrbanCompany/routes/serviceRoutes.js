const express = require('express');
const {
    addService,
    listServices,
    updateService,
    getService,
    getServiceOfCategory,
    deleteService
} = require('../controllers/serviceController');
const adminAuth = require('../middlewares/adminAuth');
const userAuth = require('../middlewares/userAuth');
const router = new express.Router();

router.route('/api/service/add-service').post(adminAuth, addService);
router.route('/api/service/list-services').get(userAuth, listServices);
router.route('/api/service/update/:id').put(adminAuth, updateService);
router.route('/api/service/get-service/:id').get(userAuth, getService);
router.route('/api/service/get-category-services/:id').get(userAuth, getServiceOfCategory);
router.route('/api/service/delete-service/:id').delete(adminAuth, deleteService);

module.exports = router;
