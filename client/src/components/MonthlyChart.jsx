import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function MonthlyChart({ transactions }) {
  const monthlyData = Array.from({ length: 12 }, (_, index) => ({
    month: new Date(0, index).toLocaleString("default", {
      month: "short",
    }),
    amount: 0,
  }));

  transactions.forEach((item) => {
    const month = new Date(item.date).getMonth();

    if (item.type === "expense") {
      monthlyData[month].amount += Number(item.amount);
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;