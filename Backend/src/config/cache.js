// const Redis = require("ioredis").default

// const redish = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASSWORD
// })

// redish.on("connect", () => {
//     console.log("Server is connected to redis")
// })

//  redish.on("error", (err) => {
//     console.log("Redis Error:", err.message);
// });

// module.exports = redish





// const Redis = require("ioredis").default;

// let redish = null;

// if (process.env.REDIS_HOST && process.env.REDIS_PORT && process.env.REDIS_PASSWORD) {
//     redish = new Redis({
//         host: process.env.REDIS_HOST,
//         port: Number(process.env.REDIS_PORT),
//         password: process.env.REDIS_PASSWORD,
//         lazyConnect: true,
//         maxRetriesPerRequest: 1,
//         retryStrategy: () => null,
//     });

//     redish.on("connect", () => {
//         console.log("Redis connected");
//     });

//     redish.on("error", (err) => {
//         console.log("Redis unavailable:", err.message);
//     });
// } else {
//     console.log("Redis disabled");
// }

// module.exports = redish;



// const redish = null;

// console.log("Redis disabled for development");

// module.exports = redish;



const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,

    // Redis Cloud agar TLS require karta hai to ise enable karna padega.
    // Pehle normal connection test karte hain.
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        if (times > 3) {
            console.error("Redis connection failed after 3 attempts");
            return null;
        }

        return Math.min(times * 500, 2000);
    },
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("ready", () => {
    console.log("Redis ready");
});

redis.on("error", (error) => {
    console.error("Redis Error:", error.message);
});

module.exports = redis;