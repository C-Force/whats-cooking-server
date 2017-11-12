import * as express from 'express';

import User from '../models/user';

const router = express.Router();

router.put('/:userId/dish/:dishId', (req, res, next) => {
  User
  .findById(req.params.userId).exec((err, doc: any) => {
    if (err) throw err;
    if (doc.favorites.indexOf(req.params.dishId) <= -1) {
      console.log(doc.favorites);
      doc.favorites.push(req.params.dishId);
      doc.save((err2, newDoc) => {
        if (err2) throw err2;
        res.json(newDoc);
      })
    } else {
      res.json(doc);
    }
  });
});

router.delete('/:userId/dish/:dishId', (req, res, next) => {
  User
  .findById(req.params.userId).exec((err, doc: any) => {
    if (err) throw err;
    doc.favorites.remove(req.params.dishId);
    doc.save((err2, newDoc) => {
      if (err2) throw err2;
      res.json(newDoc);
    })
  });
});

export default router;