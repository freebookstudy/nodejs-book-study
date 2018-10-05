/**
 * const, let
 */
if(true) {
  var x = 3;
}
console.log(x); //3

if(true){
  const y = 3;
}
console.log(y); //Uncaught ReferenceError: y is not defined



const a = 0;
a = 1; //Uncaught TypeError: Assignment to constant variable.
let b = 0;
b = 1; // 1

const c; // Uncaught SyntaxError: Missing initializer in const declaration