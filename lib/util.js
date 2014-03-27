var getType = function(obj){
    return Object.prototype.toString.call(obj);
};
var util;

util = module.exports = function(){};

util.isString = function(obj){
    return getType(obj) === '[object String]';
};

util.isArray = function(obj){
    return getType(obj) === '[object Array]';
};

util.isRegExp = function(obj){
    return getType(obj) === '[object RegExp]';
};

util.isNumber = function(obj){
    return getType(obj) === '[object Number]';
};

util.isObject = function(obj){
    return getType(obj) === '[object Object]';
};

util.isFunction = function(obj){
    return getType(obj) === '[object Function]';
};

util.isBoolean = function(obj){
    return getType(obj) === '[object Boolean]';
};

util.isUndefined = function(obj){
    return  getType(obj) === '[object Undefined]';
};

util.isNull = function(obj){
    return getType(obj) === '[object Null]';
};

util.isDate = function(obj){
    return getType(obj) === '[object Date]';
};

util.isGlobal = function(obj){
    return getType(obj) === '[object global]';
};

util.getType = getType;