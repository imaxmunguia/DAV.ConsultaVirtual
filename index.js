'use strict';

var calculator = require('./app/calculator');

var a = 3;
var b = 5;

console.log(`fAdd ${a} + ${b} = ${calculator.add(a,b)}`);
console.log(`fMinus ${a} - ${b} = ${calculator.minus(a,b)}`);
console.log(`fMultiply ${a} * ${b} = ${calculator.multiply(a,b)}`);
console.log(`fDivide ${a} / ${b} = ${calculator.divide(a,b)}`);