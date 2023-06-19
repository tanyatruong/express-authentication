
let express = require('express');
let passport = require('passport');

// create User Model instance
let userModel = require('../models/userModel');
let User = userModel.User; //alias


// Controller methods for user-related operations

// Example method to handle user login
const getLoginPage = (req, res) => {
    if(!req.user)
    {
        res.render('index',
        {
            title: "Login",
            component: 'auth/login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
    // if(!req.user)
    // {
        
    // }
    // else
    // {
    //     return res.redirect('/');
    // }
}

const postLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login err?
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/auth');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

const getRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if(!req.user)
  {
      res.render('index',
      {
          title: "Register",
          component:'auth/register',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  }
  else
  {
      return res.redirect('/');
  }
}

const postRegisterPage = (req, res, next) => {
  //initialize an user object
  let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log(err);
          console.log("Error: Inserting New User");
          if(err.name == 'UserExistsError')
          {
              req.flash(
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log('Error: User Already Exists!');
          }
          return res.render('index',
          {
              title: "Register",
              component:'auth/register',
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
          });
      }
      else
      {
          //if registration is success
          return passport.authenticate('local')(req, res, () => {
              res.redirect('/contact-list')
          });
      }
  });
}

const getLogout = (req, res, next) => {
  req.logout((err) => {
      if (err)
      {
          //handle error here
          console.log(err);
          return next(err);
      }
      return res.redirect('/');
  });
}
module.exports = {
    getLogout,
    getLoginPage,
    getRegisterPage,
    postLoginPage,
    postRegisterPage
}