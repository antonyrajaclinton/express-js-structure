import express from 'express';
const router = express.Router()


router.get('/', (req, res) => {
    res.send('admin Home')
})

router.get('/home', (req, res) => {
    res.send('admin Home new')
})



export default router;
