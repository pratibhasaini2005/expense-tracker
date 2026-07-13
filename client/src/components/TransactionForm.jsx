import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

  function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
  if (editTransaction) {
    setFormData({
      type: editTransaction.type,
      amount: editTransaction.amount,
      category: editTransaction.category,
      description: editTransaction.description,
      date: editTransaction.date?.split("T")[0],
    });
  }
}, [editTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTransaction) {
  await api.put(
    `/transactions/${editTransaction._id}`,
    formData
  );

  toast.success("Transaction Updated Successfully");

  setEditTransaction(null);

} else {
  await api.post("/transactions", formData);

  toast.success("Transaction Added Successfully");
}

fetchTransactions();

setFormData({
  type: "expense",
  amount: "",
  category: "",
  description: "",
  date: "",
});

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5"
      >
        {/* Type */}
        <div>
          <label className="block mb-2 font-semibold">
            Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-2 font-semibold">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="Food, Salary, Travel..."
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 font-semibold">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="md:col-span-2">
         <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition"
>
  {editTransaction ? "Update Transaction" : "Add Transaction"}
</button>
        </div>
        </form>
    </div>
  );
}

export default TransactionForm;