import { useEffect, useState } from "react";

function BudgetCard({ transactions }) {
  const [budget, setBudget] = useState(
    localStorage.getItem("budget") || ""
  );

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const saveBudget = () => {
    localStorage.setItem("budget", budget);
  };

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");

    if (savedBudget) {
      setBudget(savedBudget);
    }
  }, []);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Budget
      </h2>

      <div className="flex gap-3">

        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border rounded-xl p-3 flex-1"
        />

        <button
          onClick={saveBudget}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl"
        >
          Save
        </button>

      </div>

      <div className="mt-6">

        <p className="text-lg">
          Budget: ₹{budget || 0}
        </p>

        <p className="text-lg">
          Expense: ₹{totalExpense}
        </p>

        <p
          className={`mt-3 font-bold ${
            totalExpense > Number(budget)
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {totalExpense > Number(budget)
            ? "⚠️ Budget Exceeded"
            : "✅ Budget Safe"}
        </p>

      </div>

    </div>
  );
}

export default BudgetCard;