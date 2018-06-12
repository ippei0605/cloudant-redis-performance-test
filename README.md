# Cloudant vs. Redis Performance Test

* お金のかからない方法で性能比較する。
* Cloudant, Redis Cloud 共に Location は US South。

## 準備

```
{
  "message": "Text data"
}
```

```
{
  "message": "Text and 20kb jpg data",
  "image": "data:image/jpeg;base64,**** 20kb jpg data ****"
}
```

```
{
  "message": "Text and 20kb jpg data",
  "image": "data:image/jpeg;base64,**** 200kb jpg data ****"
}
```


Object をリードを測定
(Redis は JSON.stringify , parse)


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

## 参考資料
* https://www.npmjs.com/package/@cloudant/cloudant
* https://www.npmjs.com/package/redis
* https://www.npmjs.com/package/loadtest

