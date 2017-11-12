import * as express from 'express';
import * as querystring from 'querystring';

const router = express.Router();

router.route('/')
.all((req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})
.get((req, res, next) => {
  
})

export default router;