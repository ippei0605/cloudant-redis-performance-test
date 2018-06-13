# Cloudant vs. Redis Performance Test

## はじめに
Cloudant と Redis の性能を比較する。

### コンセプト
* Node.js 推しなので、Node アプリを作成する。
* お金のかからない方法で性能比較する。
* Cloudant, Redis Cloud 共に Location は US South に作成する。

### 負荷テストツール
* loadtest を使用する。(コマンド、API共に使用できる。)
    - https://www.npmjs.com/package/loadtest

## テスト方法
1. それぞれのデータベースからデータを取得して、JSON(オブジェクト)をクライアントに返すアプリを作成する。

    |#|Data|Database|URL|
    |--:|----|------|----|
    |  1|{"message": "Text data"}|Cloudant|https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key1|
    |  2|same as above|Redis|https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key1|
    |  3|{"message": "Text and 20kb jpg data", "image": "data:image/jpeg;base64,**** 20kb jpg data ****"}|Cloudant|https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key2|
    |  4|same as above|Redis|https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key2|
    |  5|{"message": "Text and 200kb jpg data", "image": "data:image/jpeg;base64,**** 200kb jpg data ****"}|Cloudant|https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key3|
    |  6|same as above|Redis|https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key3|

1. test.js の URL、リクエスト数、同時接続数を変更しながら、負荷テストを実行する。
    - 測定対象はクライアント (日本にあるノートPC) から IBM Cloud US South まで。

## テスト結果

### Text data Cloudant vs. Redis

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key1
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       7          698.7          1326           615
        100           10      14          669.6          1171           613
        100           15      17          832.3          1259           621
        100           20      18          928.1          2660           609
        100           25      17         1026.8          4411           610
        100           30      17         1186.7          4566           619
---------------------------------------------------------------------------
```

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key1
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       7          661.2          1684           610
        100           10      15          641.6           748           610
        100           15      21          702.5          1805           612
        100           20      27          657.5          1130           608
        100           25      34          678.8           893           619
        100           30      36          710.4           940           632
---------------------------------------------------------------------------
```

### Text and 20kb jpg data Cloudant vs. Redis

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key2
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       5         1012.8          1770           915
        100           10      10           1022          1281           932
        100           15      12         1213.6          1710           936
        100           20      15         1270.4          2289           918
        100           25      14         1560.4          3897           933
        100           30      16         1532.6          3403           943
---------------------------------------------------------------------------
```

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key2
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       5          952.9          1112           898
        100           10      10          973.2          1138           912
        100           15      14          981.1          1145           911
        100           20      19          989.3          1194           909
        100           25      22         1002.4          1357           904
        100           30      25           1008          1351           910
---------------------------------------------------------------------------
```

### Text and 200kb jpg data Cloudant vs. Redis

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/cloudant/key3
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       3         1742.6          2255          1437
        100           10       5         1760.6          2310          1416
        100           15       7         2077.1          7628          1426
        100           20      10           1955          4872          1430
        100           25      11         2014.2          3552          1523
        100           30      12         2011.2          3792          1485
---------------------------------------------------------------------------

```

```
## https://cloudant-redis-performance-test-ippei.mybluemix.net/redis/key3
---------------------------------------------------------------------------
maxRequests  concurrency  rps     meanLatencyMs  maxLatencyMs  minLatencyMs
---------------------------------------------------------------------------
        100            5       3         1592.5          1994          1400
        100           10       6           1562          2231          1374
        100           15       9         1563.8          2682          1419
        100           20      10         1733.7          3211          1398
        100           25      10           2134          6535          1392
        100           30      14         1809.2          2405          1426
---------------------------------------------------------------------------
```

## まとめ
* 総じて、「圧倒的じゃないか、Redis Cloudは。」と言える結果である。
* データが大きくなるほど、Redis の優位性は薄れる。
    - JSON パースの時間をローカルマシンで確認した (test-json) が 1ms 未満のため影響は無視できる。
        - Text data: 0.081ms
        - Text and 20kb jpg dat: 0.094ms
        - Text and 200kb jpg dat: 0.857ms
* Cloudant は以下の制限があるため、get 時の同時接続が20件/秒を越えるとリトライ (0.5秒後) が発生するので遅くなる。
    - Cloudant Throughput capacity
        - 20 Lookups/sec
        - 10 Writes/sec
        - 5 Queries/sec
* かかっている時間の大半はクライアント - Webアプリ間の通信と思われる。
    - より精度をあげるには、US South の IaaS から負荷テストを実施するなどが考えられる。
        - API呼出しをロギングして後で集計する方法もあるかもしれないが、ロギングが重りになるかも？ (めんどくさいだけ？)

## 参考資料
* https://www.npmjs.com/package/@cloudant/cloudant
* https://www.npmjs.com/package/redis

## 付録
### 環境構築手順
#### 共通
1. PC に Bluemix コマンド・ライン・インターフェースをインストールしていない場合は、インストールしてください。
    - ダウンロードサイトは以下。英語で参照する。(日本語は翻訳の都合で最新でない。)
        - https://console.bluemix.net/docs/cli/reference/bluemix_cli/download_cli.html#download_install

1. cloudant-redis-performance-test アプリを PC にダウンロード (Download ZIP) して解凍してください。ディレクトリ名は cloudant-redis-performance-test-master から cloudant-redis-performance-test に変更してください。

1. ターミナルで、解凍したディレクトリ (cloudant-redis-performance-test アプリのホーム) に移動してください。(コマンドは以下、$ はコマンドプロンプトです。)

    ```
    $ cd cloudant-redis-performance-test
    ```

1. NPM パッケージをインストールする。(ローカルで postinstall スクリプトを起動させない。)
    ```
    $ npm i --ignore-scripts
    ```

#### 負荷テストアプリを構築せずプッシュ済みアプリを利用する
1. 負荷テストを実行する。

    ```
    $ node test
    ```
    > test.js の 定数 URL、関数 loadTest の引数 (リクエスト数 maxRequests, 同時接続数 concurrency) を変更して負荷テストを進める。


#### 自身の負荷テストアプリをプッシュする。
1. [package.json](./package.json) の `scripts` と [manifest.yml](./manifest.yml) を自身の環境に変更する。
    > package.json の scripts に ibmcloud コマンドを定義している。

1. ログインする。

    ```
    $ npm run login
    ```
    > Email, Password を入力する。

1. Cloudant および Redis Cloud サービスインスタンスを作成する。

    ```
    $ npm run service_create
    ```
    > 削除コマンドも用意している。 `npm run service_delete`


1. アプリをプッシュする。

    ```
    $ npm run push
    ```

1. ブラウザでアプリを起動する。

    ```
    $ npm run page
    ```
