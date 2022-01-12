import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./BudgetStyle.css";
import BudgetList from "./BudgetList";

let budgetID = 0;

const Budget = () => {
  //Creating states to handle the various input elements
  const [depositValue, setDepositValue] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [expense, setExpense] = useState("");
  const [percentage, setPercentage] = useState("");


  //Empty array that would contain the budget items
  const [budgetItems, setBudgetItems] = useState([]);

  //Function for preventing the default submit behaviour
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  //Function for handling the deposit button behaviour
  const depositBtnClick = () => {
    setDeposit((prevDeposit) => prevDeposit + depositValue);
    setDepositValue("");
  };

  //onChange handler for expense input
  const expenseChangeHandler = (e) => {
    setExpense(e.target.value);
  };

  //onchange handler for percentage input
  const percentageChangeHandler = (e) => {
    setPercentage(parseInt(e.target.value));
  };

  //Function for handling the budget button behaviour
  const budgetBtnClick = () => {
    if (deposit === 0) {
      alert("Balance is 0, please deposit money...");
      setExpense("");
      setPercentage("");
      return false;
    } else if (percentage === "" || expense === "") {
      alert("You have to enter expense and percentage...");
      return false;
    } else if (percentage > 100 || percentage <= 0) {
      alert("Percentage cannot be greater than 100% or lesser than 1%...");
      return false;
    } else {
      setBudgetItems([
        ...budgetItems,
        {
          expense: expense,
          deposit: deposit,
          percentageCalc: Math.round((deposit / 100) * percentage),
          id: budgetID++,
        },
      ]);
      setDeposit(Math.round(deposit - (deposit / 100) * percentage));
    }

    setExpense("");
    setPercentage("");
  };

  return (
    <div>
      <h2>Budgetr</h2>

      <main className="wrapper">
        <form className="container" onSubmit={onSubmitHandler}>
          <section className="deposit_container">
            <div>
              <input
                type="number"
                placeholder="Deposit amount"
                value={depositValue}
                onChange={(e) => setDepositValue(parseInt(e.target.value))}
              />
              <button onClick={depositBtnClick}>Deposit</button>
            </div>
            <div>
              <h5>Balance</h5>
              <h3>
                <FontAwesomeIcon icon={faDollarSign} />
                {deposit}
              </h3>
            </div>
          </section>

          <section className="expense_container">
            <input
              type="text"
              placeholder="Expense"
              value={expense}
              onChange={expenseChangeHandler}
            />
            <input
              type="number"
              placeholder="Percentage"
              value={percentage}
              onChange={percentageChangeHandler}
            />
            <button onClick={budgetBtnClick}>Calculate</button>
          </section>

          {
            <BudgetList
              setBudgetItems={setBudgetItems}
              budgetItems={budgetItems}
			  deposit={deposit}
			  setDeposit={setDeposit}
            />
          }
        </form>
      </main>
    </div>
  );
};

export default Budget;