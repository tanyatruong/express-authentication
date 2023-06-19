var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.getHomePage);

/* GET about page. */
router.get('/about', indexController.getAboutPage);

/* GET projects page. */
router.get('/projects', indexController.getProjectsPage);

/* GET services page. */
router.get('/services', indexController.getServicesPage);

/* GET contact page. */
router.get('/contact', indexController.getContactPage);


module.exports = router;