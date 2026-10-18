import { Router } from 'express';
import { portfolio } from '../data/portfolio.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(portfolio);
});

export default router;
