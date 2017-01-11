# This file shows inheritance in JS in just based on object delegation

In this file we will take a different outlook towards altogether towards
code-reuse. I did not used the term inheritance explicitly as we will use
behviour-delegation as a means to achieve code-reuse.

But first we need to get some facts right.

Every single object is built by a constructor function.

Every time a constructor is called a new object is created.
A constructor makes an object not based on its prototype, rather linked to its
own prototype.

```javascript
// This is our constructor function
function Foo(who) {
  this.me = who;
}

// Setting a common method on the prototype so that every instance of Foo
// shares this.
Foo.prototype.identity = function() {
  return "I am "+ this.me;
}

// Creating two different instances of Foo
var a1 = new Foo('a1');
var a2 = new Foo('a2');

// Adding a local property to an instance of Foo.
// This will not be available on any other instance of Foo
a2.speak =  function() {
  console.log('Hello ' + this.identity() + '.');
}
```

The constructor function has a prototype property pointing to an object
created using the Object prototype(OP) whose constructor is Object.
Lets call this prototype P. This is done by the language internally.

This prototype object P points back to the constructor function using a
"constructor" property on itself.

When we created a1, a new object based on the prototype P is created and an
internal prototype link is set from a1 to P. The spec call this link
[[Prototype]]. Mozilla provided `__proto__` for the same. It became a defacto
standard.

So when we call a property on an instance that is not locally defined, the call
is delegated up the prototype linkage for fullfilment.

```javascript
// a1 doesnot have a constructor property. So the call is delegated to P, the
// object up the prototype linkage. It works out P has a constructor property.
console.log(a1.constructor === Foo);


console.log(a1.constructor === a2.constructor);

// a1 doesnot have __proto__. So P is looked. P also does not have it. So OP
// is looked. OP has this and it finds the correct prototype based on `this`
// binding. __proto__ is actually a getter function.
console.log(a1.__proto__ === Foo.prototype);
console.log(a1.__proto__ === a2.__proto__);

// ES5 added the Object.getPrototypeOf to get the correct prototype linkage.
a1.__proto__ === Object.getPrototypeOf(a1);
// Although this is a hack to achieve the same above feat
a2.__proto__ === a2.constructor.prototype;Object.getPrototypeOf
```

So can you guess how will the call a1.identity() resolve?
Well identity is not defined on a1. Hence it delegates the call for handling
up its prototype. This is how we achieve behaviour delegation.
So if we create a thousand instances of Foo, we will have just one identity
function, not a thousand. This is a big save.


In light of above development, we could easily illustrate shadowing. Assume a1
defines identity
```javascript
a1.identity = function() {
  console.log(Foo.prototype.identity.call(this));
}
```
By doing so a1 defined identity on it. Hence whenever a1.identity is called,
the instance identity is going to respond. No delegation happens in this case.


In the previous file, prototype.js, we have seen how to achieve inheritance.
The idea was to have an extend function to establish the prototype link and
achieve inheritance.

Here we will see the native version of the same function. Enter Object.create


`Object.create` was added in ES5 based on recommendations from
Douglas Crocford. Refer MDN for its polyfill.

Object.create does the first two things of the four that are done when objects
are constructed from a constructor using new keyword.
It creates an empty object.
It links the prototype of the empty object

Now instead of saying we are inheriting properties, we say there is behaviour
delegation. We define properties on objects and link the prototypes.
So whenever a property not available on the object is accessed, we moveup to
its prototype for lookup. This is to say the behaviour is delegated to someone
up the prototype chain.


So lets see the code how we move from classical inheritance to
behaviour delegation
```javascript
function Foo(who) {
  this.me = who;
}

Foo.prototype.identity = function() {
  return "I am "+ this.me;
}

function Bar(who) {
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
  console.log('Hello '+ this.identity() + '.');
}

var b1 = new Bar('b1');
b1.speak();

// Delegation version

function Foo(who) {
  this.me = who;
}

Foo.prototype.identity = function() {
  return "I am "+ this.me;
}

function Bar(who) {
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
  console.log('Hello '+ this.identity() + '.');
}

var b1 = Object.create(Bar.prototype);
Bar.call(b1, "b1");
b1.speak();

////////

function Foo(who) {
  this.me = who;
}

Foo.prototype.identity = function() {
  return "I am "+ this.me;
}

var Bar = Object.create(Foo.prototype);
Bar.init = function(who) {
  Foo.call(this, who);
};
Bar.speak = function() {
  console.log('Hello '+ this.identity() + '.');
};

var b1 = Object.create(Bar.prototype);
b1.init("b1");
b1.speak();

///

var Foo = {
  init : function(who) {
    this.me = who;
  },
  identity: function() {
    return "I am "+this.me;
  }
};

var Bar = Object.create(Foo);
Bar.speak = function() {
  console.log('Hello '+ this.identity() + '.');
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();
```