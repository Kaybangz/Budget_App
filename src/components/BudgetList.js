import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./BudgetStyle.css";

const BudgetList = ({ budgetItems, setBudgetItems, deposit, setDeposit }) => {
  const deleteBtnClick = (budgetId, percentageValue) => {
    setBudgetItems(
      budgetItems.filter((budgetItem) => {
        return budgetItem.id !== budgetId;
      })
    );

	setDeposit(deposit + percentageValue)
  };

  return (
    <>
      {budgetItems.map((budgetItem) => {
        return (
          <article key={budgetItem.id} className="expense-list_container">
            <section className="expense-list">
              <ul>
                <li className="expense-list-item">
                  <div className="item-content">
                    <h5>{budgetItem.expense}</h5>
                    <p>
                      <FontAwesomeIcon icon={faDollarSign} />
                      {budgetItem.percentageCalc}
                    </p>
                  </div>
                  <button onClick={() => deleteBtnClick(budgetItem.id, budgetItem.percentageCalc)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>
              </ul>
            </section>
          </article>
        );
      })}
    </>
  );
};

export default BudgetList;
