This file contains details about Function data type in the language
=====

```js
function sayHelloToTheWorld() {
  console.log('Hello There !');
}
```

```js
function argumentsCheck() {
  console.log('An implicit variable called "arguments" is accessible in every function that contains passed parameters', arguments);
}
argumentsCheck(1, 'hi', ['a', 'b', 'c']);
```

```js
function sum() {
  var len = arguments.length,
      sum = 0;
  while (len--) {
    sum += arguments[len];
  }
  return sum;
}

var total = sum(1,2,3,4,5);

total = sum(1,2);
```

Functions have various interesting properties like name, length etc.

```js
function add(firstNum, secondNum) {
  if (add.length !== arguments.length) {
    throw new Error('Function '+add.name+' expects '+add.length+' parameters however was called with '+ arguments.length);
  }
  return firstNum + secondNum;
}

add();
```

Functions have equal status as data in the language, meaning they can be
assigned to other variables, passed as arguments to other functions in which
case they are referred to as callbacks.

```js
var multiply = function(num1, num1){
  return num1*num2;
}
```

Functions can be defined without a name. Such functions are called anonymous functions

```js
function () {
  console.log('This is an anonymous function');
}
```

Functions can be declared in many ways

### function statement

```js
function makeMeJSNinja() {
  return 'Aho! You are already a ninja';
}
```

### function expression

```js
var saveData = function() {
  // Logic 
}

(
  function () {
    // logic 
  }
)

```


