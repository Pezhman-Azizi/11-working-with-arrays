'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements){

  containerMovements.textContent = '';

  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html =
          `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__value">${mov}</div>
          </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

displayMovements(account1.movements)

const createUserName = function(accs){

  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLocaleLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });

}

createUserName(accounts);


const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc, mov) => acc+mov, 0)
  labelBalance.textContent = `${balance} EUR`;
}
calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b ', 'c', 'd', 'e']

//------------------------------------- SLICE : doesn't change the original array
console.log(arr.slice(2)); // first argument is inclusive and it starts from 0 => ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // last argument is exclusive and it starts counting from 1(or -1 for negative arguments) => ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b ', 'c']

// we can use slice for shallow copy

console.log(arr.slice()); // we can also do it by spread operator console.log([...arr])

//-------------------------------------- SPLICE : Acts like (NOT completely) slice but it mutates the original array

// first element exactly like slice
// second element is the number of items starting from first element to be deleted
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// ------------------------------------- REVERSE: mutates the original array
 arr = ['a', 'b ', 'c', 'd', 'e']
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse());

// ------------------------------------- CONCAT: Doesn't mutate the original array
const letters = arr.concat(arr2)
console.log(letters); // also can use spread operator: console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/
// ----------------------------------------------------------150. the new add method
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// Getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log(arr.at(-2));

//  It also works on strings as well

console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/
// ----------------------------------------------------------151. Looping Arrays: forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements){
  if(movement > 0){
    console.log(`you deposited the ${movement}`);
  }else{
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
}
console.log('-----------------------------for each-----------------------');

movements.forEach(function(mov, i, arr) {
  if(mov> 0){
    console.log(`${i+1}: you deposited the ${mov}`);
  }else{
    console.log(`${i+1}: you withdrew ${Math.abs(mov)}`);
  }
})
*/

// ----------------------------------------------------------152. forEach for Maps and Sets:
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

const uniqueCurrencies = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'GBP', 'GBP'])
console.log(uniqueCurrencies);

uniqueCurrencies.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
})
*/

// ----------------------------------------------------------153. Project Bankist app:

// ----------------------------------------------------------154. creating DOM elements

// ----------------------------------------------------------155. Challenge-1

/*
const checkDogs = function (arr1, arr2){
  const correctedJulia = [...arr1].slice(1, -2);
  console.log('julia copied corrected data: ', correctedJulia);

  const bothArr = [...correctedJulia, ...arr2]
  console.log(bothArr);

  bothArr.forEach(function(age, i){
    if (age >= 3){
      console.log(`Dog number ${i+1} is an adult, and it is ${age} years old`);
    }else{
      console.log(`Dog number ${i+1} is still a puppy`);
    }
  })
}

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4])
*/

// ----------------------------------------------------------156. Data Transformations: map, filter, reduce
// ----------------------------------------------------------157. The Map Method
/*
const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsToUsd = movements.map(mov => mov*euroToUsd)

console.log(movements);
console.log(movementsToUsd);



const movementsUSDfor=[]
for (const mov of movements){
  movementsUSDfor.push(mov*euroToUsd)
}
console.log(movementsToUsd);


const movementDescriptions = movements.map((mov, i) =>
`Movement ${i+1} you ${mov>0? 'deposited' : 'withdrew'} the ${Math.abs(mov)}`)
console.log(movementDescriptions.join('\n'));
*/
// ----------------------------------------------------------158. Computing usernames

// ----------------------------------------------------------159. the filter method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// filter for deposits:
const deposits = movements.filter(function(mov){
  return mov>0;
})
console.log(deposits);

// filter for withdrawal:
const withdrawals = movements.filter(mov => mov<0)
console.log(withdrawals);

// filter with for loop:

const deposits2 = []
for (const mov of movements){
  if (mov > 0){
    deposits2.push(mov)
  }
}
console.log(deposits2);
*/


// ----------------------------------------------------------160. the reduce method
/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, curr) => acc+curr, 0)
// console.log(`iteration number ${i}: ${acc}`)
console.log(balance);


let acc = 0;
for(const mov of movements){
   acc+=mov;
}
console.log(acc);

// Maximum value of movements

const max = movements.reduce((acc, mov)=> {
  if (acc>mov) return acc;
  else return mov;
})
console.log(max);
*/

// ----------------------------------------------------------161. Challenge-2:

const calcAverageHumanAge = function(ages){
  // 1.

  const humanAges = ages.map(function(age){
    if (age <= 2){
      return age*2;
    }else if(age > 2){
      return 16 + age*4;
    }
  });
  console.log(humanAges);

  // 2.
  const filteredHumanAges = humanAges.filter(function (humanAge){
    if (humanAge >= 18) return humanAge;
  })
  console.log(filteredHumanAges);


  // 3.
  const averageHuman = humanAges.reduce((acc, age) => (acc+age, 0)/filteredHumanAges.length);
  console.log(averageHuman);

  return averageHuman;
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
