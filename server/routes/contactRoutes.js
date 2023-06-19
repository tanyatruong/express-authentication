const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/auth');
    }
    next();
}

// GET route to display all contacts
router.get('/', contactController.getAllContacts);

router.get('/add',requireAuth, contactController.getAddContact);

router.post('/add', requireAuth,contactController.postAddContact);

// Get route to Edit a contact
router.get('/edit/:id',requireAuth, contactController.getEditContact);
// POST route to Edit a contact
router.post('/edit/:id',requireAuth, contactController.postEditContact);

// POST route to delete a contact
router.post('/delete/:id', requireAuth, contactController.deleteContact);

module.exports = router;
