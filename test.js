/**
 * @file Cloudant vs. Redis Performance Test: テスト
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const loadtest = require('loadtest');

const options = {
    url: 'https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key1',
    maxRequests: 100,
    concurrency: 20
};
loadtest.loadTest(options, (error, result) => {
    if (error) {
        return console.error('Got an error: %s', error);
    } else {
        console.log('Tests run successfully:', result);
    }
});

console.log('Block？？');