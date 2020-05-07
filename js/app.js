let idNum = 1;
let sumExpenses = 0;

class Inputs {
  constructor() {
    this.bugetInput = document.querySelector("#budget-input");
    this.expenseTitleInput = document.querySelector("#expense-input");
    this.expenseAmountInput = document.querySelector("#amount-input");
    this.calculateBtn = document.querySelector("#budget-submit");
    this.addExpenseBtn = document.querySelector("#expense-submit");
  }

  budgetAddListener() {
    this.calculateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.bugetInput.value > 0 && this.bugetInput.value !== "") {
        budget.budgetValSpan.textContent = this.bugetInput.value;
        this.bugetInput.value = "";
        budget.updateBudget();
      } else {
        const alert = document.querySelector(
          "body > div > div > div > div:nth-child(2) > div.col-md-5.my-3 > div"
        );
        alert.classList.add("showItem");
        alert.textContent = "Value Cannot Be Empty Or Negative";
        window.setTimeout(function () {
          alert.classList.remove("showItem");
        }, 2000);
      }
    });
  }
  expenseAddListener() {
    this.addExpenseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        this.expenseTitleInput.value !== "" &&
        this.expenseAmountInput.value !== "" &&
        this.expenseAmountInput.value >= 0
      ) {
        const expense = new Expense(
          idNum,
          this.expenseTitleInput.value,
          this.expenseAmountInput.value
        );
        expense.renderExpense();

        budget.updateBudget();
      } else {
        const alert = document.querySelector(
          "body > div > div > div > div:nth-child(3) > div.col-md-5.my-3 > div"
        );
        alert.classList.add("showItem");
        alert.textContent = `Values Cannot Be Empty Or Negative`;
        window.setTimeout(function () {
          alert.classList.remove("showItem");
        }, 2000);
      }
    });
  }
}

class Expense {
  constructor(id, expTitle, expValue) {
    this.id = id;
    this.expTitle = expTitle;
    this.expValue = expValue;
  }
  renderExpense() {
    sumExpenses += parseInt(this.expValue);
    const singleExpense = document.createElement("div");
    singleExpense.innerHTML = `<div class="expense">
  <div class="expense-item d-flex justify-content-between align-items-baseline">

   <h6 class="expense-title mb-0 text-uppercase list-item">${this.expTitle}</h6>
   <h5 class="expense-amount mb-0 list-item">${this.expValue}</h5>

   <div class="expense-icons list-item">

    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
     <i class="fas fa-edit"></i>
    </a>
    <a href="#" class="delete-icon" data-id="${expense.id}">
     <i class="fas fa-trash"></i>
    </a>
   </div>
  </div>

 </div>`;
    const expensesList = document.querySelector("#expense-list");
    expensesList.appendChild(singleExpense);
    singleExpense
      .querySelector("a.delete-icon")
      .addEventListener("click", function () {
        sumExpenses -= singleExpense.textContent.match(/\d+/g).map(Number);
        budget.updateBudget();
        expensesList.removeChild(singleExpense);
      });
  }
}

class Budget {
  constructor() {
    this.budgetValSpan = document.querySelector("#budget-amount");
    this.expensesValSpan = document.querySelector("#expense-amount");
    this.balanceValSpan = document.querySelector("#balance-amount");
  }
  updateBudget() {
    this.expensesValSpan.textContent = sumExpenses;
    this.balanceValSpan.textContent =
      this.budgetValSpan.textContent - this.expensesValSpan.textContent;
    if (this.balanceValSpan.textContent >= 0) {
      document.querySelector("#balance").classList.remove("showRed");
      document.querySelector("#balance").classList.add("showGreen");
    } else {
      document.querySelector("#balance").classList.remove("showGreen");
      document.querySelector("#balance").classList.add("showRed");
    }
  }
}

const inputs = new Inputs();
const budget = new Budget();

// budget.expensesValSpan.textContent = sumExpenses;

inputs.budgetAddListener();
inputs.expenseAddListener();
