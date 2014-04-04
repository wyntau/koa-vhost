var util = require('jistype')
    , compose = require('koa-compose');

module.exports = function(vhosts, app){
    if(util.isObject(vhosts)){
        vhosts = [vhosts];
    }else if((util.isString(vhosts) || util.isRegExp(vhosts)) && !util.isUndefined(app)){
        vhosts = [{
            host: vhosts
            , app: app
        }];
    }

    if(!util.isArray(vhosts)){
        throw new Error('vhost define error');
        process.exit(1);
    }

    // trim host's leading `http://` or `https://`
    vhosts.forEach(function(vhost){
        if(util.isString(vhost.host)){
            vhost.host = vhost.host.replace(/^https?:\/\//, '');
        }
    });

    // compose the app's middleware to one middleware
    vhosts.forEach(function(vhost){
        vhost.middleware = compose(vhost.app.middleware);
    });

    return function *(next){
        var hostname, vhost, match, length;

        hostname = this.hostname;
        length = vhosts.length;

        for(var i = 0; i < length; i++){
            vhost = vhosts[i];
            if((util.isString(vhost.host) && hostname === vhost.host) || (util.isRegExp(vhost.host) && hostname.match(vhost.host))){
                match = true;
                break;
            }
        }

        if(match){
            // matched the specific host
            return yield vhost.middleware.call(this, next);
        }else{
            // to next middleware
            return yield next;
        }
    };
};