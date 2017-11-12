import * as express from 'express';
import * as passport from 'passport';

import * as Verify from '../lib/verify';

import User from '../models/user';

const router = express.Router();

router.route('/')
.post((req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let error = new Error('Email or Password can\'t be blank');
    error['status'] = 400;
    return next(error);
  }
  if (!req.body.firstname || !req.body.lastname) {
    let error = new Error('First Name or Last Name can\'t be blank');
    error['status'] = 400;
    return next(error);
  }
  User.findOne({ email: req.body.email }, (err, doc) => {
    if(err) {
      return next(err);
    }
    else if(doc) {
      const error = new Error('Student already exist');
      error['status'] = 202;
      //return res.status(202).json({ status: 'User already exist'});
      return next(error);
    }
    User.register(new User({ ...req.body }), req.body.password, (error, user) => {
      if(error) {
        return res.status(500).json({ error: error });
      }
      user.save((err2, doc) => {
        passport.authenticate('local')(req, res, () => {
            return res.status(200).json({ status: 'Registration Successful'});
        })
      })
    })
  })
})

export default router;