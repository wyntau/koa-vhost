## koa-vhost

vhost for koajs

### Install

    npm install koa-vhost

### Usage
```js
var koa = require('koa');
var vhost = require('koa-vhost');

var server = koa();
var server1 = koa();
var server2 = koa();
var server3 = koa();
var server4 = koa();
var server5 = koa();

server1.use(function *(next) {
    this.body = 'server1';
});

server2.use(function *(next) {
    this.body = 'server2';
});

server3.use(function *(next) {
    this.body = 'server3';
});

server4.use(function *(next) {
    this.body = 'server4';
});

server5.use(function *(next) {
    this.body = 'server5';
});

server.use(vhost('s1.example.com', server1));

server.use(vhost(/s2\.example\.com/, server2));

server.use(vhost({
    host: 's3.example.com',
    app: server3
}));

server.use(vhost([{
    host: 's4.example.com',
    app: server4
}, {
    host: /s5\.example\.com/,
    app: server5
}]));

server.use(function * (next) {
    this.body = 'default server';
});

server.listen(3000, function() {
    console.log('server listening port 3000');
});
```
Then write to your `/etc/hosts`
```
127.0.0.1 example.com
127.0.0.1 s1.example.com
127.0.0.1 s2.example.com
127.0.0.1 s3.example.com
127.0.0.1 s4.example.com
127.0.0.1 s5.example.com
```

Then

request `s1.example.com:3000` will return `server1`;

request `s2.example.com:3000` will return `server2`;

request `s3.example.com:3000` will return `server3`;

request `s4.example.com:3000` will return `server4`;

request `s5.example.com:3000` will return `server5`;

request `example.com:3000` will return `default server`;

### License
MIT