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
