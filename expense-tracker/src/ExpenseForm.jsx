import React, { useState } from "react";

const ExpenseForm = ({ addExpense, addIncome, income }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [newIncome, setNewIncome] = useState(income);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    
    addExpense({ title, amount: parseFloat(amount), category });
    setTitle("");
    setAmount("");
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    addIncome(parseFloat(newIncome));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-purple-300">Add Income</h2>
      <form onSubmit={handleIncomeSubmit} className="mb-4">
        <input
          type="number"
          placeholder="Enter Income"
          className="border p-2 w-full rounded-md mb-2 bg-gray-700 text-white"
          value={newIncome}
          onChange={(e) => setNewIncome(e.target.value)}
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md w-full">
          Update Income
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2 text-purple-300">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          className="border p-2 w-full rounded-md mb-2 bg-gray-700 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full rounded-md mb-2 bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border p-2 w-full rounded-md mb-2 bg-gray-700 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
