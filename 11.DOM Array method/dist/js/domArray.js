const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

randomUser();
randomUser();
randomUser();
//Fetch random user and add money
async function randomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  // console.log(data);

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

//double everyone's money
function doubleMoney() {
  data = data.map(user =>{
    return {...user, money: user.money * 2};
  });
  updateDOM();
}

//show millionaires only
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

//sort user by richest
function sortByRichest() {
  data.sort((a,b) => b.money - a.money);
  updateDOM();
}

//calculate total Wealth of users
function calculateWealth() {
  const Wealth = data.reduce((accumulator, user) => (accumulator += user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(Wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
  
}

//Update DOM
function updateDOM(providedData = data) {
  //clear Main div
  main.innerHTML = `<h2> <strong>Person</strong> Wealth </h2>`;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> 
    ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return 'Rs.' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//add new user
addUserBtn.addEventListener('click', randomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
