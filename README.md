## koa-vhost

vhost for koajs

### Usage
```js
var koa = require('koa');
var vhost = require('koa-vhost');

var server1 = koa();
var server2 = koa();
var server = koa();

server1.use(function *(next){
    this.body = 'api server';
});

server2.use(function *(next){
    this.body = '3 number server';
});

server.use(vhost([
    {
    host: 'api.example.com',
    app: server1
    },{
    host: /\d{3}\.example\.com/,
    app: server2
    }
]));

server.use(function *(next){
    this.body = 'default server';
});

server.listen(3000);
```
Then write to your `/etc/hosts`
```
127.0.0.1 api.example.com
127.0.0.1 100.example.com
127.0.0.1 no.example.com
```

Then

request `api.example.com:3000` will return `api server`;

request `100.example.com:3000` will return `3 number server`;

request `no.example.com:3000` will return `default server`;

### License
MIT