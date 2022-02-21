// Counter is created within scope of createFunction()
function createFunction() {
  let counter = 0;
  return function myFunc() {
    counter++;
    console.log(counter);
  };
}

try {
  counter;
} catch {
  console.log("Counter was in the virtual environment, it no longer exists.");
}

//Counter is exists the the "Backpack" (Closure)
const myFunc = createFunction();

//The function continues to run using the backpack
myFunc(); // 1
myFunc(); // 2

//This new function is a reference to the old function
const myNewFunc = myFunc;
//So...
console.log(myNewFunc == myFunc); // True
console.log(myNewFunc === myFunc); // True
myFunc(); //3
myNewFunc(); // 4

// However, this creates a new function with a separate backpack
const mySecondFunc = createFunction();
// So...
mySecondFunc(); // 1

function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

function after(iterations, callback) {
  let counter = 1;
  return () => {
    if (counter >= iterations) {
      callback();
    }
    counter++;
  };
}

const called = function () {
  console.log("hello");
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

function before(iterations, callback) {
  let counter = iterations;
  return () => {
    if (counter > 0) {
      callback();
      counter;
    }
  };
}

function rollCall(array) {
  let counter = 0;
  return function () {
    if (counter < array.length) {
      console.log(array[counter]);
    } else {
      console.log("Everyone's been accounted for");
    }
    counter++;
  };
}

const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Everyone accounted for'

function cycleIterator(array) {
  let i = -1;
  return function () {
    if (i < array.length - 1) {
      i++;
      return array[i];
    } else {
      i = -1;
      i++;
      return array[i];
    }
  };
}

const threeDayWeekend = ["Fri", "Sat", "Sun"];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

function dateStamp(callback) {
  let obj = {};
  return function (...args) {
    args.forEach((arg) => (obj[new Date().getTime()] = callback(arg)));
    return obj;
  };
}

const stampedMultBy2 = dateStamp((n) => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

function createSecretHolder(secret) {
  let secretValue = secret;
  return {
    getSecret: () => secretValue,
    setSecret: (setter) => {
      secretValue = setter;
    },
  };
}

obj = createSecretHolder(5);
console.log(obj.getSecret()); // => returns 5
obj.setSecret(2);
console.log(obj.getSecret()); // => returns 2

console.log("--BLACKJACK --");

function blackjack(array) {
  let dealerCounter = 0;
  return function DEALER(a, b) {
    let firstPlay = false;
    let sum = a + b;
    let bust = false;
    return function PLAYER() {
      // Return dealt cards
      if (!firstPlay) {
        firstPlay = true;
        return sum;
      }

      if (bust) return "You're done!";
      //Deal cards from array until bust
      const isBust = array[dealerCounter] + sum > 21;
      sum += array[dealerCounter];
      dealerCounter++;
      if (!isBust) {
        return sum;
      } else {
        bust = true;
        return "bust";
      }
    };
  };
}

// /*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

// /*** PLAYER ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
