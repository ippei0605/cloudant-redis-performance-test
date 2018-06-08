/**
 * Cloudant vs. Redis Performance Test: ルーティング
 * @module routes/index
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/ibm-cos-sdk}
 */

'use strict';

// モジュールを読込む。
const
    express = require('express'),
    fs = require('fs'),
    context = require('../context');

// ルーターを作成する。
const router = express.Router();
module.exports = router;

// Dummy
router.get('/', (req, res) => {
    res.sendStatus(200);
});