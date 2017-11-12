import * as express from 'express';

import Dish from '../models/dish';

const router = express.Router();

router.get('/', (req, res, next) => {
  Dish.find()
  .select('image vegetarian vegan name cafe location mealtime')
  .skip(Number(req.query.page) * Number(req.query.pagecount))
  .limit(Number(req.query.pagecount))
  .exec((err, doc) => {
    if (err) throw err;
    res.json(doc);
  });

});

router.get('/:dishId', (req, res, next) => {
  Dish.findById(req.params.dishId).exec((err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});

export default router;