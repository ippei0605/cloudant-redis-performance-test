/**
 * @file Cloudant vs. Redis Performance Test
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    context = require('./context');

// アプリケーションを作成する。
const
    app = express(),
    appEnv = cfenv.getAppEnv();

// ミドルウェアを設定する。
app.use(morgan('combined'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/', require('./routes'));

// リクエトを受付ける。
app.listen(context.PORT, () => {
    console.log("server starting on " + context.URL);
});