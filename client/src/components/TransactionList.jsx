import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../services/api";

function TransactionList({
  transactions,
  fetchTransactions,
  setEditTransaction,
}) {

  const deleteTransaction = async (id) => {
    try {

      await api.delete(`/transactions/${id}`);

      toast.success(
        "Transaction Deleted Successfully"
      );

      fetchTransactions();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (

        <p className="text-center text-gray-500">
          No Transactions Found
        </p>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => (

            <div
              key={transaction._id}
              className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {transaction.category}
                </h3>

                <p
                  className={
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {transaction.type.toUpperCase()}
                </p>

                <p className="text-gray-500">
                  {transaction.description}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="flex items-center gap-6">
                <h2
                  className={`text-2xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{transaction.amount}
                </h2>

                <button
  onClick={() => setEditTransaction(transaction)}
  className="text-blue-600 hover:text-blue-800"
>
  <FaEdit size={20} />
</button>
                <button
                  onClick={() =>
                    deleteTransaction(transaction._id)
                  }
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={20} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default TransactionList;
             
              