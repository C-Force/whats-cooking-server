import Student from '../models/user';
import * as jwt from 'jsonwebtoken';
import { config } from '../lib/config';

export const getToken = user => jwt.sign(user, config.secretKey, { expiresIn: '2h' });

export const verifyUser = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if(err) {
        const err = new Error('You are not authenticated!');
        err['status'] = 401;
        return next(err);
      } else {
        // save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    const err = new Error('No token provided!');
    err['status'] = 403;
    return next(err);
  }
}
