import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Balance</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹{balance}
            </h2>
          </div>

          <FaWallet className="text-blue-600 text-4xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Income</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalIncome}
            </h2>
          </div>

          <FaArrowUp className="text-green-600 text-4xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Expense</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              ₹{totalExpense}
            </h2>
          </div>

          <FaArrowDown className="text-red-600 text-4xl" />
        </div>
      </div>

    </div>
  );
}

export default SummaryCards;