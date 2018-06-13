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
    Cloudant = require('@cloudant/cloudant'),
    redis = require('redis'),
    context = require('../context');

// Cloudant
const
    cloudant = new Cloudant({
        url: context.CLOUDANT_URL,
        maxAttempt: 10,
        plugins: {
            retry: {
                retryStatusCodes: [429]
            }
        }
    }),
    cache = cloudant.db.use('cache');


// Redis
const client = redis.createClient(context.REDIS.port, context.REDIS.hostname);
client.auth(context.REDIS.password);
client.on("error", err => {
    console.log("Error " + err);
});

// ルーターを作成する。
const router = express.Router();
module.exports = router;

router.get('/cloudant/:key', (req, res) => {
    cache.get(req.params.key, (error, value) => {
        if (error) {
            console.log('error:', error);
        } else {
            res.json(value);
        }
    });
});

router.get('/redis/:key', (req, res) => {
    client.get(req.params.key, (error, value) => {
        if (error) {
            console.log('error:', error);
        } else {
            res.json(JSON.parse(value));
        }
    });
});