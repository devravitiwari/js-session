# This file explores prototype in JS and how to achieve inheritance

Functions in JS have a very interesting property called prototype

Prototype is an object

>Objects created out of a constructor function have a secret link `__proto__` to
the prototype of the constructor function

```javascript
function foo() {
  return 'bar';
}

console.log(foo.length);
console.log(foo.name);
console.log(foo.constructor);
console.log(foo.prototype);
```
Whenever a object is created using a constructor function, the prototype of the
constructor function is used behind the scene to facilitate the creation of the
new object.

All the properties and methods of prototype object are accessible to the oject
created based on this prototype.

```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.toString = function() {
  return this.make + ' ' + this.model + ' priced at '+ this.price;
}

Car.prototype.price = 2e6;

var swift = new Car('Maruti', 'Swift VXI');
console.log(swift.toString());
```

The prototype can be explicitly defined as an object. This will however overwrite
the prototype.

```javascript
Car.prototype = {
  price: 7e5,
  toString: function() {
    return this.make + ' ' + this.model + ' priced at '+ this.price;
  }
}
```

The prototype property lookup can go up to the chain until it reaches the root
Object.

Hence we always need a machanism to distinguish between own properties and that
of prototype.
hasOwnProperty method on a object is used to check for this scenario
```javascript
console.log(swift.hasOwnProperty('make'));
console.log(swift.hasOwnProperty('price'));
```
## Achieving inheritance

```javascript
function Shape() {
  this.name = 'Shape';
}

Shape.prototype.toString = function() {
  return this.name;
}

function TwoDShape() {
  this.name = '2D Shape';
}

function Triangle(side, height) {
  this.name = 'Triangle';
  this.side = side;
  this.height = height;
  this.getArea = function() {
    return 0.5 * this.side * this.height;
  }
}

//Link the prototypes to achieve inheritance

TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape();

//At this point we have a working inheritance example
//-------------------------------------

//But there seems to be a problem with the constructor
console.log(Shape.prototype.constructor); // correctly logs Shape
console.log(TwoDShape.prototype.constructor); // logs Shape, but should have been TwoDShape
console.log(Triangle.prototype.constructor); // logs Shape, but should have been Triangle

//To fix this we need to set the constructors correctly.
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype.constructor = Triangle;


//-----------------------------------------------
//inheritance in action

var triangle = new Triangle(10, 20);
console.log(triangle.getArea());
console.log(triangle.toString());

/////////////////////////////////////////////////////////
```
Properties shared across instances should always be defined on the prototype so
that they are defined only once, not per instance. This  will save  a lot of
memory.

See the below listing for how to do inheritance

```javascript
function Shape() {}
// augment the prototype
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function() { return this.name;};
Shape.prototype.getArea = function() { throw new Error('Not implemented!');}

function TwoDShape() {}
// establish inheritance link
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
// Augment prototype
TwoDShape.prototype.name = '2D Shape';
```

Note the order here is important. Prototype augmentation should happen only
after inheritance has been established otherwise anything we add to prototype
will be wiped out when we inherit.

```javascript
// Define constructor
function Triangle(side, height) {
  this.side = side;
  this.height = height;
}

// establish inheritance
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;

// Augment the prototype
Triangle.prototype.name = 'Triangle';
Triangle.prototype.getArea = function() {
  return 0.5 * this.side * this.height;
}

// Test inheritance
var triangle = new Triangle(5, 10);
console.log(triangle.getArea());
console.log(triangle.toString());
```

This achieves inheritance, but we inherit from a newly created object. Thus
we get own properties of the newly created object only for inheritance. However,
for performance reasons, we should always have common properties on the
prototype and we should inherit from it, rather than a new object created.

```javascript
function Shape() {}
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function() { return this.name;};
Shape.prototype.getArea = function() { throw new Error('Not implemented!');} // abstract method

function TwoDShape() {}
TwoDShape.prototype = Shape.prototype; //new Shape();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = '2D Shape';

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}

Triangle.prototype = TwoDShape.prototype; //new TwoDShape();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = 'Triangle';
Triangle.prototype.getArea = function() {
  return 0.5 * this.side * this.height;
}

var triangle = new Triangle(5, 10);
console.log(triangle.getArea());
console.log(triangle.toString());

var shape = new Shape();
console.log(shape.toString()); // logs Triangle
```

The last line logs Triangle. Should not it log Shape?
The issue is now all prototypes point to the same object. And hence when we
modify the name on Triangle prototype, the changes reflect on all.

To break the chain, we introduce an intermediary as follows

```javascript
function Shape() {}
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function() { return this.name;};
Shape.prototype.getArea = function() { throw new Error('Not implemented!');}

function TwoDShape() {}

var F = function() {};
F.prototype = Shape.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;

TwoDShape.prototype.name = '2D Shape';

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}

var F = function() {};
F.prototype = TwoDShape.prototype;
Triangle.prototype = new F();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = 'Triangle';
Triangle.prototype.getArea = function() {
  return 0.5 * this.side * this.height;
}

var triangle = new Triangle(5, 10);
console.log(triangle.getArea());
console.log(triangle.toString());

var shape = new Shape();
console.log(shape.toString());
```

By following the above pattern, we have broken the prototype chain, and we do
not inherit the own properties of object. But it seems we are doing the same
thing again and again. This however could be encapsulated. The extend function
below does the same.

```javascript
function extend(derived, base) {
  var ctor = function() {}
  ctor.prototype = base.prototype;
  derived.prototype = new ctor();
  derived.prototype.constructor = derived;
  // in case we want a super reference, we can have below property as well
  derived.super = base.prototype;
}
```
Using the extend function we can redefine inheritance as

```javascript
function Shape() {}
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function() { return this.name;};
Shape.prototype.getArea = function() { throw new Error('Not implemented!');}

function TwoDShape() {}
extend(TwoDShape, Shape);
TwoDShape.prototype.name = '2D Shape';

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}
extend(Triangle, TwoDShape);
Triangle.prototype.name = 'Triangle';
Triangle.prototype.getArea = function() {
  return 0.5 * this.side * this.height;
}

var triangle = new Triangle(5, 10);
console.log(triangle.getArea());
console.log(triangle.toString());

var shape = new Shape();
console.log(shape.toString());
```
==============================================================

function extend can be "extended" to do the prototype link setup as well as
copy instance properties. Here is how

```javascript
function objectPlus(base, config) {
  var ctor = function() {};
  ctor.prototype = base;
  var derived = new ctor();
  // in case we want a super reference, we can have below property as well
  derived.super = base;

  for (var key in config) {
    //if (config.hasOwnProperty(key)) {
      derived[key] = config[key];
    //}
  }
  console.log(derived);
  return derived;
}

var shape = {
  name: 'Shape',
  toString: function() {
    return this.name;
  }
}

var twoDShape = objectPlus(shape, {
  name: 'TwoDShape',
  toString: function() {
    return this.super.toString() +', '+ this.name;
  }
});

var triangle = objectPlus(twoDShape, {
  name: 'Triangle',
  getArea: function() {
    return this.side * this.height * 0.5;
  },
  side: 0,
  height: 0
});

var myTriangle = objectPlus(triangle, {side: 10, height: 20});
console.log(myTriangle.getArea());
console.log(myTriangle.toString());
```