var koa = require('koa');
var vhost = require('..');

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

server.listen(3000);