import { Router } from "express";

const router = new Router();

router.get('/', (req, res) => {
    res.send('API - ReadHub');
})

export default router;