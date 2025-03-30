import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(localStorage.getItem("income") || 0); // Getting income from localStorage

  // 📌 Backend se data fetch karna
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://expense-backend-sand.vercel.app/api/data");

        console.log(response.data);

        setExpenses(response.data.expenses || []); // ✅ Fix: Correct key for expenses
        setIncome(response.data.income || 0); // ✅ Fix: Correct key for income
        
        toast.success("Data loaded successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data!");
      }
    };

    fetchData();
  }, []);

  // 📌 Expense add karne ka function (backend ko bhi update karega)
  const addExpense = async (newExpense) => {
    try {
      const expenseData = { ...newExpense, id: Date.now() };
      const response = await axios.post("https://expense-backend-sand.vercel.app/api/add-expense", expenseData);
      const data = response.data;

      console.log("Expense added:", data);
      setExpenses((prevExpenses) => [...prevExpenses, data]);
      toast.success("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense!");
    }
  };

  // 📌 Income update karne ka function (backend me bhi update hoga)
  const addIncome = async (newIncome) => {
    try {
      const response = await axios.put("https://expense-backend-sand.vercel.app/api/update-income", { newIncome }); // ✅ Fix: Correct request body
      const data = response.data;

      console.log("Updated income:", data);
      setIncome(data.income); // ✅ Fix: Correctly updating income
      localStorage.setItem("income", data.income); // Storing income in localStorage
      toast.success("Income updated successfully!");
    } catch (error) {
      console.error("Error updating income:", error);
      toast.error("Failed to update income!");
    }
  };

  // 📌 Expense delete karna (backend se bhi delete hoga)
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`https://expense-backend-sand.vercel.app/api/delete-expense/${id}`);

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      toast.error("Expense deleted!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense!");
    }
  };

  // 📌 Total expenses calculate karna
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balance = income - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-950 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-purple-300 shadow-md">Expense Tracker</h1>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-gray-900 p-4 rounded-2xl shadow-lg mt-4">
        <ExpenseForm addExpense={addExpense} addIncome={addIncome} income={income} />
      </div>
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-2xl shadow-lg mt-4">
        <ExpenseList expenses={expenses} income={income} deleteExpense={deleteExpense} />
      </div>

      {/* Showing Total Expenses and Balance */}
      <div className="w-full max-w-md bg-blue-900 p-4 rounded-2xl shadow-lg mt-4">
        <h2 className="text-xl font-bold text-blue-300">Total Expenses: ₹{totalExpenses}</h2>
        <h3 className="text-white mt-2">Balance: ₹{balance}</h3>
      </div>
    </div>
  );
};

export default App;
