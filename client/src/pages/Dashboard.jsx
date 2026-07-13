import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import api from "../services/api";


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to your Expense Tracker.
        </p>

        <SummaryCards transactions={transactions} />

        <TransactionForm
  fetchTransactions={fetchTransactions}
  editTransaction={editTransaction}
  setEditTransaction={setEditTransaction}
/>

       <TransactionList
    transactions={transactions}
    fetchTransactions={fetchTransactions}
    setEditTransaction={setEditTransaction}
/>
      </div>
    </div>
  );
}

export default Dashboard;