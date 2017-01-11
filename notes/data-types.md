# DataTypes in JavaScript 

There are **primitive** and **derived** data types in any language.

Primitives have native support. By native we mean they are inherently supported
at the lowest level - assembly code through memory registers etc - 
by the runtime enviroment - JS engine in browser or Node on server.

Derived are the ones built on top of primitives - like custom types, domain types etc.
You all create custom types without realizing.
        
#### Primitives
  * `null` - intentional absence of object value
  * `undefined` - An uninitialied variable
  * boolean - True or False
  * number  - Double precision floating point numbers
  * string  - UCS-2 (UTF-16) based string
  * symbol - ES6 onwards


> A note about boolean : There are six values that evaluate to `false` on boolean conversion, namely
>  * The empty string ""
>  * `null`
>  * `undefined`
>  * The number `0`
>  * The number `NaN`
>  * The boolean `false`
>
> Rest all evaluate to true


We have wrapper objects for these primitives
  * `Boolean`
  * `Number` 
  * `String` 
  * `Symbol`           
           
Each wrapper has *`valueOf()`* <del>function</del> <ins>method</ins> 
that return primitive values.

All primitives are *immutable*(their value cannot be changed)

To find the type of any value, use the `typeof` operator

Any value other than the above defined types is an Object categorized as Non-Primitive(Derived) Data types

#### Derived Data Types

**`Object`** is the root derived type in JavaScript. Other objects that derive from Object are - 
  * Date 
  * Array
  * Math
  * RegExp 
  * Error 
  * Function - yes, *function*s : These are regular objects with the additional capability of being *callable*
  * Promise - ES6 onwards
  * ... and many more

When we create an object by any means - {}, new Object - what is create is called a type.
This type derives from <strong>Object</strong> and is the basic building block of our domain.


## Demo Time

```js 
// creating types

var primitive_undefined;
console.log('Every declared uninitialized variable holds the value : ', primitive_undefined);

var null_value = null;
console.log(null_value, 'represents intentional absense of Object value');

var str = 'sample string value';
var number = 1;
var bool = true;
var obj = {};
var ary = [];
var fn = function(){};
var today = new Date;

console.log(str, number, bool, obj, ary, fn, today);

```


```js
var primitive_undefined;
console.log('Every declared uninitialized variable holds the value : ', primitive_undefined);


console.log('If we try access a variable that is not declared, we get : ');
console.log(undeclared_variable);

```

```js 
console.log('To find the value type, we have the typeof operator');

var primitive_undefined;
var null_value = null;
var str = 'sample string ::: ';
var number = 1;
var bool = true;
var obj = {};
var ary = [];
var fn = function(){};
var today = new Date;

console.log(primitive_undefined, typeof primitive_undefined);
console.log(null_value, typeof null_value);
console.log(str, typeof str);
console.log(number, typeof number);
console.log(bool, typeof bool);
console.log(obj, typeof obj);
console.log(ary, typeof ary);
console.log(fn, typeof fn);
console.log(today, typeof today);

```


```js 

console.log('Number type in JS');
console.log('===============================');

var decimal = 987;
var octal = 0100;
var hex = 0xCAFE;

console.log('Decimal 987 in decimal = ', decimal);
console.log('Octal 0100 in decimal = ', octal);
console.log('Hex 0xCAFE in decimal = ', hex);

console.log('we have scientific notation for numbers as well.');
var speedOfLight = 2.99E8;
var planckConstant = 6.62607004e-34;
console.log('speedOfLight ', speedOfLight);
console.log('planckConstant ', planckConstant);


console.log('Numbers can be converted to and from from one base to another');

var number = 1024;
console.log('%d in decimal %s', number, number.toString());
console.log('%d in binary %s', number,number.toString(2));
console.log('%d in octal %s', number,number.toString(8));
console.log('%d in hex %s', number,number.toString(16));

console.log('Decimal %s in decimal %d', '48', parseInt(48));
console.log('Binary %s in decimal %d', '100101', parseInt('100101', 2));
console.log('Octal %s in decimal %d', '0100', parseInt('100', 8));
console.log('Hex %s in decimal %d', '0xCAFE', parseInt('CAFE', 16));

```