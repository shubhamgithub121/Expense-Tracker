import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseList = ({ expenses, income, deleteExpense }) => {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = income - totalExpense;

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
    percentage: ((categoryData[category] / totalExpense) * 100).toFixed(1),
  }));

  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#A020F0"];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center text-purple-300">Your Expenses</h2>

      <p className={`text-lg font-semibold text-center ${balance < 0 ? "text-red-500" : "text-green-400"}`}>
        Balance: ₹{balance}
      </p>

      <p className="text-lg font-semibold text-center text-yellow-400">
        Total Expenses: ₹{totalExpense}
      </p>

      {pieData.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 p-2 bg-gray-900 rounded-md">
            <h3 className="text-md font-semibold text-purple-300 text-center">Expense Breakdown</h3>
            <ul>
              {pieData.map((entry, index) => (
                <li key={entry.name} className="flex justify-between p-2 text-white border-b border-gray-700">
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    {entry.name}
                  </span>
                  <span className="font-bold text-yellow-400">₹{entry.value} ({entry.percentage}%)</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <ul className="mt-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-2 border-b flex justify-between items-center">
            <div>
              <span className="text-white">{expense.title} ({expense.category})</span>
              <span className="font-bold text-red-400 ml-2">₹{expense.amount}</span>
            </div>
            <button 
              onClick={() => deleteExpense(expense.id)} 
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
