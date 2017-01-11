# This file will try to explain closures

JS provides functional scope to variables as compared to block scopes in other
languages.

To state it differently, anything declared inside a function is accessible throughout
the function

```javascript
function scope() {
  var a = 10;
  console.log(a, b); // b is accessible here, however its value is undefined
  if (a) {
    var b = 10; // had this not been functional scoped language, b would have been accesible only inside the containing if block
  }
}
```

Functions have access to variables defined in its scope or the scope the function is in.

```javascript
var global = 10;

function scopes(){
  var local = 20;
  console.log(local, global);
}
scopes();

// ---------------------------

var globalVar = 10;

function outer() {
  var outerVar = 20;

  function inner(){
      var innerVar = 30;
      console.log(innerVar, outerVar, globalVar);
  }
  console.log(innerVar, outerVar, globalVar); // innerVar not accessible
}
console.log(innerVar, outerVar, globalVar); // innerVar and outerVar not accessible
```

To understand closures we will borrow concepts from previous notes.
A function can return another function

consider the example
```javascript
function dataHolder() {
  var privateData = 20;
  return function closureCreator(){
        return privateData;
  }
}

var closure = dataHolder(); // variable closure holds the reference to the closureCreator function
var privateVar = closure(); // it executes closureCreator and returns the privateData
console.log(privateVar); // privateVar now holds the reference of the privateData which is not accessible outside dataHolder
```
This is called closure.

Closure : A closure is a function that captures the bindings of free variables in its lexical context.
Free Variables : Variables declared outside lambda but used in lambda
Lambda : Syntax for a function-valued expression
Therefore a closure is a lexically scoped lambda.

```javascript
function dataHolder() {
  var privateData = 20; // this is the free variable
  return function closureCreator(){ // this is our lambda. When returned it will act like closure
        return privateData; // free variable captured inside lambda
  }
}

var closure = dataHolder();
var privateVar = closure();
console.log(privateVar);

```
Closures captures the variable bindings not the value of the variable.
To understand we will look into closures inside loop
```javascript
function outer() {
  var ref = [],
      i;
  for(i = 0; i< 3; i++){
    ref[i] = function(){
      return i;
    }
  }
  return ref;
}

var a = outer();
console.log(a[0], a[1], a[2]);
```
To implement the correct behaviour, well, we will use another closure. Note the
use of a self invoking annonymous function.
```javascript
function outer() {
  var ref = [],
      i;
  for(i = 0; i< 3; i++){
    ref[i] = (function(x){
      return x;
    })(i);
  }
  return ref;
}

var a = outer();
console.log(a[0], a[1], a[2]);
```
We will use the concept of closure to create a counter function which will increment on each iteration
```javascript
var counter = (function (){
  var counter = 0;
  return function () {
    return ++counter;
  }
})();

console.log(counter());
console.log(counter());
console.log(counter());
```