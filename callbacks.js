function addTwo(i) {
  return i + 2;
}

console.log(addTwo(3)); //5

function addFive(i) {
  return i + 5;
}

console.log(addFive(5)); //10

function map(arr, func) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = func(arr[i]);
  }
  return newArr;
}
console.log(map([1, 2, 3], addTwo)); //[3, 4, 5]

function forEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i]);
  }
}

arr = [1, 2, 3];
forEach(arr, addTwo);
console.log(arr); //[3, 4, 5]

function mapWith(arr, func) {
  let newArr = arr;
  forEach(arr, func);
  return newArr;
}

console.log(mapWith(arr, addTwo)); //[ 5, 6, 7]

function reduce(array, callback, initialValue) {
  for (let elem of array) {
    initialValue = callback(initialValue, elem);
  }
  return initialValue;
}

console.log(reduce(arr, (a, b) => a + b)); //18

function intersection(...arrays) {
  return reduce(
    arrays,
    (a, b) => {
      let result = [];
      for (let elem of b) {
        if (a.indexOf(elem) > -1) {
          result.push(elem);
        }
      }
      return result;
    },
    arrays[0]
  );
}

console.log(intersection(["a", "b", "c"], ["d", "e", "f", "a"])); // a

function union(...arrays) {
  return reduce(
    arrays,
    (a, b) => {
      let result = arrays[0];
      for (let elem of b) {
        if (a.indexOf(elem) < 0) {
          result.push(elem);
        }
      }
      return result;
    },
    arrays[0]
  );
}

console.log(union(["a", "b", "c"], ["d", "e", "f", "a"])); // a

function objOfMatches(arr1, arr2, callback) {
  let object = {};
  for (let i = 0; i < arr1.length; i++) {
    if (callback(arr1[i]) === arr2[i]) {
      object[arr1[i]] = arr2[i];
    }
  }
  return object;
}
// Instructor solution
// function objOfMatches(array1, array2, callback) {
//   return array1
//     .map(elem => {
//       return { [elem]: callback(elem) };
//     })
//     .filter(elem => array2.indexOf(Object.values(elem)[0]) > -1);
// }

console.log(
  objOfMatches(
    ["hi", "howdy", "bye", "later", "hello"],
    ["HI", "Howdy", "BYE", "LATER", "hello"],
    function (str) {
      return str.toUpperCase();
    }
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

function multiMap(arr1, arr2) {
  let obj = {};
  return arr1.map((elem1) => {
    let arrayOfValues = [];
    for (let elem2 of arr2) {
      arrayOfValues.push(elem2(elem1));
    }
    return arrayOfValues;
  });
}

// Test it!
console.log(
  multiMap(
    ["catfood", "glue", "beer"],
    [
      function (str) {
        return str.toUpperCase();
      },
      function (str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
      },
      function (str) {
        return str + str;
      },
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

function objectFilter(object, callback) {
  const array = Object.entries(object).filter((elem) => {
    return elem[1] === callback(elem[0]);
  });

  return Object.fromEntries(array);
}

const cities = {
  London: "LONDON",
  LA: "Los Angeles",
  Paris: "PARIS",
};
console.log(objectFilter(cities, (city) => city.toUpperCase())); // Should log { London: 'LONDON', Paris: 'PARIS'}

function majority(array, callback) {
  let isTrue = 0;
  forEach(array, (i) => {
    callback(i) ? isTrue++ : isTrue--;
  });
  return !!isTrue;
}
const isOdd = function (num) {
  return num % 2 === 1;
};
console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
console.log(majority([2, 3, 4, 5], isOdd)); // should log: false

function prioritize(array, callback) {
  let newArr = [];
  array.map((i) => {
    callback(i) ? newArr.unshift(i) : newArr.push(i);
  });
  return newArr;
}

const startsWithS = function (str) {
  return str[0] === "s" || str[0] === "S";
};
console.log(
  prioritize(
    ["curb", "rickandmorty", "seinfeld", "sunny", "friends"],
    startsWithS
  )
); // should log: s words then the rest

function countBy(array, callback) {
  const obj = {};
  array.forEach((i) => {
    obj[callback(i)] ? obj[callback(i)]++ : (obj[callback(i)] = 1);
  });
  return obj;
}

console.log(
  countBy([1, 2, 3, 4, 5], function (num) {
    if (num % 2 === 0) return "even";
    else return "odd";
  })
); // should log: { odd: 3, even: 2 }

Array.prototype.myForEach = function (callback, thisArg) {
  let index = 0;
  const workingThis = thisArg ? thisArg : this;
  const workingThisLength = workingThis.length;
  for (let i = 0; i < workingThisLength; i++) {
    if (workingThis[i]) {
      callback(workingThis[i], index);
    }
    index++;
  }
};

let sum = 0;

function addToSum(num, index) {
  sum += num;
}

const nums = [1, 2, 3];
nums.myForEach(addToSum);
console.log(sum); // Should output 6
