
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






