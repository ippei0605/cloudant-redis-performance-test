/**
 * Cloudant vs. Redis Performance Test: コンテキスト
 * @module context
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    vcapServices = require('vcap_services'),
    cloudantCreds = vcapServices.getCredentials('cloudantNoSQLDB'),
    redisCreds = vcapServices.getCredentials('rediscloud');

// 環境変数を取得する。
const appEnv = cfenv.getAppEnv();

/**
 * コンテキスト
 * @type {{PORT: *, URL: *, APIKEY: *, RESOURCE_INSTANCE_ID: *}}
 */
module.exports = {
    PORT: appEnv.port,
    URL: appEnv.url,
    CLOUDANT_URL: cloudantCreds.url,
    REDIS: redisCreds
};