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
  type: 'premium'
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard'
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium'
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic'
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


const displayMovements = function(movements, sort = false){

  // sort = false, is set to prevent the default sorting right at the start.

  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // movements.slice(), creates a copy of the original array. it prevents the array of movement to be treated twice.

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html =
          `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__value">${mov} €</div>
          </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements
  .reduce((acc, mov) => acc+mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
}


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

const updateUI = function(acc){
    // display movements
    displayMovements(acc.movements)

    // display balance
    calcDisplayBalance(acc)

    // display summary
    calcDisplaySummary(acc)
}


const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov)=> acc+mov, 0)
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov)=> acc+mov, 0)
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map((deposit) => deposit * acc.interestRate/100)
  .filter((int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  } )
  .reduce((acc, int) => acc+int, 0)
  labelSumInterest.textContent = `${interest} €`;
};


// Event Handler:

let currentAccount;

btnLogin.addEventListener('click', function(e){
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if( currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
})

// ----------------------------------------------------------166. implementing-transfers:

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if(amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ){
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }


})


btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 &&
     currentAccount.movements.some(mov => mov >= amount * 0.1)){
    // add movement
    currentAccount.movements.push(amount)
    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.textContent = '';
  inputLoanAmount.blur();
})


// ----------------------------------------------------------167-the-findIndex-method

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  console.log('delete');

  if(currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)){

      const index = accounts.findIndex(acc => acc.username === currentAccount.username)
      console.log(index);
      // delete user
      accounts.splice(index, 1)
      // Hide UI
      containerApp.style.opacity = 0;

   };
   inputCloseUsername.value = inputLoginPin.value = '';
})

// ----------------------------------------------------------168. The New findLast and findLastIndex Methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov<0);
console.log(lastWithdrawal);

// challenge: return this string:
'Your latest large movement was x movements ago'

const x = movements.findLastIndex(mov => Math.abs(mov) > 2000)
console.log(x);
console.log(`Your latest large movement was ${movements.length - x } movements ago`);

// ----------------------------------------------------------169. The Some and every
// Equality
console.log(movements.includes(-130));
// condition
const anyDeposits = movements.some(mov => mov > 0)
console.log(anyDeposits);


let sorted = false;
btnSort.addEventListener('click', function (e) {
  console.log('pressed');

  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})


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
/*
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
  const averageHuman = humanAges.reduce((acc, age) => acc+age, 0)/filteredHumanAges.length;
  console.log(averageHuman);

  return averageHuman;
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

*/

// ----------------------------------------------------------162. The Magic of Chaining Methods
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;
// Pipeline
const totalDepositsUSD = movements
.filter(mov => mov>0)
.map((mov, i, arr) => mov * euroToUSD)
.reduce((acc, mov, i, arr)=> acc+mov, 0)

console.log(totalDepositsUSD);

*/
// ----------------------------------------------------------162. The Magic of Chaining Methods
/*
const calcAverageHumanAge = function(ages){

  const humanAges = ages
  .map(age => age<= 2 ? age*2 : 16 + age * 4)
  .filter(age => age>=18)
  .reduce((acc, age, i, arr)=> acc+age/arr.length, 0);

  console.log(humanAges);

}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
*/

// ----------------------------------------------------------163. The find method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov <0)

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc=> acc.owner === 'Jessica Davis')
console.log(account);

// doing it with for loop:
for (const acc of accounts){
  if(acc.owner === 'Jessica Davis'){
    console.log(acc);
  }
}
*/
// ----------------------------------------------------------165. implementing-log-in:
// ----------------------------------------------------------169. Some and every
/*
// some=> if any of the elements meets the condition it returns true
// every=> if all of the elements meet the condition it returns true
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate call back

const deposit = mov => mov > 0
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

// ----------------------------------------------------------170. flat and flatMap method
/*
const arr = [[1,2,3], [4,5,6], 7, 8]
console.log(arr.flat());


const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8]
console.log(arrDeep.flat());
// we can get pass the depth to the flat method
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements);
// const allMovements = accountMovements.flat()
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov)=> acc+mov, 0)
// console.log(overallBalance);

// flat
// const overallBalance = accounts
// .map(acc => acc.movements)
// .flat()
// .reduce((acc, mov) => acc+ mov, 0)
// console.log(overallBalance);

// flatMap
const overallBalance = accounts
.flatMap(acc => acc.movements)
.reduce((acc, mov) => acc+ mov, 0)
console.log(overallBalance);
// just so you know that flatMap goes one deeper alone not more!
*/
// ----------------------------------------------------------171. Challenge-4
/*
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];

///////////////////--------------------  1.
const calcRecommendedFoodPortion = function(dogs){
  dogs.forEach(dog => {
    dog.recommendedFood = Math.floor(dog.weight ** 0.75 * 28);
  })
}

calcRecommendedFoodPortion(dogs);
console.log(dogs);

///////////////////--------------------  2.
const findSarah = function(dogs){
  return dogs.find(dog => dog.owners.includes('Sarah'));
}
console.log(findSarah(dogs));

///////////////////--------------------  3.
const findTooMuchOwners = function(){

  const dogsEatingTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood)
  console.log(dogsEatingTooMuch);

  const ownersEatTooMuch = dogsEatingTooMuch.map(dog => dog.owners).flat();
  console.log(ownersEatTooMuch);

  return ownersEatTooMuch;
};

findTooMuchOwners(dogs);

const findTooLittleOwners = function(){
  const dogsEatingTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood)
  console.log(dogsEatingTooLittle);

  const ownersEatTooLittle = dogsEatingTooLittle.map(dog => dog.owners).flat();
  console.log(ownersEatTooLittle);

  return ownersEatTooLittle;
};

findTooLittleOwners(dogs)

///////////////////-------------------- 4.

console.log(`${findTooMuchOwners(dogs).join(' and ')}'s dogs eat too much`);

console.log(`${findTooLittleOwners(dogs).join(' and ')}'s dogs eat too little!`);

///////////////////-------------------- 5.

const exactly = dogs.some(dog => dog.curFood === dog.recommendedFood)
console.log('exactly',  exactly);

///////////////////-------------------- 6.

const checkEatingOkay =  dog =>
  dog.curFood > (dog.recommendedFood * 0.9) && dog.curFood < (dog.recommendedFood * 1.1);

console.log(dogs.every(checkEatingOkay));

///////////////////-------------------- 7.


console.log(dogs.filter(checkEatingOkay));


///////////////////-------------------- 8.
const dogsCopy = [...dogs];
console.log(dogsCopy);

dogs.map(dog => dog.recommendedFood )
*/

// ----------------------------------------------------------172. Sorting-arrays
/*
// sort() mutates the original array:
// writing .sort() only, just works based on sorting the strings by default:

// array of strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort());
console.log(owners);

// array of numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
console.log(movements.sort());

// if the call back function returns a positive => B before A => switch
// if the call back function returns a negative => A before B => keep

// ascending
movements.sort((a, b) => a - b)
console.log('ascending', movements);

// descending
movements.sort((a, b) => b - a)
console.log('descending', movements);
*/


// ----------------------------------------------------------173. array-grouping:

console.log(movements);
const groupedMovements = Object.groupBy(
  movements, movement =>
  movement > 0 ? 'deposit' : 'withdraw'
)
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account =>{
    if (account.movements.length >= 8) return 'very active';
    if (account.movements.length >= 4) return 'active';
    if (account.movements.length >= 1) return 'moderate';
    return 'not active';
  }
)
console.log(groupedByActivity);

const groupedByType = Object.groupBy(accounts, account => account.type);

console.log(groupedByType);
f
