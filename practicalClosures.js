// Implementing once

function once() {
  counter = 0;
  return function iWillRunOnce() {
    if (counter < 1) {
      console.log("I've only gone and run it!");
    } else {
      console.log("You can't run me twice!");
    }
    counter++;
    console.log(counter);
  };
}

const willIRunJustOnce = once();
willIRunJustOnce(); //I've only gone and run it!
willIRunJustOnce(); //You can't run me twice!

// Implementing memorise

function cacheFindPrime() {
  //Create cache
  cache = {};
  return function findNthPrime(n) {
      if (cache[n]) {
        console.log("Prime found in cache");
        return cache.n;
      }
      //Taken from stackOverflow
      var prime = [],
        i = 1;
      while (i++ && prime.length < n)
        prime.reduce((a, c) => (i % c) * a, 2) && prime.push(i);
      //End of stackOverflow
      if (prime.length) {
        const nthPrime = prime.pop();
        //Add to cache for next time
        cache = { ...cache, [n]: nthPrime };
        console.log(`${n}th prime is ${nthPrime}`);
        return nthPrime;
      } else {
        console.log("Nothing found");
      }
  };
}

const findNthPrimeWithCache = cacheFindPrime();
findNthPrimeWithCache(1);
findNthPrimeWithCache(2);
findNthPrimeWithCache(1);
