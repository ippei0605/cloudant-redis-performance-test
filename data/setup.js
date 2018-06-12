/**
 * @file Cloudant vs. Redis Performance Test: セットアップ
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    fs = require('fs'),
    Cloudant = require('@cloudant/cloudant'),
    redis = require('redis'),
    context = require('../context');

// データを作成する。
const
    value1 = {
        message: 'Text data'
    },
    value2 = {
        message: 'Text and 20kb jpg data',
        image: 'data:image/jpeg;base64,' + fs.readFileSync('./data/20kb.jpg', 'base64')
    },
    value3 = {
        message: 'Text and 200kb jpg data',
        image: 'data:image/jpeg;base64,' + fs.readFileSync('./data/200kb.jpg', 'base64')
    };

// Cloudant
const cloudant = new Cloudant({
    url: context.CLOUDANT_URL,
    maxAttempt: 10,
    plugins: {
        retry: {
            retryStatusCodes: [429]
        }
    }
});

// Cloudant データベースを再作成してデータを登録する。
const databaseName = 'cache';
cloudant.db.destroy(databaseName, (error, value) => {
    if (error) console.log('error:', error);
    cloudant.db.create(databaseName, (error, value) => {
        if (error) {
            console.log('error:', error);
        } else {
            const db = cloudant.db.use(databaseName);
            db.insert(value1, 'key1');
            db.insert(value2, 'key2');
            db.insert(value3, 'key3');
        }
    });
});

// Redis
const client = redis.createClient(context.REDIS.port, context.REDIS.hostname);
client.auth(context.REDIS.password);
client.on("error", err => {
    console.log("Error " + err);
});

// Redis にデータを登録する。
client.set("key1", JSON.stringify(value1), redis.print);
client.set("key2", JSON.stringify(value2), redis.print);
client.set("key3", JSON.stringify(value3), redis.print);
client.quit();