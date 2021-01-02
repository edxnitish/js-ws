 //function + lecxical scope = closure

 // 



 // Without Closure Issues
 //1. Global Variable Issue
 var names = ['Amit', 'Arnav', 'Puneet', 'Arun'];

 function printNames(index) {
     return names[index];
 }

 // 2. if declare local on each call it allocate the array memory
 function printNames(index) {
     var names = ['Amit', 'Arnav', 'Puneet', 'Arun'];
     return names[index];
 }

 //3 . Using Closure for the above 2 problems
 var showName = function() {
     var names = ['Amit', 'Arnav', 'Puneet', 'Arun'];
     return function(index) {
         return names[index];
     }

 }(); // Immediate function Call

 showName(1);

 function init() {
     var name = "Amit Srivastava"; // name is a local variable created by init
     function displayName() { // displayName() is the inner function, a closure
         console.log(name); // displayName() uses variable declared in the parent function
     }
     displayName();
 }
 init();

 //**********************************************************************
 function makeFunc() {
     var name = "Amit Srivastava";

     function displayName() {
         console.log(name);
     }
     return displayName;
 }

 var myFunc = makeFunc();
 myFunc();
 /*
  If you run this code it will have exactly the same effect as the previous init() example: the string "Amit Srivastava" will be displayed in a JavaScript alert box. What's different — and interesting — is that the displayName() inner function was returned from the outer function before being executed.

  That the code still works may seem unintuitive. Normally, the local variables within a function only exist for the duration of that function's execution. Once makeFunc() has finished executing, it is reasonable to expect that the name variable will no longer be accessible. Since the code still works as expected, this is obviously not the case.

  The solution to this puzzle is that myFunc has become a closure. A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created. In this case, myFunc is a closure that incorporates both the displayName function and the "Amit Srivastava" string that existed when the closure was created.
  */

 //**********************************************************************
 function makeAdder(x) {
     return function(y) {
         return x + y;
     };
 }

 var add5 = makeAdder(5);
 var add10 = makeAdder(10);

 console.log(add5(2)); // 7
 console.log(add10(2)); // 12

 //*****************************************************************
 /*Emulating private methods with closures
     Languages such as Java provide the ability to declare methods private, meaning that they can only be called by other methods in the same class.

 JavaScript does not provide a native way of doing this, but it is possible to emulate private methods using closures. Private methods aren't just useful for restricting access to code: they also provide a powerful way of managing your global namespace, keeping non-essential methods from cluttering up the public interface to your code.*/

 var counter = (function() {
     var privateCounter = 0;

     function changeBy(val) {
         privateCounter += val;
     }
     return {
         increment: function() {
             changeBy(1);
         },
         decrement: function() {
             changeBy(-1);
         },
         value: function() {
             return privateCounter;
         }
     };
 })();

 console.log(counter.value()); /* Alerts 0 */
 counter.increment();
 counter.increment();
 console.log(counter.value()); /* Alerts 2 */
 counter.decrement();
 console.log(counter.value()); /* Alerts 1 */