import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data"); // Backend API Call
        const data = await response.json();
        setExpenses(data.expenses || []);
        setIncome(data.income || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array -> Runs only once on mount

  // 📝 Expense Add Karne Ka Function
  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  // ❌ Expense Delete Karne Ka Function
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-2xl font-bold text-center text-purple-400">Expense Tracker</h1>

      {/* Income Input */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Enter Your Income:</label>
        <input
          type="number"
          className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border-gray-600"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          placeholder="Enter income amount"
        />
      </div>

      {/* Expense Form */}
      <ExpenseForm addExpense={addExpense} />

      {/* Expense List with Delete Option */}
      <ExpenseList expenses={expenses} income={income} deleteExpense={deleteExpense} />
    </div>
  );
};

export default ExpenseTracker;
