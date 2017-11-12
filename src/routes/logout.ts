import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

export default router;