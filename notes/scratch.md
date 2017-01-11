# Inheritance Patterns


```js
  function Parent(){
    this.name = 'Parent';
    this.type = 'Super';
  }

  Parent.prototype.identify = function() {
    return this.name + ' ' + this.type;
  };

  var pObj = new Parent();
  // console.log(pObj);
  // console.log(pObj.identify());
  // console.log(pObj.__proto__);

  function Child() {}
  Child.prototype = new Parent();

  var cObj = new Child();
  // console.log(cObj);
  // console.log(cObj.identify());
  // console.log(cObj.__proto__);

  function derived() {}
  derived.prototype = Parent.prototype;
  var d = new derived();
  console.log(d.__proto__);
```

```js
  function Super(name){
    this.name = name || 'Super';
  }
  Super.prototype.identify = function() {
    return this.name + ' .';
  };

  var sup = new Super();
  console.log(sup);
  console.log(sup.__proto__);


  function Sub() {
    Super.apply(this, arguments);
  }
  var sub = new Sub('Sub');
  console.log(sub);
  console.log(sub.__proto__); // points to Object.prototype

```




```js
 function inherit(Child, Parent){
   // Enable creation an empty Object
   // Define the constructor
   function F() {}
   // Link the prototype
   F.prototype = Parent.prototype // We inherit only prototype members

   // Return a new Object using the constructor
   return new F(); // This instance only inherits from the prototype.
 }

 // Extending the above function to add a way to access the super class
 function inherit(Child, Parent){
   // Enable creation an empty Object
   // Define the constructor
   function F() {}
   // Link the prototype
   F.prototype = Parent.prototype // We inherit only prototype members
   Child.prototype = new F();
   Child.base = Parent.prototype;

   // constructor link is however broken in this case.
 }

 // Fixing the constructor
 function inherit(Child, Parent) {
   function F() {} // proxy constructor
   F.prototype = Parent.prototype; // linking proxy's prototype to Parent's prototype to enable delegation
   Child.prototype = new F(); // Child is actually an instance of proxy
   Child.base = Parent.prototype; // Child contains a base property that points to the prototype is delegates to, i.e. Parent's prototype
   Child.prototype.constructor = Child; // Setting child's constructor
 }
 ```

 The above function is complete in all respect. However, we could optimize a
 little further. We could avoid creating the proxy constructor each time
 inherit is called. We will use closure to achieve this.

```js
 var inherit = (function() {
   var F = function() {};
   return function(C, P) {
     F.prototype = P.prototype;
     C.prototype = new F();
     C.base = P.prototype;
     C.prototype.constructor = C;
   }
 })();
```

 This completes our `classical inheritance` example. 
 We will now look `prototypal inheritance`.

```js
  function object(o){
    function F(){}
    F.prototype = o;
    return new F();
  }
 var parent = {
   name: 'Papa';
 }
 var child = object(parent);
 console.log(child.name);
```

```js
 function Person(){
   this.name = 'Adam';
 }
 Person.prototype.getName = function() {
   return this.name;
 }
 var papa = new Person();
 var child = object(papa); // inherits own and prototype properties
 console.log(child.getName()); // Adam
```

```js
 function Person(){
   this.name = 'Adam';
 }
 Person.prototype.getName = function() {
   return this.name;
 }
 var papa = new Person();
 var child = object(Person.prototype); // inherits prototype properties only
 console.log(child.getName()); // undefined as name is not on prototype
```

 We can use Object.create from ES5 instead of object function

```js 
 function Person(){
   this.name = 'Adam';
 }
 Person.prototype.getName = function() {
   return this.name;
 }
 var papa = new Person();
 var child = Object.create(Person.prototype); // inherits prototype properties only
 console.log(child.getName()); // undefined as name is not on prototype
```


### Inheitance by copying properties
```js
// shallow copy
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

var dad = {name: 'Adam'};
var kid = extend(dad);
console.log(kid.name); // Adam
```

```js
// Deep Copy

function extendDeep(parent, child) {
  var i,
      toStr = Object.prototype.toString,
      arrayStr = '[object Array]';

      child = child || {};

      for (var i in parent) {
        if (parent.hasOwnProperty(i)) {
          if (typeof parent[i] === 'object') {
            child[i] = (toStr.call(parent[i]) === arrayStr) ? [] : {};
            extendDeep(parent[i], child[i]);
          } else {
            child[i] = parent[i];
          }
        }
      }
      return child;
} 
```





```js
function ParentThis() {
  this.name = 'ParentThis';
}
ParentThis.prototype.id = 'P';
var pC = new ParentThis();
console.log(pC);

function ParentThat() {
  var _state = 10;
  var p = {
    get state() {
      return _state;
    },
    set state(value) {
      _state = value;
    }
  };
  p.prototype = ParentThat.prototype;
  return p;
  ///////////////////
  // var p = Object.create(ParentThat.prototype);
  // p.name = 'ParentThat';
  // return p;
  //////////////////
  // return {
  //   name: 'ParentThat'
  // };
}
ParentThat.prototype.id = 'PT';
var pt = new ParentThat();
console.log(pt);

var a = {};
console.log(a);
```




