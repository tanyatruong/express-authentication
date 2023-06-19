exports.getHomePage = function (req, res, next) {
    res.render('index', { title: 'Home', component: 'home' });
};

exports.getAboutPage = function (req, res, next) {
    res.render('index', { title: 'About', component: 'about' });
};

exports.getProjectsPage = function (req, res, next) {
    res.render('index', { title: 'Projects', component: 'projects' });
};

exports.getServicesPage = function (req, res, next) {
    res.render('index', { title: 'Services', component: 'services' });
};

exports.getContactPage = function (req, res, next) {
    res.render('index', { title: 'Contact Us', component: 'contact' });
};