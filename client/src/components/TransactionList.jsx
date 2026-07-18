import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../services/api";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Expense Tracker Report", 14, 20);

  const tableData = transactions.map((item) => [
    item.category,
    item.type,
    item.amount,
    item.description,
    new Date(item.date).toLocaleDateString(),
  ]);

 
  autoTable(doc, {
    head: [["Category", "Type", "Amount", "Description", "Date"]],
    body: tableData,
    startY: 30,
  });

  doc.save("Expense_Report.pdf");
};

const exportExcel = () => {
  const data = transactions.map((item) => ({
    Category: item.category,
    Type: item.type,
    Amount: item.amount,
    Description: item.description,
    Date: new Date(item.date).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Transactions"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Expense_Report.xlsx");
};

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

     <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold">
    Recent Transactions
  </h2>

  <button
  onClick={exportPDF}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>
  📄 Export PDF
</button>

<button
  onClick={exportExcel}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>
  📊 Export Excel
</button>
</div>
      <div className="mb-5">
  <input
    type="text"
    placeholder="🔍 Search by category or description..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-xl p-3"
  />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    className="border rounded-xl p-3"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    className="border rounded-xl p-3"
  />

</div>

      {transactions.length === 0 ? (

        <p className="text-center text-gray-500">
          No Transactions Found
        </p>

      ) : (

        <div className="space-y-4">

          {transactions
        .filter((transaction) => {
  const text = search.toLowerCase();

  const matchSearch =
    transaction.category?.toLowerCase().includes(text) ||
    transaction.description?.toLowerCase().includes(text);

  const transactionDate = new Date(transaction.date);

  const matchFrom =
    !fromDate || transactionDate >= new Date(fromDate);

  const matchTo =
    !toDate || transactionDate <= new Date(toDate);

  return matchSearch && matchFrom && matchTo;
})
  .map((transaction) => (

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
             
              