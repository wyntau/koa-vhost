var util = require('./util');
var compose = require('koa-compose');

module.exports = function(vhosts){
    if(util.isObject(vhosts)){
        vhosts = [vhosts];
    }

    if(!util.isArray(vhosts)){
        throw new Error('vhost define error');
        process.exit(1);
    }

    vhosts.forEach(function(vhost){
        if(util.isString(vhost.host)){
            vhost.host = vhost.host.replace(/^https?:\/\//, '');
        }
    });

    return function *(next){
        var host = this.host.replace(/(:\d+)?$/, ''); // remove port
        var vhost;
        var match;
        var app;

        for(var i = 0; i < vhosts.length; i++){
            vhost = vhosts[i];
            if((util.isString(vhost.host) && host === vhost.host) || (util.isRegExp(vhost.host) && host.match(vhost.host))){
                match = true;
                break;
            }
        }

        if(match){
            app = compose(vhost.app.middleware);
            return yield app.call(this, next);
        }else{
            yield next;
        }
    };
};