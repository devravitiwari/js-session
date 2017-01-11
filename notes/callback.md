# This file explains callbacks in JS

Functions are treated as data in JS. They are first class citizens. By first
class we mean they are treated equally to data in the language. As data can
be assigned and passed around so do functions. They can be assigned to
variables, can be passed around as parameters to other functions. 

Here an anonymous function, which adds two variables, is assigned to variable add.

```js
var add = function(a, b){
  return a+b;
}
```


## Callbacks
When a function A is passed to another function B and B executes A, it is said
that A is a callback function. If A doesnot have a name, its an anonymous
callback function.

```javascript
//////// named callback

function A() {
  console.log('I am A');
}

function B(cb) {
  console.log('I am B');
  cb();
}

B(A);

/////////////////////

function addOne(num) {
  return num +1;
}

function multiplyAndAddOne(multiplicand, multiplier, plusOneCallback) {
  var product = multiplicand * multiplier;
  return plusOneCallback(product);
}
var result = multiplyAndAddOne(2,3,addOne);
console.log(result);

///////////////////////////

// The same functionality achieved through an anonymous callback

function multiplyAndAddOne(a, b, plusOneCallback) {
  var product = a*b;
  return plusOneCallback(product);
}

var result = multiplyAndAddOne(2,3, function(num) {
  return num + 1;
});

console.log(result);
```