var util = require('jistype');
var compose = require('koa-compose');

module.exports = function(vhosts, app, noNext){
    if(util.isObject(vhosts)){
        vhosts = [vhosts];
    }else if((util.isString(vhosts) || util.isRegExp(vhosts)) && !util.isUndefined(app)){
        vhosts = [{
            host: vhosts,
            app: app,
            noNext: noNext
        }];
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

    vhosts.forEach(function(vhost){
        vhost.middleware = compose(vhost.app.middleware);
    });

    return function *(next){
        var hostname = this.hostname;
        var vhost;
        var match;

        for(var i = 0; i < vhosts.length; i++){
            vhost = vhosts[i];
            if((util.isString(vhost.host) && hostname === vhost.host) || (util.isRegExp(vhost.host) && hostname.match(vhost.host))){
                match = true;
                break;
            }
        }

        if(match){
            if(vhost.noNext){
                return yield vhost.middleware.call(this);
            }else{
                return yield vhost.middleware.call(this, next);
            }
        }else{
            return yield next;
        }
    };
};