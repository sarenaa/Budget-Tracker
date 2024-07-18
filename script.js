"use strict";
const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDesEl = document.querySelector(".expensess_input");
const emotionEl = document.querySelector(".output"); //idk??
const expenseAmountEl = document.querySelector(".expensess_amount");
const tblRecordEl = document.querySelector(".tbl_data");
const cardsContainer = document.querySelector(".cards");
// cards content
const budgetCardEl = document.querySelector(".budget_card"); //card
const expensesCardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");
let itemList = [];
let itemId = 0;
//===============Button Events==============
function btnEvents() {
  const btnBudgetCal = document.querySelector("#btn_budget");
  const btnExpensesCal = document.querySelector("#btn_expenses");
  const btnEmotionCal = document.querySelector("#btn_emotions");
  //========Budget Event===============
  btnBudgetCal.addEventListener("click", (e) => {
    e.preventDefault();
    budgetFun();
  });
  //========Budget Event===============
  btnExpensesCal.addEventListener("click", (e) => {
    e.preventDefault();
    expensesFun();
  });
  btnEmotionCal.addEventListener("click", (e) => {
    e.preventDefault();
    emotionsFun();
  })
}
//==================Calling Btns Event==========
document.addEventListener("DOMContentLoaded", btnEvents);
//emotions function
function emotionsFun(){
  const selectElement =  document.querySelector('#list'); //from html
  const output = selectElement.value;
  document.querySelector('.output').textContent = output; //show emotion selected
}
//================= Expenses Function============
function expensesFun() { //i think put whole emotion inside expense, so it can show in card
  let expensesDescValue = expenseDesEl.value;
  let expenseAmountValue = expenseAmountEl.value;
  if (
    expensesDescValue == "" ||
    expenseAmountValue == "" ||
    budgetInputEl < 0
  ) {
    errorMessage("Error, Enter Expenses Description or Amount!");
  } else {
    let amount = parseInt(expenseAmountValue);
    expenseAmountEl.value = "";
    expenseDesEl.value = "";
    const selectElement =  document.querySelector('#list'); //from html
    const emotionSelected = selectElement.value; //get selected emotion

    // store the value inside the object
    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount,
      emotion: emotionSelected,
    }; //object id
    itemId++;
    itemList.push(expenses);
    // add expenses inside the HTML Page
    addExpenses(expenses);
    showBalance();
  }
}
//========================Add Expenses================== object id is after .
function addExpenses(expensesPara) {
  const html = `<ul class="tbl_tr_content">
            <li data-id=${expensesPara.id}>${expensesPara.id + 1}</li>
            <li>${expensesPara.title}</li>
            <li><span>$</span>${expensesPara.amount}</li>
            <li>${expensesPara.emotion}</li> 
            <li>
              <button type="button" class="btn_edit">Edit</button>
              <button type="button" class="btn_delete">Delete</button>
            </li>
          </ul>`;
  tblRecordEl.insertAdjacentHTML("beforeend", html);
  //=================== Edit=======================
  const btnEdit = document.querySelectorAll(".btn_edit");
  const btnDel = document.querySelectorAll(".btn_delete");
  const content_id = document.querySelectorAll(".tbl_tr_content");
  // btn edit event
  btnEdit.forEach((btnedit) => {
    btnedit.addEventListener("click", (el) => {
      let id;
      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });
      let element = el.target.parentElement.parentElement;
      element.remove();
      let expenses = itemList.filter(function (item) {
        return item.id == id;
      });
      expenseDesEl.value = expenses[0].title;
      expenseAmountEl.value = expenses[0].amount;
      let temp_list = itemList.filter(function (item) {
        return item.id != id;
      });
      itemList = temp_list;
    });
  });
  //============ btn delete
  btnDel.forEach((btndel) => {
    btndel.addEventListener("click", (el) => {
      let id;
      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });
      let element = el.target.parentElement.parentElement;
      element.remove();
      let temp_list = itemList.filter(function (item) {
        return item.id != id;
      });
      itemList = temp_list;
      showBalance();
    });
  });
}
//===============Budget Function=================
function budgetFun() {
  const budgetValue = budgetInputEl.value;
  if (budgetValue == "" || budgetValue < 0) {
    errorMessage("Error: enter a budget above $0");
  } else {
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = "";
    showBalance();
  }
}
//================Show Balance===================
function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent) - expenses;
  balanceCardEl.textContent = total;
}
//==================total Expenses=============
function totalExpenses() {
  let total = 0;
  if (itemList.length > 0) {
    total = itemList.reduce(function (acc, curr) {
      acc += curr.amount;
      return acc;
    }, 0);
  }
  expensesCardEl.textContent = total;
  return total;
}
//====================Error Message Function================
function errorMessage(message) {
  errorMesgEl.innerHTML = `<p>${message}</p>`;
  errorMesgEl.classList.add("error");
  setTimeout(() => {
    errorMesgEl.classList.remove("error");
  }, 2500);
}
