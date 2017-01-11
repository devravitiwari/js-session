# Functions


```js

// How objects are created - 4 things happen when a constructor is called

function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Human(name, age) {
    return;
    this.name = name;
    this.age = age;
}

var p = new Person('Ned Stark', 40);
var h = new Human('John Snow', 30);

console.log(p);
console.log(h);


```