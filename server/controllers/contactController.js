
const Contact = require('../models/contactModel');

// Controller methods for contact-related operations

// Example method to fetch all contacts
const getAllContacts = async (req, res) => {
  try {
    let contactList = await Contact.find();
    res.render('index',
      {
        title: 'Contacts',
        component: 'contact/contacts',
        ContactList: contactList,
        displayName: req.user ? req.user.displayName : ''
      })
  } catch (err) {
    console.log(err);
  }
};

// Contact.find()
//   .then((contacts) => {
//     console.log('hi')
//     res.render('index', { title:'contacts', component: 'contact/contacts'  });
//   })
//   .catch((error) => {
//     console.log(error);
//     res.status(500).send('Internal Server Error');
//   });
// };
// };

// Display Edit Contact Page
const getEditContact = async (req, res) => {
  let id = req.params.id;
  try {
    let contactDetail = await Contact.findById(id);
    res.render('index',
      {
        title: 'Edit Contact',
        component: 'contact/edit',
        ContactDetail:contactDetail,
        displayName: req.user ? req.user.displayName : ''
      })
  } catch (err) {
    console.log(err);
  }
};

// Process update a contact
const postEditContact = (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, email } = req.body;

  Contact.findByIdAndUpdate(id, { name, phoneNumber, email }, { new: true })
    .then((contact) => {
      // Redirect to contacts list view after updating the contact
      res.redirect('/contact-list');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
};

// Example method to delete a contact
const deleteContact = async (req, res) => {
  let id = req.params.id;

  try {
    await Contact.findByIdAndRemove(id);
    res.redirect('/contact-list');
    }catch (err){
        console.log(err);
        res.status(500).send(err);
  }
};

// Display Add New Contact Page
const getAddContact = async (req, res) => {
  try {
    res.render('index',
      {
        title: 'Add New Contact',
        component: 'contact/add',
        displayName: req.user ? req.user.displayName : ''
      })
  } catch (err) {
    console.log(err);
  }
};

// Process new contact after user's submission
const postAddContact = async (req, res) => {
  let newContact = new Contact({
    "name": req.body.name,
    "phoneNumber": req.body.phoneNumber,
    "email": req.body.email,
  })
  try {
    await newContact.save();
    res.redirect('/contact-list')
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}


module.exports = {
  getAllContacts,
  getEditContact,
  postEditContact,
  deleteContact,
  getAddContact,
  postAddContact
};
