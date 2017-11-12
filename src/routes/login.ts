import * as express from 'express';
import * as passport from 'passport';

import { getToken } from '../lib/verify';
import User from '../models/user';

const router = express.Router();

router.route('/')
.post((req, res, next) => {
  if(!req.body.email || !req.body.password) {
    let error = new Error('Email or Password can\'t be blank');
    error['status'] = 400;
    next(error);
  } 
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return next(err);
    }
    if(!user) {
      return res.status(401).json({ err: info });
    }
    req.login(user, err => {
      if(err) {
        return res.status(500).json({
          err: 'Could not log in user'
        })
      }
    })
    
    const token = getToken({ 
      'email': user.email, 
      '_id': user._id,
    });
    res.status(200).json({
      status: 'Login Successful',
      success: true,
      token: token
    });
  })(req, res, next);
})

export default router