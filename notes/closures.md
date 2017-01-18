# This file will try to explain closures

 
As of ES5, scope is created by `function`s, `with`, `catch` block of `try` clause - there is no block scope. 

For brevity, we will consider the scope created by `function`.


JS provides functional scope to variables as compared to block scopes in other languages.

To state it differently, anything declared inside a function is accessible throughout the function.

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

Yet another example.

```js
var global = 10;
 
var first = function(){
      var level1 = 20; // local variable
      console.log('global = '+global +' level1 = '+ level1);
  
      var sec = function(){
          var level2 = 30;
          levelglobal = 40; // this is hoisted globally
          // global and level1 accessible here because of scope chain
          console.log('glo = '+global +' l1 = '+ level1 + ' l2 = ' + level2);
        }
    
    sec();
 
    console.log(level2); // undefined
 
    console.log('l1 = '+level1);
 
    console.log('lg = '+levelglobal);
}

first();

console.log('lg = '+levelglobal);

```

## An important point
---------------------------------

In JavaScript, functions have lexical scope.

This means that functions create their environment (scope) when they are defined, not when they are executed.

This statement has far reaching implications, and this very fact give rise to what we call closures.

```js 

function f1(){var a = 1; f2();}

function f2(){return a;}

f1();

```

> Inside the function f1() we call the function f2(). Because the local 
>
> variable a is also inside f1(), one might expect that f2() will have access
>
> to a, but that's not the case. At the time when f2() was defined
>
> (as opposed to executed), there was no a in sight. f2(), just like f1(),
>
> only has access to its own scope and the global scope. f1() and f2()
>
> don't share their local scopes.
 



To understand closures we will borrow concepts from previous notes.

A function can return another function

consider the example

```js
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



# Closure #1

```js
function f(){
    var b = 'b'; // local to f's scope
    return function(){  // b accessible to this function being in scope chain
        return b;       // or being lexically scoped
    }   // f returns this function value expression (lambda) to its parent,
        // creating a closure
}
 
// Closure : A closure is a function that captures the bindings of free variables in its lexical context.
// Free Variables : Variables declared outside lambda but used in lambda
// Lambda : Syntax for a function-valued expression
// Therefore a closure is a lexically scoped lambda.
 
function f(){
    var b = 'b'; // variable declared outside lambda, but used inside it
    return function(){  // this is the lambda
        return b; // this is the free variable
    } // this is lexically scoped, hence closure
}
 
 
var n = f();
console.log(n()); // logs 'b'

``` 
 
 
# Closure #2

```js 

var n;
function f(){
    var b = 'b';
    n = function(){
        return b;
    }
}
 
f();
n();
 
var n;
var n = function f(){
    var b = 'b';
    return function(){
        return b;
    }
}
n()();

```


# Closure #3
 
```js

function f(arg){
    var n = function(){
        return arg;
    };
    arg++;
    return n;
}
 
var m = f(123);
console.log(m()); // outputs 124

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
console.log(a[0](), a[1](), a[2]());

// same example 

function f(){
    var a = []
    ,i;
    for(i = 0; i<3 ; ++i){
        a[i] = function(){
            return i;
        }
    }
    return a;
}
 
var cl = f();
for(i = 0; i<3 ; ++i){
    console.log(cl[i]());
}
 
// Closures captures the scope not the values of the variables
 
function f(){
    var a = [],i;
    for(i = 0; i<3 ; ++i){
        a[i] = (
          function(x){
            return function(){ // closure of a closure
                return x;
            }
          }
        )(i);
    }
    return a;
}
 
var cl = f();
for(i = 0; i<3 ; ++i){
    console.log(cl[i]());
}
 
// same result instead of using IIFE(SIFE), an inner function is used
function f() {
    function makeClosure(x) {
        return function(){
            return x;
        }
    }
    var a = [];
    var i;
    for(i = 0; i < 3; i++) {
        a[i] = makeClosure(i);
    }
    return a;
}
 
```


ES6 onwards, we can use `let` to remedy this issue 

```js

function f(){
    var a = [];
    for(let i = 0; i<3 ; ++i){
        a[i] = function(){
            return i;
        }
    }
    return a;
}
 
var cl = f();
for(i = 0; i<3 ; ++i){
    console.log(cl[i]());
}

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




# Closures In Action

```js 
function bind(context,name){
    return function(){
        return context[name].apply(context,arguments);
    };
}
 
 
Function.prototype.bind = function(){
    var fn = this, args = Array.prototype.slice.call(arguments),
    object = args.shift();
    return function(){
        return fn.apply(object,
            args.concat(Array.prototype.slice.call(arguments)));
    };
};

```
 
Currying

```js  
Function.prototype.curry = function(){
    var fn = this, 
    args = Array.prototype.slice.call(arguments);
    return function(){
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
};
 
function converter(ratio, unit, input){
    return [input*ratio, unit].join(" ");
}
 
var kmToMile = converter.curry(1/1.6, 'mile');
 
var TenKminMile = kmToMile(10);
 
console.log(TenKminMile);
 
var degreeToRadian = converter.curry(Math.PI/180, 'rad');
 
console.log(degreeToRadian(60));
 

``` 
 

Partial Application

```js

Function.prototype.partial = function(){
    var fn = this, 
    args = Array.prototype.slice.call(arguments);
    return function(){
        var arg = 0;
        for (var i = 0; i < args.length && arg < arguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = arguments[arg++];
            }
        }
        return fn.apply(this, args);
    };
};
 
 
var delay = setTimeout.partial(undefined, 10);
 
delay(function(){
    console.log('A call to this function will be delayed 10 ms.');
});
 
```



