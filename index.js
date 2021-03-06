const express =  require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis-server:6379'
});
client.connect();
client.set('visits', 0);


app.get("/", (req, res) => {
    client.get('visits').then((visits) => {
        res.send(`number of visits is: ${visits}`);
        client.set('visits', Number(visits) + 1);
    }).catch(err => {
        throw err;
    })
});

const port = 8081;
app.listen(port, () => {
console.log("listening on port: " + port);
});