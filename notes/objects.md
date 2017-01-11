# This file explains object data type in JS

Objects are associative arrays - kind off hashes - in JS

```js
var obj = {};
obj.property = 'This is an object property value';
obj['anotherProperty'] = 'another property';

var car = {
  make: 'Honda',
  model: 'City zxi',
  toString: function(){
    return this.make + ' ' + this.model;
  }
}

console.log(car.toString());
```

Objects could be constructed using constructor functions.

```js
function Car() {
  this.make = 'Honda';
  this.model = 'City ZXI';
  this.toString = function() {
    return this.make + ' ' + this.model;
  }
}

var car = new Car();
```

Constructors can take parameters to configure object creation

```js
function Car(make, model) {
  this.make = make;
  this.model = model;
  this.toString = function() {
    return this.make + ' ' + this.model;
  }
}

var hyundai = new Car('Hyundai', 'i10');
```

Objects thus created out of a constructor function has a property called
`constructor`. Functions too have this property, but is of no major use.

```js
console.log(hyundai.constructor);
var swift = new hyundai.constructor('Maruti', 'Swift LXI');
console.log(swift.toString());
```

Using the `instanceof` operator, we could test if an object was created with a
specific constructor function

```js
console.log(swift instanceof Car);
```

As objects are data, functions can return an object. It is also a way to create
objects. The function is usually called a `factory` function

```js
function factory(name) {
  return {
    name: name
  }
}

var foo = factory(foo);
console.log(foo);
console.log(foo.constructor); // logs Object()

```

Functions have a very interesting property called `prototype`. We will use it to
achieve inheritance in the next note.
