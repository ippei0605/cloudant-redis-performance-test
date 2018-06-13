/**
 * @file Cloudant vs. Redis Performance Test: テスト
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読み込む。
const fs = require('fs');

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

// オブジェクトを文字列に変換する。
const
    str1 = JSON.stringify(value1),
    str2 = JSON.stringify(value2),
    str3 = JSON.stringify(value3);


console.time('Text data');
const v1 = JSON.parse(str1);
console.timeEnd('Text data');

console.time('Text and 20kb jpg dat');
const v2 = JSON.parse(str2);
console.timeEnd('Text and 20kb jpg dat');

console.time('Text and 200kb jpg dat');
const v3 = JSON.parse(str3);
console.timeEnd('Text and 200kb jpg dat');