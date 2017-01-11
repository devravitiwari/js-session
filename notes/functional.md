# Functional Programming hacks in JS




```js
var funct = Function.prototype;
var obj = Object.prototype;
var arr = Array.prototype;

var bind = funct.bind;

var unbind = bind.bind(bind);
var call = unbind(funct.call);
var apply = unbind(funct.apply);

var classOf = call(obj.toString);
var ownPropertyOf = call(obj.hasOwnProperty);
var concatenate = call(arr.concat);
var arrayFrom = call(arr.slice);

```