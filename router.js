const express = require('express');

const router = express.Router();

const homeCtrl = require('./controller/home');
const categoriesCtrl = require('./controller/categories');
const videoCtrl = require('./controller/video');
const recommendChannelCtrl = require('./controller/recommendChannel');

router.get('/', homeCtrl);
router.get('/categories', categoriesCtrl);
router.get('/video/:category', videoCtrl);
router.post('/recommend-channel', recommendChannelCtrl);

module.exports = router;
