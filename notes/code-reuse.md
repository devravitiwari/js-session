# Classical Inheitance

```javascript
// constructor
function Parent(name) {
  this.name = name || 'Parent';
}

// add properties to prototype
Parent.prototype.init = function() {
  console.log('Hello from '+ this.name);
}

// child constructor
function Child(name) {};
// Child.prototype = new Parent();

Child.prototype = Parent.prototype;

var child = new Child();
child.init();
child.name = 'human';
child.init();


// Borrowing constructor
// -----------------------

// constructor
function Parent(name, gender) {
  this.name = name || 'Parent';
  this.gender = gender || 'unknown';
}

// add properties to prototype
Parent.prototype.toString = function() {
  console.dir(this);
  return JSON.stringify(this);
}

// child constructor
function Child(name, gender) {
  Parent.call(this, name, gender); // Borrowing constructor
};
// Child.prototype = new Parent();

//Child.prototype = Parent.prototype;

var child = new Child('humnan', 'male');
child.name;



// Multiple inheritance by borrowing constructor
// ------------------------------
function Cat() {
  this.legs = 4;
}

function Bird() {
  this.wings = 2;
  this.fly = true;
}

function Hybrid() {
  Cat.call(this);
  Bird.call(this);
}

var hybrid = new Hybrid();
console.dir(hybrid);


// Rent and Set Prototype
// -----------------------

// constructor
function Parent(name, gender) {
  this.name = name || 'Parent';
  this.gender = gender || 'unknown';
}

// add properties to prototype
Parent.prototype.toString = function() {
  console.dir(this);
  return JSON.stringify(this);
}

// child constructor
function Child(name, gender) {
  Parent.call(this, name, gender); // Borrowing constructor
};

Child.prototype = new Parent();
//Child.prototype = Parent.prototype;

var child = new Child('humnan', 'male');
child.toString();

// Share the prototype
// ---------------------


// constructor
function Parent(name, gender) {
  this.name = name || 'Parent';
  this.gender = gender || 'unknown';
}

// add properties to prototype
Parent.prototype.toString = function() {
  console.dir(this);
  return JSON.stringify(this);
}

// child constructor
function Child(name, gender) {
  Parent.call(this, name, gender); // Borrowing constructor
};

//Child.prototype = new Parent();
Child.prototype = Parent.prototype;

var child = new Child('humnan', 'male');
child.toString();


// A temporary constructor
// ------------------------

function inherit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}

// constructor
function Parent(name, gender) {
  this.name = name || 'Parent';
  this.gender = gender || 'unknown';
}

// add properties to prototype
Parent.prototype.toString = function() {
  console.dir(this);
  return JSON.stringify(this);
}

// child constructor
function Child(name, gender) {
  //Parent.call(this, name, gender); // Borrowing constructor
};

inherit(Child, Parent);
var child = new Child('humnan', 'male');
child.toString();
// toString is available to child.

// ----------------------------------------------


function inherit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}

// constructor
function Parent(name, gender) {
  this.name = name || 'Parent';
  this.gender = gender || 'unknown';
}

// add properties to prototype
Parent.prototype.toString = function() {
  console.dir(this);
  return JSON.stringify(this);
}

Parent.prototype.init = function(name, gender) {
  this.name = name;
  this.gender = gender;
}

// child constructor
function Child(name, gender) {
  //Parent.call(this, name, gender); // Borrowing constructor
};

inherit(Child, Parent);
var child = new Child();
child.init('humnan', 'male');
child.toString();


// Referencing parent via uber and setting the constructor
// -----------------------

function inherit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}

// optimized inherit. The proxy is created only once, not per every call
var inherit = (function() {
  function F() {}; // proxy constructor saved via closure
  return function inherit(C, P)
    F.prototype = P.prototype; // Setting proxy's prototype
    C.prototype = new F(); // Setting child as proxy's instance
    C.uber = P.prototype; // Preserving super reference
    C.prototype.constructor = C; // Preserving constructor
  }
})();

// klass implementation

var klass = function(Parent, props) {
  var Child, F, i;

  // 1.
  // new constructor
  Child = function() {
    if(Child.uber && Child.uber.hasOwnProperty('__construct')) {
      Child.uber.construct.apply(this, arguments);
    }
    if(Child.prototype.hasOwnProperty('__construct')) {
      Child.prototype.__construct.apply(this, arguments);
    }
  };

  // 2.
  // inherit

  Parent = Parent || Object;
  F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  // 3.
  // add implementation methods
  for (i in props) {
    if (props.hasOwnProperty(i)) {
      Child.prototype[i] = props[i];
    }
  }

  // return the class
  return Child;
}


// Prototypal inheritance
// -------------------------

var parent = {
  name: 'Parent'
}

var child = Object.create(parent);
console.debug(child.name);

// inheriting own as well as prototype's properties

function Parent() {
  this.name = 'Parent';
}

Parent.prototype.speak = function() {
  console.warn(this.name);
}

var child = Object.create(new Parent());
console.debug(child);
var childP = Object.create(Parent.prototype);
console.debug(childP);

// ==================================================

// Inheritance by copying properties - extend

// This returns a shallow copy
function extend(parent, child) {
  var i;
  child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}

function extendDeep(parent, child) {
  var i,
      toStr = Object.prototype.toString,
      aStr = '[object Array]';

  child = child || {};

  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      // is the property object type - need to do deep copy
      if(typeof parent[i] === 'object') {
        child[i] = (toStr.call(parent[i]) === aStr) ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}

// Mixins
function mix() {
  var arg, len, prop, child = {};
  for(arg = 0, len = arguments.length; arg < len; arg+=1) {
    for(prop in arguments[arg]) {
      if(arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop];
      }
    }
  }
  return child;
}

var cake = mix(
  {egg:2, large:true},
  {butter:1, salted:true},
  {flour: '3 cups'},
  {sugar: 'sure !'}
);
console.dir(cake);
```