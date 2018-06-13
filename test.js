/**
 * @file Cloudant vs. Redis Performance Test: テスト
 * @author Ippei SUZUKI
 */

'use strict';

// テスト対象のURLを設定する。
const URL = 'https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key1';

// モジュールを読込む。
const
    loadtest = require('loadtest'),
    sprintf = require('sprintf-js').sprintf;

const result = [];
return loadTest(100, 5)
    .then(v => {
        result.push(v);
        return loadTest(100, 10);
    })
    .then(v => {
        result.push(v);
        return loadTest(100, 15);
    })
    .then(v => {
        result.push(v);
        return loadTest(100, 20);
    })
    .then(v => {
        result.push(v);
        return loadTest(100, 25);
    })
    .then(v => {
        result.push(v);
        return loadTest(100, 30);
    })
    .then(v => {
        result.push(v);
        console.log('##', URL);
        console.log('---------------------------------------------------------------------------');
        console.log('maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs');
        console.log('---------------------------------------------------------------------------');
        result.forEach(item => {
            console.log(sprintf('%11d  %11d  %6f  %13f  %12f  %12f', item.maxRequests, item.concurrency, item.rps, item.meanLatencyMs, item.maxLatencyMs, item.minLatencyMs));
        });
        console.log('---------------------------------------------------------------------------');
    })
    .catch(e => {
        console.log('error:', e);
    });


/**
 * 負荷テストを実行する。
 * @param maxRequests リクエスト数
 * @param concurrency 同時接続数
 * @returns {Promise}
 */
function loadTest (maxRequests, concurrency) {
    return new Promise((resolve, reject) => {
        loadtest.loadTest({
            url: URL,
            maxRequests: maxRequests,
            concurrency: concurrency
        }, (error, value) => {
            if (error) {
                reject(error);
            } else {
                console.log('### %s, N=%s, C=%s', URL, maxRequests, concurrency);
                console.log(value);
                resolve({
                    url: URL,
                    maxRequests: maxRequests,
                    concurrency: concurrency,
                    rps: value.rps,
                    meanLatencyMs: value.meanLatencyMs,
                    maxLatencyMs: value.maxLatencyMs,
                    minLatencyMs: value.minLatencyMs
                });
            }

        });
    });
}
