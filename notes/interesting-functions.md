# This file talks some interesting function concepts


Functions are data and can be evaluated as soon as they are defined
```js
(function sayHi() {
  console.log('Hi');
})();
```

The structure is
`(<function body here>)();`

This is called `Self Invoking Function Expression - SIFE` 
or `Immediately Invoked Function Expression - IIFE`  

Since functions are data, a function can define and return another function

```js
function initialize() {

  function oneTimeTask() {
    // inner function
  }

  function postInitializationTask() {
    // inner function
    // this function will be returned
  }

  oneTimeTask();

  return postInitializationTask;

}

var run = initialize();
run();

// another way to execute the same function 
initialize()();

```

``` js
function a(input) {
    function b(param){
      return 3 * param + 1;
    }
    return b(input);
}

console.log('I passed 2 but I got ', a(2));

```

Understanding function as data is very crucial in understanding various
idioms used in the language to cherish the power the language provides
