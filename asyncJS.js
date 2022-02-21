/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
// testMe(); // what order should these log out? Howdy or Partnah first?

/* CHALLENGE 2 */

function delayedGreet() {
  function sayWelcome() {
    console.log("Welcome");
  }
  setTimeout(sayWelcome, 3000);
}
// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  console.log("hello");
  const goodbye = () => {
    console.log("goodbye");
  };
  setTimeout(goodbye, 2000);
}
// Uncomment the following line to check your work!
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 6 */

function everyXsecsForYsecs(func, interval, duration) {
  const setRunning = () => {
    running = false;
  };
  const setWaiting = () => {
    func();
    startTimeout();
  };
  let running = true;
  setTimeout(setRunning, duration * 1000);

  const startTimeout = () => {
    if (!running) return;
    const stamp = setTimeout(setWaiting, interval * 1000);
  };
  startTimeout();
}
// Uncomment the following lines to check your work!
function theEnd() {
  console.log("This is the end!");
}
// everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!

/* CHALLENGE 8 */

function promised(val) {
  const myPromise = new Promise((res, rej) => {
    setTimeout(() => {
      res(val);
    }, 2000);
  });
  return myPromise;
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const createPromise = promised("wait for it...");
// createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

/* CHALLENGE 9 */

class SecondClock {
  constructor(cb) {
    this.cb = cb;
    this.currentSecond = 1;
    this.intervalID = null;
  }
  start = () => {
    this.intervalID = setInterval(this.waitASecond, 1000);
  };
  reset = () => {
    clearInterval(this.intervalID);
  };
  waitASecond = () => {
    this.cb(this.currentSecond);
    this.currentSecond++;
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);

