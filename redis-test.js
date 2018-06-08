const context = require('./context');

const REDIS_URL = `redis://${context.REDIS.password}@${context.REDIS.hostname}:${context.REDIS.port}/`;
console.log('###', REDIS_URL);



const redis = require("redis"),
    client = redis.createClient(REDIS_URL);

client.on("error", err => {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);


